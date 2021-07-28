import BigNumber from 'bignumber.js'
import { AbiItem } from 'web3-utils'
import xPefiAbi from 'config/abi/xPefi.json'
import multicall from 'utils/multicall'
import {
  getLaunchpadAddress,
  getBoosterRocketAddress,
  getBoosterRocketPefiAddress,
  getBoosterRocketSherpaAddress,
  getXPefiAddress,
  getTestXPefiAddress,
} from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import boosterRocketABI from 'config/abi/boosterRocket.json'
import pefiABI from 'config/abi/launchpad/pefi.json'
import sherpaABI from 'config/abi/launchpad/sherpa.json'

export const fetchGlobalData = async () => {
  const calls = [
    {
      address: getBoosterRocketAddress(),
      name: 'eventStarted',
    },
    {
      address: getBoosterRocketAddress(),
      name: 'eventOngoing',
    },
    {
      address: getBoosterRocketAddress(),
      name: 'tokensLeftToDistribute',
    },
    {
      address: getBoosterRocketAddress(),
      name: 'totalTokensSold',
    },
    {
      address: getBoosterRocketAddress(),
      name: 'totalProceeds',
    },
    {
      address: getBoosterRocketAddress(),
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
      address: getBoosterRocketAddress(),
      name: 'hasTheUserAgreed',
      params: [account],
    },
    {
      address: getBoosterRocketAddress(),
      name: 'canPurchase',
      params: [account],
    },
  ]

  const [hasTheUserAgreed, canPurchaseAmount] = await multicall(boosterRocketABI, calls)

  return {
    hasTheUserAgreed: hasTheUserAgreed[0],
    canPurchaseAmount: new BigNumber(canPurchaseAmount).toNumber(),
    tokensPurchased: 0,
  }
}

export const fetchUserPayTokenBalance = async (account) => {
  const calls = [
    {
      address: getBoosterRocketPefiAddress(),
      name: 'balanceOf',
      params: [account],
    },
  ]

  const [pefiBalance] = await multicall(pefiABI, calls)
  return getBalanceNumber(new BigNumber(pefiBalance))
}

export const fetchUserBuyTokenBalance = async (account) => {
  const calls = [
    {
      address: getBoosterRocketSherpaAddress(),
      name: 'balanceOf',
      params: [account],
    },
  ]

  const [pefiBalance] = await multicall(sherpaABI, calls)
  return getBalanceNumber(new BigNumber(pefiBalance))
}
