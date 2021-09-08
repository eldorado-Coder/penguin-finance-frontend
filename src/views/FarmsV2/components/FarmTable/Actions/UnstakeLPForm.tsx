import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import React, { useCallback, useMemo, useState } from 'react'
import ReactTooltip from 'react-tooltip';
import { Button, Text, Flex } from 'penguinfinance-uikit2'
import UnlockButton from 'components/UnlockButton'
import roundDown from 'utils/roundDown'
import escapeRegExp from 'utils/escapeRegExp'
import useI18n from 'hooks/useI18n'
import useIPefiPerHandsPenalty from 'hooks/useIPefiPerHandsPenalty';
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
  const perHandsPenalty = useIPefiPerHandsPenalty();

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

  const getUnstakeTooltip = () => {
    return `
      <p style="margin-bottom: 5px;">You are about to remove your PEFI from the Nest. You'll incur a ${(perHandsPenalty/100).toFixed(2)}% Paper Hands Penalty over the withdrawn amount.</p>
    `
  };

  const canUnStake = !pendingTx && Number(val) > 0 && Number(fullBalance) >= Number(val)

  return (
    <>
      <InputContainer>
        <LPTokenBalance fontSize="14px">{`LP Staked Balance: ${roundDown(fullBalance, 2)}`}</LPTokenBalance>
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
        {account && (
          <Flex justifyContent='center'>
            <CustomToolTipOrigin data-for='unstake-tooltip' data-tip={canUnStake ? getUnstakeTooltip() : ''}>
              <StyledButton color="red" tokenBalance={val} scale="md" disabled={!canUnStake} onClick={handleConfirm}>
                {renderText()}
              </StyledButton>
            </CustomToolTipOrigin>
            <CustomToolTip
              id='unstake-tooltip'
              wrapper="div"
              delayHide={0}
              effect="solid"
              multiline
              index={0}
              place="top"
              html
            />
          </Flex>
        )}
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

const CustomToolTipOrigin = styled.div`
  width: 100%;
`

const CustomToolTip = styled(ReactTooltip)<{ index: number }>`
  width: 100% !important;
  max-width: 320px !important;
  background: ${({ theme }) => theme.isDark ? '#ffffff !important' : '#D3464E !important'};
  box-shadow: ${(props) => `${props.theme.card.boxShadow}!important`};
  color: ${({ theme }) => (theme.isDark ? '#2D2159!important' : '#ffffff!important')};
  opacity: 1 !important;
  padding: 12px !important;
  font-size: 16px !important;
  font-weight: 300;
  border: 2px solid #fff !important;
  border-radius: 16px !important;
  margin-top: -4px !important;
  > div {
    width: 100%;
    white-space: pre-wrap !important;
  }
  &:before {
    border-top-color: #ffffff !important;
    border-bottom-color: #ffffff !important;
  }
  &:after {
    border-top-color: ${({ theme }) => theme.isDark ? '#ffffff !important' : '#D3464E !important'};
    border-bottom-color: ${({ theme }) => theme.isDark ? '#ffffff !important' : '#D3464E !important'};
`

export default UnstakeLPForm
