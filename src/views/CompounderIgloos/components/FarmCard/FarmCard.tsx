import React, { useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import { Flex, Text, Heading, Image, Button } from 'penguinfinance-uikit2'
import { communityFarms } from 'config/constants'
import { Farm } from 'state/types'
import useI18n from 'hooks/useI18n'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { QuoteToken } from 'config/constants/types'
import { BASE_ADD_LIQUIDITY_URL, WEEKS_PER_YEAR } from 'config'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'

export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
}

const FCard = styled.div<{ index: number }>`
  width: 100%;
  /* background: ${(props) => props.theme.card.background}; */
  background: ${({ index }) => (index % 2 === 0 ? '#4941A0' : '#D84E49')};
  border-radius: 12px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  display: flex;
  justify-content: space-between;
  padding: 24px;
  position: relative;
  margin-bottom: 36px;
`

// card action container
const CardActionContainer = styled.div`
  display: flex;
`
const IglooLogoContainer = styled.div`
  margin-right: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  > div {
    width: 64px;
  }
`
const IglooTitleWrapper = styled.div`
  > div {
    color: #fff;
  }
`
const ActionButtonWrapper = styled.div<{ index: number }>`
  margin-right: 10px;
  button {
    background: ${({ index }) => (index % 2 === 0 ? '#D84E49' : '#4941A0')};
  }
`

// card info container
const CardInfoContainer = styled.div<{ index?: number }>`
  display: flex;
  align-items: center;
  &:last-child {
    > div {
      > div:last-child {
        color: ${({ index }) => (index % 2 === 0 ? '#D84E49' : '#ffffff')};
      }
    }
  }
`
const CardInfoWrapper = styled.div<{ index?: number }>`
  > div {
    color: #fff;
    text-align: center;
  }
`

interface FarmCardProps {
  index: number
  farm: FarmWithStakedValue
  removed: boolean
  pefiPrice?: BigNumber
  avaxPrice?: BigNumber
  ethPrice?: BigNumber
  account?: string
}

const FarmCard: React.FC<FarmCardProps> = ({ index, farm, removed, pefiPrice, avaxPrice, ethPrice, account }) => {
  const TranslateString = useI18n()

  const [showExpandableSection, setShowExpandableSection] = useState(false)

  const isCommunityFarm = communityFarms.includes(farm.tokenSymbol)
  // We assume the token name is coin pair + lp e.g. PEFI-AVAX LP, LINK-AVAX LP,
  // NAR-PEFI LP. The images should be penguin-avax.svg, link-avax.svg, nar-penguin.svg
  const farmImage = farm.lpSymbol.split(' ')[0].toLocaleLowerCase()

  const totalValue: BigNumber = useMemo(() => {
    if (!farm.lpTotalInQuoteToken) {
      return null
    }
    if (farm.quoteTokenSymbol === QuoteToken.AVAX) {
      return avaxPrice.times(farm.lpTotalInQuoteToken)
    }
    if (farm.quoteTokenSymbol === QuoteToken.PEFI) {
      return pefiPrice.times(farm.lpTotalInQuoteToken)
    }
    if (farm.quoteTokenSymbol === QuoteToken.ETH) {
      return ethPrice.times(farm.lpTotalInQuoteToken)
    }
    return farm.lpTotalInQuoteToken
  }, [avaxPrice, pefiPrice, ethPrice, farm.lpTotalInQuoteToken, farm.quoteTokenSymbol])

  const totalValueFormated = totalValue
    ? `$${Number(totalValue).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'

  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('PANCAKE', '')
  const earnLabel = farm.dual ? farm.dual.earnLabel : 'PEFI'
  const farmAPY =
    farm.apy && farm.apy.times(new BigNumber(WEEKS_PER_YEAR)).times(new BigNumber(100)).toNumber().toFixed(2)

  const { quoteTokenAddresses, tokenSymbol, quoteTokenSymbol, tokenAddresses } = farm

  const data = {
    tvl: '2304000',
    farmTvl: '2304000',
    normalAPY: '459',
    compoundAPY: '12543.45',
  }

  return (
    <FCard index={index}>
      <CardActionContainer>
        <IglooLogoContainer>
          <Image src={`/images/farms/${farmImage}.svg`} alt={farm.tokenSymbol} width={64} height={64} />
        </IglooLogoContainer>
        <Flex flexDirection="column">
          <IglooTitleWrapper>
            <Text bold fontSize="20px">{`${tokenSymbol} - ${quoteTokenSymbol} Igloo`}</Text>
          </IglooTitleWrapper>
          <Flex justifyContent="center">
            <ActionButtonWrapper index={index}>
              <Button mt="8px" scale="sm" disabled={!account}>
                {TranslateString(758, 'Deposit')}
              </Button>
            </ActionButtonWrapper>
            <ActionButtonWrapper index={index}>
              <Button mt="8px" scale="sm" disabled={!account}>
                {TranslateString(758, 'Withdraw')}
              </Button>
            </ActionButtonWrapper>
            <ActionButtonWrapper index={index}>
              <Button mt="8px" scale="sm" disabled={!account}>
                {TranslateString(758, 'Reinvest')}
              </Button>
            </ActionButtonWrapper>
          </Flex>
        </Flex>
      </CardActionContainer>
      <CardInfoContainer index={index}>
        <CardInfoWrapper index={index}>
          <Text fontSize="18px">Your TVL</Text>
          <Text bold fontSize="20px">
            {data.tvl}
          </Text>
        </CardInfoWrapper>
      </CardInfoContainer>
      <CardInfoContainer index={index}>
        <CardInfoWrapper index={index}>
          <Text fontSize="18px">FARM TVL</Text>
          <Text bold fontSize="20px">
            {data.farmTvl}
          </Text>
        </CardInfoWrapper>
      </CardInfoContainer>
      <CardInfoContainer index={index}>
        <CardInfoWrapper index={index}>
          <Text fontSize="18px">NORMAL APY</Text>
          <Text bold fontSize="20px">
            {data.normalAPY}
          </Text>
        </CardInfoWrapper>
      </CardInfoContainer>
      <CardInfoContainer index={index}>
        <CardInfoWrapper index={index}>
          <Text fontSize="18px">COMPOUND APY</Text>
          <Text bold fontSize="20px">
            {data.compoundAPY}
          </Text>
        </CardInfoWrapper>
      </CardInfoContainer>
    </FCard>
  )
}

export default FarmCard
