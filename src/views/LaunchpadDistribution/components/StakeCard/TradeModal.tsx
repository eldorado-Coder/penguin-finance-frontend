import React, { useCallback, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { Button, Modal, Text } from 'penguinfinance-uikit2'
import styled from 'styled-components'
import { useBoosterRocketPayToken, useBoosterRocket as useBoosterRocketContract } from 'hooks/useContract'
import useI18n from 'hooks/useI18n'
import { useBoosterRocket as useBoosterRocketStore } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { getBoosterRocketAddress } from 'utils/addressHelpers'
import TokenInput from '../common/TokenInput'
import CardValue from '../common/CardValue'

// content
const ModalContent = styled.div`
  border-top: ${({ theme }) => (theme.isDark ? '1px solid #26183f' : '1px solid #e9eaeb')};
  padding: 24px 24px;
  padding-bottom: 12px;
  padding-top: 8px;
  max-width: 400px;
  overflow: auto;
`
const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin: 12px 0px 16px;
`

const RowItem = styled.div`
  display: flex;
  align-items: center;
  white-space: break-spaces;
  color: ${({ theme }) => (theme.isDark ? '#ECE8F2' : '#373566 !important')};
`

const CardLabel = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? '#ECE8F2' : '#373566')};
  font-weight: 500;
  font-size: 14px;
  font-family: 'Kanit';
`

const StyledTokenInput = styled(TokenInput)`
  input {
    color: ${({ theme }) => (theme.isDark ? '#ECE8F2' : 'black !important')};
  }
`

// footer
const ModalFooter = styled.div`
  padding: 24px 24px;
  padding-top: 0px;
`

const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    background: ${({ theme }) => (theme.isDark ? '#ffffff' : '#d2464e')};
    font-weight: normal;
    color: ${({ theme }) => theme.isDark && '#30264f'};
  }
`

interface TradeModalProps {
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  payTokenName?: string
  buyTokenName?: string
  sherpaPrice?: number
}

const TradeModal: React.FC<TradeModalProps> = ({
  onConfirm,
  onDismiss,
  payTokenName = 'PEFI',
  buyTokenName = 'SHERPA',
  sherpaPrice,
}) => {
  const [buyTokenBalance, setBuyTokenBalance] = useState('')
  const [payTokenCost, setPayTokenCost] = useState(0)
  const [pendingTx, setPendingTx] = useState(false)

  const TranslateString = useI18n()
  const payTokenContract = useBoosterRocketPayToken()
  const boosterRocketContract = useBoosterRocketContract()
  const { account } = useWeb3React()
  const boosterRocketData = useBoosterRocketStore(account)

  const {
    payTokenBalance,
    tokensLeftToDistribute,
    eventOngoing,
    canPurchaseAmount,
    hasTheUserAgreed,
  } = boosterRocketData
  const buyTokenMaxBalance = String(canPurchaseAmount)
  const canPurchase =
    eventOngoing &&
    hasTheUserAgreed &&
    Number(buyTokenBalance) > 0 &&
    Number(buyTokenBalance) <= canPurchaseAmount &&
    Number(buyTokenBalance) <= tokensLeftToDistribute

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
      setBuyTokenBalance(value)
      updatePayTokenBalance(value)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setBuyTokenBalance, account],
  )

  const handleSelectMax = useCallback(() => {
    setBuyTokenBalance(Number(buyTokenMaxBalance).toFixed(2))
    updatePayTokenBalance(buyTokenMaxBalance)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setBuyTokenBalance, buyTokenMaxBalance])

  const handlePurchaseToken = async () => {
    if (!canPurchase) return
    setPendingTx(true)
    try {
      const allowanceBalance =
        (await payTokenContract.methods.allowance(account, getBoosterRocketAddress()).call()) / 1e18
      if (allowanceBalance === 0) {
        // call approve function
        const approveAmount = '1000000000000000000000000000'
        await payTokenContract.methods
          .approve(getBoosterRocketAddress(), approveAmount)
          .send({ from: account, gas: 700000 })
      }

      await onConfirm(buyTokenBalance)
      setPendingTx(false)
      onDismiss()
    } catch (error) {
      setPendingTx(false)
    }
  }

  return (
    <Modal title={`Trade ${payTokenName} for ${buyTokenName}`} bodyPadding="0px" onDismiss={onDismiss}>
      <ModalContent>
        <Row>
          <RowItem>
            <CardLabel>{`${payTokenName} Balance: `}</CardLabel>
            <CardValue value={payTokenBalance} fontSize="14px" decimals={2} bold={false} />
          </RowItem>
          <RowItem>
            <CardLabel>{`Available ${buyTokenName}: `}</CardLabel>
            <CardValue value={canPurchaseAmount} fontSize="14px" decimals={2} bold={false} />
          </RowItem>
        </Row>
        <StyledTokenInput
          value={buyTokenBalance}
          max={buyTokenMaxBalance}
          symbol={buyTokenName}
          maxBalanceShow={false}
          onSelectMax={handleSelectMax}
          onChange={handleChange}
        />
        <Row>
          <RowItem>
            <CardLabel>{`Price/${buyTokenName}: `}</CardLabel>
            <CardValue value={sherpaPrice} fontSize="14px" prefix="$" bold={false} />
          </RowItem>
          <RowItem>
            <CardLabel>{`Cost: `}</CardLabel>
            <CardValue value={payTokenCost} fontSize="14px" decimals={2} suffix={` ${payTokenName}`} bold={false} />
          </RowItem>
        </Row>
      </ModalContent>
      <ModalFooter>
        <ModalActions>
          <Button scale="md" onClick={onDismiss}>
            {TranslateString(462, 'Cancel')}
          </Button>
          <Button scale="md" disabled={pendingTx || !canPurchase} onClick={handlePurchaseToken}>
            {pendingTx ? TranslateString(488, 'Pending Confirmation') : `Get ${buyTokenName}`}
          </Button>
        </ModalActions>
      </ModalFooter>
    </Modal>
  )
}

export default TradeModal
