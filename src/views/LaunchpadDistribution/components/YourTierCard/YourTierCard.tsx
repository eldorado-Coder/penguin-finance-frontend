import React from 'react'
import styled from 'styled-components'
import { Flex } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import SvgIcon from 'components/SvgIcon'
import { getBalanceNumber } from 'utils/formatBalance'
import { useLaunchpad } from 'state/hooks'
import { PENGUIN_TIERS } from 'views/Launchpad/utils'

const YourTierCard: React.FC = () => {
  const { account } = useWeb3React()
  const { stakedBalance: staked, yourPenguinTier } = useLaunchpad(account)
  const launchpadStaked = getBalanceNumber(new BigNumber(staked))
  const hasTier = launchpadStaked >= 300

  return (
    <FCard>
      <CardHeader justifyContent="space-between" alignItems="center">
        <CardBannerImage src={`${process.env.PUBLIC_URL}/images/launchpad/banners/your_tier_banner.png`} alt="banner" />
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
  background: ${(props) => (props.theme.isDark ? '#332654' : props.theme.card.background)};
  border-radius: 32px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  position: relative;
  min-height: 490px;
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

const CardBannerImage = styled.img``

const CardContent = styled.div`
  padding: 24px 32px;
  background: ${(props) => (props.theme.isDark ? '#332654' : props.theme.card.background)};
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
    width: 180px !important;
    height: 180px;
    .none-tier-st1 {
      fill: ${({ theme }) => !theme.isDark && 'black!important'};
    }
    .none-tier-st3 {
      fill: ${({ theme }) => !theme.isDark && 'white!important'};
    }
  }
`

export default YourTierCard
