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
    if (tokenAddress === '0x8729438EB15e2C8B576fCc6AeCdA6A148776C0F5') return '/images/farms-v2/rewards/qi.png'
    if (tokenAddress === "0x4C9B4E1AC6F24CdE3660D5E4Ef1eBF77C710C084") return '/images/farms-v2/rewards/lydia.png'
    if (tokenAddress === '0x60781C2586D68229fde47564546784ab3fACA982') return '/images/farms-v2/rewards/pangolin.png'
    if (tokenAddress === "0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd") return '/images/farms-v2/rewards/trader_joe.png'
    if (tokenAddress === '0xe896CDeaAC9615145c0cA09C8Cd5C25bced6384c') return '/images/tokens/PEFI.svg'
    if (tokenAddress === '0xE9476e16FE488B90ada9Ab5C7c2ADa81014Ba9Ee') return '/images/tokens/ipefi.svg'
    if (tokenAddress === '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE') return '/images/tokens/avax.svg'
    if (asset) return asset.logoURI
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
