import { MenuEntry } from 'penguinfinance-uikit2'

export const config: MenuEntry[] = [
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
    label: 'Penguin Arena',
    icon: 'BattleIcon',
    href: '/arena',
  },
  // {
  //   label: 'Penguin Emperor',
  //   icon: 'CrownIcon',
  //   href: '/emperor',
  // },
  {
    label: 'Penguin Emperor[temporary]',
    icon: 'CrownIcon',
    href: '/emperor',
  },
  // {
  //   label: 'Penguin lottery',
  //   icon: 'NftIcon',
  //   href: '/lottery',
  // },
  // {
  //   label: 'Penguin collectibles',
  //   icon: 'NftIcon',
  //   href: '/collectibles',
  // },
  // {
  //   label: 'Penguin teams',
  //   icon: 'NftIcon',
  //   href: '/teams',
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

export const socials = [
  {
    label: 'Discord',
    icon: 'DiscordIcon',
    href: 'https://discord.gg/R5Rv68GXXc',
  },
  {
    label: 'Telegram',
    icon: 'TelegramIcon',
    href: 'https://t.me/penguin_defi',
  },
  {
    label: 'Twitter',
    icon: 'TwitterIcon',
    href: 'https://twitter.com/penguin_defi',
  },
]
