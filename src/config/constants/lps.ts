import contracts from './contracts'
import { LPConfig, QuoteToken } from './types'

const lps: LPConfig[] = [
  {
    lpSymbol: 'USDT-AVAX LP',
    lpAddresses: {
      43113: '0x9ee0a4e21bd333a6bb2ab298194320b8daa26516',
      43114: '0x9ee0a4e21bd333a6bb2ab298194320b8daa26516',
    },
    quoteTokenSymbol: QuoteToken.AVAX,
    quoteTokenAdresses: contracts.wavax,
  }
]

export default lps
