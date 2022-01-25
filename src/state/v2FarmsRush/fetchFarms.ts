import BigNumber from 'bignumber.js'
import v2MasterchefABI from 'config/abi/v2Masterchef.json'
import v2IglooRewarderABI from 'config/abi/v2Farms/rewarder.json'
import v2IglooKacyRewarderABI from 'config/abi/v2Farms/kacyRewarder.json'
import multicall from 'utils/multicall'
import v2FarmsConfig from 'config/constants/v2Farms'
import { getAddress, getV2MasterChefAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'

export const fetchMasterChefGlobalData = async () => {
  const [pefiEmissionPerSecond] = await multicall(v2MasterchefABI, [
    {
      address: getV2MasterChefAddress(),
      name: 'pefiEmissionPerSecond',
    },
  ])

  return { pefiPerSecond: new BigNumber(pefiEmissionPerSecond).div(new BigNumber(10).pow(18)).toNumber() }
}

export const fetchFarms = async () => {
  const data = await Promise.all(
    v2FarmsConfig.map(async (farmConfig) => {
      let penguinRushRewardToken = '0x0000000000000000000000000000000000000000'
      let penguinRushRewardPerSec = 0
      try {
        if (
          getAddress(farmConfig.rewarderAddresses) !== '0x0000000000000000000000000000000000000000' &&
          farmConfig.isPenguinRush
        ) {
          if (farmConfig.lpSymbol === 'KACY-AVAX LP') {
            const [_penguinRushRewardToken, _penguinRushRewardPerSec, _distributionTimeRemaining ] = await multicall(v2IglooKacyRewarderABI, [
              {
                address: getAddress(farmConfig.rewarderAddresses),
                name: 'rewardToken',
              },
              {
                address: getAddress(farmConfig.rewarderAddresses),
                name: 'tokensPerSecond',
              },
              {
                address: getAddress(farmConfig.rewarderAddresses),
                name: 'distributionTimeRemaining',
              },
            ])

            const distributionTimeRemaining = getBalanceNumber(new BigNumber(_distributionTimeRemaining[0]._hex))
            penguinRushRewardToken = _penguinRushRewardToken[0];
            penguinRushRewardPerSec =
              distributionTimeRemaining > 0 ? getBalanceNumber(new BigNumber(_penguinRushRewardPerSec[0]._hex)) : 0
          } else {
            const [_penguinRushRewardToken, _penguinRushRewardPerSec, _distributionTimeRemaining] = await multicall(v2IglooRewarderABI,
              [
                {
                  address: getAddress(farmConfig.rewarderAddresses),
                  name: 'rewardToken',
                },
                {
                  address: getAddress(farmConfig.rewarderAddresses),
                  name: 'tokensPerSecond',
                },
  
                {
                  address: getAddress(farmConfig.rewarderAddresses),
                  name: 'distributionTimeRemaining',
                },
              ],
            ) 
            const distributionTimeRemaining = getBalanceNumber(new BigNumber(_distributionTimeRemaining[0]._hex))
            penguinRushRewardToken = _penguinRushRewardToken[0]
            penguinRushRewardPerSec =
              distributionTimeRemaining > 0 ? getBalanceNumber(new BigNumber(_penguinRushRewardPerSec[0]._hex)) : 0
          }
        }

        return {
          ...farmConfig,
          penguinRushRewardToken,
          penguinRushRewardPerSec,
        }
      } catch (error) {
        console.log('ant : v2farms rush error => ', error);
        return {
          ...farmConfig,
          penguinRushRewardToken,
          penguinRushRewardPerSec,
        }
      }
    }),
  )
  return data
}
