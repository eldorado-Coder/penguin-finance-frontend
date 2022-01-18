import { useEffect, useState } from 'react'
import { AbiItem } from 'web3-utils'
import { ContractOptions } from 'web3-eth-contract'
import useWeb3 from 'hooks/useWeb3'
import {
  getAddress,
  getMasterChefAddress,
  getPefiAddress,
  getLotteryAddress,
  getLotteryTicketAddress,
  getBunnyFactoryAddress,
  getPancakeProfileAddress,
  getPancakeRabbitsAddress,
  getPointCenterIfoAddress,
  getBunnySpecialAddress,
  getEmperorAddress,
  getWithoutBordersAddress as getCharityEmperorAddress,
  getCharityPenguinDBAddress,
  getEmperorPenguinDBAddress,
  getXPefiAddress,
  getIPefiAddress,
  getTestXPefiAddress,
  // launchpad - sherpa
  getLaunchpadAddress,
  getBoosterRocketAddress,
  getBoosterRocketPefiAddress,
  // launchpad - boofi
  getBoofiLaunchpadAddress,
  getBoofiBoosterRocketAddress,
  getBoofiBoosterRocketPayTokenAddress,
  // launchpad - kitty
  getKittyLaunchpadAddress,
  getKittyBoosterRocketAddress,
  getKittyBoosterRocketPayTokenAddress,
  // launchpad - kassandra
  getKassandraLaunchpadAddress,
  getKassandraBoosterRocketAddress,
  getKassandraBoosterRocketPayTokenAddress,
  // v2
  getNestMigratorAddress,
  getV2NestAddress,
  getV2MasterChefAddress,
  getNftDistributorAddress, // nft collectibles
  getClubPenguinMasterChefAddress, // club penguin
} from 'utils/addressHelpers'
import getFarmMasterChefAddress from 'utils/getFarmMasterChefAddress'
import getFarmMasterChefAbi from 'utils/getFarmMasterChefAbi'
import getStrategyAddress from 'utils/getStrategyAddress'
import getStrategyAbi from 'utils/getStrategyAbi'
import { poolsConfig, v2PoolsConfig } from 'config/constants'
import { PoolCategory } from 'config/constants/types'
import ifo from 'config/abi/ifo.json'
import erc20 from 'config/abi/erc20.json'
import bunnyFactory from 'config/abi/bunnyFactory.json'
import pancakeRabbits from 'config/abi/pancakeRabbits.json'
import lottery from 'config/abi/lottery.json'
import lotteryTicket from 'config/abi/lotteryNft.json'
import masterChef from 'config/abi/masterchef.json'
import sousChef from 'config/abi/sousChef.json'
import sousChefBnb from 'config/abi/sousChefBnb.json'
import profile from 'config/abi/pancakeProfile.json'
import pointCenterIfo from 'config/abi/pointCenterIfo.json'
import bunnySpecial from 'config/abi/bunnySpecial.json'
import emperor from 'config/abi/emperor.json'
import donations from 'config/abi/donations.json'
import charityPenguinDB from 'config/abi/charityPenguin.json'
import emperorPenguinDB from 'config/abi/emperorPenguinDB.json'
import xPefi from 'config/abi/xPefi.json'
import iPefi from 'config/abi/iPefi.json'
import launchpad from 'config/abi/launchpad.json'
import boosterRocket from 'config/abi/boosterRocket.json'
import boosterRocketPefi from 'config/abi/launchpad/pefi.json'
import kittyLaunchpad from 'config/abi/launchpadKitty.json'
import kittyBoosterRocket from 'config/abi/kittyBoosterRocket.json'
import kassandraLaunchpad from 'config/abi/launchpadKassandra.json'
import kassandraBoosterRocket from 'config/abi/kassandraBoosterRocket.json'
// v2
import nestMigratorAbi from 'config/abi/nest_migrate.json'
import v2NestAbi from 'config/abi/v2_nest.json'
import v2MasterChef from 'config/abi/v2Masterchef.json'
import getV2FarmMasterChefAddress from 'utils/getV2FarmMasterChefAddress'
import getV2FarmMasterChefAbi from 'utils/getV2FarmMasterChefAbi'
// nft collectibles
import nftDistributor from 'config/abi/nftDistributor.json'
import clubPenguin from 'config/abi/clubPenguin.json'

