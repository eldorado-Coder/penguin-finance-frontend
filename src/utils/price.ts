import Axios from 'axios'
import { getPair as getPangolinPair } from 'subgraph/utils/pangolin'
import { getPair as getJoePair } from 'subgraph/utils/joe'
import { getPair as getSushiPair } from 'subgraph/utils/sushi'
import { appendParams } from 'utils/axios'
import { COINGECKO_API_ENDPOINT } from 'config'

const getTokenPriceFromCoingecko = async (id) => {
  if (!id) return 1
  const url = appendParams(`${COINGECKO_API_ENDPOINT}/v3/simple/price`, { ids: id, vs_currencies: 'usd' })
  const res = await Axios.get(url)
  if (res.status === 200) {
    if (res.data[id]) {
      return res.data[id].usd
    }
    if (id === 'penguin-finance') {
      return 2.27
    }
  }
  return 1
}

export const getPangolinLpPrice = async (address) => {
  const pair = await getPangolinPair(address)
  const price = Number(pair.reserveUSD) / Number(pair.totalSupply)
  return price || 1
}

export const getJoeLpPrice = async (address) => {
  const pair = await getJoePair(address)
  const price = Number(pair.reserveUSD) / Number(pair.totalSupply)
  return price || 1
}

export const getSushiLpPrice = async (address) => {
  const pair = await getSushiPair(address)

  // const price = Number(pair.reserveUSD) / Number(pair.totalSupply)
  // only for sushi.e-pefi
  const token1Price = await getTokenPriceFromCoingecko('penguin-finance')
  const price = (2 * (token1Price * Number(pair.reserve1))) / Number(pair.totalSupply)
  return price || 1
}
