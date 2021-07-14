import BigNumber from 'bignumber.js'
import React from 'react'
import styled from 'styled-components'
import { Button, useModal, Image, Text, Flex, Tag } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import ReactTooltip from 'react-tooltip'
import UnlockButton from 'components/UnlockButton'
import Balance from 'components/Balance'
import useI18n from 'hooks/useI18n'
import { useLaunchpadStake } from 'hooks/useStake'
import { useLaunchpadUnstake } from 'hooks/useUnstake'
import { usePools, useLaunchpad, useLaunchpadTierHurdles } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'

const PGUnlockButton = styled(UnlockButton)<{ isHomePage?: boolean }>`
  background: ${({ theme, isHomePage }) => !theme.isDark && isHomePage && '#383466'};
  border-radius: 10px;
  width: 100%;
`

const FCard = styled.div`
  align-self: flex-start;
  background: ${(props) => props.theme.card.background};
  border-radius: 32px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  position: relative;
  min-height: 480px;
`

const HelperTag = styled(Tag)`
  margin-right: 6px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  justify-content: center;
`

const CardContent = styled.div`
  padding: 24px 32px;
  background: ${(props) => props.theme.card.background};
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

const CardAction = styled.div`
  background: ${(props) => props.theme.card.background};
  border-radius: 0 0 32px 32px;
`

const CurrentTiersWrapper = styled.div`
  .astronaut {
    color: #4040ff;
  }
  .penguineer {
    color: #0098a1;
  }
  .starlord {
    color: #9a6aff;
  }
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

const PENGUIN_TIERS = ['Astronaut', 'Penguineer', 'Starlord']
const PRICE_PER_SHERPA = [0.15, 0.135, 0.1275];

const getUnstakeTooltip = (timeLeftForUnstaking) =>
  `
    You'll be able to unstake in <span class="left-time-for-duration">${timeLeftForUnstaking}</span> days.
  `

const StakeCard: React.FC = () => {
  const { account } = useWeb3React()
  const TranslateString = useI18n()
  const pools = usePools(account)
  const pefiPool = pools.length > 0 ? pools[0] : null
  const { onStake } = useLaunchpadStake()
  const { onUnstake } = useLaunchpadUnstake()
  const { stakedBalance: staked, allocation, canUnstake, depositEnd, xPefi, yourPenguinTier } = useLaunchpad(account)
  const xPefiBalance = new BigNumber(xPefi)
  const launchpadStaked = new BigNumber(staked)
  const currentDate = new Date().getTime()
  const tierHurdles = useLaunchpadTierHurdles()
  const unstakeTooltip = getUnstakeTooltip(1234)

  const getXPefiToPefiRatio = (pool) => {
    return pool.totalStaked && pool.totalSupply
      ? new BigNumber(pool.totalStaked).div(new BigNumber(pool.totalSupply)).toJSON()
      : 1
  }
  const xPefiToPefiRatio = getXPefiToPefiRatio(pefiPool)

  const [onPresentDeposit] = useModal(<DepositModal max={xPefiBalance} onConfirm={onStake} tokenName="xPEFI" />)

  const [onPresentWithdraw] = useModal(<WithdrawModal max={launchpadStaked} onConfirm={onUnstake} tokenName="xPEFI" />)

  return (
    <FCard>
      <CardHeader justifyContent="space-between" alignItems="center" pr="32px" pl="32px">
        <Image src="/images/launchpad/PEFI.png" width={64} height={64} alt="XPEFI" />
        <Text fontSize="32px" bold>
          STAKE XPEFI
        </Text>
      </CardHeader>
      <CardContent>
        <CurrentTiersWrapper>
          <Flex justifyContent="space-between" alignItems="center" mb="8px">
            <Text>Current tiers:</Text>
            <HelperTag variant="primary" outline>
              <a
                href="https://penguin-finance.medium.com/introducing-the-penguin-launchpad-the-best-launchpad-on-avalanche-19929735d309"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>?</span>
              </a>
            </HelperTag>
          </Flex>
          {PENGUIN_TIERS.map((penguinTier, index) => (
            <Text key={penguinTier} bold className={penguinTier.toLowerCase()}>
              {`${penguinTier} (+${tierHurdles.length > 0 ? tierHurdles[index] : 0} xPEFI)`}
            </Text>
          ))}
        </CurrentTiersWrapper>
        <StyledCardActions>
          {!account && <PGUnlockButton />}
          {account && (
            <>
              <NormalButton
                disabled={xPefiBalance.eq(new BigNumber(0)) || currentDate / 1000 > depositEnd}
                width="100%"
                onClick={onPresentDeposit}
              >
                Stake xPEFI
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
                {canUnstake && (
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
        <StyledDetails>
          <Label style={{ flex: 1 }}>
            <Text color="primary">{TranslateString(384, 'Your Stake:')}</Text>
          </Label>
          <Balance fontSize="16px" value={getBalanceNumber(launchpadStaked)} />
          <TokenSymbol>
            <Text color="primary" fontSize="16px">
              xPEFI
            </Text>
          </TokenSymbol>
        </StyledDetails>
        <StyledDetails>
          <Label style={{ flex: 1 }}>
            <Text color="primary">{TranslateString(384, 'PEFI Equivalent:')}</Text>
          </Label>
          <Balance
            fontSize="16px"
            value={new BigNumber(getBalanceNumber(launchpadStaked)).times(new BigNumber(xPefiToPefiRatio)).toNumber()}
          />
          <TokenSymbol>
            <Text color="primary" fontSize="16px">
              PEFI
            </Text>
          </TokenSymbol>
        </StyledDetails>
        <Flex mt="20px">
          <Label style={{ flex: 1 }}>
            <Text color="primary">{TranslateString(384, 'Price per SHERPA:')}</Text>
          </Label>
          <TokenSymbol>
            <Text color="primary" fontSize="16px">
              {`$${PRICE_PER_SHERPA[yourPenguinTier]}`}
            </Text>
          </TokenSymbol>
        </Flex>
        <StyledDetails>
          <Label style={{ flex: 1 }}>
            <Text color="primary">{TranslateString(384, 'Your Allocation:')}</Text>
          </Label>
          <TokenSymbol>
            <Text className="allocation" color="primary" fontSize="16px">
              {`${allocation} AP`}
            </Text>
          </TokenSymbol>
        </StyledDetails>
      </CardContent>
      {/* <CardAction>
        <PoolCardFooter />
      </CardAction> */}
    </FCard>
  )
}

const StyledCardActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
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
  // margin-left: 20px;
`

const TokenSymbol = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5px;
`

export default StakeCard
