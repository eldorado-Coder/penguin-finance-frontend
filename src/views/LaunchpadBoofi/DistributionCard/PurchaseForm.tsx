import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'
import React, { useCallback, useState } from 'react'
import { Button, Flex, useModal } from 'penguinfinance-uikit2'
import UnlockButton from 'components/UnlockButton'
import { getBalanceNumber } from 'utils/formatBalance'
import roundDown from 'utils/roundDown'
import { getBoofiBoosterRocketAddress, getBoofiAddress } from 'utils/addressHelpers'
import { useBoofiBoosterRocket as useBoofiBoosterRocketStore } from 'state/hooks'
import {
  useBoofiBoosterRocketPayToken,
  useBoofiBoosterRocket as useBoofiBoosterRocketContract,
} from 'hooks/useContract'
import { addTokenToMetamask } from 'utils/token'
import TokenInput from './TokenInput'
import TermsAndConditionModal from './TermsAndConditionModal'

interface PurchaseFormProps {
  tokenName?: string
  account?: string
  onConfirm: (amount: string) => void
}

const PurchaseForm: React.FC<PurchaseFormProps> = ({ tokenName = '', account, onConfirm }) => {
  const [buyTokenAmount, setBuyTokenAmount] = useState('')
  const [payTokenCost, setPayTokenCost] = useState(0)
  const [pendingTx, setPendingTx] = useState(false)

  const payTokenContract = useBoofiBoosterRocketPayToken()
  const boosterRocketContract = useBoofiBoosterRocketContract()
  const { payTokenBalance, tokensLeftToDistribute, canPurchaseAmount } = useBoofiBoosterRocketStore(
    account,
  )
  const purchaseTokenMaxBalance = String(canPurchaseAmount)
  const canPurchase =
    account &&
    !pendingTx &&
    // eventOngoing &&
    Number(buyTokenAmount) > 0 &&
    Number(buyTokenAmount) <= Number(canPurchaseAmount) &&
    Number(buyTokenAmount) <= Number(tokensLeftToDistribute)

  const [onPresentTermsAndConditions] = useModal(<TermsAndConditionModal />)

  const updatePayTokenBalance = async (value) => {
    if (Number(value) > 0) {
      const amount = new BigNumber(value).times(new BigNumber(10).pow(18)).toString()
      const findAmountToPay = await boosterRocketContract.methods.findAmountToPay(amount, account).call()
      setPayTokenCost(getBalanceNumber(new BigNumber(findAmountToPay)))
    } else {
      setPayTokenCost(0)
    }
  }

  const handleChange = useCallback(
    async (e: React.FormEvent<HTMLInputElement>) => {
      if (!account) return

      const { value } = e.currentTarget
      setBuyTokenAmount(value)
      updatePayTokenBalance(value)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setBuyTokenAmount, account],
  )

  const handleSelectMax = useCallback(() => {
    if (!account) return

    setBuyTokenAmount(purchaseTokenMaxBalance)
    updatePayTokenBalance(purchaseTokenMaxBalance)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, purchaseTokenMaxBalance, setBuyTokenAmount])

  const renderText = () => {
    if (pendingTx) return 'Pending Confirmation'
    if (Number(buyTokenAmount) > 0) return 'Get BOOFI'
    return 'Enter Amount'
  }

  const handlePurchaseToken = async () => {
    if (!canPurchase) return
    setPendingTx(true)
    try {
      const allowanceBalance =
        (await payTokenContract.methods.allowance(account, getBoofiBoosterRocketAddress()).call()) / 1e18
      if (allowanceBalance === 0) {
        // call approve function
        const approveAmount = '1000000000000000000000000000'
        await payTokenContract.methods.approve(getBoofiBoosterRocketAddress(), approveAmount).send({ from: account })
      }

      await onConfirm(buyTokenAmount)
      setPendingTx(false)
      setBuyTokenAmount('')
    } catch (error) {
      setPendingTx(false)
      setBuyTokenAmount('')
    }
  }

  const getBoofiTooltip = () => {
    return `
      <p>IMPORTANT: By exchanging your PEFI tokens for BOOFI and interacting with the Penguin Launchpad's smart contracts, you're automatically agreeing to our Terms and Conditions. Your consent will be signed on-chain once you acquire BOOFI.</p>
    `
  }

  const handleAddBoofiToken = async () => {
    await addTokenToMetamask(getBoofiAddress(), 'BOOFI', 18)
  }

  return (
    <>
      <TokenInput
        value={roundDown(buyTokenAmount, 2)}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={payTokenBalance}
        symbol={tokenName}
        payTokenSymbol="PEFI"
        payTokenCost={String(payTokenCost)}
        purchaseTokenSymbol="BOOFI"
        purchaseTokenMax={Number(purchaseTokenMaxBalance)}
      />
      <ViewTermsButton mt="16px" onClick={onPresentTermsAndConditions}>
        View Terms & Conditions
      </ViewTermsButton>
      <Flex mt="8px">
        {account ? (
          <>
            <TooltipContainer data-for="get-boofi-tooltip" data-tip={getBoofiTooltip()}>
              <StyledButton scale="md" disabled={!canPurchase} onClick={handlePurchaseToken}>
                {renderText()}
              </StyledButton>
            </TooltipContainer>
            <CustomToolTip
              id="get-boofi-tooltip"
              wrapper="div"
              delayHide={0}
              effect="solid"
              multiline
              place="bottom"
              html
            />
          </>
        ) : (
          <StyledUnlockButton />
        )}
      </Flex>
      <Flex mt="8px">
        <StyledButton scale="md" onClick={handleAddBoofiToken}>
          Add BOOFI to Metamask
        </StyledButton>
      </Flex>
    </>
  )
}

