import React, { useCallback, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Button, Flex, Text } from 'penguinfinance-uikit2'
import UnlockButton from 'components/UnlockButton'
import roundDown from 'utils/roundDown'
import escapeRegExp from 'utils/escapeRegExp'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { addTokenToMetamask } from 'utils/token'
import { getVsoAddress } from 'utils/addressHelpers'
import TokenInput from './TokenInput'

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`)

interface UnStakeFormProps {
  max: BigNumber
  tokenName?: string
  account?: string
  cutdownType
  cutdownDate
  onConfirm: (amount: string) => void
}

const UnstakeForm: React.FC<UnStakeFormProps> = ({
  max,
  tokenName = '',
  account,
  cutdownType,
  cutdownDate,
  onConfirm,
}) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  const handleUnstake = async () => {
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
    setVal(fullBalance)
  }, [fullBalance, setVal])

  const renderText = () => {
    if (Number(val) > Number(fullBalance)) return 'Not Enough Funds'
    if (pendingTx) return 'Pending Confirmation'
    if (val) return 'Confirm Withdrawal'
    return 'Enter Amount'
  }

  const canUnStake = !pendingTx && Number(val) > 0 && Number(fullBalance) >= Number(val)

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
        {account && (
          <StyledButton scale="md" disabled={!canUnStake} onClick={handleUnstake}>
            {renderText()}
          </StyledButton>
        )}
      </Flex>
      <Flex mt="24px">
        <StyledText fontWeight={400} fontSize="18px" textAlign="center">
          This Iceberg has melted and no longer provides rewards. Unstake and re-stake into the Current Iceberg to earn
          more free tokens. Your iPEFI will continue to grow in value even when staked inside of an Iceberg.
        </StyledText>
      </Flex>
    </>
  )
}

const StyledButton = styled(Button)`
  width: 100%;
  border-radius: 8px;
  color: white;
  background: ${({ theme }) => (theme.isDark ? '#d4444c' : '#3B88E7')};
`

const StyledUnlockButton = styled(UnlockButton)`
  width: 100%;
  border-radius: 8px;
  background: ${({ theme }) => (theme.isDark ? '#d4444c' : '#3B88E7')};
`

const StyledText = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? 'white' : '#372b70')};
`

export default UnstakeForm
