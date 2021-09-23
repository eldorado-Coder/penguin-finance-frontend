import { joeExchangeClient, joeMasterChefClient } from '../client'
import { JOE_PAIRS_SEARCH, PAIR_DAY_DATA_SEARCH1, TOKENS_SEARCH, POOL_SEARCH } from '../queries'

export const getPair = async (address: string) => {
  if (!address) return null
  const { pairs } = await joeExchangeClient.request(JOE_PAIRS_SEARCH({ address: address.toLowerCase() }))
  return pairs[0]
}

export const getPairDayData = async (address: string, dateAfter: number) => {
  if (!address) return null

  const { pairHourDatas } = await joeExchangeClient.request(
    PAIR_DAY_DATA_SEARCH1({ address: address.toLowerCase(), dateAfter }),
  )
  return pairHourDatas
}

export const getToken = async (address: string, symbol: string) => {
  const { pairs } = await joeExchangeClient.request(TOKENS_SEARCH({ address, symbol }))
  return pairs[0]
}

export const getPoolInfo = async (address: string) => {
  if (!address) return null
  const { pools } = await joeMasterChefClient.request(POOL_SEARCH({ address: address.toLowerCase() }))
  return pools[0]
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
