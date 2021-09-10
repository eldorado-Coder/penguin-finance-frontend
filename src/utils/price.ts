import { getPair as getPangolinPair } from 'subgraph/utils/pangolin'
import { getPair as getJoePair } from 'subgraph/utils/joe'

export const getPangolinLpPrice = async (address) => {
  const pair = await getPangolinPair(address)
  const price = Number(pair.reserveUSD) / Number(pair.totalSupply)
  return price || 1
}

export const getSushiLpPrice = async (address) => {
  const pair = await getPangolinPair(address)
  const price = Number(pair.reserveUSD) / Number(pair.totalSupply)
  return price || 1
}

export const getJoeLpPrice = async (address) => {
  const pair = await getJoePair(address)
  const price = Number(pair.reserveUSD) / Number(pair.totalSupply)
  return price || 1
}
