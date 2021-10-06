import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import { getAddress, getClubPenguinMasterChefAddress } from 'utils/addressHelpers'
import clubPenguinFarmsConfig from 'config/constants/clubPenguinFarms'
import clubPenguinMasterChefAbi from 'config/abi/clubPenguin.json'

const masterChefAddress = getClubPenguinMasterChefAddress()

export const fetchFarmUserAllowances = async (account: string) => {
  const calls = clubPenguinFarmsConfig.map((farm) => {
    const stakingTokenContractAddress = getAddress(farm.stakingTokenAddresses)
    return { address: stakingTokenContractAddress, name: 'allowance', params: [account, masterChefAddress] }
  })

  const rawLpAllowances = await multicall(erc20ABI, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })

  return parsedLpAllowances
}

export const fetchFarmUserTokenBalances = async (account: string) => {
  const calls = clubPenguinFarmsConfig.map((farm) => {
    const stakingTokenContractAddress = getAddress(farm.stakingTokenAddresses)

    return {
      address: stakingTokenContractAddress,
      name: 'balanceOf',
      params: [account],
    }
  })

  const rawTokenBalances = await multicall(erc20ABI, calls)
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toJSON()
  })
  return parsedTokenBalances
}

export const fetchFarmUserStakedBalances = async (account: string) => {
  const results = []
  for (let i = 0; i < clubPenguinFarmsConfig.length; i++) {
    const call = [
      {
        address: masterChefAddress,
        name: 'userInfo',
        params: [clubPenguinFarmsConfig[i].pid, account],
      },
    ]

    const farmRes = multicall(clubPenguinMasterChefAbi, call)
    results.push(farmRes)
  }

  const rawStakedBalances = await Promise.all(results)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0][0]._hex).toJSON()
  })
  return parsedStakedBalances
}

export const fetchFarmUserEarnings = async (account: string) => {
  const results = []
  for (let i = 0; i < clubPenguinFarmsConfig.length; i++) {
    const call = [
      {
        address: masterChefAddress,
        name: 'pendingRewards',
        params: [clubPenguinFarmsConfig[i].pid, account],
      },
    ]

    const farmRes = multicall(clubPenguinMasterChefAbi, call)
    results.push(farmRes)
  }

  const rawEarnings = await Promise.all(results)

  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings[0]).toJSON()
  })

  return parsedEarnings
}
