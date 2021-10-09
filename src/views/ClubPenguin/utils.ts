import BigNumber from 'bignumber.js'

export const TIERS = [{ label: 'Ghoul' }, { label: 'Reaper' }, { label: 'Demonlord' }]
export const PRICE_PER_BOOFI = [0.125, 0.115, 0.1]

export const getUnstakeTooltip = (timeLeftForUnstaking) =>
  `
    You'll be able to unstake in <span class="left-time-for-duration">${timeLeftForUnstaking}</span> seconds.
  `

export const getAllocation = (stakedAmount: number) => {
  if (stakedAmount < 300) return '0'
  return (stakedAmount / 300).toFixed(2)
}

export const getXPefiToPefiRatio = (pool) => {
  return pool.totalStaked && pool.totalSupply
    ? new BigNumber(pool.totalStaked).div(new BigNumber(pool.totalSupply)).toJSON()
    : 1
}

export const getCutdownType = (now, start) => {
  if (now < start) {
    return 'start'
  }
  if (now >= start) {
    return 'end'
  }
  return 'start'
}
