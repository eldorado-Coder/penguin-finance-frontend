import Axios from 'axios'
import { NEST_APR_PER_DAY, DAYS_PER_YEAR, PANGOLIN_REWARD_POOL_API } from 'config'

const roundToTwoDp = (number) => Math.round(number * 100) / 100

export const calculateCakeEarnedPerThousandDollars = ({ numberOfDays, farmApy, pefiPrice }) => {
  // Everything here is worked out relative to a year, with the asset compounding daily
  const timesCompounded = DAYS_PER_YEAR
  //   We use decimal values rather than % in the math for both APY and the number of days being calculates as a proportion of the year
  const apyAsDecimal = farmApy / 100
  const daysAsDecimalOfYear = numberOfDays / timesCompounded
  //   Calculate the starting PEFI balance with a dollar balance of $1000.
  const principal = 1000 / pefiPrice

  // This is a translation of the typical mathematical compounding APY formula. Details here: https://www.calculatorsoup.com/calculators/financial/compound-interest-calculator.php
  const finalAmount = principal * (1 + apyAsDecimal / timesCompounded) ** (timesCompounded * daysAsDecimalOfYear)

  // To get the penguin earned, deduct the amount after compounding (finalAmount) from the starting PEFI balance (principal)
  const interestEarned = finalAmount - principal
  return roundToTwoDp(interestEarned)
}

export const apyModalRoi = ({ amountEarned, amountInvested }) => {
  const percentage = (amountEarned / amountInvested) * 100
  return percentage.toFixed(2)
}

export const getNestApr = () => {
  return (DAYS_PER_YEAR * NEST_APR_PER_DAY) / 100
}

export const getNestApy = () => {
  return (1 + NEST_APR_PER_DAY / 100) ** DAYS_PER_YEAR - 1
}

export const getCompoundApy = ({ normalApy, type }: { normalApy: string; type: string }) => {
  if (!normalApy) return ''

  const _normalApy = Number(normalApy) / 100

  if (type === 'Lydia' || type === 'Pangolin' || type === 'Gondola') {
    const compoundApy = (1 + _normalApy / DAYS_PER_YEAR) ** DAYS_PER_YEAR - 1
    return (compoundApy * 100).toFixed(2)
  }

  if (type === 'Penguin') {
    const nestStakingBips = 5000
    const nestAPY = getNestApr()
    const compoundApy1 = (1 + (_normalApy * (1 - nestStakingBips / 10000)) / 730) ** 730 - 1
    const compoundApy2 = (nestStakingBips / 10000) * _normalApy * (((nestAPY / 2) * 729) / 730 + 1)
    return ((compoundApy1 + compoundApy2) * 100).toFixed(2)
  }

  return normalApy
}

// v2
export const getV2NestApy = (dailyApr = 0) => {
  const staticFee = 0
  return (1 + dailyApr) ** DAYS_PER_YEAR - 1 + staticFee
}

export const getPangolinRewardPoolApr = async (address) => {
  if (!address) return { apr: 0, dailyApr: 0 }
  const aprUrl = `${PANGOLIN_REWARD_POOL_API}/apr/${address}`
  const res = await Axios.get(aprUrl)
  if (res.status === 200) {
    const apr = res.data.combinedApr ? res.data.combinedApr / 100 : 0
    return { apr, dailyApr: apr / 365 }
  }
  return { apr: 0, dailyApr: 0 }
}

export const getJoeRewardPoolApr = async (address) => {
  let apr = 0
  // usdt.e-avax
  if (address === '0xed8cbd9f0ce3c6986b22002f03c6475ceb7a6256') {
    apr = 0.7429
  }
  // usdc.e-avax
  if (address === '0xa389f9430876455c36478deea9769b7ca4e3ddb1') {
    apr = 0.6507
  }
  // pefi-avax
  if (address === '0xb78c8238bd907c42be45aebdb4a8c8a5d7b49755') {
    apr = 1.53
  }
  // eth.e-avax
  if (address === '0xfe15c2695f1f920da45c30aae47d11de51007af9') {
    apr = 0.4811
  }
  return { apr, dailyApr: apr / 365 }
}

export const getApy = (dailyApr = 0) => {
  const staticFee = 0
  return (1 + dailyApr) ** DAYS_PER_YEAR - 1 + staticFee
}

export const getApr = (dailyApr = 0) => {
  return dailyApr * DAYS_PER_YEAR
}
