import { getPair as getPangolinPair } from 'subgraph/utils/pangolin'

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
