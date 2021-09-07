import { useEffect, useState } from 'react'

const useUsdtPrice = () => {
  const [price, setPrice] = useState(1)

  useEffect(() => {
    // fetchPrice()
    setPrice(1)
  }, [])

  return { price }
}

export default useUsdtPrice
