import React from 'react'
import { Text, Modal } from 'penguinfinance-uikit2'
import styled from 'styled-components'
import ModalActions from 'components/ModalActions'
import { termsAndConditions } from './utils'

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

  div {
    padding: 12px 0;
  }
`

interface TermsAndConditionProps {
  onDismiss?: () => void
}

const TermsAndConditionModal: React.FC<TermsAndConditionProps> = ({ onDismiss }) => {
  return (
    <StyledModal title="Terms and conditions" bodyPadding="0px" onDismiss={onDismiss}>
      <ModalContent>
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
        <ModalActions />
      </ModalFooter>
    </StyledModal>
  )
}

export default TermsAndConditionModal
