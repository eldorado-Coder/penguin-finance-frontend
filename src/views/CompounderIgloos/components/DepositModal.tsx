import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Modal, Text, LinkExternal, Flex } from 'penguinfinance-uikit2'
import styled from 'styled-components'
import ModalActions from 'components/compounder/ModalActions'
import ModalInput from 'components/compounder/ModalInput'
import useI18n from 'hooks/useI18n'
import { getFullDisplayBalance } from 'utils/formatBalance'

interface DepositModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  tokenName?: string
  addLiquidityUrl?: string
  withdrawalFee?: string
  stakedBalance?: BigNumber
}

const StyledFlex = styled(Flex)`
  margin-bottom: 24px;
`
const BalanceInfoWrapper = styled(Flex)``
const StakeInfoWrapper = styled(Flex)`
  /* margin-bottom: 24px; */
`
const StyledButton = styled(Button)`
  background: ${({ theme }) => (theme.isDark ? '#ffffff' : '#d2474e')};
  color: ${({ theme }) => (theme.isDark ? '#30264f' : '#ffffff')};
  font-weight: 400;
`

const StyledLinkExternal = styled(LinkExternal)`
  color: ${({ theme }) => (theme.isDark ? '#ffffff' : '#d2474e')};
  font-weight: 800;
  margin-bottom: 24px;
`

const ModalHelper = styled.div`
  border-top: 1px solid #e9eaeb;
  margin: 0px -24px;
  padding: 24px 24px 0px;
  max-width: 470px;
  color: ${({ theme }) => (theme.isDark ? '#614e84' : '#373566')};
  line-height: 20px;
`

const DepositModal: React.FC<DepositModalProps> = ({
  max,
  onConfirm,
  onDismiss,
  tokenName = '',
  addLiquidityUrl,
  withdrawalFee = '',
  stakedBalance,
}) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const TranslateString = useI18n()
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

  const displayBalance = !fullBalance ? '0' : parseFloat(fullBalance).toFixed(4)
  const displayStakedBalance = !stakedBalance ? '0' : parseFloat(getFullDisplayBalance(stakedBalance)).toFixed(4)

  return (
    <Modal title={TranslateString(1068, `Deposit ${tokenName.replace(' LP', '')} tokens`)} onDismiss={onDismiss}>
      <StyledFlex justifyContent="space-between">
        <BalanceInfoWrapper>
          <Text>{`Wallet Balance: `}</Text>
          <Text>{displayBalance}</Text>
        </BalanceInfoWrapper>
        <StakeInfoWrapper>
          <Text>{`Your Stake: `}</Text>
          <Text>{displayStakedBalance}</Text>
        </StakeInfoWrapper>
      </StyledFlex>
      <ModalInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
        addLiquidityUrl={addLiquidityUrl}
      />
      <ModalActions>
        <StyledButton variant="primary" onClick={onDismiss} scale="md">
          {TranslateString(462, 'Cancel')}
        </StyledButton>
        <StyledButton
          scale="md"
          disabled={pendingTx || fullBalance === '0' || val === '0'}
          onClick={async () => {
            setPendingTx(true)
            await onConfirm(val)
            setPendingTx(false)
            onDismiss()
          }}
        >
          {pendingTx ? TranslateString(488, 'Pending Compounding') : TranslateString(464, 'Compound')}
        </StyledButton>
      </ModalActions>
      <StyledLinkExternal href={addLiquidityUrl} style={{ alignSelf: 'center' }}>
        {TranslateString(999, 'Get')} {tokenName}
      </StyledLinkExternal>
      <ModalHelper>
        {`Note there is a ${withdrawalFee}% withdrawal fee on this farm. When auto-compounding Igloos, 50% of rewards are sent to nest.`}
      </ModalHelper>
    </Modal>
  )
}

export default DepositModal
