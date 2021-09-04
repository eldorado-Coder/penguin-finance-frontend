import { useCallback } from 'react'
import { getPair } from 'subgraph/utils/pangolin'

export const usePangolinLpPrice = () => {
  const fetchLpPrice = useCallback(async (address: string) => {
    const pair = await getPair(address)
    const price = Number(pair.reserveUSD) / Number(pair.totalSupply)
    return price || 1
  }, [])

  return { onFetchLpPrice: fetchLpPrice }
}

export const useSushiLpPrice = () => {
  const fetchLpPrice = useCallback(async (address: string) => {
    const pair = await getPair(address)
    console.info(pair)
  }, [])

  return { onFetchLpPrice: fetchLpPrice }
}
