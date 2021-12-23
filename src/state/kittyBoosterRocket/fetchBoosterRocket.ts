import BigNumber from 'bignumber.js'
import multicall from 'utils/multicall'
import {
  getKittyBoosterRocketAddress,
  getKittyBoosterRocketPayTokenAddress,
  getKittyBoosterRocketBuyTokenAddress,
} from 'utils/addressHelpers'
import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import kittyBoosterRocketABI from 'config/abi/kittyBoosterRocket.json'
import erc20Abi from 'config/abi/erc20.json'

export const fetchGlobalData = async () => {
  const calls = [
    {
      address: getKittyBoosterRocketAddress(),
      name: 'eventStarted',
    },
    {
      address: getKittyBoosterRocketAddress(),
      name: 'eventOngoing',
    },
    {
      address: getKittyBoosterRocketAddress(),
      name: 'tokensLeftToDistribute',
    },
    {
      address: getKittyBoosterRocketAddress(),
      name: 'totalTokensSold',
    },
    {
      address: getKittyBoosterRocketAddress(),
      name: 'totalProceeds',
    },
    {
      address: getKittyBoosterRocketAddress(),
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
  ] = await multicall(kittyBoosterRocketABI, calls)

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
      address: getKittyBoosterRocketAddress(),
      name: 'hasTheUserAgreed',
      params: [account],
    },
    {
      address: getKittyBoosterRocketAddress(),
      name: 'canPurchase',
      params: [account],
    },
    {
      address: getKittyBoosterRocketAddress(),
      name: 'tokensPurchased',
      params: [account],
    },
  ]

  const [hasTheUserAgreed, canPurchaseAmount, tokensPurchased] = await multicall(kittyBoosterRocketABI, calls)

  return {
    hasTheUserAgreed: hasTheUserAgreed[0],
    canPurchaseAmount: getFullDisplayBalance(new BigNumber(canPurchaseAmount)),
    tokensPurchased: getFullDisplayBalance(new BigNumber(tokensPurchased)),
  }
}

export const fetchUserPayTokenBalance = async (account) => {
  const calls = [
    {
      address: getKittyBoosterRocketPayTokenAddress(),
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
      address: getKittyBoosterRocketBuyTokenAddress(),
      name: 'balanceOf',
      params: [account],
    },
  ]

  const [pefiBalance] = await multicall(erc20Abi, calls)
  return getBalanceNumber(new BigNumber(pefiBalance))
}
