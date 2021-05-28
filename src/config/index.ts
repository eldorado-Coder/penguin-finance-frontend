import BigNumber from 'bignumber.js/bignumber'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const PEFI_PER_BLOCK = new BigNumber(4.98)
export const PEFI_MAX_SUPPLY = 21000000
export const AVAX_BLOCK_TIME = 5
export const WEEKS_PER_YEAR = 52
// export const BLOCKS_PER_YEAR = new BigNumber(10512000)
// export const BLOCKS_PER_YEAR = new BigNumber(11690000)
export const SECONDS_PER_YEAR = 60 * 60 * 24 * 365
export const BLOCKS_PER_YEAR = new BigNumber(SECONDS_PER_YEAR).div(new BigNumber(AVAX_BLOCK_TIME))
// export const BLOCKS_PER_YEAR = new BigNumber(11236000)
export const BLOCKS_PER_WEEK = BLOCKS_PER_YEAR.div(new BigNumber(WEEKS_PER_YEAR))
export const PEFI_POOL_PID = 0
export const BASE_EXCHANGE_URL = 'https://app.pangolin.exchange'
export const BASE_ADD_LIQUIDITY_URL = `${BASE_EXCHANGE_URL}/#/add`
export const BASE_LIQUIDITY_POOL_URL = `${BASE_EXCHANGE_URL}/#/pool`
export const LOTTERY_MAX_NUMBER_OF_TICKETS = 50
export const LOTTERY_TICKET_PRICE = 1
