import launchpadKittyABI from 'config/abi/launchpadKitty.json'
import { AbiItem } from 'web3-utils'
import iPefiAbi from 'config/abi/iPefi.json'
import multicall from 'utils/multicall'
import { getKittyLaunchpadAddress, getIPefiAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'
import { getWeb3 } from 'utils/web3'

export const fetchUserData = async (account) => {
  const calls = [
    {
      address: getKittyLaunchpadAddress(),
      name: 'penguinTiers',
      params: [account],
    },
    {
      address: getKittyLaunchpadAddress(),
      name: 'allocations',
      params: [account],
    },
  ]

  const [penguinTiers, allocations] = await multicall(launchpadKittyABI, calls)

  // const stakedBalance = new BigNumber(amountStaked).toString()
  const stakedBalance = new BigNumber(0).toString()
  const penguinTier = new BigNumber(penguinTiers).toNumber()
  const allocation = new BigNumber(allocations).toNumber()

  return {
    stakedBalance,
    penguinTier,
    allocation,
    canUnstake: false, // temp
    timeRemainingToUnstake: new BigNumber(0).toNumber(), // temp
  }
}

export const fetchUserPenguinTier = async (account) => {
  const calls = [
    {
      address: getKittyLaunchpadAddress(),
      name: 'penguinTiers',
      params: [account],
    },
  ]

  const [penguinTiers] = await multicall(launchpadKittyABI, calls)

  return new BigNumber(penguinTiers).toNumber()
}

export const fetchUserAllocation = async (account) => {
  const calls = [
    {
      address: getKittyLaunchpadAddress(),
      name: 'allocations',
      params: [account],
    },
  ]

  const allocations = await multicall(launchpadKittyABI, calls)
  return new BigNumber(allocations[0]).toNumber()
}

// xPefi allowance and balance
export const fetchLaunchpadAllowance = async (account) => {
  const web3 = getWeb3()
  const abi = (iPefiAbi as unknown) as AbiItem
  const iPefiContract = new web3.eth.Contract(abi, getIPefiAddress())
  const allowanceBalance = (await iPefiContract.methods.allowance(account, getKittyLaunchpadAddress()).call()) / 1e18

  return allowanceBalance
}

export const fetchUserIPefiBalance = async (account) => {
  const web3 = getWeb3()
  const abi = (iPefiAbi as unknown) as AbiItem
  const iPefiContract = new web3.eth.Contract(abi, getIPefiAddress())
  const balanceOf = await iPefiContract.methods.balanceOf(account).call()

  return balanceOf
}
