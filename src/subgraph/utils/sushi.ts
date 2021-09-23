import { sushiClient } from '../client'
import { PAIRS_SEARCH, TOKENS_SEARCH, PAIR_DAY_DATA_SEARCH1 } from '../queries'

export const getPair = async (address: string) => {
  if (!address) return null
  const { pairs } = await sushiClient.request(PAIRS_SEARCH({ address: address.toLowerCase() }))
  return pairs[0]
}

export const getToken = async (address: string, symbol: string) => {
  const { pairs } = await sushiClient.request(TOKENS_SEARCH({ address, symbol }))
  return pairs[0]
}

export const getPairDayData = async (address: string, dateAfter: number) => {
  if (!address) return null
  const { pairHourDatas } = await sushiClient.request(
    PAIR_DAY_DATA_SEARCH1({ address: address.toLowerCase(), dateAfter }),
  )
  return pairHourDatas
}

export const getPairDailyVolume = async (address: string, dateAfter: number) => {
  if (!address) return 0
  const pairDayData = await getPairDayData(address, dateAfter)
  let dailyVolume = 0
  if (pairDayData && pairDayData.length > 0) {
    pairDayData.map((row) => {
      dailyVolume += Number(row.volumeUSD)
      return row
    })
  }
  return dailyVolume
}
