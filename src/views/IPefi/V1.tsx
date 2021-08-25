import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Card, Flex, Text, Button } from 'penguinfinance-uikit2'
import partition from 'lodash/partition'
import { SECONDS_PER_YEAR } from 'config'
import { getBalanceNumber } from 'utils/formatBalance'
import priceToBnb from 'utils/priceToBnb'
import useBlock from 'hooks/useBlock'
import useBlockGenerationTime from 'hooks/useBlockGenerationTime'
import { useFarms, usePriceAvaxUsdt, usePools, usePriceEthAvax, useNestMigrator } from 'state/hooks'
import { PoolCategory } from 'config/constants/types'
import UnlockButton from 'components/UnlockButton'
import SvgIcon from 'components/SvgIcon'
import CardValue from 'components/CardValue'
import roundDown from 'utils/roundDown'

const NestV1: React.FC = () => {
  const { account } = useWeb3React()
  const farms = useFarms()
  const pools = usePools(account)
  const nestMigrator = useNestMigrator(account)
  const avaxPriceUSD = usePriceAvaxUsdt()
  const ethPriceBnb = usePriceEthAvax()
  const block = useBlock()
  const AVAX_BLOCK_TIME = useBlockGenerationTime()
  const BLOCKS_PER_YEAR = new BigNumber(SECONDS_PER_YEAR).div(new BigNumber(AVAX_BLOCK_TIME))

  const poolsWithApy = pools.map((pool) => {
    const isBnbPool = pool.poolCategory === PoolCategory.BINANCE
    const rewardTokenFarm = farms.find((f) => f.tokenSymbol === pool.tokenName)
    const stakingTokenFarm = farms.find((s) => s.tokenSymbol === pool.stakingTokenName)

    const tempMultiplier = stakingTokenFarm?.quoteTokenSymbol === 'ETH' ? ethPriceBnb : 1

    const stakingTokenPriceInAVAX = isBnbPool
      ? new BigNumber(1)
      : new BigNumber(stakingTokenFarm?.tokenPriceVsQuote).times(tempMultiplier)
    const rewardTokenPriceInAVAX = priceToBnb(
      pool.tokenName,
      rewardTokenFarm?.tokenPriceVsQuote,
      rewardTokenFarm?.quoteTokenSymbol,
      avaxPriceUSD,
    )

    const totalRewardPricePerYear = rewardTokenPriceInAVAX.times(pool.tokenPerBlock).times(BLOCKS_PER_YEAR)
    const totalStakingTokenInPool = stakingTokenPriceInAVAX.times(getBalanceNumber(pool.totalStaked))
    const apy = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)

    return {
      ...pool,
      isFinished: pool.sousId === 0 ? false : pool.isFinished || block > pool.endBlock,
      apy,
    }
  })

  const [, openPools] = partition(poolsWithApy, (pool) => pool.isFinished)

  const handleMigrate = () => {
    return null
  }

  const xPefiBalance = new BigNumber(openPools[0].userData?.stakedBalance || 0)
  const iPefiBalance = new BigNumber(nestMigrator.expectedIPefi || 0)

  return (
    <Flex justifyContent="center">
      <NestDetailsContainer flexDirection="column" alignItems="center">
        <Text color="primary" mb="12px" fontSize="24px" bold textAlign="center">
          Migrate your xPEFI and get iPEFI
        </Text>
        <NestDescription mb="24px" textAlign="center">
          The Nest V2 contract is here! Migrate from the old staking token (xPEFI) to receive the newer, improved iPEFI.
          After migration, your PEFI equivalent should be the same pre-migration. We&apos;ll keep the Paper Hands
          Penalty on the new contract the same as the old one for a week.
        </NestDescription>
        <CardWrapper justifyContent="space-between">
          <MigrateCard padding="8px 24px 16px" mb="32px">
            <Flex justifyContent="center" alignItems="center" mb="24px">
              <Flex flexDirection="column" alignItems="center">
                <CardImage src="/images/pools/xPefi.png" alt="xpefi logo" width={80} height={80} />
                <Flex alignItems="center">
                  <Balance>
                    <CardValue
                      className="balance"
                      fontSize="20px"
                      // value={getBalanceNumber(stakedBalance)}
                      value={roundDown(getBalanceNumber(xPefiBalance), 2)}
                      decimals={2}
                      lineHeight="1"
                    />
                  </Balance>
                  <PefiLabel color="secondary" fontSize="20px" fontWeight={500}>
                    xPEFI
                  </PefiLabel>
                </Flex>
              </Flex>
              <MigrateIconWrapper>
                <SvgIcon src={`${process.env.PUBLIC_URL}/images/home/arrow-right.svg`} width="32px" height="32px" />
              </MigrateIconWrapper>
              <Flex flexDirection="column" alignItems="center">
                <CardImage src="/images/pools/xPefi.png" alt="xpefi logo" width={80} height={80} />
                <Flex alignItems="center">
                  <Balance>
                    <CardValue
                      className="balance"
                      fontSize="20px"
                      // value={getBalanceNumber(stakedBalance)}
                      value={roundDown(getBalanceNumber(iPefiBalance), 2)}
                      decimals={2}
                      lineHeight="1"
                    />
                  </Balance>
                  <PefiLabel color="secondary" fontSize="20px" fontWeight={500}>
                    iPEFI
                  </PefiLabel>
                </Flex>
              </Flex>
            </Flex>
            {account ? (
              <StyledButton scale="md" onClick={handleMigrate}>
                Migrate
              </StyledButton>
            ) : (
              <StyledUnlockButton />
            )}
          </MigrateCard>
        </CardWrapper>
        <Alert textAlign="center">
          The old nest has stopped receiving rewards, so migrating ASAP is highly recommended.
        </Alert>
      </NestDetailsContainer>
    </Flex>
  )
}

const StyledButton = styled(Button)<{ tokenBalance?: string }>`
  width: 100%;
  border-radius: 8px;
  color: ${({ theme }) => theme.isDark && '#30264f'};
  background-color: ${({ theme }) => !theme.isDark && '#372871'};
`

const CardWrapper = styled(Flex)`
  width: 100%;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
`

const MigrateCard = styled(Card)`
  background: ${({ theme }) => theme.isDark && '#30264F'};
  border-radius: 8px;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.sm} {
    max-width: 480px;
  }
`

const NestDetailsContainer = styled(Flex)`
  max-width: 480px;
  width: 100%;
`

const NestDescription = styled(Text)`
  max-width: 480px;
  color: ${({ theme }) => (theme.isDark ? '#DDD7ff' : theme.colors.secondary)};
`

const Alert = styled(Text)`
  color: ${({ theme }) => theme.colors.red};
`

const CardImage = styled.img`
  margin-right: 12px;
  width: 96px;
  height: 96px;
`

const PefiLabel = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? 'white' : theme.colors.secondary)};
`

const MigrateIconWrapper = styled.div`
  margin: 0 32px;
  svg {
    margin-bottom: 16px;
    path {
      fill: ${({ theme }) => (theme.isDark ? 'white' : theme.colors.secondary)};
    }
  }
`

const Balance = styled.div`
  margin-right: 4px;
  .balance {
    color: ${({ theme }) => theme.colors.red};
    font-weight: 500;
  }
`

const StyledUnlockButton = styled(UnlockButton)`
  width: 100%;
  border-radius: 8px;
  color: ${({ theme }) => theme.isDark && '#30264f'};
  background-color: ${({ theme }) => (!theme.isDark ? '#372871' : 'white')};
`

export default NestV1
