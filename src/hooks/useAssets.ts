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
    if (tokenAddress === '0xe896CDeaAC9615145c0cA09C8Cd5C25bced6384c') return '/images/tokens/PEFI.svg'
    if (tokenAddress === '0xE9476e16FE488B90ada9Ab5C7c2ADa81014Ba9Ee') return '/images/tokens/ipefi.svg'
    return undefined
  }

  const getTokenSymbol = (tokenAddress) => {
    if (tokenAddress === '0x60781C2586D68229fde47564546784ab3fACA982') return 'PNG'
    if (tokenAddress === '0xe896CDeaAC9615145c0cA09C8Cd5C25bced6384c') return 'PEFI'
    if (tokenAddress === '0xE9476e16FE488B90ada9Ab5C7c2ADa81014Ba9Ee') return 'iPEFI'
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
