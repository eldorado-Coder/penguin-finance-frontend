import React, { useState, useMemo, useCallback } from 'react'
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
import { BASE_ADD_LIQUIDITY_URL, MAX_COMPOUND_APY } from 'config'
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
}

const getCardBackground = (index, theme) => {
  if (index % 2) {
    return theme.isDark ? '#22214C' : '#D3464E'
  }
  return theme.isDark ? '#322C59' : '#383466'
}

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
  min-width: 38%;
`
const IglooLogoContainer = styled.div`
  margin-right: 16px;
  display: flex;
  align-items: center;
  > div {
    width: 108px;
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
  }
`

const getButtonBackground = (index, theme) => {
  if (index % 2) {
    return theme.isDark ? '#322C59' : '#383466'
  }
  return theme.isDark ? '#22234C' : '#D3464E'
}

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
    white-space: nowrap;
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
    font-weight: 400;
    line-height: 1;
  }

  .value {
    font-family: 'Kanit-ExtraBold Font';
    font-weight: 800;
  }
`

const PGUnlockButton = styled(UnlockButton)<{ index: number }>`
  background: ${({ index, theme }) => getButtonBackground(index, theme)};
  color: ${({ theme }) => theme.isDark && '#ffffff'};
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
  const { pid, lpAddresses, type } = useCompounderFarmFromSymbol(farm.lpSymbol)
  const { allowance, tokenBalance, stakedBalance } = useCompounderFarmUser(pid, type)
  const lpName = farm.lpSymbol.toUpperCase()
  const web3 = useWeb3()
  const lpAddress = getAddress(lpAddresses)
  const isApproved = account && allowance && allowance.isGreaterThan(0)
  const [requestedApproval, setRequestedApproval] = useState(false)

  const lpContract = useMemo(() => {
    return getContract(web3, lpAddress)
  }, [web3, lpAddress])

  const { onApprove } = useStrategyApprove(lpContract, farm.lpSymbol, farm.type)
  const { onClaimXPefi } = useCompounderClaimXPefi(farm.lpSymbol, farm.type)
  const { onStake } = useCompounderStake(farm.lpSymbol, type)
  const { onUnstake } = useCompounderUnstake(farm.lpSymbol, type)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove])

  const rawStakedBalance = getBalanceNumber(stakedBalance)

  const { quoteTokenAddresses, quoteTokenSymbol, tokenAddresses } = farm
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAddresses, quoteTokenSymbol, tokenAddresses })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`

  const [onPresentDeposit] = useModal(
    <DepositModal max={tokenBalance} onConfirm={onStake} tokenName={lpName} addLiquidityUrl={addLiquidityUrl} />,
  )
  const [onPresentWithdraw] = useModal(<WithdrawModal max={stakedBalance} onConfirm={onUnstake} tokenName={lpName} />)

  const lpTokenPrice = new BigNumber(farm.totalValue).div(getBalanceNumber(farm.totalSupply)).toNumber()
  const farmImage = farm.lpSymbol.split(' ')[0].toLocaleLowerCase()
  const totalValueFormatted = farm.totalValue
    ? `$${Number(farm.totalValue).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'

  const stakedValueFormatted = `$${Number(rawStakedBalance * lpTokenPrice).toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })}`
  const farmAPY = farm.apy && farm.apy.times(new BigNumber(100)).toNumber().toFixed(2)

  const data = {
    tvl: stakedValueFormatted,
    farmTvl: totalValueFormatted,
    normalAPY: farmAPY,
    compoundAPY: getCompoundApy({ normalApy: farmAPY, type: farm.type }),
  }

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
    return isApproved ? (
      <>
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
        {farm.type === 'Penguin' && (
          <ActionButtonWrapper index={index}>
            <Button mt="4px" scale="sm" disabled={!account} onClick={onClaimXPefi}>
              {TranslateString(758, 'Claim')}
            </Button>
          </ActionButtonWrapper>
        )}
      </>
    ) : (
      <ActionButtonWrapper index={index}>
        <Button mt="4px" scale="sm" disabled={requestedApproval} onClick={handleApprove}>
          {TranslateString(758, 'Approve Contract')}
        </Button>
      </ActionButtonWrapper>
    )
  }

  return (
    <FCard index={index}>
      <CardActionContainer>
        <IglooLogoContainer>{renderFarmLogo()}</IglooLogoContainer>
        <Flex flexDirection="column" pt="8px" justifyContent="center" alignItems="flex-start">
          <IglooTitleWrapper>
            <Text bold fontSize="20px">{farm.type === 'Penguin' ? `${farm.lpSymbol.split(' ')[0]} lgloo` : `${farm.type} ${farm.lpSymbol.split(' ')[0]}`}</Text>
          </IglooTitleWrapper>
          <Flex justifyContent="center">
            {!account ? <PGUnlockButton index={index} scale="sm" mt="4px" fullWidth /> : renderActionButtons()}
          </Flex>
        </Flex>
      </CardActionContainer>
      <Flex pt="16px" justifyContent="space-between" width="100%">
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
            <Text className="label" fontSize="16px">
              FARM TVL
            </Text>
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
      </Flex>
    </FCard>
  )
}

export default FarmCard
