import dayjs from 'dayjs'
import { getAvaxPrice } from 'utils/price'
import { HOURS_PER_DAY, SECONDS_PER_HOUR } from 'config'
import { getPairDailyVolume as getPangolinPairDailyVolume } from './pangolin'
import { getPairDailyVolume as getJoePairDailyVolume } from './joe'
import { getPairDailyVolume as getLydiaPairDailyVolume } from './lydia'
import { getPairDailyVolume as getSushiPairDailyVolume } from './sushi'

export * from './nest'
export * from './penguin'

export const getPairDailyVolume = async (address: string, type: string) => {
  const now = dayjs().unix()
  const dateAfter = (Math.floor(now / SECONDS_PER_HOUR) - HOURS_PER_DAY) * SECONDS_PER_HOUR

  let dailyVolume = 0
  if (type === 'Pangolin') {
    dailyVolume = await getPangolinPairDailyVolume(address, dateAfter)
  }
  if (type === 'Joe') {
    dailyVolume = await getJoePairDailyVolume(address, dateAfter)
  }
  if (type === 'Lydia') {
    dailyVolume = await getLydiaPairDailyVolume(address, dateAfter)
  }
  if (type === 'Sushi') {
    dailyVolume = await getSushiPairDailyVolume(address, dateAfter)
  }

  return dailyVolume
}

export const getPairSwapDailyReward = async (address: string, type: string) => {
  const pairDailyVolume = await getPairDailyVolume(address, type)
  let swapDailyReward = 0
  if (type === 'Joe') {
    swapDailyReward = 0.0025 * pairDailyVolume
  }
  if (type === 'Sushi') swapDailyReward = 0.003 * pairDailyVolume
  if (type === 'Lydia') {
    const avaxPrice = await getAvaxPrice()
    swapDailyReward = 0.003 * avaxPrice * pairDailyVolume
  }

  return swapDailyReward
}
