import BigNumber from 'bignumber.js'
import multicall from 'utils/multicall'
import {
  getKassandraBoosterRocketAddress,
  getKassandraBoosterRocketPayTokenAddress,
  getKassandraBoosterRocketBuyTokenAddress,
} from 'utils/addressHelpers'
import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import kassandraBoosterRocketABI from 'config/abi/kassandraBoosterRocket.json'
import erc20Abi from 'config/abi/erc20.json'

export const fetchGlobalData = async () => {
  const calls = [
    {
      address: getKassandraBoosterRocketAddress(),
      name: 'eventStarted',
    },
    {
      address: getKassandraBoosterRocketAddress(),
      name: 'eventOngoing',
    },
    {
      address: getKassandraBoosterRocketAddress(),
      name: 'tokensLeftToDistribute',
    },
    {
      address: getKassandraBoosterRocketAddress(),
      name: 'totalTokensSold',
    },
    {
      address: getKassandraBoosterRocketAddress(),
      name: 'totalProceeds',
    },
    {
      address: getKassandraBoosterRocketAddress(),
      name: 'allocationRate',
    },
  ]

  const [
    eventStarted,
    eventOngoing,
    tokensLeftToDistribute,
    totalTokensSold,
    totalProceeds,
    allocationRate,
  ] = await multicall(kassandraBoosterRocketABI, calls)

  return {
    eventStarted: eventStarted[0],
    eventOngoing: eventOngoing[0],
    tokensLeftToDistribute: getBalanceNumber(new BigNumber(tokensLeftToDistribute)),
    totalTokensSold: getBalanceNumber(new BigNumber(totalTokensSold)),
    totalProceeds: getBalanceNumber(new BigNumber(totalProceeds)),
    allocationRate: getBalanceNumber(new BigNumber(allocationRate)),
  }
}

export const fetchUserData = async (account) => {
  // from boosterRocket contract
  const calls = [
    {
      address: getKassandraBoosterRocketAddress(),
      name: 'hasTheUserAgreed',
      params: [account],
    },
    {
      address: getKassandraBoosterRocketAddress(),
      name: 'canPurchase',
      params: [account],
    },
    {
      address: getKassandraBoosterRocketAddress(),
      name: 'tokensPurchased',
      params: [account],
    },
  ]

  const [hasTheUserAgreed, canPurchaseAmount, tokensPurchased] = await multicall(kassandraBoosterRocketABI, calls)

  return {
    hasTheUserAgreed: hasTheUserAgreed[0],
    canPurchaseAmount: getFullDisplayBalance(new BigNumber(canPurchaseAmount)),
    tokensPurchased: getFullDisplayBalance(new BigNumber(tokensPurchased)),
  }
}

export const fetchUserPayTokenBalance = async (account) => {
  const calls = [
    {
      address: getKassandraBoosterRocketPayTokenAddress(),
      name: 'balanceOf',
      params: [account],
    },
  ]

  const [pefiBalance] = await multicall(erc20Abi, calls)
  return getBalanceNumber(new BigNumber(pefiBalance), 6)
}

export const fetchUserBuyTokenBalance = async (account) => {
  const calls = [
    {
      address: getKassandraBoosterRocketBuyTokenAddress(),
      name: 'balanceOf',
      params: [account],
    },
  ]

  const [pefiBalance] = await multicall(erc20Abi, calls)
  return getBalanceNumber(new BigNumber(pefiBalance))
}
