import BigNumber from 'bignumber.js'
import v2PoolsConfig from 'config/constants/v2pools'
import v2NestABI from 'config/abi/v2_nest.json'
import penguinABI from 'config/abi/penguin.json'
import { QuoteToken } from 'config/constants/types'
import multicall from 'utils/multicall'
import { getAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'

export const fetchPoolsBlockLimits = async () => {
  const poolsWithEnd = v2PoolsConfig.filter((p) => p.sousId !== 0)
  const callsStartBlock = poolsWithEnd.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.contractAddress),
      name: 'startBlock',
    }
  })
  const callsEndBlock = poolsWithEnd.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.contractAddress),
      name: 'bonusEndBlock',
    }
  })

  const starts = await multicall(v2NestABI, callsStartBlock)
  const ends = await multicall(v2NestABI, callsEndBlock)

  return poolsWithEnd.map((cakePoolConfig, index) => {
    const startBlock = starts[index]
    const endBlock = ends[index]
    return {
      sousId: cakePoolConfig.sousId,
      startBlock: new BigNumber(startBlock).toJSON(),
      endBlock: new BigNumber(endBlock).toJSON(),
    }
  })
}

export const fetchPoolsGeneralInfos = async () => {
  const poolsWithEnd = v2PoolsConfig.filter((p) => p.sousId !== 0)
  const data = await Promise.all(
    poolsWithEnd.map(async (poolConfig) => {
      const calls = [
        // current rate
        {
          address: getAddress(poolConfig.contractAddress),
          name: 'currentExchangeRate',
          params: [],
        },
        // yesterday's rate
        { address: getAddress(poolConfig.contractAddress), name: 'getLatestStoredExchangeRate', params: [] },
        // rate in the last 7 days
        {
          address: getAddress(poolConfig.contractAddress),
          name: 'getExchangeRateHistory',
          params: [7],
        },
        // paperHandsPenalty
        {
          address: getAddress(poolConfig.contractAddress),
          name: 'paperHandsPenalty',
          params: [],
        },
        // distribution paperHandsPenalty
        {
          address: getAddress(poolConfig.contractAddress),
          name: 'fundsCollectedByPHP',
          params: [],
        },
      ]

      const [
        currentExchangeRate,
        rateOfYesterday,
        exchangeRateArray,
        paperHandsPenalty,
        distributionPhp,
      ] = await multicall(v2NestABI, calls)

      return {
        sousId: poolConfig.sousId,
        currentExchangeRate: getBalanceNumber(new BigNumber(currentExchangeRate)),
        rateOfYesterday: getBalanceNumber(new BigNumber(rateOfYesterday[0]._hex)),
        dailyApr:
          getBalanceNumber(new BigNumber(exchangeRateArray[0][6]._hex)) -
          getBalanceNumber(new BigNumber(exchangeRateArray[0][5]._hex)),
        paperHandsPenalty: new BigNumber(paperHandsPenalty).toNumber() / 100,
        avgDailyAprPerWeek:
          (getBalanceNumber(new BigNumber(exchangeRateArray[0][6]._hex)) -
            getBalanceNumber(new BigNumber(exchangeRateArray[0][0]._hex))) /
          7,
        distributionPhp: getBalanceNumber(new BigNumber(distributionPhp)),
      }
    }),
  )
  return data
}

export const fetchPoolsTotalStaking = async () => {
  const nonAvaxPools = v2PoolsConfig.filter((p) => p.stakingTokenName !== QuoteToken.AVAX)

  const callsNonAvaxPools = nonAvaxPools.map((poolConfig) => {
    return {
      address: poolConfig.stakingTokenAddress,
      name: 'balanceOf',
      params: [getAddress(poolConfig.contractAddress)],
    }
  })

  const callsNonAvaxPoolsTotalSupplies = nonAvaxPools.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.contractAddress),
      name: 'totalSupply',
    }
  })

  const nonAvaxPoolsTotalStaked = await multicall(penguinABI, callsNonAvaxPools)
  const nonAvaxPoolsTotalSupply = await multicall(penguinABI, callsNonAvaxPoolsTotalSupplies)

  return [
    ...nonAvaxPools.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(nonAvaxPoolsTotalStaked[index]).toJSON(),
      totalSupply: new BigNumber(nonAvaxPoolsTotalSupply[index]).toJSON(),
    })),
  ]
}
