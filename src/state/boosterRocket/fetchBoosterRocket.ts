import BigNumber from 'bignumber.js'
import { AbiItem } from 'web3-utils'
import xPefiAbi from 'config/abi/xPefi.json'
import multicall from 'utils/multicall'
import {
  getLaunchpadAddress,
  getBoosterRocketAddress,
  getXPefiAddress,
  getTestXPefiAddress,
} from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import boosterRocketABI from 'config/abi/boosterRocket.json'

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

export const fetchUserStakedBalance = async (account) => {
  const calls = [
    {
      address: getLaunchpadAddress(),
      name: 'amountStaked',
      params: [account],
    },
  ]

  const [amountStaked] = await multicall(boosterRocketABI, calls)
  return new BigNumber(amountStaked).toNumber()
}

export const fetchUserPenguinTier = async (account) => {
  const calls = [
    {
      address: getLaunchpadAddress(),
      name: 'penguinTiers',
      params: [account],
    },
  ]

  const [penguinTiers] = await multicall(boosterRocketABI, calls)

  return new BigNumber(penguinTiers).toNumber()
}

export const fetchDepositEnd = async () => {
  const calls = [
    {
      address: getLaunchpadAddress(),
      name: 'depositEnd',
    },
  ]

  const [depositEnd] = await multicall(boosterRocketABI, calls)
  return depositEnd[0].toNumber()
}
