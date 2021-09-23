import addresses from 'config/constants/contracts'
import { Address } from 'config/constants/types'
import compounderFarms from 'config/constants/compounderFarms'

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
export const getGondolaMasterChefAddress = () => {
  return getAddress(addresses.gondolaMasterChef)
}
export const getLydiaMasterChefAddress = () => {
  return getAddress(addresses.lydiaMasterChef)
}
export const getJoeMasterChefAddress = () => {
  return getAddress(addresses.joeMasterChef)
}
export const getPangolinAddress = () => {
  return getAddress(addresses.pangolinManager)
}
export const getXPefiAddress = () => {
  return getAddress(addresses.xPefi)
}
export const getIPefiAddress = () => {
  return getAddress(addresses.iPefi)
}
export const getTestXPefiAddress = () => {
  return getAddress(addresses.testXPefi)
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
// emperor
export const getEmperorAddress = () => {
  return getAddress(addresses.emperor)
}
export const getEmperorPenguinDBAddress = () => {
  return getAddress(addresses.emperorPenguinDB)
}
// covid emperor
export const getWithoutBordersAddress = () => {
  return getAddress(addresses.withoutBorders)
}
export const getCharityPenguinDBAddress = () => {
  return getAddress(addresses.charityPenguinDB)
}

export const getCompounderFarmLpAddress = (lpSymbol: string, farmType: string) => {
  const farm = compounderFarms.find((farmItem) => farmItem.lpSymbol === lpSymbol && farmItem.type === farmType)
  return getAddress(farm.lpAddresses)
}

// launchpad
export const getLaunchpadAddress = () => {
  return getAddress(addresses.launchPad)
}
export const getLaunchpadBoofiAddress = () => {
  return getAddress(addresses.launchPadBoofi)
}
// booster rocket
export const getBoosterRocketAddress = () => {
  return getAddress(addresses.boosterRocket)
}

export const getBoosterRocketPefiAddress = () => {
  return getAddress(addresses.boosterRocketPefi)
}

export const getBoosterRocketSherpaAddress = () => {
  return getAddress(addresses.boosterRocketSherpa)
}

// v2
export const getNestMigratorAddress = () => {
  return getAddress(addresses.nestMigrator)
}

export const getV2NestAddress = () => {
  return getAddress(addresses.iPefi)
}

// v2 farms
export const getV2MasterChefAddress = () => {
  return getAddress(addresses.v2MasterChef)
}
