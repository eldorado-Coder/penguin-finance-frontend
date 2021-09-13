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

export const fetchPoolsDailyAprs = async () => {
  const poolsWithEnd = v2PoolsConfig.filter((p) => p.sousId !== 0)
  const calls = poolsWithEnd.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.contractAddress),
      name: 'getExchangeRateHistory',
      params: [3],
    }
  })

  const exchangeRateArray = await multicall(v2NestABI, calls)
  return poolsWithEnd.map((row, index) => {
    return {
      sousId: row.sousId,
      // average APY
      // dailyApr:
      //   (getBalanceNumber(new BigNumber(exchangeRateArray[index][0][2]._hex)) -
      //     getBalanceNumber(new BigNumber(exchangeRateArray[index][0][0]._hex))) /
      //   2,
      // yesterday's APY
      dailyApr:
        getBalanceNumber(new BigNumber(exchangeRateArray[index][0][2]._hex)) -
        getBalanceNumber(new BigNumber(exchangeRateArray[index][0][1]._hex)),
    }
  })
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
