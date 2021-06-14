import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Modal, Text, LinkExternal, Flex, Heading } from 'penguinfinance-uikit2'
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

// header
const ModalHeader = styled.div`
  padding: 24px;
  font-weight: 600;
  margin-top: -22px;
`

// content
const ModalContent = styled.div`
  border-top: ${({ theme }) => (theme.isDark ? '1px solid #26183f' : '1px solid #e9eaeb')};
  border-bottom: ${({ theme }) => (theme.isDark ? '1px solid #26183f' : '1px solid#e9eaeb')};
  padding: 24px 24px 16px;
`

const StyledFlex = styled(Flex)`
  margin-bottom: 16px;
  white-space: pre;
`
const BalanceInfoWrapper = styled(Flex)`
  > div:first-child {
    font-weight: 500;
    color: ${({ theme }) => (theme.isDark ? '#ffffff' : '#373566')};
  }
  > div:last-child {
    font-weight: 400;
    color: ${({ theme }) => (theme.isDark ? '#ffffff' : '#373566')};
  }
`
const StakeInfoWrapper = styled(Flex)`
  > div:first-child {
    color: ${({ theme }) => (theme.isDark ? '#ffffff' : '#373566')};
    font-weight: 500;
  }
  > div:last-child {
    font-weight: 400;
    color: ${({ theme }) => (theme.isDark ? '#ffffff' : '#373566')};
  }
`
const StyledButton = styled(Button)`
  background: ${({ theme }) => (theme.isDark ? '#ffffff' : '#d2474e')};
  color: ${({ theme }) => (theme.isDark ? '#30264f' : '#ffffff')};
  font-weight: 400;
  border-bottom: ${({ theme }) => (theme.isDark ? '3px solid #614284' : '3px solid #b73e4a')};
`

const StyledLinkExternal = styled(LinkExternal)`
  color: ${({ theme }) => (theme.isDark ? '#ffffff' : '#d2474e')};
  font-weight: 800;
  margin: auto;
`

// footer
const ModalFooter = styled.div``

const ModalHelper = styled.div`
  padding: 16px 24px;
  max-width: 470px;
  color: ${({ theme }) => (theme.isDark ? '#614e84' : '#373566')};
  line-height: 20px;
  font-weight: 400;
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
    <Modal title="" hideCloseButton bodyPadding="0px" onDismiss={onDismiss}>
      <ModalHeader>
        <Heading>{TranslateString(1068, `Deposit ${tokenName}`)}</Heading>
      </ModalHeader>
      <ModalContent>
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
      </ModalContent>
      <ModalFooter>
        <ModalHelper>
          {`Note: There is a ${withdrawalFee}% withdrawal fee on this farm. When auto-compounding Igloos, 50% of rewards are sent to nest.`}
        </ModalHelper>
      </ModalFooter>
    </Modal>
  )
}

export default DepositModal
