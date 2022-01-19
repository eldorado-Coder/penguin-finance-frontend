import { useEffect, useState } from 'react'
import Axios from 'axios'
import { appendParams } from 'utils/axios'
import { COINGECKO_API_ENDPOINT } from 'config'

const useAvaxPrice = () => {
  const [price, setPrice] = useState(40)

  const fetchPrice = async () => {
    const url = appendParams(`${COINGECKO_API_ENDPOINT}/v3/simple/price`, { ids: 'wrapped-avax', vs_currencies: 'usd' })
    Axios.get(url)
      .then((res) => {
        if (res.status === 200) {
          setPrice(res.data['wrapped-avax'].usd)
        }
      })
      .catch((err) => {
        console.log('error--->', err)
      })
    // const url = 'https://avascan.info/api/v2/price'
    // Axios.get(url)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       setPrice(res.data.usd.price)
    //     }
    //   })
    //   .catch((err) => {
    //     console.log('error--->', err)
    //   })
  }

  useEffect(() => {
    fetchPrice()

    setInterval(() => {
      fetchPrice()
    }, 10000)
  }, [])

  return price
}

export default useAvaxPrice
