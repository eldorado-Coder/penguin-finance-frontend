import { MenuEntry } from '@penguinfinance/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: 'https://exchange.penguinfinance.io',
      },
      {
        label: 'Liquidity',
        href: 'https://exchange.penguinfinance.io/#/pool',
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  // {
  //   label: 'Pools',
  //   icon: 'PoolIcon',
  //   href: '/pools',
  // },
  // {
  //   label: 'Lottery',
  //   icon: 'TicketIcon',
  //   href: '/lottery',
  // },
  // {
  //   label: 'Collectibles',
  //   icon: 'NftIcon',
  //   href: '/collectibles',
  // },
  // {
  //   label: 'Teams & Profile',
  //   icon: 'GroupsIcon',
  //   calloutClass: 'rainbow',
  //   items: [
  //     {
  //       label: 'Leaderboard',
  //       href: '/teams',
  //     },
  //     {
  //       label: 'Task Center',
  //       href: '/profile/tasks',
  //     },
  //     {
  //       label: 'Your Profile',
  //       href: '/profile',
  //     },
  //   ],
  // },
  // {
  //   label: 'Info',
  //   icon: 'InfoIcon',
  //   items: [
  //     {
  //       label: 'Overview',
  //       href: 'https://info.penguinfinance.io',
  //     },
  //     {
  //       label: 'Tokens',
  //       href: 'https://info.penguinfinance.io/tokens',
  //     },
  //     {
  //       label: 'Pairs',
  //       href: 'https://info.penguinfinance.io/pairs',
  //     },
  //     {
  //       label: 'Accounts',
  //       href: 'https://info.penguinfinance.io/accounts',
  //     },
  //   ],
  // },
  // {
  //   label: 'IFO',
  //   icon: 'IfoIcon',
  //   href: '/ifo',
  // },
  // {
  //   label: 'More',
  //   icon: 'MoreIcon',
  //   items: [
  //     {
  //       label: 'Voting',
  //       href: 'https://voting.penguinfinance.io',
  //     },
  //     {
  //       label: 'Github',
  //       href: 'https://github.com/penguinfinance',
  //     },
  //     {
  //       label: 'Docs',
  //       href: 'https://docs.penguinfinance.io',
  //     },
  //     {
  //       label: 'Blog',
  //       href: 'https://medium.com/penguinfinance',
  //     },
  //   ],
  // },
]

export default config