const StyledButton = styled(Button)`
  width: 100%;
  border-radius: 8px;
  color: white;
  background-color: #38db93;
`

const StyledUnlockButton = styled(UnlockButton)`
  width: 100%;
  border-radius: 8px;
  background-color: #38db93;
`

const ViewTermsButton = styled(Button)<{ tokenBalance?: string }>`
  width: 100%;
  border-radius: 8px;
  color: ${({ theme }) => theme.isDark && '#30264f'};
  background-color: ${({ theme }) => !theme.isDark && '#372871'};
  background-color: ${({ theme, tokenBalance }) => tokenBalance && !theme.isDark && '#Ec3E3F'};
  background-color: ${({ theme, tokenBalance }) => tokenBalance && theme.isDark && '#D4444C'};
  color: ${({ tokenBalance }) => tokenBalance && 'white'};
`

const CustomToolTip = styled(ReactTooltip)`
  width: 100% !important;
  max-width: 350px !important;
  background: ${({ theme }) => (theme.isDark ? '#383466!important' : '#fff!important')};
  box-shadow: ${(props) => `${props.theme.card.boxShadow}!important`};
  color: ${({ theme }) => (theme.isDark ? '#fff!important' : '#38db93!important')};
  opacity: 1 !important;
  padding: 12px 16px !important;
  font-size: 12px !important;
  border: 1px solid #38db93 !important;
  border-radius: 24px !important;
  margin-top: 0px !important;
  line-height: 16px !important;
  letter-spacing: 0.2px;
  text-align: center;
  > div {
    width: 100%;
    white-space: pre-wrap !important;
  }
  &:before {
    border-top-color: #38db93 !important;
    border-bottom-color: #38db93 !important;
  }
  &:after {
    border-top-color: ${({ theme }) => (theme.isDark ? '#383466!important' : '#fff!important')};
    border-bottom-color: ${({ theme }) => (theme.isDark ? '#383466!important' : '#fff!important')};
  }
`

const TooltipContainer = styled.div`
  width: 100%;
`

export default PurchaseForm
