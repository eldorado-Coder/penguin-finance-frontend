import dayjs from 'dayjs'
import { getAvaxPrice } from 'utils/price'
import { HOURS_PER_DAY, SECONDS_PER_HOUR } from 'config'
import { getPairDailyVolume as getPangolinPairDailyVolume, getPair as getPangolinPair } from './pangolin'
import { getPairDailyVolume as getJoePairDailyVolume, getPair as getJoePair } from './joe'
import { getPairDailyVolume as getLydiaPairDailyVolume, getPair as getLydiaPair } from './lydia'
import { getPairDailyVolume as getSushiPairDailyVolume, getPair as getSushiPair } from './sushi'

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
  if (type === 'Pangolin') {
    swapDailyReward = 0.003 * pairDailyVolume
  }
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

export const getPairInfo = async (address: string, type: string) => {
  let pairInfo = { reserveUSD: 1, totalSupply: 1 }
  if (type === 'Pangolin') {
    pairInfo = await getPangolinPair(address)
  }
  if (type === 'Joe') {
    pairInfo = await getJoePair(address)
  }
  if (type === 'Lydia') {
    pairInfo = await getLydiaPair(address)
  }
  if (type === 'Sushi') {
    pairInfo = await getSushiPair(address)
  }

  return pairInfo
}
