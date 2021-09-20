import Axios from 'axios'
import { useEffect, useState } from 'react'

const useTokenPrice = () => {
  const [lydPrice, setLydPrice] = useState(1)
  const [sushiPrice, setSushiPrice] = useState(1)

  const fetchPrice = async () => {
    const url = 'https://api.lydia.finance/api/v1/price'
    const res = await Axios.get(url)
    if (res.status === 200) {
      const { prices } = res.data
      setLydPrice(prices.LYD)
      setSushiPrice(prices['SUSHI.e'])
    }
  }

  useEffect(() => {
    fetchPrice()
    setInterval(() => {
      fetchPrice()
    }, 5000)
  }, [])

  return { lydPrice, sushiPrice }
}

export default useTokenPrice
