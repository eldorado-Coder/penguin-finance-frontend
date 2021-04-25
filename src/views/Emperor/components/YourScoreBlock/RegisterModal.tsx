import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Modal, LinkExternal } from '@penguinfinance/uikit'
import ModalActions from 'components/ModalActions'
import ModalInput from 'components/ModalInput'
import useI18n from 'hooks/useI18n'

interface RegisterModalProps {
  onConfirm: (amount: string) => void
  onCancel: () => void
  nickName?: string
  color?: string
  style?: string
}

const RegisterModal: React.FC<RegisterModalProps> = ({ onConfirm, onCancel, nickName = '', color = '', style = '' }) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const TranslateString = useI18n()

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )


  return (
    <Modal title={TranslateString(1068, 'Stake LP tokens')} onDismiss={onCancel}>
      <ModalInput
        value={nickName}
        onChange={handleChange}
        inputTitle={TranslateString(1070, 'Stake')}
      />
      <ModalActions>
        <Button variant="primary" onClick={onCancel} scale="md">
          {TranslateString(462, 'Cancel')}
        </Button>
        <Button
          scale="md"
          disabled={pendingTx || val === '0'}
          onClick={async () => {
            setPendingTx(true)
            await onConfirm(val)
            setPendingTx(false)
            onCancel()
          }}
        >
          {pendingTx ? TranslateString(488, 'Pending Confirmation') : TranslateString(464, 'Confirm')}
        </Button>
      </ModalActions>
      <LinkExternal href={addLiquidityUrl} style={{ alignSelf: 'center' }}>
        {TranslateString(999, 'Get')} {tokenName}
      </LinkExternal>
    </Modal>
  )
}

export default RegisterModal
