import emperorAbi from 'config/abi/emperor.json'
import emperorPenguinDBAbi from 'config/abi/charityPenguin.json'
import { getEmperorAddress, getEmperorPenguinDBAddress } from 'utils/addressHelpers'
import { Emperor } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import multicall from 'utils/multicall'
import { NON_ADDRESS } from 'config'

const emperorContractAddress = getEmperorAddress()
const emperorPenguinDBContractAddress = getEmperorPenguinDBAddress()

/*
 * Fetch general data
 */
export const fetchGeneralData = async () => {
  try {
    // get general data from emperor contract
    const generalDataCalls = [
      // maxBidIncrease
      {
        address: emperorContractAddress,
        name: 'maxBidIncrease',
      },
      // minBidIncrease
      {
        address: emperorContractAddress,
        name: 'minBidIncrease',
      },
      // openingBid
      {
        address: emperorContractAddress,
        name: 'openingBid',
      },
      // finalDate
      {
        address: emperorContractAddress,
        name: 'finalDate',
      },
      // poisonDuration
      {
        address: emperorContractAddress,
        name: 'poisonDuration',
      },
      // poisonCost
      {
        address: emperorContractAddress,
        name: 'poisonCost',
      },
    ]
    const [maxBidIncrease, minBidIncrease, openingBid, finalDate, poisonDuration, poisonCost] = await multicall(
      emperorAbi,
      generalDataCalls,
    )

    return {
      maxBidIncrease: getBalanceNumber(maxBidIncrease),
      minBidIncrease: getBalanceNumber(minBidIncrease),
      openingBid: getBalanceNumber(openingBid),
      finalDate: finalDate[0].toNumber(),
      poisonDuration: poisonDuration[0].toNumber(),
      poisonCost: getBalanceNumber(poisonCost)
    }
  } catch (error) {
    return {}
  }
}

/*
 * Fetch Emperor data
 * param: account: address
 */
export const fetchEmperorData = async (account) => {
  try {
    // from data from emperor contract
    const emperorContractCalls = [
      // emperorData with timeAsEmperor, lastCrowningBlockTimestamp
      {
        address: emperorContractAddress,
        name: 'playerDB',
        params: [account],
      },
      // canBePoisoned
      {
        address: emperorContractAddress,
        name: 'canBePoisoned',
        params: [account],
      },
      // lastTimePoisoned
      {
        address: emperorContractAddress,
        name: 'lastTimePoisoned',
        params: [account],
      },
      // lastPoisonedBy
      {
        address: emperorContractAddress,
        name: 'lastPoisonedBy',
        params: [account],
      },
      // timePoisonedRemaining
      {
        address: emperorContractAddress,
        name: 'timePoisonedRemaining',
        params: [account],
      },
      // timeLeftForPoison
      {
        address: emperorContractAddress,
        name: 'timeLeftForPoison',
        params: [account],
      },

      // current emperor bid
      {
        address: emperorContractAddress,
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

    // from data from emperorPenguinDB contract
    const emperorPenguinDBContractCalls = [
      // emperorPenguinData
      {
        address: emperorPenguinDBContractAddress,
        name: 'penguDB',
        params: [account],
      },
      // lastPoisonedByNickname
      {
        address: emperorPenguinDBContractAddress,
        name: 'nickname',
        params: [lastPoisonedByAddress[0]],
      },
    ]
    const [emperorPenguinData, lastPoisonedByNickname] = await multicall(
      emperorPenguinDBAbi,
      emperorPenguinDBContractCalls,
    )

    const { timeAsEmperor, lastCrowningBlockTimestamp } = emperorData
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
    // from current emperor data from emperor contract
    const emperorContractCalls = [
      // current emperor address
      {
        address: emperorContractAddress,
        name: 'currentEmperor',
      },
      // current emperor bid
      {
        address: emperorContractAddress,
        name: 'currentEmperorBid',
      },
      // current emperor jackpot
      {
        address: emperorContractAddress,
        name: 'jackpot',
      },
    ]
    const [currentEmperorAddress, currentEmperorBid, currentEmperorJackpot] = await multicall(
      emperorAbi,
      emperorContractCalls,
    )
    const data = await fetchEmperorData(currentEmperorAddress[0])

    return {
      ...data,
      currentEmperorAddress,
      bidAmount: getBalanceNumber(currentEmperorBid),
      jackpot: getBalanceNumber(currentEmperorJackpot),
    }
  } catch (error) {
    return {}
  }
}

/*
 * Fetch top 5 emperor data
 */
export const fetchTopEmperors = async () => {
  const emperorContractCalls = [
    // current emperor address
    {
      address: emperorContractAddress,
      name: 'topEmperors',
      params: [0],
    },
    {
      address: emperorContractAddress,
      name: 'topEmperors',
      params: [1],
    },
    {
      address: emperorContractAddress,
      name: 'topEmperors',
      params: [2],
    },
    {
      address: emperorContractAddress,
      name: 'topEmperors',
      params: [3],
    },
    {
      address: emperorContractAddress,
      name: 'topEmperors',
      params: [4],
    },
  ]
  const topEmperorAddresses = await multicall(emperorAbi, emperorContractCalls)

  try {
    let promises = []
    for (let i = 0; i < 5; i++) {
      const topEmperorAddress = topEmperorAddresses[i][0]
      if (topEmperorAddress === NON_ADDRESS) {
        break
      }
      promises = [...promises, fetchEmperorData(topEmperorAddress)]
    }

    const topEmperors: Emperor[] = await Promise.all(promises)

    // eslint-disable-next-line consistent-return
    return topEmperors
  } catch (error) {
    // eslint-disable-next-line consistent-return
    return []
  }
}
