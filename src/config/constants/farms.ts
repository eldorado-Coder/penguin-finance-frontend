import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'PEFI-AVAX LP',
    lpAddresses: {
      43113: '',
      43114: '0x494dd9f783daf777d3fb4303da4de795953592d0',
    },
    tokenSymbol: 'PEFI',
    tokenAddresses: {
      43113: '',
      43114: '0xe896CDeaAC9615145c0cA09C8Cd5C25bced6384c',
    },
    quoteTokenSymbol: QuoteToken.AVAX,
    quoteTokenAddresses: contracts.wavax,
    withdrawalFee: '4',
    hardApy: '1112.26%',
  },
  {
    pid: 1,
    lpSymbol: 'ETH-AVAX LP',
    lpAddresses: {
      43113: '',
      43114: '0x1aCf1583bEBdCA21C8025E172D8E8f2817343d65',
    },
    tokenSymbol: 'ETH',
    tokenAddresses: {
      43113: '',
      43114: '0xf20d962a6c8f70c731bd838a3a388D7d48fA6e15',
    },
    quoteTokenSymbol: QuoteToken.AVAX,
    quoteTokenAddresses: contracts.wavax,
    withdrawalFee: '4',
    hardApy: '88.65%',
  },
  {
    pid: 2,
    lpSymbol: 'PEFI-PNG LP',
    lpAddresses: {
      43113: '',
      43114: '0x1bb5541eccda68a352649954d4c8ece6ad68338d',
    },
    tokenSymbol: 'PNG',
    tokenAddresses: {
      43113: '',
      43114: '0x60781C2586D68229fde47564546784ab3fACA982',
    },
    quoteTokenSymbol: QuoteToken.PEFI,
    quoteTokenAddresses: contracts.pefi,
    withdrawalFee: '4',
    hardApy: '1388.67%',
  },
  {
    pid: 3,
    lpSymbol: 'PEFI-SNOB LP',
    lpAddresses: {
      43113: '',
      43114: '0x0b9753D73e1c62933e913e9c2C94f2fFa8236F6C',
    },
    tokenSymbol: 'SNOB',
    tokenAddresses: {
      43113: '',
      43114: '0xC38f41A296A4493Ff429F1238e030924A1542e50',
    },
    quoteTokenSymbol: QuoteToken.PEFI,
    quoteTokenAddresses: contracts.pefi,
    withdrawalFee: '4',
    hardApy: '886.06%',
  },
  {
    pid: 4,
    lpSymbol: 'PEFI-SUSHI LP',
    lpAddresses: {
      43113: '',
      43114: '0x8912a0fadf3588c6791e42310b549a7bc0047b0e',
    },
    tokenSymbol: 'SUSHI',
    tokenAddresses: {
      43113: '',
      43114: '0x39cf1BD5f15fb22eC3D9Ff86b0727aFc203427cc',
    },
    quoteTokenSymbol: QuoteToken.PEFI,
    quoteTokenAddresses: contracts.pefi,
    withdrawalFee: '4',
    hardApy: '2706.56%',
  }
]

export default farms
