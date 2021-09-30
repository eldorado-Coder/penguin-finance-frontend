import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Flex } from 'penguinfinance-uikit2'
import UnlockButton from 'components/UnlockButton'
import { PANGOLIN_PEFI_LINK } from 'config'
import { useIPefi } from 'hooks/useContract'
import { getFullDisplayBalance } from 'utils/formatBalance'
import roundDown from 'utils/roundDown'
import { getBoofiLaunchpadAddress } from 'utils/addressHelpers'
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
    if (Number(val) > Number(fullBalance) || Number(fullBalance) === 0) return 'Get more PEFI'
    if (pendingTx) return 'Pending Confirmation'
    if (val) return 'Confirm Staking'
    return 'Enter Amount'
  }

  const handleStake = async () => {
    setPendingTx(true)
    try {
      const allowanceBalance =
        (await iPefiContract.methods.allowance(account, getBoofiLaunchpadAddress()).call()) / 1e18
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
        {account && (
          <>
            {Number(fullBalance) >= Number(val) && Number(fullBalance) > 0 ? (
              <StyledButton tokenBalance={val} scale="md" disabled onClick={handleStake}>
                {renderText()}
              </StyledButton>
            ) : (
              <StyledButton tokenBalance={val} scale="md" disabled onClick={handleGetPefi}>
                {renderText()}
              </StyledButton>
            )}
          </>
        )}
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
