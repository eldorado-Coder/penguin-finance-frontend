import React, { useCallback, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { Button, Flex } from 'penguinfinance-uikit2'
import UnlockButton from 'components/UnlockButton'
import { useIPefi } from 'hooks/useContract'
import { getFullDisplayBalance } from 'utils/formatBalance'
import roundDown from 'utils/roundDown'
import { getClubPenguinMasterChefAddress } from 'utils/addressHelpers'
import escapeRegExp from 'utils/escapeRegExp'
import TokenInput from './TokenInput'

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`)

interface StakeFormProps {
  max: BigNumber
  tokenName?: string
  account?: string
  onApprove: () => void
  onConfirm: (amount: string) => void
}

const StakeForm: React.FC<StakeFormProps> = ({ max, onConfirm, tokenName = '', account, onApprove }) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const iPefiContract = useIPefi()
  const history = useHistory()

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
    setVal(fullBalance)
  }, [fullBalance, setVal])

  const renderText = () => {
    if (pendingTx) return 'Pending Confirmation'
    if (val) return 'Confirm Staking'
    return 'Enter Amount'
  }

  const handleStake = async () => {
    setPendingTx(true)
    try {
      const allowanceBalance =
        (await iPefiContract.methods.allowance(account, getClubPenguinMasterChefAddress()).call()) / 1e18
      if (allowanceBalance === 0) {
        await onApprove()
      }
      await onConfirm(val)
      setPendingTx(false)
      setVal('')
    } catch (error) {
      setPendingTx(false)
      setVal('')
    }
  }

  const handleGetIPefi = () => {
    history.push('/nests')
  }

  const handleViewTutorial = () => {
    console.log('view tutorial--->')
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
      <StyledFlex justifyContent="space-between">
        <StyledButton1 tokenBalance={val} scale="md" disabled={pendingTx} onClick={handleGetIPefi}>
          Get iPEFI
        </StyledButton1>
        <StyledButton1 tokenBalance={val} scale="md" disabled={pendingTx} onClick={handleViewTutorial}>
          View Tutorial
        </StyledButton1>
      </StyledFlex>
      <Flex mt="16px">
        {!account && <StyledUnlockButton />}
        {account && (
          <>
            <StyledButton2 tokenBalance={val} scale="md" disabled={!canStake} onClick={handleStake}>
              {renderText()}
            </StyledButton2>
          </>
        )}
      </Flex>
    </>
  )
}

const StyledFlex = styled(Flex)`
  gap: 10px;
  margin-top: 16px;
`

const StyledButton1 = styled(Button)`
  width: 100%;
  border-radius: 8px;
  background: ${({ theme }) => (theme.isDark ? '#604E84' : '#ECE8F2')};
  color: ${({ theme }) => (theme.isDark ? 'white' : theme.colors.red)};
  box-shadow: none;
`

const StyledButton2 = styled(Button)`
  width: 100%;
  border-radius: 8px;
  color: white;
  background-color: ${({ theme }) => theme.colors.red};
`

const StyledUnlockButton = styled(UnlockButton)`
  width: 100%;
  border-radius: 8px;
`

export default StakeForm
