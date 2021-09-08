import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal, Text, Button, Flex, InjectedModalProps } from 'penguinfinance-uikit2'
import useI18n from 'hooks/useI18n'

interface PerHandsPenaltyWarningModalProps extends InjectedModalProps {
  perHandsPenalty?: number,
  onConfirm?: () => void
}

const PerHandsPenaltyWarningModal: React.FC<PerHandsPenaltyWarningModalProps> = ({
  perHandsPenalty,
  onConfirm,
  onDismiss,
}) => {
  const TranslateString = useI18n()
  const [pendingTx, setPendingTx] = useState(false);
  
  const handleClick = async () => {
    setPendingTx(true);
    try {
      await onConfirm();
      setPendingTx(false);
    } catch (error) {
      setPendingTx(false);
    }
    onDismiss()
  }

  return (
    <Modal title={TranslateString(999, 'Warning!')} onDismiss={onDismiss}>
      <Flex flexDirection="column" alignItems="center" justifyContent="center">
        <Warning>
          <Text fontSize="14px" mb="24px">
            {`You are about to remove your PEFI from the Nest. You'll incur a ${(perHandsPenalty/100).toFixed(2)}% Paper Hands Penalty over the withdrawn amount.`}
          </Text>
        </Warning>
        <Button disabled={pendingTx} onClick={handleClick}>Confirm</Button>
      </Flex>
    </Modal>
  )
}

const Warning = styled.div`
  max-width: 300px;
  margin-top: -20px;
`;

export default PerHandsPenaltyWarningModal
