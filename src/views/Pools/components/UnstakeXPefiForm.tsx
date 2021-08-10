import BigNumber from 'bignumber.js'
import styled from 'styled-components';
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Flex } from 'penguinfinance-uikit2'
import UnlockButton from 'components/UnlockButton';
import TokenInput from './TokenInput'
import useI18n from '../../../hooks/useI18n'
import { getFullDisplayBalance } from '../../../utils/formatBalance'

interface DepositModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  tokenName?: string,
  account?: string,
  needsApproval: boolean,
  requested: boolean,
  stakingTokenName: string,
  onApprove: () => void
}

const UnstakeXPefiForm: React.FC<DepositModalProps> = ({ max, onConfirm, tokenName = '', account, needsApproval, requested, stakingTokenName, onApprove }) => {
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

  const renderText = () => {
    if (pendingTx) return TranslateString(488, 'Pending Confirmation');
    if (val) return 'Confirm Staking';
    return 'Enter Amount';
  }

  const handleConfirm = async () => {
    setPendingTx(true)
    try {
      await onConfirm(val)
      setPendingTx(false)
    } catch (error) {
      setPendingTx(false)
    }
  }

  return (
    <>
      <TokenInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
      />
      <Flex mt='8px'>
        {!account && <StyledUnlockButton />}
        {account &&
          (needsApproval ? (
            <StyledButton disabled={requested} onClick={onApprove} scale="md">
              {`Approve ${stakingTokenName}`}
            </StyledButton>
          ) : (
          <StyledButton
            scale="md"
            disabled={pendingTx}
            onClick={handleConfirm}
          >
            {renderText()}
          </StyledButton>
        ))}
      </Flex>
    </>
  )
}

const StyledButton = styled(Button)`
  width: 100%;
  border-radius: 8px;
  background-color: ${({ theme }) => !theme.isDark && '#372871'};
`;

const StyledUnlockButton = styled(UnlockButton)`
  width: 100%;
  border-radius: 8px;
  background-color: ${({ theme }) => !theme.isDark && '#372871'};
`;

export default UnstakeXPefiForm