const useContract = (abi: AbiItem, address: string, contractOptions?: ContractOptions) => {
  const web3 = useWeb3()
  const [contract, setContract] = useState(new web3.eth.Contract(abi, address, contractOptions))

  useEffect(() => {
    setContract(new web3.eth.Contract(abi, address, contractOptions))
  }, [abi, address, contractOptions, web3])

  return contract
}

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useIfoContract = (address: string) => {
  const ifoAbi = (ifo as unknown) as AbiItem
  return useContract(ifoAbi, address)
}

export const useERC20 = (address: string) => {
  const erc20Abi = (erc20 as unknown) as AbiItem
  return useContract(erc20Abi, address)
}

export const usePenguin = () => {
  return useERC20(getPefiAddress())
}

export const useBunnyFactory = () => {
  const bunnyFactoryAbi = (bunnyFactory as unknown) as AbiItem
  return useContract(bunnyFactoryAbi, getBunnyFactoryAddress())
}

export const usePancakeRabbits = () => {
  const pancakeRabbitsAbi = (pancakeRabbits as unknown) as AbiItem
  return useContract(pancakeRabbitsAbi, getPancakeRabbitsAddress())
}

export const useProfile = () => {
  const profileABIAbi = (profile as unknown) as AbiItem
  return useContract(profileABIAbi, getPancakeProfileAddress())
}

export const useLottery = () => {
  const abi = (lottery as unknown) as AbiItem
  return useContract(abi, getLotteryAddress())
}

export const useLotteryTicket = () => {
  const abi = (lotteryTicket as unknown) as AbiItem
  return useContract(abi, getLotteryTicketAddress())
}

export const useMasterchef = (type?: string) => {
  let abi = (masterChef as unknown) as AbiItem
  let masterChefAddress = getMasterChefAddress()
  if (type) {
    abi = (getFarmMasterChefAbi(type) as unknown) as AbiItem
    masterChefAddress = getFarmMasterChefAddress(type)
  }
  return useContract(abi, masterChefAddress)
}

export const useStrategyContract = (lpSymbol: string, type: string) => {
  const abi = (getStrategyAbi(lpSymbol, type) as unknown) as AbiItem
  const strategyAddress = getStrategyAddress(lpSymbol, type)
  return useContract(abi, strategyAddress)
}

export const useSousChef = (id) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  const rawAbi = config.poolCategory === PoolCategory.BINANCE ? sousChefBnb : sousChef
  const abi = (rawAbi as unknown) as AbiItem
  return useContract(abi, getAddress(config.contractAddress))
}

export const usePointCenterIfoContract = () => {
  const abi = (pointCenterIfo as unknown) as AbiItem
  return useContract(abi, getPointCenterIfoAddress())
}

export const useBunnySpecialContract = () => {
  const abi = (bunnySpecial as unknown) as AbiItem
  return useContract(abi, getBunnySpecialAddress())
}

// emperor
export const useEmperor = () => {
  const abi = (emperor as unknown) as AbiItem
  return useContract(abi, getEmperorAddress())
}

export const useEmperorPenguinDB = () => {
  const abi = (emperorPenguinDB as unknown) as AbiItem
  return useContract(abi, getEmperorPenguinDBAddress())
}

// covid emperor
export const useCharityEmperor = () => {
  const abi = (donations as unknown) as AbiItem
  return useContract(abi, getCharityEmperorAddress())
}

export const useCharityPenguinDB = () => {
  const abi = (charityPenguinDB as unknown) as AbiItem
  return useContract(abi, getCharityPenguinDBAddress())
}

export const useXPefi = () => {
  const abi = (xPefi as unknown) as AbiItem
  return useContract(abi, getXPefiAddress())
}

