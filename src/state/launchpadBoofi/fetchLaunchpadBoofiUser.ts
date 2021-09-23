import launchpadBoofiABI from 'config/abi/launchpadBoofi.json'
import { AbiItem } from 'web3-utils'
import xPefiAbi from 'config/abi/xPefi.json'
import multicall from 'utils/multicall'
import { getLaunchpadBoofiAddress, getTestXPefiAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'
import { getWeb3 } from 'utils/web3'

export const fetchUserData = async (account) => {
  const calls = [
    {
      address: getLaunchpadBoofiAddress(),
      name: 'amountStaked',
      params: [account],
    },
    {
      address: getLaunchpadBoofiAddress(),
      name: 'penguinTiers',
      params: [account],
    },
    {
      address: getLaunchpadBoofiAddress(),
      name: 'allocations',
      params: [account],
    },
    {
      address: getLaunchpadBoofiAddress(),
      name: 'canUnstake',
      params: [account],
    },
    {
      address: getLaunchpadBoofiAddress(),
      name: 'timeRemainingToUnstake',
      params: [account],
    },
  ]

  const [amountStaked, penguinTiers, allocations, canUnStake, timeRemainingToUnstake] = await multicall(
    launchpadBoofiABI,
    calls,
  )

  const stakedBalance = new BigNumber(amountStaked).toNumber()
  const penguinTier = new BigNumber(penguinTiers).toNumber()
  const allocation = new BigNumber(allocations).toNumber()
  const _canUnStake = canUnStake[0]

  return {
    stakedBalance,
    penguinTier,
    allocation,
    canUnstake: _canUnStake,
    timeRemainingToUnstake: new BigNumber(timeRemainingToUnstake).toNumber(),
  }
}

export const fetchUserStakedBalance = async (account) => {
  const calls = [
    {
      address: getLaunchpadBoofiAddress(),
      name: 'amountStaked',
      params: [account],
    },
  ]

  const [amountStaked] = await multicall(launchpadBoofiABI, calls)
  return new BigNumber(amountStaked).toNumber()
}

export const fetchUserPenguinTier = async (account) => {
  const calls = [
    {
      address: getLaunchpadBoofiAddress(),
      name: 'penguinTiers',
      params: [account],
    },
  ]

  const [penguinTiers] = await multicall(launchpadBoofiABI, calls)

  return new BigNumber(penguinTiers).toNumber()
}

export const fetchUserAllocation = async (account) => {
  const calls = [
    {
      address: getLaunchpadBoofiAddress(),
      name: 'allocations',
      params: [account],
    },
  ]

  const allocations = await multicall(launchpadBoofiABI, calls)
  return new BigNumber(allocations[0]).toNumber()
}

export const fetchUserCanUnstake = async (account) => {
  const calls = [
    {
      address: getLaunchpadBoofiAddress(),
      name: 'canUnstake',
      params: [account],
    },
  ]

  const [canUnStake] = await multicall(launchpadBoofiABI, calls)
  return canUnStake[0]
}

export const fetchDepositEnd = async () => {
  const calls = [
    {
      address: getLaunchpadBoofiAddress(),
      name: 'depositEnd',
    },
  ]

  const [depositEnd] = await multicall(launchpadBoofiABI, calls)
  return depositEnd[0].toNumber()
}

export const fetchTierHurdles = async () => {
  const calls = []
  for (let i = 0; i < 3; i++) {
    calls.push({
      address: getLaunchpadBoofiAddress(),
      name: 'tierHurdles',
      params: [i],
    })
  }

  const tierHurdles = await multicall(launchpadBoofiABI, calls)

  return tierHurdles.map((tierHurdle) => tierHurdle[0] / 1e18)
}

// xPefi allowance and balance
export const fetchLaunchpadAllowance = async (account) => {
  const web3 = getWeb3()
  const abi = (xPefiAbi as unknown) as AbiItem
  // const xPefiContract = new web3.eth.Contract(abi, getXPefiAddress())
  const xPefiContract = new web3.eth.Contract(abi, getTestXPefiAddress())
  const allowanceBalance = (await xPefiContract.methods.allowance(account, getLaunchpadBoofiAddress()).call()) / 1e18

  return allowanceBalance
}

export const fetchUserXPefiBalance = async (account) => {
  const web3 = getWeb3()
  const abi = (xPefiAbi as unknown) as AbiItem
  // const xPefiContract = new web3.eth.Contract(abi, getXPefiAddress())
  const xPefiContract = new web3.eth.Contract(abi, getTestXPefiAddress())
  const balanceOf = await xPefiContract.methods.balanceOf(account).call()

  return balanceOf
}
