import contracts from './contracts'
import { LPConfig, QuoteToken } from './types'

const lps: LPConfig[] = [
  {
    lpSymbol: 'USDT-AVAX LP',
    lpAddresses: {
      43113: '',
      43114: '0x9ee0a4e21bd333a6bb2ab298194320b8daa26516',
    },
    tokenSymbol: 'USDT',
    tokenAddresses: {
      43113: '',
      43114: '0xde3A24028580884448a5397872046a019649b084',
    },
    quoteTokenSymbol: QuoteToken.AVAX,
    quoteTokenAddresses: contracts.wavax,
  },
  {
    lpSymbol: 'LYD-USDT LP',
    lpAddresses: {
      43113: '',
      43114: '0x752C59f22fAAA861108649F4596034796C69bC3f',
    },
    tokenSymbol: 'USDT',
    tokenAddresses: {
      43113: '',
      43114: '0xde3A24028580884448a5397872046a019649b084',
    },
    quoteTokenSymbol: QuoteToken.LYD,
    quoteTokenAddresses: contracts.lyd,
  },
]

export default lps
