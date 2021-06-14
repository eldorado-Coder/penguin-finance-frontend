import React, { useMemo, useCallback, useState } from 'react'
import ReactTooltip from 'react-tooltip'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Flex, Text, Image, Button, useModal } from 'penguinfinance-uikit2'
import { Farm } from 'state/types'
import useI18n from 'hooks/useI18n'
import { useCompounderFarmFromSymbol, useCompounderFarmUser } from 'state/hooks'
import { useStrategyApprove } from 'hooks/useApprove'
import useWeb3 from 'hooks/useWeb3'
import { getAddress } from 'utils/addressHelpers'
import { getContract } from 'utils/erc20'
import {
  BASE_ADD_LIQUIDITY_URL,
  MAX_COMPOUND_APY,
  BASE_LYDIA_LIQUIDITY_URL,
  BASE_GONDOLA_LIQUIDITY_POOL_URL,
} from 'config'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import useCompounderStake from 'hooks/useCompounderStake'
import useCompounderUnstake from 'hooks/useCompounderUnstake'
import useCompounderClaimXPefi from 'hooks/useCompounderClaimXPefi'
import { getBalanceNumber } from 'utils/formatBalance'
import { getCompoundApy } from 'utils/compoundApyHelpers'
import UnlockButton from 'components/UnlockButton'
import DepositModal from '../DepositModal'
import WithdrawModal from '../WithdrawModal'

export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
  totalValue?: BigNumber
  totalSupply?: BigNumber
  strategyRatio?: BigNumber
}

const getCardBackground = (index, theme) => {
  if (index % 2) {
    return theme.isDark ? '#22214C' : '#D3464E'
  }
  return theme.isDark ? '#322C59' : '#383466'
}

const FCard = styled.div<{ index: number }>`
  width: 100%;
  background: ${({ index, theme }) => getCardBackground(index, theme)};
  border-radius: 12px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  display: flex;
  justify-content: space-between;
  padding: 0 16px 12px;
  position: relative;
  margin-bottom: 20px;
  flex-direction: column;

  @media (min-width: 1200px) {
    flex-direction: row;
  }
`

// card action container
const CardActionContainer = styled.div`
  display: flex;
  width: 100%;

  @media (min-width: 1200px) {
    min-width: 42%;
    margin-right: 2rem;
  }
`
const IglooLogoContainer = styled.div`
  margin-right: 16px;
  display: flex;
  align-items: center;
  > div {
    width: 64px;
    height: 64px;

    > img {
      width: 80%;
      height: 80%;
      margin: 10%;
    }

    @media (min-width: 768px) {
      width: 96px;
      height: 96px;
    }
    @media (min-width: 1200px) {
      width: 108px;
      height: 108px;
    }
  }
`
const IglooTitleWrapper = styled.div`
  @font-face {
    font-family: 'GothamUltra Font';
    src: url(${process.env.PUBLIC_URL}/fonts/GothamUltra.otf) format('truetype');
  }

  > div {
    color: #fff;
    font-family: 'GothamUltra Font';
    font-size: 18px;
    @media (min-width: 768px) {
      font-size: 20px;
    }
    @media (min-width: 1200px) {
      font-size: 20px;
    }
  }
`

const getButtonBackground = (index, theme) => {
  if (index % 2) {
    return theme.isDark ? '#322C59' : '#383466'
  }
  return theme.isDark ? '#22234C' : '#D3464E'
}

const ActionButtonWrapper = styled.div<{ index: number }>`
  margin-right: 10px;
  button {
    background: ${({ index, theme }) => getButtonBackground(index, theme)};
    color: ${({ theme }) => theme.isDark && '#ffffff'};
    font-family: 'Kanit';
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
  }
`

// card info container
const CardInfoContainer = styled.div<{ index?: number }>`
  display: flex;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 8px;
  width: 50%;
  justify-content: center;

  @media (min-width: 768px) {
    width: unset;
    justify-content: flex-start;
  }
  @media (min-width: 1200px) {
    margin-top: 0;
    margin-bottom: 0;
  }

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

  .label {
    font-family: 'Poppins';
    font-weight: 400;
    line-height: 1;
    white-space: nowrap;
    color: #fff;
  }

  .value {
    font-family: 'Kanit';
    font-weight: 800;
    white-space: nowrap;
  }
`

