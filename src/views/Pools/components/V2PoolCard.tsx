import BigNumber from 'bignumber.js'
import React from 'react'
import styled from 'styled-components'
import { NavLink, useHistory } from 'react-router-dom'
import { Button, Text, Flex, Heading, useMatchBreakpoints } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import UnlockButton from 'components/UnlockButton'
import SvgIcon from 'components/SvgIcon'
import useI18n from 'hooks/useI18n'
import { getBalanceNumber, getNumberWithCommas } from 'utils/formatBalance'
import { Pool } from 'state/types'
import Card from './Card'

const StyledCard = styled(Card)<{ isNestPage?: boolean; isMobile?: boolean }>`
  min-width: ${({ isMobile }) => (isMobile ? '100%' : '350px')};
  border-radius: 26px;
  box-shadow: 0px 1px 8px rgb(0 0 0 / 24%);
  background: ${({ theme }) => (theme.isDark ? '#272044' : '#fff')};
  @media (min-width: 640px) {
    transform: ${(props) => props.isNestPage && 'scale(1.3)'};
    margin-top: ${(props) => props.isNestPage && '60px'};
    margin-bottom: ${(props) => props.isNestPage && '60px'};
  }
`

const StyledHeading = styled(Heading)`
  font-weight: 800;
  color: ${({ theme }) => (theme.isDark ? '#fff' : '#342C6D')};

  @font-face {
    font-family: 'GothamUltra Font';
    src: url(${process.env.PUBLIC_URL}/fonts/GothamUltra.otf) format('truetype');
    font-display: swap;
  }
  font-family: 'GothamUltra Font';

  @media (min-width: 1200px) {
    font-size: 50px;
    line-height: 60px;
  }
`

const CardContent = styled.div`
  padding: 24px;
  background: ${({ theme }) => (theme.isDark ? '#272044' : '#fff')} !important;
  border-radius: 32px;

  @media (min-width: 1200px) {
    padding: 16px 30px 32px 44px;
  }
`

const Block = styled.div`
  width: 50%;
`

const CardImage = styled.img`
  margin-right: 20px;
  width: 64px;
  height: 64px;

  @media (min-width: 1200px) {
    margin-right: 24px;
    width: 85px;
    height: 76px;
  }
`

interface Props {
  pool: Pool
  isMainPool: boolean
  isNestPage?: boolean
  isHomePage?: boolean
}

const V2PoolCard: React.FC<Props> = ({ pool }) => {
  const TranslateString = useI18n()
  const { account } = useWeb3React()
  const history = useHistory()
  const { sousId, tokenName, isFinished, userData } = pool
  const iPefiToPefiRatio = pool.currentExchangeRate || 1
  const paperHandsPenalty = pool.paperHandsPenalty || 6
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)
  const accountHasStakedBalance = stakedBalance?.toNumber() > 0
  const isCardActive = isFinished && accountHasStakedBalance
  const displayedNestApy = (pool.apy.toNumber() * 100).toFixed(2)

  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl

  const handleMovetoNestV2 = () => {
    history.push('/nest-v2')
  }

  const handleMigrationGuide = () => {
    const nestMigrationUrl =
      'https://docs.penguinfinance.io/summary/penguin-nests-staking-and-fee-collection/ipefi-migration-guide'
    window.open(nestMigrationUrl, '_blank')
  }

  const handleViewNestsGitbook = () => {
    window.open(
      'https://penguin-finance.gitbook.io/penguin-finance/summary/penguin-nests-staking-and-fee-collection',
      '_blank',
    )
  }

  return (
    <StyledCard isMobile={isMobile} isActive={isCardActive} isFinished={isFinished && sousId !== 0}>
      <CardContent>
        <Flex justifyContent="space-between" mb="24px" alignItems="center">
          <StyledHeading size="xl" color="primary">
            {`i${tokenName}`} {TranslateString(348, 'Nest')}
          </StyledHeading>
          <InfoIconWrapper onClick={handleViewNestsGitbook}>
            <SvgIcon
              src={`${process.env.PUBLIC_URL}/images/home/info.svg`}
              width={isMobile ? '25px' : '31px'}
              height={isMobile ? '25px' : '31px'}
            />
          </InfoIconWrapper>
        </Flex>
        <Flex mt="12px" mb="32px" alignItems={isMobile ? 'flex-start' : 'center'}>
          <CardImage src="/images/pools/iPefi.svg" alt="iPefi logo" width={76} height={76} />
          <Content>
            <Flex mb="24px">
              <Block>
                <Label>{TranslateString(544, 'iPEFI in Wallet')}:</Label>
                <BalanceText color="textSubtle" bold fontSize="24px">
                  {`${getBalanceNumber(stakedBalance).toFixed(2)}`}
                </BalanceText>
              </Block>
              <Block>
                <Label>{TranslateString(546, `Yesterday's APY: `)}</Label>
                <BalanceText color="textSubtle" bold fontSize="24px">
                  {`${getNumberWithCommas(displayedNestApy)}%`}
                </BalanceText>
              </Block>
            </Flex>
            <Flex ml={isMobile && '-84px'}>
              <Block>
                <Label>{TranslateString(544, 'Paper Hands Penalty')}:</Label>
                <BalanceText color="textSubtle" bold fontSize="24px">
                  {`${Number(paperHandsPenalty).toFixed(2)}% PHP`}
                </BalanceText>
              </Block>
              <Block>
                <Label>{TranslateString(546, 'iPEFI/PEFI Ratio')}:</Label>
                <BalanceText color="textSubtle" bold fontSize="24px">
                  {`${Number(iPefiToPefiRatio.toFixed(2))} PEFI`}
                </BalanceText>
              </Block>
            </Flex>
          </Content>
        </Flex>
        {account ? (
          <Flex justifyContent="space-between">
            <StyledButton onClick={handleMovetoNestV2}>
              Go to the Nest
              <StyledNavLink exact activeClassName="active" to="/nests" id="farm-apy-cta">
                <SvgIcon src={`${process.env.PUBLIC_URL}/images/home/arrow-right.svg`} width="25px" height="25px" />
              </StyledNavLink>
            </StyledButton>
          </Flex>
        ) : (
          <StyledUnlockButton fullWidth isHomeButton />
        )}
      </CardContent>
    </StyledCard>
  )
}

