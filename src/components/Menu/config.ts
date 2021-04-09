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
        href: 'https://app.pangolin.exchange/#/swap',
      },
      {
        label: 'Liquidity',
        href: 'https://app.pangolin.exchange/#/pool',
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: '/pools',
  },
  {
    label: 'Penguin Arena',
    icon: 'NftIcon',
    href: '/arena',
  },
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
  {
    label: 'Info',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Overview',
        href: 'https://info.pangolin.exchange',
      },
      {
        label: 'Tokens',
        href: 'https://info.pangolin.exchange/#/tokens',
      },
      {
        label: 'Pairs',
        href: 'https://info.pangolin.exchange/#/pairs',
      },
      {
        label: 'Accounts',
        href: 'https://info.pangolin.exchange/#/accounts',
      },
    ],
  },
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