const PGUnlockButton = styled(UnlockButton)<{ index: number }>`
  background: ${({ index, theme }) => getButtonBackground(index, theme)};
  color: ${({ theme }) => theme.isDark && '#ffffff'};
`

const FarmDetails = styled(Flex)`
  padding-top: 16px;
  padding-right: 16px;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    padding-left: 114px;
    margin-top: -8px;
    padding-top: 0;
    padding-right: 0;
    flex-wrap: nowrap;
  }
  @media (min-width: 1200px) {
    padding-top: 16px;
    padding-left: 0;
    padding-right: 0;
  }
`

const getToolTipBackground = (index, theme) => {
  if (index % 2) {
    return theme.isDark ? '#322C59!important' : '#383466!important'
  }
  return theme.isDark ? '#22214C!important' : '#D3464E!important'
}

const CustomToolTip = styled(ReactTooltip) <{ index: number }>`
  width: 100% !important;
  max-width: 200px !important;
  background: ${({ index, theme }) => (theme.isDark ? '#ffffff!important' :  getToolTipBackground(index, theme))};
  box-shadow: ${(props) => `${props.theme.card.boxShadow}!important`};
  color: ${({ theme }) => (theme.isDark ? '#2D2159!important' : '#ffffff!important')};
  opacity: 1 !important;
  padding: 12px !important;
  font-size: 16px !important;
  border: 2px solid #fff !important;
  border-radius: 16px !important;
  margin-top: 0px !important;
  > div {
    width: 100%;
    white-space: pre-wrap !important;
  }
  &:before {
    border-top-color: #ffffff !important;
    border-bottom-color: #ffffff !important;
  }
  &:after {
    border-top-color: ${({ index, theme }) => (theme.isDark ? '#ffffff!important' :  getToolTipBackground(index, theme))};
    border-bottom-color: ${({ index, theme }) => (theme.isDark ? '#ffffff!important' :  getToolTipBackground(index, theme))};
  }
`

interface FarmCardProps {
  index: number
  farm: FarmWithStakedValue
  removed: boolean
  pefiPrice?: BigNumber
  avaxPrice?: BigNumber
  ethPrice?: BigNumber
  pngPrice?: BigNumber
  linkPrice?: BigNumber
  lydPrice?: BigNumber
  account?: string
}

