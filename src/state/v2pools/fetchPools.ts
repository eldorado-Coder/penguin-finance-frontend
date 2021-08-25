import BigNumber from 'bignumber.js'
import v2PoolsConfig from 'config/constants/v2pools'
import sousChefABI from 'config/abi/sousChef.json'
import penguinABI from 'config/abi/penguin.json'
import wbnbABI from 'config/abi/weth.json'
import { QuoteToken } from 'config/constants/types'
import multicall from 'utils/multicall'
import { getAddress, getWavaxAddress } from 'utils/addressHelpers'

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

  const starts = await multicall(sousChefABI, callsStartBlock)
  const ends = await multicall(sousChefABI, callsEndBlock)

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
