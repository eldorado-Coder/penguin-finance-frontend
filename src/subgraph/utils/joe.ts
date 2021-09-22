import { joeExchangeClient, joeMasterChefClient } from '../client'
import { PAIRS_SEARCH, TOKENS_SEARCH, POOL_SEARCH } from '../queries'

export const getPair = async (address: string) => {
  if (!address) return null
  const { pairs } = await joeExchangeClient.request(PAIRS_SEARCH({ address: address.toLowerCase() }))
  return pairs[0]
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
