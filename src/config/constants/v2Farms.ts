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
      43114: '0x35dc5371867188d585c1d9f4da9160a0c2664b42',
    },
    tokenSymbol: 'PEFI',
    tokenAddresses: {
      43113: '',
      43114: '0xe896CDeaAC9615145c0cA09C8Cd5C25bced6384c',
    },
    pangolinRewardPoolAddresses: {
      43113: '',
      43114: '0x0000000000000000000000000000000000000000',
    },
    quoteTokenSymbol: QuoteToken.AVAX,
    quoteTokenAddresses: contracts.wavax,
    withdrawalFee: '0',
    hardApy: '896.65%',
    type: 'Pangolin',
    name: 'pendingPEFI',
  },
  {
    pid: 1,
    lpSymbol: 'PEFI-PNG LP',
    lpAddresses: {
      43113: '',
      43114: '0x1bb5541eccda68a352649954d4c8ece6ad68338d',
    },
    strategyAddresses: {
      43113: '',
      43114: '0x8a2658eaef58e82bd43710e6b8c44dda5d62ba2c',
    },
    tokenSymbol: 'PEFI',
    tokenAddresses: {
      43113: '',
      43114: '0xe896CDeaAC9615145c0cA09C8Cd5C25bced6384c',
    },
    pangolinRewardPoolAddresses: {
      43113: '',
      43114: '0x0000000000000000000000000000000000000000',
    },
    quoteTokenSymbol: QuoteToken.PNG,
    quoteTokenAddresses: contracts.png,
    withdrawalFee: '0',
    hardApy: '896.65%',
    type: 'Pangolin',
    name: 'pendingPEFI',
  },

  {
    pid: 2,
    lpSymbol: 'ETH.e-AVAX LP',
    lpAddresses: {
      43113: '',
      43114: '0x7c05d54fc5cb6e4ad87c6f5db3b807c94bb89c52',
    },
    strategyAddresses: {
      43113: '',
      43114: '0x9d7d8e29be47711ca1be592d18cad5adb08ebd1a',
    },
    tokenSymbol: 'ETH',
    tokenAddresses: {
      43113: '',
      43114: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
    },
    pangolinRewardPoolAddresses: {
      43113: '',
      43114: '0x0000000000000000000000000000000000000000',
    },
    quoteTokenSymbol: QuoteToken.AVAX,
    quoteTokenAddresses: contracts.wavax,
    withdrawalFee: '0',
    hardApy: '896.65%',
    type: 'Pangolin',
    name: 'pendingPEFI',
  },
  // TODO: pid with wrong lp
  // {
  //   pid: 3,
  //   lpSymbol: 'PEFI-LINK LP',
  //   lpAddresses: {
  //     43113: '',
  //     43114: '0x5875c368cddd5fb9bf2f410666ca5aad236dabd4',
  //   },
  //   strategyAddresses: {
  //     43113: '',
  //     43114: '0x8adc8df2bfc69bb2aad9dd4666814e458a6d13ed',
  //   },
  //   tokenSymbol: 'LINK',
  //   tokenAddresses: {
  //     43113: '',
  //     43114: '0x5947BB275c521040051D82396192181b413227A3',
  //   },
  //   pangolinRewardPoolAddresses: {
  //     43113: '',
  //     43114: '0x0000000000000000000000000000000000000000',
  //   },
  //   quoteTokenSymbol: QuoteToken.PEFI,
  //   quoteTokenAddresses: contracts.pefi,
  //   withdrawalFee: '0',
  //   hardApy: '896.65%',
  //   type: 'Pangolin',
  //   name: 'pendingPEFI',
  // },
  {
    pid: 6,
    lpSymbol: 'PEFI-LINK.e LP',
    lpAddresses: {
      43113: '',
      43114: '0x3968c1bda61949724c5bbcacf8baffe19932cb14',
    },
    strategyAddresses: {
      43113: '',
      43114: '0xe02f3bf124eaa8043c57737be969456bcce6d73a',
    },
    tokenSymbol: 'LINK',
    tokenAddresses: {
      43113: '',
      43114: '0x5947BB275c521040051D82396192181b413227A3',
    },
    pangolinRewardPoolAddresses: {
      43113: '',
      43114: '0x0000000000000000000000000000000000000000',
    },
    quoteTokenSymbol: QuoteToken.PEFI,
    quoteTokenAddresses: contracts.pefi,
    withdrawalFee: '0',
    hardApy: '896.65%',
    type: 'Pangolin',
    name: 'pendingPEFI',
  },
  // Joe pools
  {
    pid: 4,
    lpSymbol: 'Joe ETH.e-AVAX LP',
    lpAddresses: {
      43113: '',
      43114: '0xfe15c2695f1f920da45c30aae47d11de51007af9',
    },
    strategyAddresses: {
      43113: '',
      43114: '0xd9e09ab78bae7da3c4624beeab1d510544cb86a1',
    },
    tokenSymbol: 'ETH',
    tokenAddresses: {
      43113: '',
      43114: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
    },
    pangolinRewardPoolAddresses: {
      43113: '',
      43114: '0x0000000000000000000000000000000000000000',
    },
    quoteTokenSymbol: QuoteToken.AVAX,
    quoteTokenAddresses: contracts.wavax,
    withdrawalFee: '2.56',
    hardApy: '896.65%',
    type: 'Joe',
    name: 'pendingPEFI',
    lpPrice: 764.55
  },
  {
    pid: 5,
    lpSymbol: 'Joe PEFI-AVAX LP',
    lpAddresses: {
      43113: '',
      43114: '0xb78c8238bd907c42be45aebdb4a8c8a5d7b49755',
    },
    strategyAddresses: {
      43113: '',
      43114: '0x100080bf670aa0afb3c575e718c78e9b426121cd',
    },
    tokenSymbol: 'PEFI',
    tokenAddresses: {
      43113: '',
      43114: '0xe896CDeaAC9615145c0cA09C8Cd5C25bced6384c',
    },
    pangolinRewardPoolAddresses: {
      43113: '',
      43114: '0x0000000000000000000000000000000000000000',
    },
    quoteTokenSymbol: QuoteToken.AVAX,
    quoteTokenAddresses: contracts.wavax,
    withdrawalFee: '0',
    hardApy: '896.65%',
    type: 'Joe',
    name: 'pendingPEFI',
    lpPrice: 16.63
  },
  {
    pid: 7,
    lpSymbol: 'Joe USDC.e-AVAX LP',
    lpAddresses: {
      43113: '',
      43114: '0xA389f9430876455C36478DeEa9769B7Ca4E3DDB1',
    },
    strategyAddresses: {
      43113: '',
      43114: '0x3a5b7b203fce13692f328c25d34c75d32662512a',
    },
    tokenSymbol: 'USDC',
    tokenAddresses: {
      43113: '',
      43114: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
    },
    pangolinRewardPoolAddresses: {
      43113: '',
      43114: '0x0000000000000000000000000000000000000000',
    },
    quoteTokenSymbol: QuoteToken.AVAX,
    quoteTokenAddresses: contracts.wavax,
    withdrawalFee: '0',
    hardApy: '896.65%',
    type: 'Joe',
    name: 'pendingPEFI',
    lpPrice: 12910975.76
  },
  {
    pid: 8,
    lpSymbol: 'Joe USDT.e-AVAX LP',
    lpAddresses: {
      43113: '',
      43114: '0xed8cbd9f0ce3c6986b22002f03c6475ceb7a6256',
    },
    strategyAddresses: {
      43113: '',
      43114: '0x7a95553e24d7be586479e9ef080afab46e03b3de',
    },
    tokenSymbol: 'USDT',
    tokenAddresses: {
      43113: '',
      43114: '0xc7198437980c041c805A1EDcbA50c1Ce5db95118',
    },
    pangolinRewardPoolAddresses: {
      43113: '',
      43114: '0x0000000000000000000000000000000000000000',
    },
    quoteTokenSymbol: QuoteToken.AVAX,
    quoteTokenAddresses: contracts.wavax,
    withdrawalFee: '0',
    hardApy: '896.65%',
    type: 'Joe',
    name: 'pendingPEFI',
    lpPrice: 13497747.77
  },
]

export default v2Farms
