import addresses from 'config/constants/contracts'
import { Address } from 'config/constants/types'

export const getAddress = (address: Address): string => {
  const mainNetChainId = 43114
  const chainId = process.env.REACT_APP_CHAIN_ID
  return address[chainId] ? address[chainId] : address[mainNetChainId]
}

export const getPefiAddress = () => {
  return getAddress(addresses.pefi)
}
export const getMasterChefAddress = () => {
  return getAddress(addresses.masterChef)
}
export const getEmperorAddress = () => {
  return getAddress(addresses.emperor)
}
export const getXPefiAddress = () => {
  return getAddress(addresses.xPefi)
}
export const getMulticallAddress = () => {
  return getAddress(addresses.mulltiCall)
}
export const getWavaxAddress = () => {
  return getAddress(addresses.wavax)
}
export const getLotteryAddress = () => {
  return getAddress(addresses.lottery)
}
export const getLotteryTicketAddress = () => {
  return getAddress(addresses.lotteryNFT)
}
export const getPancakeProfileAddress = () => {
  return getAddress(addresses.pancakeProfile)
}
export const getPancakeRabbitsAddress = () => {
  return getAddress(addresses.pancakeRabbits)
}
export const getBunnyFactoryAddress = () => {
  return getAddress(addresses.bunnyFactory)
}
export const getClaimRefundAddress = () => {
  return getAddress(addresses.claimRefund)
}
export const getPointCenterIfoAddress = () => {
  return getAddress(addresses.pointCenterIfo)
}
export const getBunnySpecialAddress = () => {
  return getAddress(addresses.bunnySpecial)
}
export const getWithoutBordersAddress = () => {
  return getAddress(addresses.withoutBorders)
}
export const getCharityPenguinDBAddress = () => {
  return getAddress(addresses.charityPenguinDB)
}
