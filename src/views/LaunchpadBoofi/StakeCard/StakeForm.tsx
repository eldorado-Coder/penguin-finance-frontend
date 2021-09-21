import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Flex } from 'penguinfinance-uikit2'
import UnlockButton from 'components/UnlockButton'
import roundDown from 'utils/roundDown'
import escapeRegExp from 'utils/escapeRegExp'
import { PANGOLIN_PEFI_LINK } from 'config'
import useI18n from 'hooks/useI18n'
import { getFullDisplayBalance } from 'utils/formatBalance'
import TokenInput from './TokenInput'

interface StakeFormProps {
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

const StakeForm: React.FC<StakeFormProps> = ({
  max,
  onConfirm,
  tokenName = '',
  account,
  needsApproval,
  requested,
  stakingTokenName,
  onApprove,
}) => {
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
    if (Number(val) > Number(fullBalance) || Number(fullBalance) === 0) return 'Get more PEFI'
    if (pendingTx) return TranslateString(488, 'Pending Confirmation')
    if (val) return 'Confirm Staking'
    return 'Enter Amount'
  }

  const handleStake = async () => {
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

  const handleGetPefi = () => {
    window.open(PANGOLIN_PEFI_LINK, '_blank')
  }

  const canStake = !pendingTx && Number(val) > 0

  return (
    <>
      <TokenInput
        value={roundDown(val, 2)}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
      />
      <Flex mt="8px">
        {!account && <StyledUnlockButton />}
        {account &&
          (needsApproval ? (
            <StyledButton disabled={requested} onClick={onApprove} scale="md">
              {`Approve ${stakingTokenName}`}
            </StyledButton>
          ) : (
            <>
              {Number(fullBalance) >= Number(val) && Number(fullBalance) > 0 ? (
                <StyledButton tokenBalance={val} scale="md" disabled={!canStake} onClick={handleStake}>
                  {renderText()}
                </StyledButton>
              ) : (
                <StyledButton tokenBalance={val} scale="md" disabled={pendingTx} onClick={handleGetPefi}>
                  {renderText()}
                </StyledButton>
              )}
            </>
          ))}
      </Flex>
    </>
  )
}

const StyledButton = styled(Button)<{ tokenBalance?: string }>`
  width: 100%;
  border-radius: 8px;
  color: white;
  background-color: #38db93;
`

const StyledUnlockButton = styled(UnlockButton)`
  width: 100%;
  border-radius: 8px;
  background-color: #38db93;
`

export default StakeForm
