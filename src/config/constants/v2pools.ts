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
      43114: '0xE9476e16FE488B90ada9Ab5C7c2ADa81014Ba9Ee',
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://penguinfinance.org/',
    penguinNestsGuideLink: 'https://penguin-finance.medium.com/introducing-ipefi-the-nest-evolution-d002f8548276',
    harvest: true,
    tokenPerBlock: '7',
    sortOrder: 1,
    isFinished: false,
    tokenDecimals: 18,
  },
]

export default pools
