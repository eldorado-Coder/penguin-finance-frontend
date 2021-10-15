import BigNumber from 'bignumber.js'
import multicall from 'utils/multicall'
import { getBalanceNumber } from 'utils/formatBalance'
import getFarmMasterChefAbi from 'utils/getFarmMasterChefAbi'
import getFarmMasterChefAddress from 'utils/getFarmMasterChefAddress'

export const fetchGlobalData = async () => {
  const [avaxRewardSpeed, benqiRewardSpeed, totalSupply] = await multicall(getFarmMasterChefAbi('Benqi'), [
    {
      address: getFarmMasterChefAddress('Benqi'),
      name: 'rewardSpeeds',
      params: [0],
    },
    {
      address: getFarmMasterChefAddress('Benqi'),
      name: 'rewardSpeeds',
      params: [1],
    },
    {
      address: getFarmMasterChefAddress('Benqi'),
      name: 'totalSupplies',
    },
  ])

  return {
    avaxPerSec: getBalanceNumber(new BigNumber(avaxRewardSpeed)),
    benqiPerSec: getBalanceNumber(new BigNumber(benqiRewardSpeed)),
    totalSupply: getBalanceNumber(new BigNumber(totalSupply)),
  }
}

export const fetchFarms = async () => {
  return []
}
