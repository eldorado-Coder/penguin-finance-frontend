import launchpadKassandraABI from 'config/abi/launchpadKitty.json'
import { AbiItem } from 'web3-utils'
import iPefiAbi from 'config/abi/iPefi.json'
import multicall from 'utils/multicall'
import { getKassandraLaunchpadAddress, getIPefiAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'
import { getWeb3 } from 'utils/web3'

export const fetchUserData = async (account) => {
  const calls = [
    {
      address: getKassandraLaunchpadAddress(),
      // name: 'getTier',
      name: 'penguinTiers',
      params: [account],
    },
    {
      address: getKassandraLaunchpadAddress(),
      // name: 'getAllocations',
      name: 'allocations',
      params: [account],
    },
    {
      address: getKassandraLaunchpadAddress(),
      name: 'registered',
      params: [account],
    },
  ]

  const [penguinTiers, allocations, registered] = await multicall(launchpadKassandraABI, calls)
  const stakedBalance = new BigNumber(0).toString()
  const penguinTier = new BigNumber(penguinTiers).toNumber()
  const allocation = new BigNumber(allocations).toNumber()

  return {
    stakedBalance,
    penguinTier,
    allocation,
    canUnstake: false, // temp
    timeRemainingToUnstake: new BigNumber(0).toNumber(), // temp
    isRegistered: registered[0],
  }
}

export const fetchUserPenguinTier = async (account) => {
  const calls = [
    {
      address: getKassandraLaunchpadAddress(),
      name: 'getTier',
      params: [account],
    },
  ]

  const [penguinTiers] = await multicall(launchpadKassandraABI, calls)

  return new BigNumber(penguinTiers).toNumber()
}

export const fetchUserAllocation = async (account) => {
  const calls = [
    {
      address: getKassandraLaunchpadAddress(),
      name: 'getAllocations',
      params: [account],
    },
  ]

  const allocations = await multicall(launchpadKassandraABI, calls)
  return new BigNumber(allocations[0]).toNumber()
}

// xPefi allowance and balance
export const fetchLaunchpadAllowance = async (account) => {
  const web3 = getWeb3()
  const abi = (iPefiAbi as unknown) as AbiItem
  const iPefiContract = new web3.eth.Contract(abi, getIPefiAddress())
  const allowanceBalance = (await iPefiContract.methods.allowance(account, getKassandraLaunchpadAddress()).call()) / 1e18

  return allowanceBalance
}

export const fetchUserIPefiBalance = async (account) => {
  const web3 = getWeb3()
  const abi = (iPefiAbi as unknown) as AbiItem
  const iPefiContract = new web3.eth.Contract(abi, getIPefiAddress())
  const balanceOf = await iPefiContract.methods.balanceOf(account).call()

  return balanceOf
}
