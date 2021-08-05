import React from 'react'
import styled from 'styled-components'
import { Button, useWalletModal } from 'penguinfinance-uikit2'
import useAuth from 'hooks/useAuth'
import useI18n from 'hooks/useI18n'

const StyledUnlockedButton = styled(Button)`
  background: ${({ theme }) => (theme.isDark ? '#d4444c' : theme.colors.secondary)};
  color: ${({ theme }) => theme.isDark && '#ffffff'};
`

const UnlockButton = (props) => {
  const TranslateString = useI18n()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <StyledUnlockedButton onClick={onPresentConnectModal} {...props}>
      {TranslateString(292, 'Unlock Wallet')}
    </StyledUnlockedButton>
  )
}

export default UnlockButton
