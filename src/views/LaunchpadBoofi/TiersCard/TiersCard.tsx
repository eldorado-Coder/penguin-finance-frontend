import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Text, Flex, Tag, ButtonMenu, ButtonMenuItem } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import { useLaunchpadTierHurdles, useLaunchpad } from 'state/hooks'
import SvgIcon from 'components/SvgIcon'
import { getBalanceNumber } from 'utils/formatBalance'
import Card from '../Card'

const PENGUIN_TIERS = ['Astronaut', 'Ghoul', 'Spacelord']

const TiersCard = () => {
  const { account } = useWeb3React()
  const { stakedBalance: staked, yourPenguinTier } = useLaunchpad(account)
  const launchpadStaked = getBalanceNumber(new BigNumber(staked))
  const hasTier = launchpadStaked >= 300

  const tierHurdles = useLaunchpadTierHurdles()
  return (
    <StyledCard>
      <CardContent>
        <div>
          <Flex alignItems='center'>
            <Label fontSize='32px' bold mr='16px'>Tiers</Label>
            <InfoIconWrapper>
              <SvgIcon src={`${process.env.PUBLIC_URL}/images/home/info.svg`} width="25px" height="25px" />
            </InfoIconWrapper>
          </Flex>
          <CurrentTiersWrapper>
            <Flex flexDirection='column' alignItems='center' mr='16px'>
              {PENGUIN_TIERS.map(penguinTier => (
                <Text key={`label-${penguinTier}`} fontSize='18px' fontWeight={400} className={penguinTier.toLowerCase()}>
                  {penguinTier}
                </Text>
              ))}
            </Flex>
            <Flex flexDirection='column' alignItems='center'>
              {PENGUIN_TIERS.map((penguinTier, index) => (
                <Text key={`value-${penguinTier}`} fontSize='18px' bold className={penguinTier.toLowerCase()}>
                  {`(+${tierHurdles.length > 0 ? tierHurdles[index] : 0} iPEFI)`}
                </Text>
              ))}
            </Flex>
          </CurrentTiersWrapper>
          <Flex>
            <Label minWidth={116} textAlign='right' mr='16px'>Your Allocation:</Label>
            <Label bold>62.5 AP</Label>
          </Flex>
          <Flex>
            <Label minWidth={116} textAlign='right' mr='16px'>Your Stake:</Label>
            <Label bold>15000.00 iPEFI</Label>
          </Flex>
          <Flex mb='16px'>
            <Label minWidth={116} textAlign='right' mr='16px'>Price per BOOFI:</Label>
            <Label bold>$0.02</Label>
          </Flex>
        </div>
        {hasTier ? (
          <img src={`${process.env.PUBLIC_URL}/images/launchpad/${PENGUIN_TIERS[yourPenguinTier]}.png`} alt="my-tier" />
        ) : (
          <NoneTierWrapper>
            <SvgIcon src={`${process.env.PUBLIC_URL}/images/launchpad/none_tier.svg`} width="100%" height="20px" />
          </NoneTierWrapper>
        )}
      </CardContent>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  border-radius: 8px;
  margin-top: 16px;
  width: 100%;
  box-shadow: 0px 1px 6px rgb(0 0 0 / 16%);

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 49%;
  }
`

const CardContent = styled.div`
  padding: 24px;
  background: ${(props) => props.theme.card.background};
  border-radius: 32px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  img {
    max-height: 260px;
    margin: 0 auto;

    @media (min-width: 640px) {
      margin: unset;
    }
  }

  @media (min-width: 640px) {
    flex-direction: row;
  }
`

const CurrentTiersWrapper = styled(Flex)`
  margin-bottom: 24px;
  margin-top: 16px;
  .astronaut {
    color: #2c77e5;
  }
  .ghoul {
    color: #38db93;
  }
  .spacelord {
    color: #9200e7;
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

const Label = styled(Text)<{ minWidth?: number }>`
  color: ${({ theme }) => (theme.isDark ? 'white' : theme.colors.secondary)};
  min-width: ${({ minWidth }) => `${minWidth}px`};
`;

const NoneTierWrapper = styled.div`
  margin: 0 auto;
  margin-top: 32px;
    
  @media (min-width: 640px) {
    margin: unset;
    margin-top: 32px;
  }
  svg {
    width: 200px !important;
    height: 200px;
    .none-tier-st1 {
      fill: ${({ theme }) => !theme.isDark && 'black!important'};
    }
    .none-tier-st3 {
      fill: ${({ theme }) => !theme.isDark && 'white!important'};
    }
  }
`

export default TiersCard;

