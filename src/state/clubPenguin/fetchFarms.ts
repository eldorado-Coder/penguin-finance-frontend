import BigNumber from 'bignumber.js'
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
      const [info, poolTimeRemaining] = await multicall(clubPenguinMasterChefAbi, [
        {
          address: masterchefAddress,
          name: 'poolInfo',
          params: [farmConfig.pid],
        },
        {
          address: masterchefAddress,
          name: 'poolTimeRemaining',
          params: [farmConfig.pid],
        },
      ])

      const {
        rewardToken,
        rewardStartTimestamp,
        tokensPerSecond,
        totalIPEFIInPool,
        totalRewardAmount,
        rewardDistributed,
      } = info

      return {
        ...farmConfig,
        rewardToken,
        rewardStartTimestamp: new BigNumber(rewardStartTimestamp._hex).toNumber(),
        rewardEndTimestamp: Date.now() + 1000 * new BigNumber(poolTimeRemaining).toNumber(),
        tokensPerSecond: new BigNumber(tokensPerSecond._hex).toJSON(),
        totalIPEFIInPool: new BigNumber(totalIPEFIInPool._hex).toJSON(),
        totalRewardAmount: new BigNumber(totalRewardAmount._hex).toJSON(),
        rewardDistributed: new BigNumber(rewardDistributed._hex).toJSON(),
        poolTimeRemaining: new BigNumber(poolTimeRemaining).toNumber(),
      }
    }),
  )
  return data
}
