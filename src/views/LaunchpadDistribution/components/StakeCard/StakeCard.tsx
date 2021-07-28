import BigNumber from 'bignumber.js'
import React from 'react'
import styled from 'styled-components'
import { Button, useModal, Text, Flex, Input } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import ReactTooltip from 'react-tooltip'
import UnlockButton from 'components/UnlockButton'
import Balance from 'components/Balance'
import useI18n from 'hooks/useI18n'
import { useLaunchpadStake } from 'hooks/useStake'
import { useLaunchpadUnstake } from 'hooks/useUnstake'
import { usePools, useLaunchpad } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import TermsAndConditionModal from './TermsAndConditionModal'
import WithdrawModal from './WithdrawModal'
import { PRICE_PER_SHERPA, getUnstakeTooltip, getXPefiToPefiRatio } from '../../utils'

const helperText = 'In order to participate, you must first read & agree to the terms & conditions.'
const StakeCard: React.FC = () => {
  const { account } = useWeb3React()
  const TranslateString = useI18n()
  const pools = usePools(account)
  const pefiPool = pools.length > 0 ? pools[0] : null
  const { onStake } = useLaunchpadStake()
  const { onUnstake } = useLaunchpadUnstake()
  const { stakedBalance: staked, canUnstake, timeRemainingToUnstake, yourPenguinTier, allocation } = useLaunchpad(
    account,
  )
  const launchpadStaked = new BigNumber(staked)
  const unstakeTooltip = getUnstakeTooltip(timeRemainingToUnstake)
  const xPefiToPefiRatio = getXPefiToPefiRatio(pefiPool)

  const [onPresentTermsAndConditions] = useModal(<TermsAndConditionModal onConfirm={onStake} />)

  const [onPresentWithdraw] = useModal(<WithdrawModal max={launchpadStaked} onConfirm={onUnstake} tokenName="xPEFI" />)

  return (
    <FCard>
      <CardHeader justifyContent="space-between" alignItems="center">
        <CardBannerImage
          src={`${process.env.PUBLIC_URL}/images/launchpad/banners/stake_xPefi_banner.png`}
          alt="banner"
        />
      </CardHeader>
      <CardContent>
        <Text fontSize="14px" mb="16px">
          {helperText}
        </Text>
        <TradeWrapper>
          <Text className="your-token" fontSize="12px" mb="4px">
            Your tokens to acquire
          </Text>
          <div className="claim-container">
            <StyledInput scale="sm" />
            <TradeButton height="32px" size="sm">
              Trade
            </TradeButton>
          </div>
        </TradeWrapper>
        <StyledCardActions>
          {!account && <PGUnlockButton />}
          {account && (
            <>
              <NormalButton width="100%" onClick={onPresentTermsAndConditions}>
                View Terms & Conditions
              </NormalButton>
              <StyledActionSpacer />
              <UnstakeButtonContainer>
                <ButtonToolTipWrapper
                  disabled={launchpadStaked.eq(new BigNumber(0)) || !canUnstake}
                  data-for="custom-class"
                  data-tip={unstakeTooltip}
                >
                  <NormalButton
                    disabled={launchpadStaked.eq(new BigNumber(0)) || !canUnstake}
                    onClick={onPresentWithdraw}
                  >
                    Unstake
                  </NormalButton>
                </ButtonToolTipWrapper>
                {getBalanceNumber(launchpadStaked) > 0 && !canUnstake && (
                  <CustomToolTip
                    id="custom-class"
                    wrapper="div"
                    delayHide={0}
                    effect="solid"
                    multiline
                    place="bottom"
                    html
                  />
                )}
              </UnstakeButtonContainer>
            </>
          )}
        </StyledCardActions>
        <Flex mt="20px">
          <Label>
            <CardLabel>{TranslateString(384, 'Price per SHERPA:')}</CardLabel>
          </Label>
          <TokenSymbol>
            <Text fontSize="16px" color="text" fontWeight={600}>{`$${PRICE_PER_SHERPA[yourPenguinTier]}`}</Text>
          </TokenSymbol>
        </Flex>
        <StyledDetails>
          <Label>
            <CardLabel>{TranslateString(384, 'Your Allocation:')}</CardLabel>
          </Label>
          <TokenSymbol>
            <Text className="allocation" fontWeight={600} color="primary" fontSize="16px">
              {`${getBalanceNumber(new BigNumber(allocation)).toFixed(2)} AP`}
            </Text>
          </TokenSymbol>
        </StyledDetails>
        <StyledDetails>
          <Label>
            <CardLabel>{TranslateString(384, 'Your Stake:')}</CardLabel>
          </Label>
          <Balance fontSize="16px" decimals={2} value={Math.floor(getBalanceNumber(launchpadStaked) * 100) / 100} />
          <TokenSymbol>
            <Text fontSize="16px" color="text" fontWeight={600}>
              xPEFI
            </Text>
          </TokenSymbol>
        </StyledDetails>
        <StyledDetails>
          <Label>
            <CardLabel>{TranslateString(384, 'PEFI Equivalent:')}</CardLabel>
          </Label>
          <Balance
            fontSize="16px"
            decimals={2}
            value={new BigNumber(getBalanceNumber(launchpadStaked)).times(new BigNumber(xPefiToPefiRatio)).toNumber()}
          />
          <TokenSymbol>
            <Text fontSize="16px" color="text" fontWeight={600}>
              PEFI
            </Text>
          </TokenSymbol>
        </StyledDetails>
      </CardContent>
    </FCard>
  )
}

const StyledCardActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 24px 0 16px;
  width: 100%;
  box-sizing: border-box;
`

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledDetails = styled.div`
  display: flex;
  font-size: 14px;

  .allocation {
    color: #9a6aff;
  }
`

const Label = styled.div`
  flex: 1;
`

const CardLabel = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? '#D8CFE2' : 'black')};
  font-weight: 400;
`

const TokenSymbol = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5px;

  .allocation {
    color: ${({ theme }) => (theme.isDark ? '#9200e7' : 'black')};
  }
`

const PGUnlockButton = styled(UnlockButton)<{ isHomePage?: boolean }>`
  background: ${({ theme, isHomePage }) => !theme.isDark && isHomePage && '#383466'};
  border-radius: 10px;
  width: 100%;
`

const FCard = styled.div`
  align-self: flex-start;
  background: ${(props) => (props.theme.isDark ? '#332654' : props.theme.card.background)};
  border-radius: 32px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  position: relative;
  min-height: 490px;
`

const CardContent = styled.div`
  padding: 24px 32px;
  background: ${(props) => (props.theme.isDark ? '#332654' : props.theme.card.background)};
  border-radius: 32px 32px 0 0;
`

const CardHeader = styled(Flex)`
  height: 96px;
  background-image: url('/images/launchpad/banner.png');
  background-size: cover;
  background-position: center center;
  border-radius: 32px 32px 0 0;

  div {
    color: white;
  }
`

const CardBannerImage = styled.img`
  width: 100%;
`

const NormalButton = styled(Button)`
  border-radius: 10px;
  padding: 0 16px;
`

const UnstakeButtonContainer = styled.div``
const ButtonToolTipWrapper = styled.div<{ disabled?: boolean }>`
  button {
    div {
      height: 18px;

      svg {
        height: 18px;
        fill: ${({ theme, disabled }) => (disabled ? theme.colors.textDisabled : theme.colors.textColour)};
        margin-right: 0.25rem;
      }
    }
  }
`

const CustomToolTip = styled(ReactTooltip)`
  .emperor-account {
    color: #f5c83b;
  }
  .left-time-for-duration {
    color: #ce022d;
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

// claims wrapper
const TradeWrapper = styled.div`
  margin-top: 16px;
  .your-token {
    text-decoration: underline;
  }

  .claim-container {
    position: relative;
  }
`

const StyledInput = styled(Input)`
  box-shadow: none;
  width: 100%;
  background: transparent;
  border: 2px solid #b2b2ce !important;
  padding: 0 88px 0 12px;
  border-radius: 12px;
  font-size: 14px;

  &:focus:not(:disabled) {
    box-shadow: none;
  }
`

const TradeButton = styled(Button)`
  height: 32px;
  border-radius: 12px;
  position: absolute;
  right: 0;
  top: 0;
  width: 80px;
  background-color: #707070;
  color: white;
  font-weight: 400;
`

export default StakeCard
