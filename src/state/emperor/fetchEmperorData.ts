import { AbiItem } from 'web3-utils'
import { getWeb3 } from 'utils/web3'
import emperorAbi from 'config/abi/emperor.json'

import { getEmperorAddress } from 'utils/addressHelpers'
import { Emperor } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'

// Pool 0, Cake / Cake is a different kind of contract (master chef)
// AVAX pools use the native AVAX token (wrapping ? unwrapping is done at the contract level)
const web3 = getWeb3()
const emperorContract = new web3.eth.Contract((emperorAbi as unknown) as AbiItem, getEmperorAddress())

export const fetchCurrentEmperorAddress = async () => {
  try {
    const currentEmperorAddress = await emperorContract.methods.currentEmperor().call()
    return currentEmperorAddress
  } catch (error) {
    return {}
  }
}

export const fetchCurrentEmperorBid = async () => {
  try {
    const currentEmperorBid = await emperorContract.methods.currentEmperorBid().call()
    return getBalanceNumber(currentEmperorBid)
  } catch (error) {
    return 0
  }
}

export const fetchMaxBidIncrease = async () => {
  try {
    const maxBidIncrease = await emperorContract.methods.maxBidIncrease().call()
    return getBalanceNumber(maxBidIncrease)
  } catch (error) {
    return 0
  }
}

export const fetchMinBidIncrease = async () => {
  try {
    const minBidIncrease = await emperorContract.methods.minBidIncrease().call()
    return getBalanceNumber(minBidIncrease)
  } catch (error) {
    return 0
  }
}

export const fetchCurrentEmperorJackpot = async () => {
  try {
    const currentEmperorJackpot = await emperorContract.methods.jackpot().call()
    return getBalanceNumber(currentEmperorJackpot)
  } catch (error) {
    return 0
  }
}

export const fetchEmperorData = async (currentEmperorAddress) => {
  try {
    const currentEmperor = await emperorContract.methods.penguDB(currentEmperorAddress).call()
    const { color, isRegistered, lastCrowningBlockTimestamp, nickname, style, timeAsEmperor } = currentEmperor

    return {
      color,
      isRegistered,
      lastCrowningBlockTimestamp,
      nickname,
      style,
      timeAsEmperor,
    }
  } catch (error) {
    return {}
  }
}

export const fetchTopEmperors = async () => {
  const NON_ADDRESS = '0x0000000000000000000000000000000000000000'
  try {
    let topEmperors: Emperor[] = []
    const topEmperor1Address = await emperorContract.methods.topEmperors(0).call()
    if (topEmperor1Address !== NON_ADDRESS) {
      const topEmperor1 = await fetchEmperorData(topEmperor1Address)
      topEmperors = [...topEmperors, { ...topEmperor1, address: topEmperor1Address }]
    }

    const topEmperor2Address = await emperorContract.methods.topEmperors(1).call()
    if (topEmperor2Address !== NON_ADDRESS) {
      const topEmperor2 = await fetchEmperorData(topEmperor2Address)
      topEmperors = [...topEmperors, { ...topEmperor2, address: topEmperor2Address }]
    }

    const topEmperor3Address = await emperorContract.methods.topEmperors(2).call()
    if (topEmperor3Address !== NON_ADDRESS) {
      const topEmperor3 = await fetchEmperorData(topEmperor3Address)
      topEmperors = [...topEmperors, { ...topEmperor3, address: topEmperor3Address }]
    }

    const topEmperor4Address = await emperorContract.methods.topEmperors(3).call()
    if (topEmperor4Address !== NON_ADDRESS) {
      const topEmperor4 = await fetchEmperorData(topEmperor4Address)
      topEmperors = [...topEmperors, { ...topEmperor4, address: topEmperor4Address }]
    }

    const topEmperor5Address = await emperorContract.methods.topEmperors(4).call()
    if (topEmperor5Address !== NON_ADDRESS) {
      const topEmperor5 = await fetchEmperorData(topEmperor5Address)
      topEmperors = [...topEmperors, { ...topEmperor5, address: topEmperor5Address }]
    }

    return topEmperors
  } catch (error) {
    return {}
  }
}