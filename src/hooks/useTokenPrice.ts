import Axios from 'axios'
import { useEffect, useState } from 'react'

const useTokenPrice = () => {
  const [lydPrice, setLydPrice] = useState(1)
  const [sushiPrice, setSushiPrice] = useState(1)
  const [qiPrice, setQiPrice] = useState(1)
  const [vsoPrice, setVsoPrice] = useState(0)
  const [boofiPrice, setBoofiPrice] = useState(0)
  const [evrtPrice, setEvrtPrice] = useState(0)

  const fetchPrice = async () => {
    const url = 'https://api.lydia.finance/api/v1/price'
    const res = await Axios.get(url)
    if (res.status === 200) {
      const { prices } = res.data

      setLydPrice(prices.LYD)
      setSushiPrice(prices['SUSHI.e'])
      setQiPrice(prices.QI)
      setVsoPrice(prices.VSO)
      setBoofiPrice(prices.BOOFI)
      setEvrtPrice(prices.EVRT)
    }
  }

  useEffect(() => {
    fetchPrice()
    setInterval(() => {
      fetchPrice()
    }, 5000)
  }, [])

  return { lydPrice, sushiPrice, qiPrice, vsoPrice, boofiPrice, evrtPrice }
}

export default useTokenPrice
