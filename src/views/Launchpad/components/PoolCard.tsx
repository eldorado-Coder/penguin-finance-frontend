import BigNumber from 'bignumber.js'
import React, { useCallback, useState, useEffect } from 'react'
import ReactTooltip from 'react-tooltip'
import styled, { keyframes } from 'styled-components'
import { Button, useModal, Image, Text, Flex, Tag } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import UnlockButton from 'components/UnlockButton'
import Balance from 'components/Balance'
import { useERC20, useXPefi } from 'hooks/useContract'
import { useSousApprove } from 'hooks/useApprove'
import useI18n from 'hooks/useI18n'
import { useSousStake } from 'hooks/useStake'
import { useSousUnstake } from 'hooks/useUnstake'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber } from 'utils/formatBalance'
import { useNestApr, useNestApy } from 'state/hooks'
import { PoolCategory } from 'config/constants/types'
import { Pool } from 'state/types'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import Card from './Card'
import CardFooter from './CardFooter'
import PenaltyConfirmModal from './PenaltyConfirmModal'

const PGUnlockButton = styled(UnlockButton)<{ isHomePage?: boolean }>`
  background: ${({ theme, isHomePage }) => !theme.isDark && isHomePage && '#383466'};
  border-radius: 10px;
  width: 100%;
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
`;

const CardAction = styled.div`
  background: ${(props) => props.theme.card.background};
  border-radius: 0 0 32px 32px;
`

const CurrentTiersWrapper = styled.div`
  .astronaut {
    color: #4040ff;
  }
  .penguineer {
    color: #0098A1;
  }
  .spacelord {
    color: #9A6AFF;
  }
`;

const NormalButton = styled(Button)`
  border-radius: 10px;
  padding: 0 16px;
`;

interface PoolWithApy extends Pool {
  apy: BigNumber
}

interface HarvestProps {
  pool: PoolWithApy
  isMainPool: boolean
  isNestPage?: boolean
  isHomePage?: boolean
}

