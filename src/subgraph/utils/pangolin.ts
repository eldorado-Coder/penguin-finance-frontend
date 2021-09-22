import { pangolinClient } from '../client'
import { PAIRS_SEARCH, TOKENS_SEARCH, BUNDLES_SEARCH, PAIR_DAY_DATA_SEARCH } from '../queries'

export const getPair = async (address: string) => {
  if (!address) return null
  const { pairs } = await pangolinClient.request(PAIRS_SEARCH({ address: address.toLowerCase() }))
  return pairs[0]
}

export const getToken = async (address: string, symbol: string) => {
  const { pairs } = await pangolinClient.request(TOKENS_SEARCH({ address, symbol }))
  return pairs[0]
}

export const getAvaxBundle = async () => {
  const { bundle } = await pangolinClient.request(BUNDLES_SEARCH())
  return bundle
}

export const getPairDayData = async (address: string) => {
  if (!address) return null
  const { pairHourDatas } = await pangolinClient.request(PAIR_DAY_DATA_SEARCH({ address: address.toLowerCase() }))
  return pairHourDatas
}

export const getPairDailyVolume = async (address: string) => {
  if (!address) return 0
  const pairDayData = await getPairDayData(address)
  let dailyVolume = 0
  if (pairDayData && pairDayData.length > 0) {
    pairDayData.map((row) => {
      dailyVolume += Number(row.hourlyVolumeUSD)
      return row
    })
  }
  return dailyVolume
}
