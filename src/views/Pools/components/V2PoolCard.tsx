import BigNumber from 'bignumber.js'
import React, { useCallback, useState, useEffect } from 'react'
import styled from 'styled-components'
import { NavLink, useHistory } from 'react-router-dom'
import { Button, Text, Flex, Tag, Heading } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import UnlockButton from 'components/UnlockButton'
import SvgIcon from 'components/SvgIcon'
import { useV2NestContract } from 'hooks/useContract'
import useI18n from 'hooks/useI18n'
import { getBalanceNumber, getNumberWithCommas } from 'utils/formatBalance'
import { useV2NestApy, useV2NestAprPerDay } from 'state/hooks'
import { Pool } from 'state/types'
import Card from './Card'

const StyledCard = styled(Card)<{ isNestPage?: boolean }>`
  min-width: 350px;
  border-radius: 32px;
  @media (min-width: 640px) {
    transform: ${(props) => props.isNestPage && 'scale(1.3)'};
    margin-top: ${(props) => props.isNestPage && '60px'};
    margin-bottom: ${(props) => props.isNestPage && '60px'};
  }
`

const StyledHeading = styled(Heading)`
  font-weight: 800;
`

const HelperTag = styled(Tag)`
  margin-right: 6px;
  width: 28px;
  border-radius: 50%;
  span {
    color: ${({ theme }) => theme.colors.red};
  }
`

const CardContent = styled.div`
  padding: 24px;
  background: ${(props) => props.theme.card.background};
  border-radius: 32px;
`

const Block = styled.div`
  width: 50%;
`

const CardImage = styled.img`
  margin-right: 20px;
  width: 64px;
  height: 64px;
`

interface PoolWithApy extends Pool {
  apy: BigNumber
}

interface HarvestProps {
  pool: PoolWithApy
  isMainPool: boolean
  isNestPage?: boolean
  isHomePage?: boolean
}

const V2PoolCard: React.FC<HarvestProps> = ({ pool }) => {
  const [handsOnPenalty, setHandsOnPenalty] = useState(1.13)
  const TranslateString = useI18n()
  const { account } = useWeb3React()
  const iPefiContract = useV2NestContract()
  const history = useHistory()
  const { sousId, tokenName, isFinished, userData } = pool
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)
  const accountHasStakedBalance = stakedBalance?.toNumber() > 0
  const isCardActive = isFinished && accountHasStakedBalance
  const displayedNestApy = (useV2NestApy() * 100).toFixed(2)
  const displayedNestDailyApr = useV2NestAprPerDay().toFixed(2)

  const fetchHandsOnPenalty = useCallback(async () => {
    const perHandsPenalty = await iPefiContract.methods.paperHandsPenalty().call()
    setHandsOnPenalty(perHandsPenalty)
  }, [iPefiContract])

  useEffect(() => {
    // fetchHandsOnPenalty()
  }, [fetchHandsOnPenalty])

  const getIPefiToPefiRatio = () => {
    return pool.totalStaked && pool.totalSupply
      ? new BigNumber(pool.totalStaked).div(new BigNumber(pool.totalSupply)).toNumber()
      : 1
  }

  const iPefiToPefiRatio = getIPefiToPefiRatio()

  const handleMovetoNestV2 = () => {
    history.push('/nest-v2')
  }

  const handleMigrationGuide = () => {
    const nestMigrationUrl = 'https://penguin-finance.medium.com/introducing-ipefi-the-nest-evolution-d002f8548276'
    window.open(nestMigrationUrl, '_blank')
  }

  return (
    <StyledCard isActive={isCardActive} isFinished={isFinished && sousId !== 0}>
      <CardContent>
        <Flex justifyContent="space-between" mb="24px" alignItems="center">
          <StyledHeading size="xl" color="primary">
            {`i${tokenName}`} {TranslateString(348, 'Nest')}
          </StyledHeading>
          <HelperTag variant="primary" outline>
            <a
              href="https://penguin-finance.gitbook.io/penguin-finance/summary/penguin-nests-staking-and-fee-collection"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>?</span>
            </a>
          </HelperTag>
        </Flex>
        <Flex mt="12px" mb="32px">
          <CardImage src="/images/pools/iPefi.svg" alt="iPefi logo" width={64} height={64} />
          <Content>
            <Flex mb="24px">
              <Block>
                <Label>{TranslateString(544, 'iPEFI in Wallet')}:</Label>
                <Text color="textSubtle" bold fontSize="24px">
                  {`${getBalanceNumber(stakedBalance).toFixed(2)} iPEFI`}
                </Text>
              </Block>
              <Block>
                <Label>{TranslateString(546, 'Daily APR')}:</Label>
                <Text color="textSubtle" bold fontSize="24px">
                  {`${getNumberWithCommas(displayedNestDailyApr)}%`}
                </Text>
              </Block>
            </Flex>
            <Flex>
              <Block>
                <Label>{TranslateString(544, 'Paper Hands Penalty')}:</Label>
                <Text color="textSubtle" bold fontSize="24px">
                  {`${Number(handsOnPenalty).toFixed(2)}% PPL`}
                </Text>
              </Block>
              <Block>
                <Label>{TranslateString(546, 'iPEFI/PEFI Ratio')}:</Label>
                <Text color="textSubtle" bold fontSize="24px">
                  {`${Number(iPefiToPefiRatio.toFixed(2))} PEFI`}
                </Text>
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
            <StyledButton onClick={handleMigrationGuide}>Migration Guide</StyledButton>
          </Flex>
        ) : (
          <UnlockButton fullWidth isHomeButton />
        )}
      </CardContent>
    </StyledCard>
  )
}

const Label = styled(Text).attrs({ color: 'red' })`
  line-height: 1;
  font-size: 14px;
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

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.red};
  color: white;
  width: 48%;
  white-space: nowrap;
`

export default V2PoolCard
