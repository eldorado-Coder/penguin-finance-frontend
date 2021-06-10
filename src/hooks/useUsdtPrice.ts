import { useEffect, useState } from 'react'
import Axios from 'axios'
import { COINGECKO_API_ENDPOINT } from '../config'
import { appendParams } from '../utils/axios'

const useUsdtPrice = () => {
  const [price, setPrice] = useState(1)

  const fetchPrice = async () => {
    const _price = 0.996
    const url = appendParams(`${COINGECKO_API_ENDPOINT}/v3/simple/price`, { ids: 'tether', vs_currencies: 'usd' })

    Axios.get(url)
      .then((res) => {
        if (res.status === 200) {
          setPrice(res.data.tether.usd)
        }
      })
      .catch((err) => {
        console.log('error--->', err)
      })
    setPrice(_price)
  }

  useEffect(() => {
    fetchPrice()
  }, [])

  return { price }
}

export default useUsdtPrice
