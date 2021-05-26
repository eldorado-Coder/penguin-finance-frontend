import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Flex, Text, Image, Button, useModal } from 'penguinfinance-uikit2'
// import { communityFarms } from 'config/constants'
import { Farm } from 'state/types'
import useI18n from 'hooks/useI18n'
import { useFarmFromSymbol, useFarmUser } from 'state/hooks'
// import { useApprove } from 'hooks/useApprove'
// import useWeb3 from 'hooks/useWeb3'
// import { getAddress } from 'utils/addressHelpers'
// import { getContract } from 'utils/erc20'
import { BASE_ADD_LIQUIDITY_URL, WEEKS_PER_YEAR } from 'config'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import useStake from 'hooks/useStake'
import useUnstake from 'hooks/useUnstake'
// import { QuoteToken } from 'config/constants/types'
import DepositModal from '../DepositModal'
import WithdrawModal from '../WithdrawModal'
// import ExpandableSectionButton from 'components/ExpandableSectionButton'
// import { WEEKS_PER_YEAR } from 'config'
// import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
// import DetailsSection from './DetailsSection'
// import CardHeading from './CardHeading'
// import CardActionsContainer from './CardActionsContainer'

export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber,
  totalValue?: BigNumber
}

const getCardBackground = (index, theme) => {
  if (index % 2) {
    return theme.isDark ? '#22214C' : '#D3464E'
  }
  return theme.isDark ? '#322C59' : '#383466'
};

const FCard = styled.div<{ index: number }>`
  width: 100%;
  /* background: ${(props) => props.theme.card.background}; */
  background: ${({ index, theme }) => getCardBackground(index, theme)};
  border-radius: 12px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  display: flex;
  justify-content: space-between;
  padding: 0 16px 12px;
  position: relative;
  margin-bottom: 20px;
`

// card action container
const CardActionContainer = styled.div`
  display: flex;
  margin-right: 2rem;
`
const IglooLogoContainer = styled.div`
  margin-right: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  > div {
    width: 96px;
  }
`
const IglooTitleWrapper = styled.div`
  @font-face {
    font-family: 'GothamBold Font';
    src: url(${process.env.PUBLIC_URL}/fonts/GothamUltra.otf) format('truetype');
  }

  > div {
    color: #fff;
    font-family: 'GothamBold Font';
  }
`

const getButtonBackground = (index, theme) => {
  if (index % 2) {
    return theme.isDark ? '#322C59' : '#383466'
  }
  return theme.isDark ? '#22234C' : '#D3464E'
};

