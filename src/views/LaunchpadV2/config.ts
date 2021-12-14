const upcomingIDOs = [
  {
    tokenSymbol: 'PEFI',
    whiteLogo: 'penguin_logo_white.svg',
    darkLogo: 'penguin_logo_dark.svg',
    isCompleted: false,
    totalRaised: 0,
    returnToATH: 15,
    participants: 0,
    startDate: 'SOON',
    tokenPrice: 0,
    soldTokenAmount: '?',
    distributedTokenAmount: '?',
    saleProgress: '0',
    status: 'SOON',
  },
  {
    tokenSymbol: 'KITTY',
    whiteLogo: 'kitty_logo_white.svg',
    darkLogo: 'kitty_logo_dark.svg',
    isCompleted: false,
    totalRaised: 500000,
    returnToATH: 15,
    participants: 0,
    startDate: '12.18.2021',
    tokenPrice: 0.04,
    soldTokenAmount: '0',
    distributedTokenAmount: '12.5M',
    saleProgress: '0',
    status: 'SOON',
    link: '/launchpad-kitty'
  },
]

const completedIDOs = [
  {
    tokenSymbol: 'BOOFI',
    whiteLogo: 'boofi_logo_white.png',
    darkLogo: 'boofi_logo_dark.png',
    isCompleted: true,
    totalRaised: 250000,
    returnToATH: 15,
    participants: 2256,
    startDate: '09.24.2021',
    tokenPrice: 0.125,
    soldTokenAmount: '1.96M',
    distributedTokenAmount: '2M',
    saleProgress: '98',
    status: 'Launched',
    link: '/launchpad-boofi',
  },
  {
    tokenSymbol: 'SHERPA',
    whiteLogo: 'sherpa_logo_white.png',
    darkLogo: 'sherpa_logo_dark.png',
    isCompleted: true,
    totalRaised: 91500,
    participants: 595,
    returnToATH: 31,
    startDate: '07.19.2021',
    tokenPrice: 0.15,
    soldTokenAmount: '536K',
    distributedTokenAmount: '600K',
    saleProgress: '88',
    status: 'Launched',
    link: '/launchpad-sherpa',
  },
]

export { upcomingIDOs, completedIDOs }