const FarmCard: React.FC<FarmCardProps> = ({ index, farm, account }) => {
  const TranslateString = useI18n()
  const { lpAddresses, type } = useCompounderFarmFromSymbol(farm.lpSymbol, farm.type)
  const { allowance, tokenBalance, stakedBalance, pendingXPefi } = useCompounderFarmUser(farm.lpSymbol, type)
  const lpName = farm.lpSymbol.toUpperCase()
  const web3 = useWeb3()
  const lpAddress = getAddress(lpAddresses)
  const isApproved = account && allowance && allowance.isGreaterThan(0)
  const [requestedApproval, setRequestedApproval] = useState(false)
  const [requestedAction, setRequestedAction] = useState(false)

  const lpContract = useMemo(() => {
    return getContract(web3, lpAddress)
  }, [web3, lpAddress])

  const { onApprove } = useStrategyApprove(lpContract, farm.lpSymbol, farm.type)
  const { onClaimXPefi } = useCompounderClaimXPefi(farm.lpSymbol, farm.type)
  const { onStake } = useCompounderStake(farm.lpSymbol, type)
  const { onUnstake } = useCompounderUnstake(farm.lpSymbol, type)

  const handleApprove = useCallback(async () => {
    setRequestedApproval(true)
    try {
      await onApprove()
      setRequestedApproval(false)
    } catch (e) {
      setRequestedApproval(false)
      console.error(e)
    }
  }, [onApprove])

  const handleStake = useCallback(
    async (amount) => {
      setRequestedAction(true)
      try {
        await onStake(amount)
        setRequestedAction(false)
      } catch (e) {
        setRequestedAction(false)
        console.error(e)
      }
    },
    [onStake],
  )

  const handleUnstake = useCallback(
    async (amount) => {
      setRequestedAction(true)
      try {
        await onUnstake(amount)
        setRequestedAction(false)
      } catch (e) {
        setRequestedAction(false)
        console.error(e)
      }
    },
    [onUnstake],
  )

  const handleClaimXPefi = useCallback(async () => {
    setRequestedAction(true)
    try {
      await onClaimXPefi()
      setRequestedAction(false)
    } catch (e) {
      setRequestedAction(false)
      console.error(e)
    }
  }, [onClaimXPefi])

  const rawStakedBalance = getBalanceNumber(stakedBalance)

  const { quoteTokenAddresses, quoteTokenSymbol, tokenAddresses } = farm

  const getLiquidityUrl = () => {
    if (type === 'Penguin' || type === 'Pangolin') {
      const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAddresses, quoteTokenSymbol, tokenAddresses })
      const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`
      return addLiquidityUrl
    }
    if (type === 'Lydia') {
      const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAddresses, quoteTokenSymbol, tokenAddresses })
      const addLiquidityUrl = `${BASE_LYDIA_LIQUIDITY_URL}/${liquidityUrlPathParts}`
      return addLiquidityUrl
    }
    if (type === 'Gondola') {
      return `${BASE_GONDOLA_LIQUIDITY_POOL_URL}/${quoteTokenSymbol}`
    }
    return ''
  }

  const addLiquidityUrl = getLiquidityUrl()

  const [onPresentDeposit] = useModal(
    <DepositModal
      tokenName={lpName}
      max={tokenBalance}
      addLiquidityUrl={addLiquidityUrl}
      stakedBalance={stakedBalance}
      withdrawalFee={farm.withdrawalFee}
      farmType={farm.type}
      onConfirm={handleStake}
    />,
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      tokenName={lpName}
      max={tokenBalance}
      stakedBalance={stakedBalance}
      withdrawalFee={farm.withdrawalFee}
      farmType={farm.type}
      onConfirm={handleUnstake}
    />,
  )

  let lpTokenPrice = new BigNumber(farm.totalValue).div(getBalanceNumber(farm.totalSupply))
  if (farm.type === 'Penguin' && farm.lpSymbol === 'ETH-AVAX LP') {
    lpTokenPrice = lpTokenPrice.times(8)
  }
  const farmImage = farm.lpSymbol.split(' ')[0].toLocaleLowerCase()
  const farmTvlValueFormatted = farm.totalValue
    ? `$${Number(farm.totalValue.times(farm.strategyRatio)).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'

  const stakedValueFormatted = `$${Number(rawStakedBalance * lpTokenPrice.toNumber()).toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })}`
  const farmAPY = farm.apy && farm.apy.times(new BigNumber(100)).toNumber().toFixed(2)

  const data = {
    tvl: stakedValueFormatted,
    farmTvl: farmTvlValueFormatted,
    normalAPY: farmAPY,
    compoundAPY: getCompoundApy({ normalApy: farmAPY, type: farm.type }),
  }

  const pendingXPefiValue = getBalanceNumber(pendingXPefi)

  const renderFarmLogo = () => {
    switch (farm.type) {
      case 'Lydia':
        return (
          <Image
            mt="12px"
            src={`${process.env.PUBLIC_URL}/images/compounder-igloos/LydiaLogo.png`}
            alt={farm.tokenSymbol}
            width={108}
            height={108}
          />
        )
      case 'Pangolin':
        return (
          <Image
            mt="12px"
            src={`${process.env.PUBLIC_URL}/images/compounder-igloos/PangolinLogo.png`}
            alt={farm.tokenSymbol}
            width={108}
            height={108}
          />
        )
      case 'Olive':
        return (
          <Image
            mt="12px"
            src={`${process.env.PUBLIC_URL}/images/compounder-igloos/OliveLogo.png`}
            alt={farm.tokenSymbol}
            width={108}
            height={108}
          />
        )
      case 'Gondola':
        return (
          <Image
            mt="12px"
            src={`${process.env.PUBLIC_URL}/images/compounder-igloos/GondolaLogo.png`}
            alt={farm.tokenSymbol}
            width={108}
            height={108}
          />
        )
      case 'Penguin':
      default:
        return (
          <Image
            mt="6px"
            mb="6px"
            src={`${process.env.PUBLIC_URL}/images/farms/${farmImage}.svg`}
            alt={farm.tokenSymbol}
            width={108}
            height={108}
          />
        )
    }
  }

  const renderActionButtons = () => {
    return requestedApproval ? (
      <>
        <ActionButtonWrapper index={index}>
          <Button mt="4px" scale="sm" disabled={requestedApproval}>
            {TranslateString(758, 'Transaction pending')}
          </Button>
        </ActionButtonWrapper>
      </>
    ) : (
      <>
        <ActionButtonWrapper index={index}>
          <Button
            mt="4px"
            scale="sm"
            disabled={!account || requestedAction}
            onClick={isApproved ? onPresentDeposit : handleApprove}
          >
            {TranslateString(758, 'Deposit')}
          </Button>
        </ActionButtonWrapper>
        <ActionButtonWrapper index={index}>
          <Button
            mt="4px"
            scale="sm"
            disabled={!account || requestedAction}
            onClick={isApproved ? onPresentWithdraw : handleApprove}
          >
            {TranslateString(758, 'Withdraw')}
          </Button>
        </ActionButtonWrapper>
        {farm.type === 'Penguin' && (
          <ActionButtonWrapper index={index}>
            <Button
              mt="4px"
              scale="sm"
              disabled={!account || requestedAction}
              onClick={isApproved ? handleClaimXPefi : handleApprove}
            >
              {pendingXPefiValue >= 1
                ? TranslateString(758, `Claim ${pendingXPefiValue.toFixed(2)} xPEFI`)
                : TranslateString(758, 'Claim xPEFI')}
            </Button>
          </ActionButtonWrapper>
        )}
      </>
    )
  }

  return (
    <FCard index={index}>
      <CardActionContainer>
        <IglooLogoContainer>{renderFarmLogo()}</IglooLogoContainer>
        <Flex flexDirection="column" pt="8px" justifyContent="center" alignItems="flex-start">
          <IglooTitleWrapper>
            <Text bold fontSize="20px">
              {farm.type === 'Penguin'
                ? `${farm.lpSymbol.split(' ')[0]} lgloo`
                : `${farm.type} ${farm.lpSymbol.split(' ')[0]}`}
            </Text>
          </IglooTitleWrapper>
          <Flex justifyContent="flex-start" flexWrap="wrap">
            {!account ? <PGUnlockButton index={index} scale="sm" mt="4px" fullWidth /> : renderActionButtons()}
          </Flex>
        </Flex>
      </CardActionContainer>
      <FarmDetails justifyContent="space-between" width="100%">
        <CardInfoContainer index={index}>
          <CardInfoWrapper index={index}>
            <Text className="label" fontSize="16px">
              YOUR TVL
            </Text>
            <Text className="value" bold fontSize="24px">
              {data.tvl}
            </Text>
          </CardInfoWrapper>
        </CardInfoContainer>
        <CardInfoContainer index={index}>
          <CardInfoWrapper index={index}>
            <Flex justifyContent="center">
              <Text className="label"
                fontSize="16px"
                data-for={`custom-class-${index}`}
                // TODO: update this data-tip with dynamic data
                data-tip={`<h3>Underlying Assets</h3>
                                <p>5,039.29 WAVAX</p>
                                <p>28.47 ETH</p>`}
              >
                FARM TVL
              </Text>
              <CustomToolTip
                id={`custom-class-${index}`}
                wrapper="div"
                delayHide={300}
                effect="solid"
                index={index}
                multiline
                place="top"
                html
              />
            </Flex>
            <Text className="value" bold fontSize="24px">
              {data.farmTvl}
            </Text>
          </CardInfoWrapper>
        </CardInfoContainer>
        <CardInfoContainer index={index}>
          <CardInfoWrapper index={index}>
            <Text className="label" fontSize="16px">
              NORMAL APY
            </Text>
            <Text className="value" bold fontSize="24px">
              {`${data.normalAPY ? data.normalAPY : ''}%`}
            </Text>
          </CardInfoWrapper>
        </CardInfoContainer>
        <CardInfoContainer index={index}>
          <CardInfoWrapper index={index}>
            <Text className="label" fontSize="16px">
              COMPOUND APY
            </Text>
            <Text className="value" bold fontSize="24px">
              {`${Number(data.compoundAPY) > MAX_COMPOUND_APY ? MAX_COMPOUND_APY : data.compoundAPY}%`}
            </Text>
          </CardInfoWrapper>
        </CardInfoContainer>
      </FarmDetails>
    </FCard>
  )
}

export default FarmCard
