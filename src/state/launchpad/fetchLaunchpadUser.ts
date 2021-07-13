import launchpadABI from 'config/abi/launchpad.json'
import { AbiItem } from 'web3-utils'
import xPefiAbi from 'config/abi/xPefi.json'
import multicall from 'utils/multicall'
import { getLaunchpadAddress, getXPefiAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'
import { getWeb3 } from 'utils/web3'

export const fetchUserData = async (account) => {
  const calls = [
    {
      address: getLaunchpadAddress(),
      name: 'amountStaked',
      params: [account],
    },
    {
      address: getLaunchpadAddress(),
      name: 'penguinTiers',
      params: [account],
    },
    {
      address: getLaunchpadAddress(),
      name: 'allocations',
      params: [account],
    },
    {
      address: getLaunchpadAddress(),
      name: 'canUnstake',
      params: [account],
    },
  ]

  const [amountStaked, penguinTiers, allocations, canUnStake] = await multicall(launchpadABI, calls)

  const stakedBalance = new BigNumber(amountStaked).toJSON()
  const penguinTier = new BigNumber(penguinTiers).toJSON()
  const allocation = new BigNumber(allocations).toJSON()
  const _canUnStake = canUnStake[0]

  return { stakedBalance, penguinTier, allocation, canUnstake: _canUnStake }
}

export const fetchUserStakedBalance = async (account) => {
  const calls = [
    {
      address: getLaunchpadAddress(),
      name: 'amountStaked',
      params: [account],
    },
  ]

  const [amountStaked] = await multicall(launchpadABI, calls)
  return new BigNumber(amountStaked).toJSON()
}

export const fetchUserPenguinTier = async (account) => {
  const calls = [
    {
      address: getLaunchpadAddress(),
      name: 'penguinTiers',
      params: [account],
    },
  ]

  const [penguinTiers] = await multicall(launchpadABI, calls)

  return new BigNumber(penguinTiers).toJSON()
}

export const fetchUserAllocation = async (account) => {
  const calls = [
    {
      address: getLaunchpadAddress(),
      name: 'allocations',
      params: [account],
    },
  ]

  const allocations = await multicall(launchpadABI, calls)
  return new BigNumber(allocations[0]).toJSON()
}

export const fetchUserCanUnstake = async (account) => {
  const calls = [
    {
      address: getLaunchpadAddress(),
      name: 'canUnstake',
      params: [account],
    },
  ]

  const [canUnStake] = await multicall(launchpadABI, calls)
  return canUnStake[0]
}

export const fetchDepositEnd = async () => {
  const calls = [
    {
      address: getLaunchpadAddress(),
      name: 'depositEnd',
    },
  ]

  const [depositEnd] = await multicall(launchpadABI, calls)
  return depositEnd[0].toNumber()
}

// xPefi allowance and balance
export const fetchLaunchpadAllowance = async (account) => {
  const web3 = getWeb3()
  const abi = (xPefiAbi as unknown) as AbiItem
  const xPefiContract = new web3.eth.Contract(abi, getXPefiAddress())
  const allowanceBalance = (await xPefiContract.methods.allowance(account, getLaunchpadAddress()).call()) / 1e18

  return allowanceBalance
}

export const fetchUserXPefiBalance = async (account) => {
  const web3 = getWeb3()
  const abi = (xPefiAbi as unknown) as AbiItem
  const xPefiContract = new web3.eth.Contract(abi, getXPefiAddress())
  const balanceOf = await xPefiContract.methods.balanceOf(account).call()

  return balanceOf
}
