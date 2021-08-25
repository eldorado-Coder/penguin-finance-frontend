import { PoolConfig, QuoteToken, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 1,
    tokenName: 'PEFI',
    stakingTokenName: QuoteToken.PEFI,
    stakingTokenAddress: '0xe896cdeaac9615145c0ca09c8cd5c25bced6384c',
    contractAddress: {
      256: '0xd3af5fe61dbaf8f73149bfcfa9fb653ff096029a',
      128: '0x73feaa1eE314F8c655E354234017bE2193C9E24E',
      43113: '0xF21dD579489520C6E4C8aD273f41D343Fa9d5b2F',
      43114: '0x635c62d984547f3d982eDfF37c24b0475Ac60916',
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://penguinfinance.org/',
    penguinNestsGuideLink:
      'https://penguin-finance.gitbook.io/penguin-finance/summary/penguin-nests-staking-and-fee-collection',
    harvest: true,
    tokenPerBlock: '7',
    sortOrder: 1,
    isFinished: false,
    tokenDecimals: 18,
  },
]

export default pools
