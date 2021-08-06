import React, { useState } from 'react'
import { Button, Text, Modal } from 'penguinfinance-uikit2'
import styled from 'styled-components'
import ModalActions from 'components/ModalActions'
import useI18n from '../../../../hooks/useI18n'
import { termsAndConditions } from '../../utils'

const StyledModal = styled(Modal)``

// content
const ModalContent = styled.div`
  border-top: ${({ theme }) => (theme.isDark ? '1px solid #26183f' : '1px solid #e9eaeb')};
  padding: 24px 24px 16px;
  max-width: 400px;
  max-height: 500px;
  height: calc(100vh - 300px);
  overflow: auto;
`
const TermRow = styled.div`
  margin-bottom: 16px;
`

// footer
const ModalFooter = styled.div`
  padding: 0px 24px;
`

interface TermsAndConditionProps {
  onConfirm: () => void
  onDismiss?: () => void
}

const TermsAndConditionModal: React.FC<TermsAndConditionProps> = ({ onConfirm, onDismiss }) => {
  const [pendingTx, setPendingTx] = useState(false)
  const TranslateString = useI18n()
  const [disableAgree, setDisableAgree] = useState(true)

  const onAgree = async () => {
    setPendingTx(true)
    try {
      await onConfirm()
      setPendingTx(false)
      onDismiss()
    } catch (error) {
      setPendingTx(false)
    }
  }

  const handleScroll = (event) => {
    if (event.target.scrollHeight - event.target.scrollTop < event.target.clientHeight + 100) {
      setDisableAgree(false)
    }
  }

  return (
    <StyledModal title="Terms and conditions" bodyPadding="0px" onDismiss={onDismiss}>
      <ModalContent onScroll={handleScroll}>
        {termsAndConditions.map((row) => {
          return (
            <TermRow key={row.text}>
              <Text color="text" fontSize={row.fontSize} pl={row.padding}>
                {row.text}
              </Text>
            </TermRow>
          )
        })}
      </ModalContent>
      <ModalFooter>
        <ModalActions>
          <Button scale="md" variant="secondary" onClick={onDismiss}>
            {TranslateString(462, 'Decline')}
          </Button>
          <Button scale="md" disabled={pendingTx || disableAgree} onClick={onAgree}>
            {pendingTx ? TranslateString(488, 'Pending Confirmation') : TranslateString(464, 'Agree & Sign')}
          </Button>
        </ModalActions>
      </ModalFooter>
    </StyledModal>
  )
}

export default TermsAndConditionModal
