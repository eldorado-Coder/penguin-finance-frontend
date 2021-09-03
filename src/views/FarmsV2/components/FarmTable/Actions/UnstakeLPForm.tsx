import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Flex, Text } from 'penguinfinance-uikit2'
import UnlockButton from 'components/UnlockButton'
import roundDown from 'utils/roundDown'
import escapeRegExp from 'utils/escapeRegExp'
import useI18n from 'hooks/useI18n'
import { getFullDisplayBalance } from 'utils/formatBalance'
import TokenInput from './TokenInput'

interface DepositModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  tokenName?: string
  account?: string
  needsApproval: boolean
  requested: boolean
  stakingTokenName: string
  onApprove: () => void
}

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`)

const UnstakeLPForm: React.FC<DepositModalProps> = ({ max, onConfirm, tokenName = '', account }) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const TranslateString = useI18n()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const nextInput = e.currentTarget.value.replace(/,/g, '.')
      if (nextInput.length < 25) {
        if (nextInput === '' || inputRegex.test(escapeRegExp(nextInput))) {
          setVal(nextInput)
        }
      }
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    // setVal(roundDown(fullBalance, 2))
    setVal(fullBalance)
  }, [fullBalance, setVal])

  const renderText = () => {
    if (Number(val) > Number(fullBalance)) return 'Not Enough Funds'
    if (pendingTx) return TranslateString(488, 'Pending Confirmation')
    if (val) return 'Confirm Withdrawal'
    return 'Enter Amount'
  }

  const handleConfirm = async () => {
    setPendingTx(true)
    try {
      await onConfirm(val)
      setPendingTx(false)
      setVal('')
    } catch (error) {
      setPendingTx(false)
      setVal('')
    }
  }

  const canUnStake = !pendingTx && Number(val) > 0 && Number(fullBalance) >= Number(val)

  return (
    <>
      <div>
        <Text color="textDisabled" fontSize="14px">
          LP Token Amount
        </Text>
        <TokenInput
          value={roundDown(val, 2)}
          onSelectMax={handleSelectMax}
          onChange={handleChange}
          max={fullBalance}
          symbol={tokenName}
        />
      </div>
      <Flex mt="16px">
        {!account && <StyledUnlockButton />}
        {account && (
          <StyledButton color="red" tokenBalance={val} scale="md" disabled={!canUnStake} onClick={handleConfirm}>
            {renderText()}
          </StyledButton>
        )}
      </Flex>
    </>
  )
}

const StyledButton = styled(Button)<{ tokenBalance?: string }>`
  border-radius: 16px;
  height: 40px;
  font-weight: 400;
`

const StyledUnlockButton = styled(UnlockButton)`
  border-radius: 16px;
  height: 40px;
  font-weight: 400;
`

export default UnstakeLPForm
