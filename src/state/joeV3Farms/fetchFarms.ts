import BigNumber from 'bignumber.js'
import multicall from 'utils/multicall'
import { getBalanceNumber } from 'utils/formatBalance'
import getFarmMasterChefAddress from 'utils/getFarmMasterChefAddress'
import { getAddress, getAvaxAddress } from 'utils/addressHelpers'
import getFarmMasterChefAbi from 'utils/getFarmMasterChefAbi'
import joeV3RewarderABI from 'config/abi/v2Farms/joeV3Rewarder.json'
import joeV3FarmsConfig from './constant'

export const fetchGlobalData = async () => {
  const [joePerSec, totalAllocPoint] = await multicall(getFarmMasterChefAbi('Joe-v3'), [
    {
      address: getFarmMasterChefAddress('Joe-v3'),
      name: 'joePerSec',
    },
    {
      address: getFarmMasterChefAddress('Joe-v3'),
      name: 'totalAllocPoint',
    },
  ])

  return {
    joePerSec: getBalanceNumber(new BigNumber(joePerSec)),
    totalAllocPoint: new BigNumber(totalAllocPoint).toNumber(),
  }
}

export const fetchFarms = async () => {
  const data = await Promise.all(
    joeV3FarmsConfig.map(async (farmConfig) => {
      try {
        const [info] = await multicall(getFarmMasterChefAbi('Joe-v3'), [
          {
            address: getFarmMasterChefAddress('Joe-v3'),
            name: 'poolInfo',
            params: [farmConfig.pid],
          },
        ])
        const [_joeRushRewardTokenPerSecond] = await multicall(joeV3RewarderABI, [
          {
            address: getAddress(farmConfig.rewarderAddresses),
            name: 'tokenPerSec',
          },
        ])

        return {
          ...farmConfig,
          allocPoint: info.allocPoint.toNumber(),
          joeRushRewardPerSec: getBalanceNumber(new BigNumber(_joeRushRewardTokenPerSecond[0]._hex)),
        }
      } catch (error) {
        return {
          ...farmConfig,
          allocPoint: 0,
        }
      }
    }),
  )
  return data
  return []
}
