import { useEffect, useState } from 'react'
import { getJoePrice } from 'utils/price'

const useJoePrice = () => {
  const [price, setPrice] = useState(1)

  const fetchPrice = async () => {
    const lpPrice = await getJoePrice()
    setPrice(lpPrice)
  }

  useEffect(() => {
    // fetchPrice()
    fetchPrice()
    setInterval(() => {
      fetchPrice()
    }, 5000)
  }, [])

  return price
}

export default useJoePrice