const Label = styled(Text).attrs({ color: 'red' })`
  font-size: 14px;
  color: ${({ theme }) => (theme.isDark ? '#9A97C4' : '#EC3B40')};
  line-height: 1;
  font-weight: 300;

  @font-face {
    font-family: 'Telegraf Bold Font';
    src: url(${process.env.PUBLIC_URL}/fonts/Telegraf-Bold.ttf) format('truetype');
    font-display: swap;
  }
  font-family: 'Telegraf Bold Font';

  @media (min-width: 1200px) {
    font-size: 19px;
    line-height: 24px;
  }
`

const Content = styled.div`
  width: 100%;
`

const StyledNavLink = styled(NavLink)`
  margin-left: 16px;
  svg {
    path {
      fill: white;
    }
  }
`

const InfoIconWrapper = styled.div`
  svg {
    cursor: pointer;
    path {
      fill: ${({ theme }) => (theme.isDark ? 'white' : theme.colors.secondary)};
    }
  }
`

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => (theme.isDark ? '#483692' : '#EC3B40')};
  color: white;
  width: 100%;
  border-radius: 100px;
  white-space: nowrap;
  margin-bottom: 8px;
  font-weight: 300;
  padding: 0px 16px;

  @font-face {
    font-family: 'Telegraf UltraBold Font';
    src: url(${process.env.PUBLIC_URL}/fonts/Telegraf-UltraBold.ttf) format('truetype');
    font-display: swap;
  }
  font-family: 'Telegraf UltraBold Font';

  &:last-child {
    margin-bottom: 0;
  }

  @media (min-width: 640px) {
    width: 48%;
    margin-bottom: 0;
  }
  @media (min-width: 1200px) {
    height: 64px;
    font-size: 24px;
  }
`

const BalanceText = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? '#fff' : '#342C6D')};
  font-weight: 300;

  @font-face {
    font-family: 'Telegraf UltraBold Font';
    src: url(${process.env.PUBLIC_URL}/fonts/Telegraf-UltraBold.ttf) format('truetype');
    font-display: swap;
  }
  font-family: 'Telegraf UltraBold Font';

  @media (min-width: 1200px) {
    font-size: 30px;
    line-height: 35px;
  }
`

const StyledUnlockButton = styled(UnlockButton)`
  border-radius: 100px;
  white-space: nowrap;

  @font-face {
    font-family: 'Telegraf UltraBold Font';
    src: url(${process.env.PUBLIC_URL}/fonts/Telegraf-UltraBold.ttf) format('truetype');
    font-display: swap;
  }
  font-family: 'Telegraf UltraBold Font';

  &:last-child {
    margin-bottom: 0;
  }

  @media (min-width: 640px) {
    width: 48%;
    margin-bottom: 0;
  }
  @media (min-width: 1200px) {
    height: 64px;
    font-size: 24px;
  }
`

export default V2PoolCard
