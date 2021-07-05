import { AbiItem } from 'web3-utils'
import { getWeb3 } from 'utils/web3'
import emperorAbi from 'config/abi/emperor.json'
import emperorPenguinDBAbi from 'config/abi/charityPenguin.json'
import { getEmperorAddress, getEmperorPenguinDBAddress } from 'utils/addressHelpers'
import { Emperor } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import multicall from 'utils/multicall'

// Pool 0, Cake / Cake is a different kind of contract (master chef)
// AVAX pools use the native AVAX token (wrapping ? unwrapping is done at the contract level)
const web3 = getWeb3()
const emperorContract = new web3.eth.Contract((emperorAbi as unknown) as AbiItem, getEmperorAddress())
const penguinDBContract = new web3.eth.Contract(
  (emperorPenguinDBAbi as unknown) as AbiItem,
  getEmperorPenguinDBAddress(),
)

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

export const fetchOpeningBid = async () => {
  try {
    const openingBid = await emperorContract.methods.openingBid().call()
    return getBalanceNumber(openingBid)
  } catch (error) {
    return 0
  }
}

export const fetchFinalDate = async () => {
  try {
    const finalDate = await emperorContract.methods.finalDate().call()
    return Number(finalDate)
  } catch (error) {
    return 0
  }
}

export const fetchPoisonDuration = async () => {
  try {
    const poisonDuration = await emperorContract.methods.poisonDuration().call()
    return Number(poisonDuration)
  } catch (error) {
    return 0
  }
}

export const fetchCanBePoisoned = async (account) => {
  try {
    const canBePoisoned = await emperorContract.methods.canBePoisoned(account).call()
    return canBePoisoned
  } catch (error) {
    return 0
  }
}

export const fetchLastTimePoisoned = async (account) => {
  try {
    const lastTimePoisoned = await emperorContract.methods.lastTimePoisoned(account).call()
    return Number(lastTimePoisoned)
  } catch (error) {
    return 0
  }
}

export const fetchLastPoisonedBy = async (account) => {
  try {
    const lastPoisonedByAddress = await emperorContract.methods.lastPoisonedBy(account).call()
    const lastPoisonedByNickname = await penguinDBContract.methods.nickname(lastPoisonedByAddress).call()
    return lastPoisonedByNickname
  } catch (error) {
    return 0
  }
}

export const fetchTimePoisonedRemaining = async (account) => {
  try {
    const timePoisonedRemaining = await emperorContract.methods.timePoisonedRemaining(account).call()
    return Number(timePoisonedRemaining)
  } catch (error) {
    return 0
  }
}

export const fetchTimeLeftForPoison = async (account) => {
  try {
    const timeLeftForPoison = await emperorContract.methods.timeLeftForPoison(account).call()
    return Number(timeLeftForPoison)
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

export const fetchEmperorData = async (account) => {
  try {
    // from data from emperor contract
    const emperorContractCalls = [
      // emperorData with timeAsEmperor, lastCrowningBlockTimestamp
      {
        address: getEmperorAddress(),
        name: 'playerDB',
        params: [account],
      },
      // canBePoisoned
      {
        address: getEmperorAddress(),
        name: 'canBePoisoned',
        params: [account],
      },
      // lastTimePoisoned
      {
        address: getEmperorAddress(),
        name: 'lastTimePoisoned',
        params: [account],
      },
      // lastPoisonedBy
      {
        address: getEmperorAddress(),
        name: 'lastPoisonedBy',
        params: [account],
      },
      // timePoisonedRemaining
      {
        address: getEmperorAddress(),
        name: 'timePoisonedRemaining',
        params: [account],
      },
      // timeLeftForPoison
      {
        address: getEmperorAddress(),
        name: 'timeLeftForPoison',
        params: [account],
      },

      // current emperor bid
      {
        address: getEmperorAddress(),
        name: 'currentEmperorBid',
      },
    ]
    const [
      emperorData,
      canBePoisoned,
      lastTimePoisoned,
      lastPoisonedByAddress,
      timePoisonedRemaining,
      timeLeftForPoison,
    ] = await multicall(emperorAbi, emperorContractCalls)

    const { timeAsEmperor, lastCrowningBlockTimestamp } = emperorData

    // from data from emperorPenguinDB contract
    const emperorPenguinDBContractCalls = [
      // emperorPenguinData
      {
        address: getEmperorPenguinDBAddress(),
        name: 'penguDB',
        params: [account],
      },
      // lastPoisonedByNickname
      {
        address: getEmperorPenguinDBAddress(),
        name: 'nickname',
        params: [lastPoisonedByAddress[0]],
      },
    ]

    const [emperorPenguinData, lastPoisonedByNickname] = await multicall(
      emperorPenguinDBAbi,
      emperorPenguinDBContractCalls,
    )

    const { nickname, color, isRegistered, style } = emperorPenguinData

    return {
      // emperor
      address: account,
      lastCrowningBlockTimestamp: lastCrowningBlockTimestamp.toNumber(),
      timeAsEmperor: timeAsEmperor.toNumber(),
      canBePoisoned: canBePoisoned[0],
      lastTimePoisoned: lastTimePoisoned[0].toNumber(),
      lastPoisonedBy: lastPoisonedByNickname[0],
      timePoisonedRemaining: timePoisonedRemaining[0].toNumber(),
      timeLeftForPoison: timeLeftForPoison[0].toNumber(),
      // db data
      nickname,
      color,
      isRegistered,
      style: style.toNumber(),
    }
  } catch (error) {
    return {}
  }
}

/*
 * fetch current emperor data
 */
export const fetchCurrentEmperorData = async () => {
  try {
    const currentEmperorAddress = await emperorContract.methods.currentEmperor().call()
    // from current emperor data from emperor contract
    const emperorContractCalls = [
      // current emperor bid
      {
        address: getEmperorAddress(),
        name: 'currentEmperorBid',
      },
      // current emperor jackpot
      {
        address: getEmperorAddress(),
        name: 'jackpot',
      },
    ]
    const [currentEmperorBid, currentEmperorJackpot] = await multicall(emperorAbi, emperorContractCalls)
    const data = await fetchEmperorData(currentEmperorAddress)

    return {
      ...data,
      currentEmperorAddress,
      bidAmount: getBalanceNumber(currentEmperorBid),
      jackpot: getBalanceNumber(currentEmperorJackpot[0]),
    }
  } catch (error) {
    return {}
  }
}

/*
 * fetch top 5 emperor data
 */
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
