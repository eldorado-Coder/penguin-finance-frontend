import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Text, LinkExternal, Flex } from 'penguinfinance-uikit2'
import UnlockButton from 'components/UnlockButton'
import roundDown from 'utils/roundDown'
import escapeRegExp from 'utils/escapeRegExp'
import {
  BASE_ADD_LIQUIDITY_URL,
  BASE_JOE_ADD_LIQUIDITY_URL,
  BASE_SUSHI_ADD_LIQUIDITY_URL,
  BASE_LYDIA_ADD_LIQUIDITY_URL,
} from 'config'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { Farm as FarmTypes } from 'state/types'
import TokenInput from './TokenInput'

const liquidityAddUrls = {
  Pangolin: BASE_ADD_LIQUIDITY_URL,
  Joe: BASE_JOE_ADD_LIQUIDITY_URL,
  Sushi: BASE_SUSHI_ADD_LIQUIDITY_URL,
  Lydia: BASE_LYDIA_ADD_LIQUIDITY_URL,
}

interface DepositModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  tokenName?: string
  account?: string
  needsApproval: boolean
  requested: boolean
  stakingTokenName: string
  farm: FarmTypes
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
  farm,
  onApprove,
}) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
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
    if (Number(val) > Number(fullBalance) || Number(fullBalance) === 0) return `Get ${tokenName}`
    if (pendingTx) return 'Pending Confirmation'
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

  const canStake = !pendingTx && Number(val) > 0

  const { quoteTokenAddresses, quoteTokenSymbol, tokenAddresses, type } = farm
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAddresses, quoteTokenSymbol, tokenAddresses })
  const addLiquidityUrl = `${liquidityAddUrls[type]}/${liquidityUrlPathParts}`

  const handleGetPefi = () => {
    window.open(addLiquidityUrl, '_blank')
  }

  const lpDecimals = farm.displayedDecimals || 2

  return (
    <>
      <InputContainer>
        <LPTokenBalance fontSize="14px">{`Token Balance: ${roundDown(fullBalance, lpDecimals)} LP`}</LPTokenBalance>
        <TokenInput
          value={roundDown(val, lpDecimals)}
          onSelectMax={handleSelectMax}
          onChange={handleChange}
          max={fullBalance}
          symbol={tokenName.replace('Joe ', '').replace('Lydia ', '').replace('Sushi ', '').replace(' LP', '')}
        />
        <Flex justifyContent={farm.guideLink ? 'space-between' : 'flex-end'}>
          {farm.guideLink && <StyledLinkExternal href={farm.guideLink}>SUSHI LP Guide</StyledLinkExternal>}
          <StyledLinkExternal href={addLiquidityUrl}>{`Get ${tokenName
            .replace('Joe ', '')
            .replace('Lydia ', '')
            .replace('Sushi ', '')}`}</StyledLinkExternal>
        </Flex>
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
  margin-top: 12px;
`

const ActionContainer = styled.div`
  width: 100%;
  margin-top: 20px;
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

const StyledLinkExternal = styled(LinkExternal)`
  text-decoration: none;
  font-weight: normal;
  color: ${({ theme }) => (theme.isDark ? '#bba6dd' : theme.colors.primary)};
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-top: 2px;

  svg {
    padding-left: 4px;
    height: 14px;
    width: auto;
    fill: ${({ theme }) => (theme.isDark ? '#bba6dd' : theme.colors.primary)};
  }
`

export default StakeLPForm
