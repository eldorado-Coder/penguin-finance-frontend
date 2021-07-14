export const PENGUIN_TIERS = ['Astronaut', 'Penguineer', 'Starlord']
export const PRICE_PER_SHERPA = [0.15, 0.135, 0.1275]

export const getUnstakeTooltip = (timeLeftForUnstaking) =>
  `
    You'll be able to unstake in <span class="left-time-for-duration">${timeLeftForUnstaking}</span> seconds.
  `

export const getAllocation = (stakedAmount: number) => {
  if (stakedAmount < 300) return '0'
  return (stakedAmount / 300).toFixed(2)
}