const PoolCard: React.FC<HarvestProps> = ({ pool, isMainPool, isNestPage, isHomePage }) => {
  const {
    sousId,
    image,
    tokenName,
    stakingTokenName,
    stakingTokenAddress,
    penguinNestsGuideLink,
    tokenDecimals,
    poolCategory,
    totalStaked,
    totalSupply,
    startBlock,
    endBlock,
    isFinished,
    userData,
    stakingLimit,
  } = pool

  // Pools using native AVAX behave differently than pools using a token
  const isBnbPool = poolCategory === PoolCategory.BINANCE
  const TranslateString = useI18n()
  const stakingTokenContract = useERC20(stakingTokenAddress)
  const { account } = useWeb3React()
  const block = useBlock()
  const { onApprove } = useSousApprove(stakingTokenContract, sousId)
  const { onStake } = useSousStake(sousId, isBnbPool)
  const { onUnstake } = useSousUnstake(sousId)
  const xPefiContract = useXPefi()

  const [requestedApproval, setRequestedApproval] = useState(false)
  const [handsOnPenalty, setHandsOnPenalty] = useState(0)

  const allowance = new BigNumber(userData?.allowance || 0)
  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)

  const blocksUntilStart = Math.max(startBlock - block, 0)
  const blocksRemaining = Math.max(endBlock - block, 0)
  const accountHasStakedBalance = stakedBalance?.toNumber() > 0
  const needsApproval = !accountHasStakedBalance && !allowance.toNumber() && !isBnbPool
  const isCardActive = isFinished && accountHasStakedBalance
  const rewardTokenRatio =
    totalStaked && totalSupply ? new BigNumber(totalStaked).div(new BigNumber(totalSupply)).toJSON() : 1
  const convertedLimit = new BigNumber(stakingLimit).multipliedBy(new BigNumber(10).pow(tokenDecimals))
  const displayedNestApr = (useNestApr() * 100).toFixed(2)
  const displayedNestApy = (useNestApy() * 100).toFixed(2)

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={stakingLimit && stakingTokenBalance.isGreaterThan(convertedLimit) ? convertedLimit : stakingTokenBalance}
      onConfirm={onStake}
      tokenName={stakingLimit ? `${stakingTokenName} (${stakingLimit} max)` : stakingTokenName}
    />,
  )

  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={onUnstake} tokenName={`x${stakingTokenName}`} />,
  )

  const [onPresentPenaltyConfirm] = useModal(
    <PenaltyConfirmModal handsOnPenalty={handsOnPenalty} onConfirm={onPresentWithdraw} />,
  )

  const fetchEarlyWithdrawalFee = useCallback(async () => {
    const earlyWithdrawalFee = await xPefiContract.methods.earlyWithdrawalFee().call()
    const maxEarlyWithdrawalFee = await xPefiContract.methods.MAX_EARLY_WITHDRAW_FEE().call()
    const penalty = (earlyWithdrawalFee / maxEarlyWithdrawalFee) * 100
    setHandsOnPenalty(penalty)
  }, [xPefiContract])

  useEffect(() => {
    fetchEarlyWithdrawalFee()
  }, [fetchEarlyWithdrawalFee])

  const getXPefiToPefiRatio = () => {
    return pool.totalStaked && pool.totalSupply
      ? new BigNumber(pool.totalStaked).div(new BigNumber(pool.totalSupply)).toNumber()
      : 1
  }

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, setRequestedApproval])

  const xPefiToPefiRatio = getXPefiToPefiRatio()

  return (
    <Card isActive={isCardActive} isFinished={isFinished && sousId !== 0}>
      {isFinished && sousId !== 0 && <PoolFinishedSash />}
      <CardHeader justifyContent='space-between' alignItems='center' pr='32px' pl='32px'>
        <Image src='/images/launchpad/PEFI.png' width={64} height={64} alt='XPEFI' />
        <Text bold fontSize='36px'>STAKE XPEFI</Text>
      </CardHeader>
      <CardContent>
        <CurrentTiersWrapper>
          <Flex justifyContent='space-between' alignItems='center' mb='8px'>
            <Text>Current tiers:</Text>
            <HelperTag variant="primary" outline>
              <a
                href="https://penguin-finance.gitbook.io/penguin-finance/summary/penguin-nests-staking-and-fee-collection"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>?</span>
              </a>
            </HelperTag>
          </Flex>
          <Text bold className='astronaut'>Astronaut (+300 xPEFI)</Text>
          <Text bold className='penguineer'>Penguineer (+1500 xPEFI)</Text>
          <Text bold className='spacelord'>Spacelord (+15000 xPEFI)</Text>
        </CurrentTiersWrapper>
        {/* <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
          <Flex minWidth="100%" alignItems="center">
            <Image src={`/images/pools/${image || tokenName}.png`} width={64} height={64} alt={tokenName} />
            <Flex flexDirection="column" width="100%">
              <Flex ml="8px" justifyContent="space-between">
                <Text color="textSubtle" bold fontSize="14px">
                  xPEFI to PEFI:
                </Text>
                <Text color="textSubtle" bold fontSize="14px">
                  {Number(xPefiToPefiRatio.toFixed(3))}
                </Text>
              </Flex>
              <Flex ml="8px" justifyContent="space-between">
                <Text color="textSubtle" bold fontSize="14px">
                  Paper Hands Penalty:
                </Text>
                <Text color="textSubtle" bold fontSize="14px">{`${Number(handsOnPenalty).toFixed(2)}%`}</Text>
              </Flex>
            </Flex>
          </Flex>
        </div> */}
        <StyledCardActions>
          {!account && <PGUnlockButton isHomePage={isHomePage} />}
          {account &&
            (needsApproval ? (
              <div style={{ flex: 1 }}>
                <NormalButton width='100%' disabled={isFinished || requestedApproval} onClick={handleApprove} scale="md">
                  Approve xPEFI
                </NormalButton>
              </div>
            ) : (
              <>
                <NormalButton width='100%' disabled={isFinished && sousId !== 0} onClick={onPresentDeposit}>
                  Stake xPEFI
                </NormalButton>
                <StyledActionSpacer />
                <NormalButton disabled={stakedBalance.eq(new BigNumber(0))} onClick={onPresentPenaltyConfirm}>
                  Unstake
                </NormalButton>
              </>
            ))}
        </StyledCardActions>
        <StyledDetails>
          <Label style={{ flex: 1 }}>
            <Text color="primary">{TranslateString(384, 'Your Stake:')}</Text>
          </Label>
          <Balance fontSize="16px" isDisabled={isFinished} value={getBalanceNumber(stakedBalance)} />
          <TokenSymbol>
            <Text color="primary" fontSize="16px">
              {`x${stakingTokenName}`}
            </Text>
          </TokenSymbol>
        </StyledDetails>
        <StyledDetails>
          <Label style={{ flex: 1 }}>
            <Text color="primary">{TranslateString(384, 'PEFI Equivalent:')}</Text>
          </Label>
          <Balance
            fontSize="16px"
            isDisabled={isFinished}
            value={new BigNumber(getBalanceNumber(stakedBalance)).times(new BigNumber(rewardTokenRatio)).toNumber()}
          />
          <TokenSymbol>
            <Text color="primary" fontSize="16px">
              {stakingTokenName}
            </Text>
          </TokenSymbol>
        </StyledDetails>
        <Flex mt='20px'>
          <Label style={{ flex: 1 }}>
            <Text color="primary">{TranslateString(384, 'Price per SHERPA:')}</Text>
          </Label>
          <TokenSymbol>
            <Text color="primary" fontSize="16px">
              $0.15
            </Text>
          </TokenSymbol>
        </Flex>
        <StyledDetails>
          <Label style={{ flex: 1 }}>
            <Text color="primary">{TranslateString(384, 'Your Allocation:')}</Text>
          </Label>
          <TokenSymbol>
            <Text className='allocation' color="primary" fontSize="16px">
              1 AP
            </Text>
          </TokenSymbol>
        </StyledDetails>
      </CardContent>
      <CardAction>
        <CardFooter
          penguinNestsGuideLink={penguinNestsGuideLink}
          totalPefiStaked={totalStaked}
          totalXPefiBalance={totalSupply}
          blocksRemaining={blocksRemaining}
          isFinished={isFinished}
          blocksUntilStart={blocksUntilStart}
          poolCategory={poolCategory}
        />
      </CardAction>
    </Card>
  )
}

const PoolFinishedSash = styled.div`
  background-image: url('/images/pool-finished-sash.svg');
  background-position: top right;
  background-repeat: not-repeat;
  height: 135px;
  position: absolute;
  right: -24px;
  top: -24px;
  width: 135px;
`

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
    color: #9A6AFF;
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

export default PoolCard
