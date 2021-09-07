import { useEffect, useState } from 'react'
import Axios from 'axios'
import { ASSET_CONTENT_PANGOLIN_URL } from 'config'

const useAssets = () => {
  const [assets, setAssets] = useState([])

  const fetchAssets = async () => {
    Axios.get(ASSET_CONTENT_PANGOLIN_URL)
      .then((res) => {
        if (res.status === 200) {
          setAssets(res.data.tokens)
        }
      })
      .catch((err) => {
        console.log('error--->', err)
      })
  }

  const getTokenLogo = (tokenAddress) => {
    const asset = assets.find((row) => row.address === tokenAddress)
    if (asset) return asset.logoURI
    if (tokenAddress === '0x35F77746A902068817f80f4722685ed6a90A3f8f') return '/images/tokens/PEFI.svg'
    if (tokenAddress === '0x128575200A8a04d132FF69937F42E8Bf71F4dF17') return '/images/tokens/ipefi.svg'
    return undefined
  }

  const getTokenSymbol = (tokenAddress) => {
    if (tokenAddress === '0x60781C2586D68229fde47564546784ab3fACA982') return 'PNG'
    if (tokenAddress === '0x35F77746A902068817f80f4722685ed6a90A3f8f') return 'PEFI'
    if (tokenAddress === '0x128575200A8a04d132FF69937F42E8Bf71F4dF17') return 'iPEFI'
    return undefined
  }

  useEffect(() => {
    fetchAssets()

    setInterval(() => {
      fetchAssets()
    }, 100000)
  }, [])

  return { assets, getTokenLogo, getTokenSymbol }
}

export default useAssets