export const useIPefi = () => {
  const abi = (iPefi as unknown) as AbiItem
  return useContract(abi, getIPefiAddress())
}

export const useTestXPefi = () => {
  const abi = (xPefi as unknown) as AbiItem
  return useContract(abi, getTestXPefiAddress())
}

// launchpad sherpa
export const useLaunchPad = () => {
  const abi = (launchpad as unknown) as AbiItem
  return useContract(abi, getLaunchpadAddress())
}

export const useBoosterRocket = () => {
  const abi = (boosterRocket as unknown) as AbiItem
  return useContract(abi, getBoosterRocketAddress())
}

export const useBoosterRocketPayToken = () => {
  const abi = (boosterRocketPefi as unknown) as AbiItem
  return useContract(abi, getBoosterRocketPefiAddress())
}

// launchpad - boofi
export const useBoofiLaunchPad = () => {
  const abi = (launchpad as unknown) as AbiItem
  return useContract(abi, getBoofiLaunchpadAddress())
}

export const useBoofiBoosterRocket = () => {
  const abi = (boosterRocket as unknown) as AbiItem
  return useContract(abi, getBoofiBoosterRocketAddress())
}

export const useBoofiBoosterRocketPayToken = () => {
  const abi = (boosterRocketPefi as unknown) as AbiItem
  return useContract(abi, getBoofiBoosterRocketPayTokenAddress())
}

// launchpad - kitty
export const useKittyLaunchPad = () => {
  const abi = (kittyLaunchpad as unknown) as AbiItem
  return useContract(abi, getKittyLaunchpadAddress())
}

export const useKittyBoosterRocket = () => {
  const abi = (kittyBoosterRocket as unknown) as AbiItem
  return useContract(abi, getKittyBoosterRocketAddress())
}

export const useKittyBoosterRocketPayToken = () => {
  const abi = (boosterRocketPefi as unknown) as AbiItem
  return useContract(abi, getKittyBoosterRocketPayTokenAddress())
}

// launchpad - kassandra
export const useKassandraLaunchPad = () => {
  const abi = (kassandraLaunchpad as unknown) as AbiItem
  return useContract(abi, getKassandraLaunchpadAddress())
}

export const useKassandraBoosterRocket = () => {
  const abi = (kassandraBoosterRocket as unknown) as AbiItem
  return useContract(abi, getKassandraBoosterRocketAddress())
}

export const useKassandraBoosterRocketPayToken = () => {
  const abi = (boosterRocketPefi as unknown) as AbiItem
  return useContract(abi, getKassandraBoosterRocketPayTokenAddress())
}

// v2
export const useNestMigrateContract = () => {
  const abi = (nestMigratorAbi as unknown) as AbiItem
  return useContract(abi, getNestMigratorAddress())
}

export const useV2NestContract = () => {
  const abi = (v2NestAbi as unknown) as AbiItem
  return useContract(abi, getV2NestAddress())
}

export const useV2SousChef = (id) => {
  const config = v2PoolsConfig.find((pool) => pool.sousId === id)
  const rawAbi = config.poolCategory === PoolCategory.BINANCE ? sousChefBnb : sousChef
  const abi = (rawAbi as unknown) as AbiItem
  return useContract(abi, getAddress(config.contractAddress))
}

export const useV2MasterChef = (type?: string) => {
  let abi = (v2MasterChef as unknown) as AbiItem
  let v2MasterChefAddress = getV2MasterChefAddress()
  if (type) {
    abi = (getV2FarmMasterChefAbi(type) as unknown) as AbiItem
    v2MasterChefAddress = getV2FarmMasterChefAddress(type)
  }
  return useContract(abi, v2MasterChefAddress)
}

// nft collectibles
export const useNftDistributor = (type) => {
  const abi = (nftDistributor as unknown) as AbiItem

  return useContract(abi, getNftDistributorAddress(type))
}

// club penguin
export const useClubPenguinMasterChef = () => {
  const abi = (clubPenguin as unknown) as AbiItem
  return useContract(abi, getClubPenguinMasterChefAddress())
}

export default useContract
