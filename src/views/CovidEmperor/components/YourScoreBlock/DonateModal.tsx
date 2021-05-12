import React, { useCallback, useEffect, useState } from 'react'
import { Button, Modal, Text, Flex, Link } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import ModalActions from 'components/ModalActions'
import ModalInput from 'components/ModalInput'
import useI18n from 'hooks/useI18n'
import { useXPefi } from 'hooks/useContract'
import { useEmperor } from 'state/hooks'

interface DonateModalProps {
  onConfirm: (amount: string) => void
  onDismiss?: () => void
}

const DonateModal: React.FC<DonateModalProps> = ({ onConfirm, onDismiss }) => {
  const [amount, setAmount] = useState('')
  const [maxAmount, setMaxAmount] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const TranslateString = useI18n()
  const xPefiContract = useXPefi()
  const { account } = useWeb3React()
  const { minBidIncrease, currentEmperor } = useEmperor()
  const currentBidAmount = currentEmperor.bidAmount

  const fetchXPefiBalance = useCallback(async () => {
    const xPefiBalance = (await xPefiContract.methods.balanceOf(account).call()) / 1e18
    setMaxAmount(xPefiBalance.toString())
  }, [account, xPefiContract])

  useEffect(() => {
    fetchXPefiBalance()
  }, [fetchXPefiBalance])

  const onChangeAmount = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setAmount(e.currentTarget.value)
    },
    [setAmount],
  )

  const handleSelectMax = useCallback(() => {
    setAmount(String(currentBidAmount))
  }, [currentBidAmount, setAmount])

  const checkCanConfirm = () => {
    if (pendingTx) return false
    if (amount.length === 0) return false
    if (Number(amount) > Number(maxAmount)) return false
    if (Number(amount) < Number(currentBidAmount) + Number(minBidIncrease)) return false
    return true
  }

  return (
    <Modal title={TranslateString(1068, 'Donate')} onDismiss={onDismiss}>
      <ModalInput
        value={amount}
        onSelectMax={handleSelectMax}
        max={maxAmount}
        symbol="xPEFI"
        onChange={onChangeAmount}
        inputTitle={TranslateString(1070, 'Amount')}
        showError={false}
      />
      <BidInfoContainer>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="14px">Min donation increase:</Text>
          <Text fontSize="14px" style={{ display: 'flex', alignItems: 'center' }}>
            {minBidIncrease}
          </Text>
        </Flex>
      </BidInfoContainer>
      <ModalActions>
        <Button variant="primary" onClick={onDismiss} scale="md">
          {TranslateString(462, 'Cancel')}
        </Button>
        <ButtonGroupContainer>
          <Link fontSize="14px" bold={false} href="./nests" external color="failure">
            <Button variant="primary" disabled onClick={onDismiss} scale="md">
              {TranslateString(462, 'Learn more')}
            </Button>
          </Link>
          <Button
            scale="md"
            disabled={!checkCanConfirm()}
            onClick={async () => {
              setPendingTx(true)
              await onConfirm(amount)
              setPendingTx(false)
              onDismiss()
            }}
          >
            {pendingTx ? TranslateString(488, 'Pending Confirmation') : TranslateString(464, 'Confirm')}
          </Button>
        </ButtonGroupContainer>
      </ModalActions>
    </Modal>
  )
}

const BidInfoContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  margin-top: 10px;
  padding: 0px 12px;
`

const ButtonGroupContainer = styled.div`
  display: flex;
  button {
    margin-right: 20px;
  }
  a:hover {
    text-decoration: none !important;
  }
`

export default DonateModal
