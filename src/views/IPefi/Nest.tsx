import React, { useState, useCallback } from 'react'
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
import { useNestMigrateApprove } from 'hooks/useApprove'
import { useNestMigrate } from 'hooks/useMigrate'
import useTheme from 'hooks/useTheme'
import { useFarms, usePriceAvaxUsdt, usePools, usePriceEthAvax, useNestMigrator } from 'state/hooks'
import { PoolCategory } from 'config/constants/types'
import Page from 'components/layout/Page'
import UnlockButton from 'components/UnlockButton'
import SvgIcon from 'components/SvgIcon'
import CardValue from 'components/CardValue'
import roundDown from 'utils/roundDown'
import { addTokenToMetamask } from 'utils/token'
import { getIPefiAddress } from 'utils/addressHelpers'

const IPefi: React.FC = () => {
  const [pending, setPending] = useState(false)
  const { account } = useWeb3React()
  const farms = useFarms()
  const pools = usePools(account)
  const nestMigrator = useNestMigrator(account)
  const avaxPriceUSD = usePriceAvaxUsdt()
  const ethPriceBnb = usePriceEthAvax()
  const block = useBlock()
  const AVAX_BLOCK_TIME = useBlockGenerationTime()
  const { onNestMigrateApprove } = useNestMigrateApprove()
  const { onNestMigrate } = useNestMigrate()
  const { isDark } = useTheme()
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
  const xPefiBalance = new BigNumber(openPools[0].userData?.stakedBalance || 0)
  const expectedIPefiBalance = new BigNumber(nestMigrator.expectedIPefi || 0)
  const xPefiAllowance = new BigNumber(nestMigrator.xPefiAllowance || 0)

  const handleXPefiApprove = useCallback(async () => {
    try {
      setPending(true)
      await onNestMigrateApprove()
      setPending(false)
    } catch (e) {
      console.error(e)
      setPending(false)
    }
  }, [onNestMigrateApprove, setPending])

  const handleMigrate = useCallback(async () => {
    try {
      setPending(true)
      await onNestMigrate()
      setPending(false)
    } catch (e) {
      console.error('migration error:', e)
      setPending(false)
    }
  }, [onNestMigrate, setPending])

  const handleAddIPefiToken = async () => {
    await addTokenToMetamask(getIPefiAddress(), 'iPEFI', 18)
  }

  const renderActionButton = () => {
    if (!xPefiAllowance.toNumber()) {
      return (
        <StyledButton scale="md" disabled={pending} onClick={handleXPefiApprove}>
          Approve xPEFI
        </StyledButton>
      )
    }
    return (
      <StyledButton scale="md" disabled={pending || getBalanceNumber(xPefiBalance) === 0} onClick={handleMigrate}>
        Migrate
      </StyledButton>
    )
  }

  return (
    <NestPage>
      <BgWrapper>
        <IgloosBgContainer />
      </BgWrapper>
      <NestBannerContainer>
        <BannerImage
          src={`${process.env.PUBLIC_URL}/images/pools/${isDark ? 'nest_banner_dark3.svg' : 'nest_banner_light3.svg'}`}
          alt="nest banner"
        />{' '}
      </NestBannerContainer>
      <Flex justifyContent="center">
        <NestDetailsContainer flexDirection="column" alignItems="center">
          <Text color="primary" mb="24px" fontSize="32px" bold textAlign="center">
            Migrate your xPEFI and get iPEFI
          </Text>
          <NestDescription mb="24px" mt="24px" textAlign="center">
            {`The Nest V2 contract is here! Migrate from the old staking token (xPEFI) to receive the newer, improved
            iPEFI. After migration, your PEFI equivalent will remain unchanged, your xPEFI will simply be upgraded to
            iPEFI. We'll institute the new Paper Hands Penalty for iPEFI 48 hours after release.`}
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
                  <CardImage src="/images/pools/iPefi.svg" alt="ipefi logo" width={80} height={80} />
                  <Flex alignItems="center">
                    <Balance>
                      <CardValue
                        className="balance"
                        fontSize="20px"
                        value={roundDown(getBalanceNumber(expectedIPefiBalance), 2)}
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
              {account ? <> {renderActionButton()} </> : <StyledUnlockButton />}
              <StyledButton scale="md" onClick={handleAddIPefiToken}>
                Add iPEFI to Metamask
              </StyledButton>
            </MigrateCard>
          </CardWrapper>
          <Alert textAlign="center">
            The old nest has stopped receiving rewards, so migrating ASAP is highly recommended.
          </Alert>
        </NestDetailsContainer>
      </Flex>
    </NestPage>
  )
}

const NestPage = styled(Page)`
  max-width: 1200px;
`

// bg
const BgWrapper = styled.div`
  background: ${({ theme }) => (theme.isDark ? '#1A1028' : '#F9F8F9')};
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  z-index: -1;
`
const IgloosBgContainer = styled.div`
  background-image: url('/images/pools/nest_new_bg.png');
  background-repeat: repeat;
  background-size: contain;
  position: absolute;
  top: -8px;
  bottom: -8px;
  right: 0px;
  left: 0px;
  z-index: -1;
`

const NestBannerContainer = styled.div`
  margin-bottom: 8px;
`

const BannerImage = styled.img`
  z-index: -1;
  width: 100%;
`

const NestDescription = styled(Text)`
  max-width: 960px;
  color: ${({ theme }) => (theme.isDark ? '#DDD7ff' : theme.colors.secondary)};
`

const StyledButton = styled(Button)<{ tokenBalance?: string }>`
  width: 100%;
  border-radius: 8px;
  color: ${({ theme }) => theme.isDark && '#30264f'};
  background-color: ${({ theme }) => !theme.isDark && '#372871'};
  margin-top: 16px;
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

export default IPefi
