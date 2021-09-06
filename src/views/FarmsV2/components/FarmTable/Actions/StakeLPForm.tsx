import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Flex, Text } from 'penguinfinance-uikit2'
import UnlockButton from 'components/UnlockButton'
import roundDown from 'utils/roundDown'
import escapeRegExp from 'utils/escapeRegExp'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import useI18n from 'hooks/useI18n'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { Farm as FarmTypes } from 'state/types'
import TokenInput from './TokenInput'

interface FarmWithStakedValue extends FarmTypes {
  apy?: BigNumber
}

interface DepositModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  tokenName?: string
  account?: string
  needsApproval: boolean
  requested: boolean
  stakingTokenName: string
  farm: FarmWithStakedValue
  onApprove: () => void
}

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`)

const StakeLPForm: React.FC<DepositModalProps> = ({
  max,
  onConfirm,
  tokenName = '',
  account,
  needsApproval,
  requested,
  stakingTokenName,
  farm,
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
    if (Number(val) > Number(fullBalance) || Number(fullBalance) === 0) return `Get ${tokenName}`
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
    const { quoteTokenAddresses, quoteTokenSymbol, tokenAddresses } = farm
    const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAddresses, quoteTokenSymbol, tokenAddresses })
    const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`
    window.open(addLiquidityUrl, '_blank')
  }

  const canStake = !pendingTx && Number(val) > 0

  return (
    <>
      <InputContainer>
        <LPTokenBalance fontSize="14px">{`LP Token Balance: ${roundDown(fullBalance, 2)}`}</LPTokenBalance>
        <TokenInput
          value={roundDown(val, 2)}
          onSelectMax={handleSelectMax}
          onChange={handleChange}
          max={fullBalance}
          symbol={tokenName.replace(' LP', '')}
        />
      </InputContainer>
      <ActionContainer>
        {!account && <StyledUnlockButton />}
        {account &&
          (needsApproval ? (
            <StyledButton disabled={requested} onClick={onApprove} scale="md">
              Enable Farm
            </StyledButton>
          ) : (
            <>
              {Number(fullBalance) >= Number(val) && Number(fullBalance) > 0 ? (
                <StyledButton color="red" tokenBalance={val} scale="md" disabled={!canStake} onClick={handleStake}>
                  {renderText()}
                </StyledButton>
              ) : (
                <StyledButton color="red" tokenBalance={val} scale="md" disabled={pendingTx} onClick={handleGetPefi}>
                  {renderText()}
                </StyledButton>
              )}
            </>
          ))}
      </ActionContainer>
    </>
  )
}

const InputContainer = styled.div`
  width: 100%;
  margin-top: 16px;
`

const ActionContainer = styled.div`
  width: 100%;
  margin-top: 32px;
`

const StyledButton = styled(Button)<{ tokenBalance?: string }>`
  border-radius: 10px;
  height: 40px;
  font-weight: 400;
  width: 100%;
  background-color: ${({ theme }) => (theme.isDark ? theme.colors.red : '#372871')};
  color: white;
`

const StyledUnlockButton = styled(UnlockButton)`
  border-radius: 10px;
  height: 40px;
  font-weight: 400;
  width: 100%;
`

const LPTokenBalance = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? '#bba6dd' : '#b2b2ce')};
`

export default StakeLPForm
