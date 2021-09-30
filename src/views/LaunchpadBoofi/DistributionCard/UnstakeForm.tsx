import React, { useCallback, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Button, Flex } from 'penguinfinance-uikit2'
import ReactTooltip from 'react-tooltip'
import UnlockButton from 'components/UnlockButton'
import roundDown from 'utils/roundDown'
import escapeRegExp from 'utils/escapeRegExp'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { addTokenToMetamask } from 'utils/token'
import { getBoofiAddress } from 'utils/addressHelpers'
import { getUnstakeTooltip } from '../utils'
import TokenInput from './TokenInput'

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`)

interface UnStakeFormProps {
  max: BigNumber
  tokenName?: string
  account?: string
  unstakedEnabled?: boolean
  timeRemainingToUnstake?: number
  onConfirm: (amount: string) => void
}

const UnstakeForm: React.FC<UnStakeFormProps> = ({
  max,
  tokenName = '',
  account,
  unstakedEnabled,
  timeRemainingToUnstake,
  onConfirm,
}) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)

  const unstakeTooltip = getUnstakeTooltip(timeRemainingToUnstake)

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

  const handleAddBoofiToken = async () => {
    await addTokenToMetamask(getBoofiAddress(), 'BOOFI', 18)
  }

  const renderText = () => {
    if (Number(val) > Number(fullBalance)) return 'Not Enough Funds'
    if (pendingTx) return 'Pending Confirmation'
    if (val) return 'Confirm Withdrawal'
    return 'Enter Amount'
  }

  const canUnStake = unstakedEnabled && !pendingTx && Number(val) > 0 && Number(fullBalance) >= Number(val)

  return (
    <>
      <TokenInput
        value={roundDown(val, 2)}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
        unstakeMode
      />
      <Flex mt="8px">
        {!account && <StyledUnlockButton />}
        {account && (
          <>
            {timeRemainingToUnstake > 0 ? (
              <>
                <ButtonToolTipWrapper data-for="custom-class" data-tip={unstakeTooltip}>
                  <StyledButton scale="md" disabled>
                    Confirm Withdrawal
                  </StyledButton>
                </ButtonToolTipWrapper>
                <CustomToolTip
                  id="custom-class"
                  wrapper="div"
                  delayHide={0}
                  effect="solid"
                  multiline
                  place="bottom"
                  html
                />
              </>
            ) : (
              <StyledButton scale="md" disabled={!canUnStake} onClick={handleUnstake}>
                {renderText()}
              </StyledButton>
            )}
          </>
        )}
      </Flex>
      <Flex mt="8px">
        <StyledButton scale="md" onClick={handleAddBoofiToken}>
          Add BOOFI to Metamask
        </StyledButton>
      </Flex>
    </>
  )
}

const StyledButton = styled(Button)`
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

const ButtonToolTipWrapper = styled.div`
  width: 100%;
`

const CustomToolTip = styled(ReactTooltip)`
  .left-time-for-duration {
    color: ${({ theme }) => theme.colors.red};
  }

  width: 100% !important;
  max-width: 260px !important;
  background: ${({ theme }) => (theme.isDark ? '#ffffff!important' : '#383466!important')};
  box-shadow: ${(props) => `${props.theme.card.boxShadow}!important`};
  color: ${({ theme }) => (theme.isDark ? '#2D2159!important' : '#ffffff!important')};
  opacity: 1 !important;
  padding: 12px 12px !important;
  font-size: 16px !important;
  line-height: 20px !important;
  border-radius: 16px !important;
  margin-top: 0px !important;
  text-align: center;
  > div {
    width: 100%;
    white-space: pre-wrap !important;
  }
  &:after {
    border-top-color: ${({ theme }) => (theme.isDark ? '#ffffff!important' : '#383466!important')};
    border-bottom-color: ${({ theme }) => (theme.isDark ? '#ffffff!important' : '#383466!important')};
  }
`

export default UnstakeForm
