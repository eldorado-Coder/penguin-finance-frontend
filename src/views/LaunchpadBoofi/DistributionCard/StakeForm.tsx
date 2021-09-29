import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip';
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Flex, useModal } from 'penguinfinance-uikit2'
import UnlockButton from 'components/UnlockButton'
import { PANGOLIN_PEFI_LINK } from 'config'
import { useIPefi } from 'hooks/useContract'
import { getFullDisplayBalance } from 'utils/formatBalance'
import roundDown from 'utils/roundDown'
import { getBoofiLaunchpadAddress } from 'utils/addressHelpers'
import escapeRegExp from 'utils/escapeRegExp'
import TokenInput from './TokenInput'
import TermsAndConditionModal from './TermsAndConditionModal';

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

  const [onPresentTermsAndConditions] = useModal(<TermsAndConditionModal />)

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
    if (val) return 'Get BOOFI'
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

  const getBoofiTooltip = () => {
    return `
      <p>IMPORTANT: By exchanging your PEFI tokens for BOOFI and interacting with the Penguin Launchpad's smart contracts, you're automatically agreeing to our Terms and Conditions. Your consent will be signed on-chain once you purchase BOOFI.</p>
    `
  }

  return (
    <>
      <TokenInput
        value={roundDown(val, 2)}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
      />
      <ViewTermsButton mt='16px' onClick={onPresentTermsAndConditions}>View Terms & Conditions</ViewTermsButton>
      <Flex mt="8px">
        {!account && <StyledUnlockButton />}
        {account && (
          <>
            {Number(fullBalance) >= Number(val) && Number(fullBalance) > 0 ? (
              <>
                <TooltipContainer data-for='get-boofi-tooltip' data-tip={getBoofiTooltip()}>
                  <StyledButton tokenBalance={val} scale="md" disabled={!canStake} onClick={handleStake}>
                    {renderText()}
                  </StyledButton>
                </TooltipContainer>
                <CustomToolTip
                  id='get-boofi-tooltip'
                  wrapper="div"
                  delayHide={0}
                  effect="solid"
                  multiline
                  place="bottom"
                  html
                />
              </>
            ) : (
              <StyledButton tokenBalance={val} scale="md" disabled={pendingTx} onClick={handleGetPefi}>
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

const ViewTermsButton = styled(Button)<{ tokenBalance?: string }>`
  width: 100%;
  border-radius: 8px;
  color: ${({ theme }) => theme.isDark && '#30264f'};
  background-color: ${({ theme }) => !theme.isDark && '#372871'};
  background-color: ${({ theme, tokenBalance }) => tokenBalance && !theme.isDark && '#Ec3E3F'};
  background-color: ${({ theme, tokenBalance }) => tokenBalance && theme.isDark && '#D4444C'};
  color: ${({ tokenBalance }) => tokenBalance && 'white'};
`

const CustomToolTip = styled(ReactTooltip)`
  width: 100% !important;
  max-width: 350px !important;
  background: ${({ theme }) => (theme.isDark ? '#383466!important' : '#fff!important')};
  box-shadow: ${(props) => `${props.theme.card.boxShadow}!important`};
  color: ${({ theme }) => (theme.isDark ? '#fff!important' : '#38db93!important')};
  opacity: 1 !important;
  padding: 12px 16px !important;
  font-size: 12px !important;
  border: 1px solid #38db93 !important;
  border-radius: 24px !important;
  margin-top: 0px !important;
  line-height: 16px !important;
  letter-spacing: 0.2px;
  text-align: center;
  > div {
    width: 100%;
    white-space: pre-wrap !important;
  }
  &:before {
    border-top-color: #38db93 !important;
    border-bottom-color: #38db93 !important;
  }
  &:after {
    border-top-color: ${({ theme }) =>
      theme.isDark ? '#383466!important' : '#fff!important'};
    border-bottom-color: ${({ theme }) =>
      theme.isDark ? '#383466!important' : '#fff!important'};
  }
`

const TooltipContainer = styled.div`
  width: 100%;
`;

export default StakeForm
