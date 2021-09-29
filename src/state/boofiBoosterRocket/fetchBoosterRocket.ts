import BigNumber from 'bignumber.js'
import multicall from 'utils/multicall'
import {
  getBoofiBoosterRocketAddress,
  getBoofiBoosterRocketPayTokenAddress,
  getBoofiBoosterRocketBuyTokenAddress,
} from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import boosterRocketABI from 'config/abi/boosterRocket.json'
import erc20Abi from 'config/abi/erc20.json'

export const fetchGlobalData = async () => {
  const calls = [
    {
      address: getBoofiBoosterRocketAddress(),
      name: 'eventStarted',
    },
    {
      address: getBoofiBoosterRocketAddress(),
      name: 'eventOngoing',
    },
    {
      address: getBoofiBoosterRocketAddress(),
      name: 'tokensLeftToDistribute',
    },
    {
      address: getBoofiBoosterRocketAddress(),
      name: 'totalTokensSold',
    },
    {
      address: getBoofiBoosterRocketAddress(),
      name: 'totalProceeds',
    },
    {
      address: getBoofiBoosterRocketAddress(),
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
  ] = await multicall(boosterRocketABI, calls)

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
      address: getBoofiBoosterRocketAddress(),
      name: 'hasTheUserAgreed',
      params: [account],
    },
    {
      address: getBoofiBoosterRocketAddress(),
      name: 'canPurchase',
      params: [account],
    },
  ]

  const [hasTheUserAgreed, canPurchaseAmount] = await multicall(boosterRocketABI, calls)

  return {
    hasTheUserAgreed: hasTheUserAgreed[0],
    canPurchaseAmount: getBalanceNumber(new BigNumber(canPurchaseAmount)),
    tokensPurchased: 0,
  }
}

export const fetchUserPayTokenBalance = async (account) => {
  const calls = [
    {
      address: getBoofiBoosterRocketPayTokenAddress(),
      name: 'balanceOf',
      params: [account],
    },
  ]

  const [pefiBalance] = await multicall(erc20Abi, calls)
  return getBalanceNumber(new BigNumber(pefiBalance))
}

export const fetchUserBuyTokenBalance = async (account) => {
  const calls = [
    {
      address: getBoofiBoosterRocketBuyTokenAddress(),
      name: 'balanceOf',
      params: [account],
    },
  ]

  const [pefiBalance] = await multicall(erc20Abi, calls)
  return getBalanceNumber(new BigNumber(pefiBalance))
}
