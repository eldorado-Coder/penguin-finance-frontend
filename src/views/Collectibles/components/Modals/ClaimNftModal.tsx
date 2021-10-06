import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, InjectedModalProps, Modal, Text, Flex } from 'penguinfinance-uikit2'
import { Nft } from 'config/constants/types'
import useI18n from 'hooks/useI18n'

interface ClaimNftModalProps extends InjectedModalProps {
  nft: Nft
  onConfirm: () => void
}

const ModalContent = styled.div`
  margin-bottom: 16px;
`

const Actions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 8px;
`

const ClaimNftModal: React.FC<ClaimNftModalProps> = ({ nft, onConfirm, onDismiss }) => {
  const [pendingTx, setPendingTx] = useState(false)
  const TranslateString = useI18n()

  const handleConfirm = async () => {
    setPendingTx(true)
    try {
      await onConfirm()
      setPendingTx(false)
    } catch (error) {
      setPendingTx(false)
    }
  }

  return (
    <Modal title={TranslateString(999, 'Claim Collectible')} onDismiss={onDismiss}>
      <ModalContent>
        <Flex alignItems="center" mb="8px" justifyContent="space-between">
          <Text>{TranslateString(626, 'You will receive')}:</Text>
          <Text bold>{`1x "${nft.name}" Collectible`}</Text>
        </Flex>
      </ModalContent>
      <Actions>
        <Button scale="md" variant="secondary" onClick={onDismiss}>
          {TranslateString(462, 'Cancel')}
        </Button>
        <Button scale="md" onClick={handleConfirm} disabled={pendingTx}>
          {TranslateString(464, 'Confirm')}
        </Button>
      </Actions>
    </Modal>
  )
}

export default ClaimNftModal
