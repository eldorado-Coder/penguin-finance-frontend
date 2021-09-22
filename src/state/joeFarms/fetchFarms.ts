import BigNumber from 'bignumber.js'
import multicall from 'utils/multicall'
import { getBalanceNumber } from 'utils/formatBalance'
import getFarmMasterChefAbi from 'utils/getFarmMasterChefAbi'
import getFarmMasterChefAddress from 'utils/getFarmMasterChefAddress'

export const fetchGlobalData = async () => {
  const [joePerSec, devPercent, investorPercent, treasuryPercent, totalAllocPoint] = await multicall(
    getFarmMasterChefAbi('Joe'),
    [
      {
        address: getFarmMasterChefAddress('Joe'),
        name: 'joePerSec',
      },
      {
        address: getFarmMasterChefAddress('Joe'),
        name: 'devPercent',
      },
      {
        address: getFarmMasterChefAddress('Joe'),
        name: 'investorPercent',
      },
      {
        address: getFarmMasterChefAddress('Joe'),
        name: 'treasuryPercent',
      },
      {
        address: getFarmMasterChefAddress('Joe'),
        name: 'totalAllocPoint',
      },
    ],
  )

  return {
    joePerSec: getBalanceNumber(new BigNumber(joePerSec)),
    devPercent: new BigNumber(devPercent).toNumber(),
    investorPercent: new BigNumber(investorPercent).toNumber(),
    treasuryPercent: new BigNumber(treasuryPercent).toNumber(),
    totalAllocPoint: new BigNumber(totalAllocPoint).toNumber(),
  }
}

export const fetchFarms = async () => {
  return []
}
