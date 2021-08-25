import { PoolConfig, QuoteToken, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 1,
    tokenName: 'PEFI',
    stakingTokenName: QuoteToken.PEFI,
    stakingTokenAddress: '0x7FA8a5b88693Bc1922d4b90BA00b6756606b8F83',
    contractAddress: {
      256: '0xd3af5fe61dbaf8f73149bfcfa9fb653ff096029a',
      128: '0x73feaa1eE314F8c655E354234017bE2193C9E24E',
      43113: '0xF21dD579489520C6E4C8aD273f41D343Fa9d5b2F',
      43114: '0x7134ce139ea8ed650273ee505958ca4e0c4b592f',
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
