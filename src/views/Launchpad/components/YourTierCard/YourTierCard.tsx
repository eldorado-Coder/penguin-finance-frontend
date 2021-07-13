import React from 'react'
import styled from 'styled-components'
import { Image, Text, Flex } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import SvgIcon from 'components/SvgIcon'
import { getBalanceNumber } from 'utils/formatBalance'
import { useLaunchpad } from 'state/hooks'

const PENGUIN_TIERS = ['Astronaut', 'Penguineer', 'Starlord']

const YourTierCard: React.FC = () => {
  const { account } = useWeb3React()
  const { stakedBalance: staked, yourPenguinTier } = useLaunchpad(account)
  const launchpadStaked = getBalanceNumber(new BigNumber(staked))
  const hasTier = launchpadStaked > 299

  console.log('111--->', hasTier)

  return (
    <FCard>
      <CardHeader justifyContent="space-between" alignItems="center" pr="32px" pl="32px">
        <Image src="/images/launchpad/PEFI.png" width={64} height={64} alt="XPEFI" />
        <Text bold fontSize="32px">
          YOUR TIER
        </Text>
      </CardHeader>
      <CardContent>
        {hasTier ? (
          <img src={`${process.env.PUBLIC_URL}/images/launchpad/${PENGUIN_TIERS[yourPenguinTier]}.png`} alt="my-tier" />
        ) : (
          <NoneTierWrapper>
            <SvgIcon src={`${process.env.PUBLIC_URL}/images/launchpad/none_tier.svg`} width="100%" height="20px" />
          </NoneTierWrapper>
        )}
      </CardContent>
    </FCard>
  )
}

const FCard = styled.div`
  align-self: flex-start;
  background: ${(props) => props.theme.card.background};
  border-radius: 32px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  position: relative;
  min-height: 480px;
`

const CardHeader = styled(Flex)`
  height: 96px;
  background-image: url('/images/launchpad/banner.png');
  background-size: cover;
  background-position: center center;
  border-radius: 32px 32px 0 0;

  div {
    color: white;
  }
`

const CardContent = styled.div`
  padding: 24px 32px;
  /* background: ${(props) => props.theme.card.background}; */
  border-radius: 32px 32px 0 0;
  display: flex;
  justify-content: center;

  img {
    max-height: 330px;
  }
`

const NoneTierWrapper = styled.div`
  margin-top: 70px;
  svg {
    width: 140px !important;
    height: 140px;
    path {
      fill: #d4444c;
    }
    circle {
      stroke: #d4444c;
    }
  }
`

export default YourTierCard
