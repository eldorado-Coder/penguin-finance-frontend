import BigNumber from 'bignumber.js'
import erc20 from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import { getClubPenguinMasterChefAddress } from 'utils/addressHelpers'

import clubPenguinFarms from 'config/constants/clubPenguinFarms'
import clubPenguinMasterChefAbi from 'config/abi/clubPenguin.json'

export const fetchMasterChefGlobalData = async () => {
  return 1
}

export const fetchFarms = async () => {
  const masterchefAddress = getClubPenguinMasterChefAddress()

  const data = await Promise.all(
    clubPenguinFarms.map(async (farmConfig) => {
      const [info, totalAllocPoint] = await multicall(clubPenguinMasterChefAbi, [
        {
          address: masterchefAddress,
          name: 'poolInfo',
          params: [farmConfig.pid],
        },
        {
          address: masterchefAddress,
          name: 'totalAllocPoint',
        },
      ])

      const {
        rewardToken,
        rewardStartTimestamp,
        rewardEndTimestamp,
        tokensPerSecond,
        totalIPEFIInPool,
        totalRewardAmount,
        rewardDistributed,
      } = info

      return {
        ...farmConfig,
        rewardToken,
        rewardStartTimestamp: new BigNumber(rewardStartTimestamp).toJSON(),
        rewardEndTimestamp: new BigNumber(rewardEndTimestamp).toJSON(),
        tokensPerSecond: new BigNumber(tokensPerSecond).toJSON(),
        totalIPEFIInPool: new BigNumber(totalIPEFIInPool).toJSON(),
        totalRewardAmount: new BigNumber(totalRewardAmount).toJSON(),
        rewardDistributed: new BigNumber(rewardDistributed).toJSON(),
      }
    }),
  )
  return data
}
