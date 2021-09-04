import { pangolinClient } from '../client'
import { PAIRS_SEARCH, TOKENS_SEARCH } from '../queries'

export const getPair = async (address: string) => {
  if (!address) return null
  const { pairs } = await pangolinClient.request(PAIRS_SEARCH({ address }))
  return pairs[0]
}

export const getToken = async (address: string, symbol: string) => {
  const { pairs } = await pangolinClient.request(TOKENS_SEARCH({ address, symbol }))
  return pairs[0]
}
