import BigNumber from 'bignumber.js'
import React from 'react'
import styled from 'styled-components'
import { Button, useModal, Image, Text, Flex, Tag } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import UnlockButton from 'components/UnlockButton'
import Balance from 'components/Balance'
import useI18n from 'hooks/useI18n'
import { useLaunchpadStake } from 'hooks/useStake'
import { useLaunchpadUnstake } from 'hooks/useUnstake'
import { usePools, useLaunchpad } from 'state/hooks';
import { getBalanceNumber } from 'utils/formatBalance'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import PoolCardFooter from './StakeCardFooter';

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
  min-height: 510px;
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

const StakeCard: React.FC = () => {
  const { account } = useWeb3React();
  const TranslateString = useI18n();
  const pools = usePools(account)
  const pefiPool = pools.length > 0 ? pools[0] : null 
  const { onStake } = useLaunchpadStake()
  const { onUnstake } = useLaunchpadUnstake()
  const { stakedBalance: staked, allocation, canUnstake, depositEnd, xPefi } = useLaunchpad(account);
  const xPefiBalance = new BigNumber(xPefi);
  const launchpadStaked = new BigNumber(staked);
  const currentDate = new Date().getTime();

  const getXPefiToPefiRatio = (pool) => {
    return pool.totalStaked && pool.totalSupply
      ? new BigNumber(pool.totalStaked).div(new BigNumber(pool.totalSupply)).toJSON()
      : 1
  };
  const xPefiToPefiRatio = getXPefiToPefiRatio(pefiPool)

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={xPefiBalance}
      onConfirm={onStake}
      tokenName='xPEFI'
    />,
  )

  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={launchpadStaked} onConfirm={onUnstake} tokenName='xPEFI' />,
  )

  return (
    <FCard>
      <CardHeader justifyContent='space-between' alignItems='center' pr='32px' pl='32px'>
        <Image src='/images/launchpad/PEFI.png' width={64} height={64} alt='XPEFI' />
        <Text fontSize='32px' bold>STAKE XPEFI</Text>
      </CardHeader>
      <CardContent>
        <CurrentTiersWrapper>
          <Flex justifyContent='space-between' alignItems='center' mb='8px'>
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
          <Text bold className='astronaut'>Astronaut (+300 xPEFI)</Text>
          <Text bold className='penguineer'>Penguineer (+1500 xPEFI)</Text>
          <Text bold className='spacelord'>Spacelord (+15000 xPEFI)</Text>
        </CurrentTiersWrapper>
        <StyledCardActions>
          {!account && <PGUnlockButton />}
          {account &&
            <>
              <NormalButton disabled={xPefiBalance.eq(new BigNumber(0)) || (currentDate/1000 > depositEnd)} width='100%' onClick={onPresentDeposit}>
                Stake xPEFI
              </NormalButton>
              <StyledActionSpacer />
              <NormalButton disabled={launchpadStaked.eq(new BigNumber(0)) || !canUnstake} onClick={onPresentWithdraw}>
                Unstake
              </NormalButton>
            </>
          }
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
              {`${allocation} AP`}
            </Text>
          </TokenSymbol>
        </StyledDetails>
      </CardContent>
      <CardAction>
        <PoolCardFooter />
      </CardAction>
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

export default StakeCard
