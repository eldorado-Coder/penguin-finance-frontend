import { AbiItem } from 'web3-utils'
import { getWeb3 } from 'utils/web3'
import donationsAbi from 'config/abi/donations.json'

import { getWithoutBordersAddress } from 'utils/addressHelpers'

// Pool 0, Cake / Cake is a different kind of contract (master chef)
// AVAX pools use the native AVAX token (wrapping ? unwrapping is done at the contract level)
const web3 = getWeb3()
const donationsContract = new web3.eth.Contract((donationsAbi as unknown) as AbiItem, getWithoutBordersAddress())

export const fetchLastDonation = async () => {
  try {
    const lastDonation = await donationsContract.methods.lastDonation().call()
    return lastDonation
  } catch (error) {
    return {}
  }
}

export const fetchTotalPefiRaised = async () => {
  try {
    const totalPefiRaised = await donationsContract.methods.totalPefiRaised().call()
    return totalPefiRaised
  } catch (error) {
    return {}
  }
}

export const fetchTotalAvaxRaised = async () => {
  try {
    const totalAvaxRaised = await donationsContract.methods.totalAvaxRaised().call()
    return totalAvaxRaised
  } catch (error) {
    return {}
  }
}

export const fetchLatestDonor = async () => {
  try {
    const latestDonorAddress = await donationsContract.methods.latestDonor().call()
    const latestDonorName = await donationsContract.methods.getCurrentEmperorNickname().call()
    const latestDonor = await fetchPlayerData(latestDonorAddress)
    return {
      ...latestDonor,
      latestDonorName,
      address: latestDonorAddress,
    }
  } catch (error) {
    return {}
  }
}

export const fetchMyDonor = async (address: string) => {
  try {
    const myDonor = await fetchPlayerData(address)
    return {
      ...myDonor,
    }
  } catch (error) {
    return {}
  }
}

export const fetchPlayerData = async (playerAddress) => {
  try {
    const player = await donationsContract.methods.playerDB(playerAddress).call()
    const { avaxDonations, pefiDonations } = player

    return {
      avaxDonations,
      pefiDonations,
    }
  } catch (error) {
    return {}
  }
}

export const fetchFinalDate = async () => {
  try {
    const finalDate = await donationsContract.methods.finalDate().call()
    return finalDate
  } catch (error) {
    return {}
  }
}
