import { AbiItem } from 'web3-utils'
import { getWeb3, getContract } from 'utils/web3'
import emperorAbi from 'config/abi/emperor.json'


import poolsConfig from 'config/constants/pools'
import masterChefABI from 'config/abi/masterchef.json'
import sousChefABI from 'config/abi/sousChef.json'
import erc20ABI from 'config/abi/erc20.json'
import { QuoteToken } from 'config/constants/types'
import multicall from 'utils/multicall'
import { getAddress, getMasterChefAddress, getEmperorAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'
import { Emperor } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance';

// Pool 0, Cake / Cake is a different kind of contract (master chef)
// AVAX pools use the native AVAX token (wrapping ? unwrapping is done at the contract level)
const nonBnbPools = poolsConfig.filter((p) => p.stakingTokenName !== QuoteToken.AVAX)
const bnbPools = poolsConfig.filter((p) => p.stakingTokenName === QuoteToken.AVAX)
const nonMasterPools = poolsConfig.filter((p) => p.sousId !== 0)
const web3 = getWeb3()
const masterChefContract = new web3.eth.Contract((masterChefABI as unknown) as AbiItem, getMasterChefAddress())

const emperorContract = new web3.eth.Contract((emperorAbi as unknown) as AbiItem, getEmperorAddress())

// const emperorContract = getContract(emperorAbi, getEmperorAddress())


export const fetchPoolsAllowance = async (account) => {
  const calls = nonBnbPools.map((p) => ({
    address: p.stakingTokenAddress,
    name: 'allowance',
    params: [account, getAddress(p.contractAddress)],
  }))

  const allowances = await multicall(erc20ABI, calls)
  return nonBnbPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(allowances[index]).toJSON() }),
    {},
  )
}

export const fetchUserBalances = async (account) => {
  // Non AVAX pools
  const calls = nonBnbPools.map((p) => ({
    address: p.stakingTokenAddress,
    name: 'balanceOf',
    params: [account],
  }))
  const tokenBalancesRaw = await multicall(erc20ABI, calls)
  const tokenBalances = nonBnbPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(tokenBalancesRaw[index]).toJSON() }),
    {},
  )

  // AVAX pools
  const bnbBalance = await web3.eth.getBalance(account)
  const bnbBalances = bnbPools.reduce(
    (acc, pool) => ({ ...acc, [pool.sousId]: new BigNumber(bnbBalance).toJSON() }),
    {},
  )

  return { ...tokenBalances, ...bnbBalances }
}

export const fetchUserStakeBalances = async (account) => {
  const calls = nonMasterPools.map((p) => ({
    address: getAddress(p.contractAddress),
    name: 'balanceOf',
    params: [account],
  }))
  const userInfo = await multicall(sousChefABI, calls)
  const stakedBalances = nonMasterPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(userInfo[index]).toJSON(),
    }),
    {},
  )

  // Cake / Cake pool
  const { amount: masterPoolAmount } = await masterChefContract.methods.userInfo('0', account).call()

  return { ...stakedBalances, 0: new BigNumber(masterPoolAmount).toJSON() }
}

export const fetchUserPendingRewards = async (account) => {
  const calls = nonMasterPools.map((p) => ({
    address: getAddress(p.contractAddress),
    name: 'pendingReward',
    params: [account],
  }))
  const res = await multicall(sousChefABI, calls)
  const pendingRewards = nonMasterPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(res[index]).toJSON(),
    }),
    {},
  )

  // Cake / Cake pool
  const pendingReward = await masterChefContract.methods.pendingPEFI('0', account).call()

  return { ...pendingRewards, 0: new BigNumber(pendingReward).toJSON() }
}


export const fetchCurrentEmperorAddress = async () => {
  try {
    const currentEmperorAddress = await emperorContract.methods.currentEmperor().call()
    return currentEmperorAddress;
  } catch (error) {
    return {}
  }
}

export const fetchCurrentEmperorBid = async () => {
  try {
    const currentEmperorBid = await emperorContract.methods.currentEmperorBid().call()
    return getBalanceNumber(currentEmperorBid);
  } catch (error) {
    return 0
  }
}

export const fetchMaxBidIncrease = async () => {
  try {
    const maxBidIncrease = await emperorContract.methods.maxBidIncrease().call()
    return getBalanceNumber(maxBidIncrease);
  } catch (error) {
    return 0
  }
}

export const fetchMinBidIncrease = async () => {
  try {
    const minBidIncrease = await emperorContract.methods.minBidIncrease().call()
    return getBalanceNumber(minBidIncrease);
  } catch (error) {
    return 0
  }
}

export const fetchCurrentEmperorJackpot = async () => {
  try {
    const currentEmperorJackpot = await emperorContract.methods.jackpot().call()
    return getBalanceNumber(currentEmperorJackpot);
  } catch (error) {
    return 0
  }
}

export const fetchEmperorData = async (currentEmperorAddress) => {
  try {
    const currentEmperor = await emperorContract.methods.penguDB(currentEmperorAddress).call()
    const {
      color,
      isRegistered,
      lastCrowningBlockTimestamp,
      nickname,
      style,
      timeAsEmperor,
    } = currentEmperor

    return {
      color,
      isRegistered,
      lastCrowningBlockTimestamp,
      nickname,
      style,
      timeAsEmperor
    };
  } catch (error) {
    return {}
  }
}

export const fetchTopEmperors = async () => {
  const NON_ADDRESS = '0x0000000000000000000000000000000000000000'
  try {
    let topEmperors: Emperor[] = [];
    const topEmperor1Address = await emperorContract.methods.topEmperors(0).call();
    if (topEmperor1Address !== NON_ADDRESS) {
      const topEmperor1 = await fetchEmperorData(topEmperor1Address);
      topEmperors = [
        ...topEmperors,
        { ...topEmperor1, address: topEmperor1Address }
      ]
    }

    const topEmperor2Address = await emperorContract.methods.topEmperors(1).call();
    if (topEmperor2Address !== NON_ADDRESS) {
      const topEmperor2 = await fetchEmperorData(topEmperor2Address);
      topEmperors = [
        ...topEmperors,
        { ...topEmperor2, address: topEmperor2Address }
      ]
    }

    const topEmperor3Address = await emperorContract.methods.topEmperors(2).call();
    if (topEmperor3Address !== NON_ADDRESS) {
      const topEmperor3 = await fetchEmperorData(topEmperor3Address);
      topEmperors = [
        ...topEmperors,
        { ...topEmperor3, address: topEmperor3Address }

      ]
    }


    const topEmperor4Address = await emperorContract.methods.topEmperors(3).call();
    if (topEmperor4Address !== NON_ADDRESS) {
      const topEmperor4 = await fetchEmperorData(topEmperor4Address);
      topEmperors = [
        ...topEmperors,
        { ...topEmperor4, address: topEmperor4Address }

      ]
    }


    const topEmperor5Address = await emperorContract.methods.topEmperors(4).call();
    if (topEmperor5Address !== NON_ADDRESS) {
      const topEmperor5 = await fetchEmperorData(topEmperor5Address);
      topEmperors = [
        ...topEmperors,
        { ...topEmperor5, address: topEmperor5Address }
      ]
    }

    return topEmperors
  } catch (error) {
    return {}
  }
}
