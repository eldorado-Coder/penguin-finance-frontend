import BigNumber from 'bignumber.js'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Modal } from '@penguinfinance/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import ModalActions from 'components/ModalActions'
import ModalInput from 'components/ModalInput'
import useI18n from 'hooks/useI18n'
import { useXPefi } from 'hooks/useContract'

interface StealCrownModalProps {
  onConfirm: (amount: string) => void
  onDismiss?: () => void
}

const StealCrownModal: React.FC<StealCrownModalProps> = ({ onConfirm, onDismiss }) => {
  const [amount, setAmount] = useState('')
  const [maxAmount, setMaxAmount] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const TranslateString = useI18n()
  const xPefiContract = useXPefi();
  const { account } = useWallet()

  const fetchXPefiBalance = useCallback(async () => {
    const xPefiBalance = (await xPefiContract.methods.balanceOf(account).call()) / 1e18
    setMaxAmount(xPefiBalance.toString())
  }, [account, xPefiContract])

  useEffect(() => {
    fetchXPefiBalance();
  }, [fetchXPefiBalance])

  const onChangeAmount = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setAmount(e.currentTarget.value)
    },
    [setAmount],
  )
  const handleSelectMax = useCallback(() => {
    setAmount(maxAmount)
  }, [maxAmount, setAmount])

  return (
    <Modal title={TranslateString(1068, 'Steal the Crown')} onDismiss={onDismiss}>
      <ModalInput
        value={amount}
        onSelectMax={handleSelectMax}
        max={maxAmount}
        symbol="xPEFI"
        onChange={onChangeAmount}
        inputTitle={TranslateString(1070, 'Amount')}
        showError={false}
      />

      <ModalActions>
        <Button variant="primary" onClick={onDismiss} scale="md">
          {TranslateString(462, 'Cancel')}
        </Button>
        <Button
          scale="md"
          disabled={pendingTx || amount.length === 0}
          onClick={async () => {
            setPendingTx(true)
            await onConfirm(amount)
            setPendingTx(false)
            onDismiss()
          }}
        >
          {pendingTx ? TranslateString(488, 'Pending Confirmation') : TranslateString(464, 'Confirm')}
        </Button>
      </ModalActions>
    </Modal>
  )
}

export default StealCrownModal
