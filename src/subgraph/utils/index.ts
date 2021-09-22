import { getPairDailyVolume as getPangolinPairDailyVolume } from './pangolin'
import { getPairDailyVolume as getJoePairDailyVolume } from './joe'
import { getPairDailyVolume as getLydiaPairDailyVolume } from './lydia'
import { getPairDailyVolume as getSushiPairDailyVolume } from './sushi'

export * from './nest'
export * from './penguin'

export const getPairDailyVolume = async (address: string, type: string) => {
  let dailyVolume = 0
  if (type === 'Pangolin') {
    dailyVolume = await getPangolinPairDailyVolume(address)
  }
  if (type === 'Joe') {
    dailyVolume = await getJoePairDailyVolume(address)
  }
  if (type === 'Lydia') {
    dailyVolume = await getLydiaPairDailyVolume(address)
  }
  if (type === 'Sushi') {
    dailyVolume = await getSushiPairDailyVolume(address)
  }

  return dailyVolume
}

export const getPairSwapDailyReward = async (address: string, type: string) => {
  const pairDailyVolume = await getPairDailyVolume(address, type)
  let swapDailyReward = 0
  if (type === 'Joe') swapDailyReward = 0.0025 * pairDailyVolume
  if (type === 'Lydia') swapDailyReward = 0.003 * pairDailyVolume
  if (type === 'Sushi') swapDailyReward = 0.003 * pairDailyVolume

  return swapDailyReward
}
