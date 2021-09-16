import { AbiItem } from 'web3-utils'
import BigNumber from 'bignumber.js'
import v2PoolsConfig from 'config/constants/v2pools'
import masterChefABI from 'config/abi/masterchef.json'
import sousChefABI from 'config/abi/sousChef.json'
import v2NestABI from 'config/abi/v2_nest.json'
import erc20ABI from 'config/abi/erc20.json'
import { QuoteToken } from 'config/constants/types'
import multicall from 'utils/multicall'
import { getAddress, getMasterChefAddress } from 'utils/addressHelpers'
import { getWeb3 } from 'utils/web3'

const pools = v2PoolsConfig
const AvaxPools = v2PoolsConfig.filter((p) => p.stakingTokenName === QuoteToken.AVAX)
const web3 = getWeb3()
const masterChefContract = new web3.eth.Contract((masterChefABI as unknown) as AbiItem, getMasterChefAddress())
console.log('123123--->', pools)

export const fetchPoolsAllowance = async (account) => {
  const calls = pools.map((p) => ({
    address: p.stakingTokenAddress,
    name: 'allowance',
    params: [account, getAddress(p.contractAddress)],
  }))

  const allowances = await multicall(erc20ABI, calls)
  return pools.reduce((acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(allowances[index]).toJSON() }), {})
}

export const fetchUserBalances = async (account) => {
  // Non AVAX pools
  const calls = pools.map((p) => ({
    address: p.stakingTokenAddress,
    name: 'balanceOf',
    params: [account],
  }))
  const tokenBalancesRaw = await multicall(erc20ABI, calls)
  const tokenBalances = pools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(tokenBalancesRaw[index]).toJSON() }),
    {},
  )

  return { ...tokenBalances }
}

export const fetchUserInfos = async (account) => {
  const data = await Promise.all(
    pools.map(async (poolConfig) => {
      const stakingTokenCalls = [
        // staking token allowance
        {
          address: poolConfig.stakingTokenAddress,
          name: 'allowance',
          params: [account, getAddress(poolConfig.contractAddress)],
        },
        // staking token balance
        {
          address: poolConfig.stakingTokenAddress,
          name: 'balanceOf',
          params: [account],
        },
      ]
      const v2NestCalls = [
        // staked token balance
        {
          address: getAddress(poolConfig.contractAddress),
          name: 'balanceOf',
          params: [account],
        },
        // user profits
        {
          address: getAddress(poolConfig.contractAddress),
          name: 'userProfits',
          params: [account],
        },
        // user deposits
        {
          address: getAddress(poolConfig.contractAddress),
          name: 'deposits',
          params: [account],
        },
        // user withdrawals
        {
          address: getAddress(poolConfig.contractAddress),
          name: 'withdrawals',
          params: [account],
        },
      ]
      const [stakingTokenAllowanceRaw, stakingTokenBalanceRaw] = await multicall(erc20ABI, stakingTokenCalls)
      const [stakedBalanceRaw, userProfitsRaw, userDepositAmountRaw, userWithdrawAmountRaw] = await multicall(
        v2NestABI,
        v2NestCalls,
      )

      return {
        sousId: poolConfig.sousId,
        allowance: new BigNumber(stakingTokenAllowanceRaw).toJSON(),
        stakingTokenBalance: new BigNumber(stakingTokenBalanceRaw).toJSON(),
        stakedBalance: new BigNumber(stakedBalanceRaw).toJSON(),
        profitAmount: new BigNumber(userProfitsRaw).toJSON(),
        depositAmount: new BigNumber(userDepositAmountRaw).toJSON(),
        withdrawAmount: new BigNumber(userWithdrawAmountRaw).toJSON(),
      }
    }),
  )
  return data
}

export const fetchUserStakeBalances = async (account) => {
  const calls = pools.map((p) => ({
    address: getAddress(p.contractAddress),
    name: 'balanceOf',
    params: [account],
  }))
  const userInfo = await multicall(sousChefABI, calls)
  const stakedBalances = pools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(userInfo[index]).toJSON(),
    }),
    {},
  )

  // Cake / Cake pool
  const { amount: masterPoolAmount } = await masterChefContract.methods.userInfo('0', account).call()

  return { ...stakedBalances, 0: new BigNumber(masterPoolAmount).toJSON() }
}

export const fetchUserPendingRewards = async (account) => {
  const calls = pools.map((p) => ({
    address: getAddress(p.contractAddress),
    name: 'pendingReward',
    params: [account],
  }))
  const res = await multicall(sousChefABI, calls)
  const pendingRewards = pools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(res[index]).toJSON(),
    }),
    {},
  )

  // Cake / Cake pool
  const pendingReward = await masterChefContract.methods.pendingPEFI('0', account).call()

  return { ...pendingRewards, 0: new BigNumber(pendingReward).toJSON() }
}
