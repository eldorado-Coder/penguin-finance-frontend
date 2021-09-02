import addresses from 'config/constants/contracts'
import { Address } from 'config/constants/types'
import compounderFarms from 'config/constants/compounderFarms'
import useAssets from 'hooks/useAssets'

export const getTokenLogo = (address: Address): string => {
  const assets = useAssets()

  const mainNetChainId = 43114
  const chainId = process.env.REACT_APP_CHAIN_ID
  return address[chainId] ? address[chainId] : address[mainNetChainId]
}
