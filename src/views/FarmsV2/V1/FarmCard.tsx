import React from 'react'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import { communityFarms } from 'config/constants'
import { Farm } from 'state/types'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'

export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
}

const RainbowLight = keyframes`
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const StyledCardAccent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 16px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const FCard = styled.div`
  align-self: baseline;
  background: ${(props) => props.theme.card.background};
  border-radius: 32px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
  position: relative;
  text-align: center;
`

interface FarmCardProps {
  farm: FarmWithStakedValue
  removed: boolean
  pefiPrice?: BigNumber
  avaxPrice?: BigNumber
  ethPrice?: BigNumber
  account?: string
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, removed, pefiPrice, avaxPrice, ethPrice, account }) => {
  const isCommunityFarm = communityFarms.includes(farm.tokenSymbol)
  // We assume the token name is coin pair + lp e.g. PEFI-AVAX LP, LINK-AVAX LP,
  // NAR-PEFI LP. The images should be penguin-avax.svg, link-avax.svg, nar-penguin.svg
  const farmImage = farm.lpSymbol.split(' ')[0].toLocaleLowerCase()
  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('PANCAKE', '')
 
  const { quoteTokenAddresses, quoteTokenSymbol, tokenAddresses } = farm
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAddresses, quoteTokenSymbol, tokenAddresses })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`

  return (
    <FCard>
      {farm.tokenSymbol === 'PEFI' && <StyledCardAccent />}
      <CardHeading
        lpLabel={lpLabel}
        multiplier={farm.multiplier}
        isCommunityFarm={isCommunityFarm}
        farmImage={farmImage}
        tokenSymbol={farm.tokenSymbol}
      />
      <CardActionsContainer farm={farm} account={account} addLiquidityUrl={addLiquidityUrl} />
    </FCard>
  )
}

export default FarmCard
