import contracts from './contracts'
import { V2FarmConfig, QuoteToken } from './types'

const v2Farms: V2FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'PEFI-AVAX LP',
    lpAddresses: {
      43113: '',
      43114: '0x494dd9f783daf777d3fb4303da4de795953592d0',
    },
    strategyAddresses: {
      43113: '',
      43114: '0x4a2a8365d69089182a8a19fb06e94bc51eee4e63',
    },
    tokenSymbol: 'PEFI',
    tokenAddresses: {
      43113: '',
      43114: '0xe896CDeaAC9615145c0cA09C8Cd5C25bced6384c',
    },
    pangolinRewardPoolAddresses: {
      43113: '',
      43114: '0xd7EDBb1005ec65721a3976Dba996AdC6e02dc9bA',
    },
    quoteTokenSymbol: QuoteToken.AVAX,
    quoteTokenAddresses: contracts.wavax,
    withdrawalFee: '2.56',
    hardApy: '896.65%',
    type: 'Pangolin',
    name: 'pendingPEFI',
  },
  {
    pid: 1,
    lpSymbol: 'PEFI-AVAX LP',
    lpAddresses: {
      43113: '',
      43114: '0x494dd9f783daf777d3fb4303da4de795953592d0',
    },
    strategyAddresses: {
      43113: '',
      43114: '0x8adc8df2bfc69bb2aad9dd4666814e458a6d13ed',
    },
    tokenSymbol: 'PEFI',
    tokenAddresses: {
      43113: '',
      43114: '0xe896CDeaAC9615145c0cA09C8Cd5C25bced6384c',
    },
    pangolinRewardPoolAddresses: {
      43113: '',
      43114: '0xd7EDBb1005ec65721a3976Dba996AdC6e02dc9bA',
    },
    quoteTokenSymbol: QuoteToken.AVAX,
    quoteTokenAddresses: contracts.wavax,
    withdrawalFee: '2.56',
    hardApy: '896.65%',
    type: 'Pangolin',
    name: 'pendingPEFI',
  },
  // TODO: temp data
  // {
  //   pid: 2,
  //   lpSymbol: 'PEFI-PNG LP',
  //   lpAddresses: {
  //     43113: '',
  //     43114: '0x494dd9f783daf777d3fb4303da4de795953592d0',
  //   },
  //   strategyAddresses: {
  //     43113: '',
  //     43114: '0x8adc8df2bfc69bb2aad9dd4666814e458a6d13ed',
  //   },
  //   tokenSymbol: 'PEFI',
  //   tokenAddresses: {
  //     43113: '',
  //     43114: '0xe896CDeaAC9615145c0cA09C8Cd5C25bced6384c',
  //   },
  //   pangolinRewardPoolAddresses: {
  //     43113: '',
  //     43114: '0xd7EDBb1005ec65721a3976Dba996AdC6e02dc9bA',
  //   },
  //   quoteTokenSymbol: QuoteToken.PNG,
  //   quoteTokenAddresses: contracts.png,
  //   withdrawalFee: '2.56',
  //   hardApy: '896.65%',
  //   type: 'Pangolin',
  //   name: 'pendingPEFI',
  // },

  // {
  //   pid: 3,
  //   lpSymbol: 'ETH-AVAX LP',
  //   lpAddresses: {
  //     43113: '',
  //     43114: '0x494dd9f783daf777d3fb4303da4de795953592d0',
  //   },
  //   strategyAddresses: {
  //     43113: '',
  //     43114: '0x8adc8df2bfc69bb2aad9dd4666814e458a6d13ed',
  //   },
  //   tokenSymbol: 'ETH',
  //   tokenAddresses: {
  //     43113: '',
  //     43114: '0xf20d962a6c8f70c731bd838a3a388D7d48fA6e15',
  //   },
  //   pangolinRewardPoolAddresses: {
  //     43113: '',
  //     43114: '0xd7EDBb1005ec65721a3976Dba996AdC6e02dc9bA',
  //   },
  //   quoteTokenSymbol: QuoteToken.AVAX,
  //   quoteTokenAddresses: contracts.wavax,
  //   withdrawalFee: '2.56',
  //   hardApy: '896.65%',
  //   type: 'Pangolin',
  //   name: 'pendingPEFI',
  // },
  // {
  //   pid: 4,
  //   lpSymbol: 'PEFI-LINK LP',
  //   lpAddresses: {
  //     43113: '',
  //     43114: '0x494dd9f783daf777d3fb4303da4de795953592d0',
  //   },
  //   strategyAddresses: {
  //     43113: '',
  //     43114: '0x8adc8df2bfc69bb2aad9dd4666814e458a6d13ed',
  //   },
  //   tokenSymbol: 'LINK',
  //   tokenAddresses: {
  //     43113: '',
  //     43114: '0xB3fe5374F67D7a22886A0eE082b2E2f9d2651651',
  //   },
  //   pangolinRewardPoolAddresses: {
  //     43113: '',
  //     43114: '0xd7EDBb1005ec65721a3976Dba996AdC6e02dc9bA',
  //   },
  //   quoteTokenSymbol: QuoteToken.PEFI,
  //   quoteTokenAddresses: contracts.pefi,
  //   withdrawalFee: '2.56',
  //   hardApy: '896.65%',
  //   type: 'Pangolin',
  //   name: 'pendingPEFI',
  // },

  // {
  //   pid: 2,
  //   lpSymbol: 'PEFI-PNG LP',
  //   lpAddresses: {
  //     43113: '',
  //     43114: '0x1bb5541eccda68a352649954d4c8ece6ad68338d',
  //   },
  //   strategyAddresses: {
  //     43113: '',
  //     43114: '0x253dc3a6f712a0735c77dc1732d1db6eadb43e5b',
  //   },
  //   tokenSymbol: 'PEFI',
  //   tokenAddresses: {
  //     43113: '',
  //     43114: '0xe896CDeaAC9615145c0cA09C8Cd5C25bced6384c',
  //   },
  //   quoteTokenSymbol: QuoteToken.PNG,
  //   quoteTokenAddresses: contracts.png,
  //   withdrawalFee: '2.56',
  //   hardApy: '896.65%',
  //   type: 'Pangolin',
  //   name: 'pendingPEFI',
  // },
]

export default v2Farms