const ActionButtonWrapper = styled.div<{ index: number }>`
  @font-face {
    font-family: 'Kanit-Medium Font';
    src: url(${process.env.PUBLIC_URL}/fonts/Kanit-Medium.ttf) format('truetype');
  }

  margin-right: 10px;
  button {
    background: ${({ index, theme }) => getButtonBackground(index, theme)};
    color: ${({ theme }) => theme.isDark && '#ffffff'};
    font-family: 'Kanit-Medium Font';
    font-size: 14px;
    font-weight: 500;
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
  @font-face {
    font-family: 'PoppinsRegular Font';
    src: url(${process.env.PUBLIC_URL}/fonts/PoppinsRegular.ttf) format('truetype');
  }

  @font-face {
    font-family: 'Kanit-ExtraBold Font';
    src: url(${process.env.PUBLIC_URL}/fonts/Kanit-ExtraBold.ttf) format('truetype');
  }

  > div {
    color: #fff;
    text-align: center;
  }

  .label {
    font-family: 'PoppinsRegular Font';
  }

  .value {
    font-family: 'Kanit-ExtraBold Font';
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

const FarmCard: React.FC<FarmCardProps> = ({ 
  index, 
  farm, 
  account 
}) => {
  const TranslateString = useI18n()
  const { pid } = useFarmFromSymbol(farm.lpSymbol)
  const { tokenBalance, stakedBalance } = useFarmUser(pid)
  const lpName = farm.lpSymbol.toUpperCase()
  const { onStake } = useStake(pid)
  const { onUnstake } = useUnstake(pid)

  const { quoteTokenAddresses, quoteTokenSymbol, tokenAddresses } = farm
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAddresses, quoteTokenSymbol, tokenAddresses })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`

  const [onPresentDeposit] = useModal(
    <DepositModal max={tokenBalance} onConfirm={onStake} tokenName={lpName} addLiquidityUrl={addLiquidityUrl} />,
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={onUnstake} tokenName={lpName} />,
  )

  const farmImage = farm.lpSymbol.split(' ')[0].toLocaleLowerCase()
  const totalValueFormatted = farm.totalValue
    ? `$${Number(farm.totalValue).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'

  const stakedValueFormatted = `$${Number(stakedBalance).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
  const farmAPY =
    farm.apy && farm.apy.times(new BigNumber(WEEKS_PER_YEAR)).times(new BigNumber(100)).toNumber().toFixed(2)

  const data = {
    tvl: stakedValueFormatted,
    farmTvl: totalValueFormatted,
    normalAPY: farmAPY,
    compoundAPY: farm.hardApy
  }

  return (
    <FCard index={index}>
      <CardActionContainer>
        <IglooLogoContainer>
          <Image src={`/images/farms/${farmImage}.svg`} alt={farm.tokenSymbol} width={96} height={96} />
        </IglooLogoContainer>
        <Flex flexDirection="column" pt="16px">
          <IglooTitleWrapper>
            <Text mt='4px' bold fontSize="18px">{`${farm.tokenSymbol} - ${quoteTokenSymbol} Igloo`}</Text>
          </IglooTitleWrapper>
          <Flex justifyContent="center">
            <ActionButtonWrapper index={index}>
              <Button mt="4px" scale="sm" disabled={!account} onClick={onPresentDeposit}>
                {TranslateString(758, 'Deposit')}
              </Button>
            </ActionButtonWrapper>
            <ActionButtonWrapper index={index}>
              <Button mt="4px" scale="sm" disabled={!account} onClick={onPresentWithdraw}>
                {TranslateString(758, 'Withdraw')}
              </Button>
            </ActionButtonWrapper>
            <ActionButtonWrapper index={index}>
              <Button mt="4px" scale="sm" disabled={!account}>
                {TranslateString(758, 'Reinvest')}
              </Button>
            </ActionButtonWrapper>
          </Flex>
        </Flex>
      </CardActionContainer>
      <Flex pt='16px' justifyContent='space-between' width='100%'>
        <CardInfoContainer index={index}>
          <CardInfoWrapper index={index}>
            <Text className='label' fontSize="16px">YOUR TVL</Text>
            <Text className='value' bold fontSize="24px">
              {data.tvl}
            </Text>
          </CardInfoWrapper>
        </CardInfoContainer>
        <CardInfoContainer index={index}>
          <CardInfoWrapper index={index}>
            <Text className='label' fontSize="16px">FARM TVL</Text>
            <Text className='value' bold fontSize="24px">
              {data.farmTvl}
            </Text>
          </CardInfoWrapper>
        </CardInfoContainer>
        <CardInfoContainer index={index}>
          <CardInfoWrapper index={index}>
            <Text className='label' fontSize="16px">NORMAL APY</Text>
            <Text className='value' bold fontSize="24px">
              {`${data.normalAPY}%`}
            </Text>
          </CardInfoWrapper>
        </CardInfoContainer>
        <CardInfoContainer index={index}>
          <CardInfoWrapper index={index}>
            <Text className='label' fontSize="16px">COMPOUND APY</Text>
            <Text className='value' bold fontSize="24px">
              {`${data.compoundAPY}`}
            </Text>
          </CardInfoWrapper>
        </CardInfoContainer>
      </Flex>
    </FCard>
  )
}

export default FarmCard
