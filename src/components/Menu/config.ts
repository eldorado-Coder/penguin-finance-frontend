import { MenuEntry } from 'penguinfinance-uikit2'

export const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Buy PEFI',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Trader Joe',
        href: 'https://www.traderjoseph.com/#/trade?outputCurrency=0xe896CDeaAC9615145c0cA09C8Cd5C25bced6384c',
      },
      {
        label: 'Pangolin Exchange',
        href: 'https://app.pangolin.exchange/#/swap?outputCurrency=0xe896CDeaAC9615145c0cA09C8Cd5C25bced6384c',
      },
      {
        label: 'Lydia Exchange',
        href: 'https://exchange.lydia.finance/#/swap?inputCurrency=0xe896cdeaac9615145c0ca09c8cd5c25bced6384c',
      },
    ],
  },
  {
    label: 'Farm',
    icon: 'IglooIcon',
    href: '/farms',
  },
  // {
  //   label: 'Igloos V2',
  //   icon: 'IglooIcon',
  //   href: '/igloos-v2',
  // },
  // {
  //   label: 'Info',
  //   icon: 'IfoIcon',
  //   href: '/info',
  // },
  {
    label: 'Stake',
    icon: 'NestIcon',
    href: '/stake',
  },
  {
    label: 'Club Penguin',
    icon: 'ClubIcon',
    href: '/club',
    badge: 'NEW',
  },
  {
    label: 'Emperor',
    icon: 'CrownIcon',
    href: '/emperor',
  },
  {
    label: 'Arena',
    icon: 'BattleIcon',
    href: '/arena',
  },
  {
    label: 'Launchpad',
    icon: 'LaunchpadIcon',
    href: '/launchpad',
  },
  // {
  //   label: 'Penguin lottery',
  //   icon: 'NftIcon',
  //   href: '/lottery',
  // },
  {
    label: 'Collectibles',
    icon: 'NftIcon',
    href: '/collectibles',
    badge: 'NEW',
  },
  {
    label: 'Learn More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'English',
        href: 'https://docs.penguinfinance.io/',
      },
      {
        label: 'Turkish',
        href: 'https://penguin-finance.gitbook.io/penguin-finance-tuerkce/',
      },
      {
        label: 'French',
        href: 'https://penguin-finance.gitbook.io/penguin-finance-francais/',
      },
    ],
  },
  {
    label: 'Other',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Compounder',
        href: '/compounder',
      },
      {
        label: 'iPEFI Migration Page',
        href: '/ipefi',
      },
      {
        label: 'Sherpa Launchpad',
        href: '/sherpa-launchpad',
      },
    ],
  },
  // {
  //   label: 'Compounder',
  //   icon: 'CompounderIcon',
  //   href: '/compounder',
  // },
  // {
  //   label: 'Penguin teams',
  //   icon: 'NftIcon',
  //   href: '/teams',
  // },
  // {
  //   label: 'Learn More',
  //   icon: 'MoreIcon',
  //   items: [
  //     {
  //       label: 'Github',
  //       href: 'https://github.com/Penguin-Finance',
  //     },
  //     {
  //       label: 'Docs',
  //       href: 'https://docs.penguinfinance.io/',
  //     },
  //     {
  //       label: 'Medium Articles',
  //       href: 'https://penguin-finance.medium.com/',
  //     },
  //     {
  //       label: 'Roadmap',
  //       href: 'https://penguin-finance.medium.com/penguin-finance-2021-roadmap-81d261aa62d0',
  //     },
  //   ],
  // },
  // {
  //   label: 'Audited by CertiK',
  //   icon: 'AuditIcon',
  //   href: 'https://www.certik.org/projects/penguinfinance',
  // },
  // {
  //   label: 'Official Discord',
  //   icon: 'DiscordIcon',
  //   href: 'https://discord.gg/R5Rv68GXXc',
  // },
  // {
  //   label: 'Official Telegram',
  //   icon: 'TelegramIcon',
  //   href: 'https://t.me/penguin_defi',
  // },
  // {
  //   label: 'Official Twitter',
  //   icon: 'TwitterIcon',
  //   href: 'https://twitter.com/penguin_defi',
  // },
]

export const socials = [
  //   {
  //     label: 'Discord',
  //     icon: 'DiscordIcon',
  //     href: 'https://discord.gg/R5Rv68GXXc',
  //   },
  //   {
  //     label: 'Telegram',
  //     icon: 'TelegramIcon',
  //     href: 'https://t.me/penguin_defi',
  //   },
  //   {
  //     label: 'Twitter',
  //     icon: 'TwitterIcon',
  //     href: 'https://twitter.com/penguin_defi',
  //   },
]
