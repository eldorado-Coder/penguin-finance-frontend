import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 29,
    lpSymbol: 'Lydia PEFI-USDT.e LP',
    lpAddresses: {
      43113: '',
      43114: '0xdb57a10b415fb4f246fca159bb9b98ad0b126a71',
    },
    tokenSymbol: 'USDT',
    tokenAddresses: {
      43113: '',
      43114: '0xc7198437980c041c805A1EDcbA50c1Ce5db95118',
    },
    quoteTokenSymbol: QuoteToken.PEFI,
    quoteTokenAddresses: contracts.pefi,
    type: 'Lydia',
    withdrawalFee: '0',
  },
  {
    pid: 30,
    lpSymbol: 'Lydia PEFI-LYD LP',
    lpAddresses: {
      43113: '',
      43114: '0xcc592739c6c64f797e46cd00f12a6f15c2df1c04',
    },
    tokenSymbol: 'LYD',
    tokenAddresses: {
      43113: '',
      43114: '0x4C9B4E1AC6F24CdE3660D5E4Ef1eBF77C710C084',
    },
    quoteTokenSymbol: QuoteToken.PEFI,
    quoteTokenAddresses: contracts.pefi,
    type: 'Lydia',
    withdrawalFee: '0',
  },
]

export default farms
