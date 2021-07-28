import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Text, Modal } from 'penguinfinance-uikit2'
import styled from 'styled-components'
import ModalActions from 'components/ModalActions'
import { useXPefi, useTestXPefi } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'
import useLaunchpadXPefiApprove from 'hooks/useLaunchpadXPefiApprove'
import { getLaunchpadAddress } from 'utils/addressHelpers'
import TokenInput from '../../../../components/TokenInput'
import useI18n from '../../../../hooks/useI18n'
import { getFullDisplayBalance } from '../../../../utils/formatBalance'
import { termsAndConditions } from '../../utils'

const StyledModal = styled(Modal)`
  max-width: 300px;
`

// content
const ModalContent = styled.div`
  border-top: ${({ theme }) => (theme.isDark ? '1px solid #26183f' : '1px solid #e9eaeb')};
  padding: 24px 24px 16px;
`

// footer
const ModalFooter = styled.div`
  padding: 0px 24px;
`

interface TermsAndConditionProps {
  onConfirm: (amount: string) => void
  onDismiss?: () => void
}

const TermsAndConditionModal: React.FC<TermsAndConditionProps> = ({ onConfirm, onDismiss }) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const TranslateString = useI18n()
  const { onApproveXPefi } = useLaunchpadXPefiApprove()
  const { account } = useWeb3React()

  const onAgree = async () => {
    setPendingTx(true)
    try {
      // const allowanceBalance = (await xPefiContract.methods.allowance(account, getLaunchpadAddress()).call()) / 1e18
      // if (allowanceBalance === 0) {
      //   // call approve function
      //   await onApproveXPefi()
      // }

      // await onConfirm(val)
      // setPendingTx(false)
      onDismiss()
    } catch (error) {
      setPendingTx(false)
    }
  }

  console.log('111--->', termsAndConditions)

  return (
    <StyledModal title="Terms and conditions" bodyPadding="0px" onDismiss={onDismiss}>
      <ModalContent>
        {termsAndConditions.map((row) => {
          return (
            <Text color="primary" fontSize="14px">
              {row}
            </Text>
          )
        })}
      </ModalContent>
      <ModalFooter>
        <ModalActions>
          <Button scale="md" variant="secondary" onClick={onDismiss}>
            {TranslateString(462, 'Decline')}
          </Button>
          <Button scale="md" disabled={pendingTx} onClick={onAgree}>
            {pendingTx ? TranslateString(488, 'Pending Confirmation') : TranslateString(464, 'Agree & Sign')}
          </Button>
        </ModalActions>
      </ModalFooter>
    </StyledModal>
  )
}

export default TermsAndConditionModal
