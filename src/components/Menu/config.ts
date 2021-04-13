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
    label: 'Igloos',
    icon: 'IglooIcon',
    href: '/igloos',
  },
  {
    label: 'Nests',
    icon: 'NestIcon',
    href: '/nests',
  },
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
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Github',
        href: 'https://github.com/Penguin-Finance',
      },
      {
        label: 'Docs',
        href: 'https://penguin-finance.gitbook.io/penguin-finance/',
      },
      {
        label: 'Blog',
        href: 'https://penguin-finance.medium.com/',
      },
    ],
  },
]

export default config
