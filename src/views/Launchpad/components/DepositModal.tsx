import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Modal } from 'penguinfinance-uikit2'
import ModalActions from 'components/ModalActions'
import { useXPefi } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'
import useLaunchpadXPefiApprove from 'hooks/useLaunchpadXPefiApprove'
import { getLaunchpadAddress } from 'utils/addressHelpers';
import TokenInput from '../../../components/TokenInput'
import useI18n from '../../../hooks/useI18n'
import { getFullDisplayBalance } from '../../../utils/formatBalance'

interface DepositModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  tokenName?: string
}

const DepositModal: React.FC<DepositModalProps> = ({ max, onConfirm, onDismiss, tokenName = '' }) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const TranslateString = useI18n()
  const { onApproveXPefi } = useLaunchpadXPefiApprove()
  const xPefiContract = useXPefi()
  const { account } = useWeb3React();

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  const handleStakeXPefi = async () => {
    setPendingTx(true)
    try {
      const allowanceBalance = (await xPefiContract.methods.allowance(account, getLaunchpadAddress()).call()) / 1e18
      if (allowanceBalance === 0) {
        // call approve function
        await onApproveXPefi()
      }

      await onConfirm(val)
      setPendingTx(false)
      onDismiss();
    } catch (error) {
      setPendingTx(false)
    }
  };

  return (
    <Modal title={`${TranslateString(316, 'Deposit')} ${tokenName} Tokens`} onDismiss={onDismiss}>
      <TokenInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
      />
      <ModalActions>
        <Button scale="md" variant="secondary" onClick={onDismiss}>
          {TranslateString(462, 'Cancel')}
        </Button>
        <Button
          scale="md"
          disabled={pendingTx}
          onClick={handleStakeXPefi}
        >
          {pendingTx ? TranslateString(488, 'Pending Confirmation') : TranslateString(464, 'Confirm')}
        </Button>
      </ModalActions>
    </Modal>
  )
}

export default DepositModal
