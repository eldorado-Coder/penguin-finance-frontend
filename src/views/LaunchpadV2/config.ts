const launchpadIDOs = [
  {
    tokenSymbol: 'KITTY',
    whiteLogo: 'kitty_logo_white.svg',
    darkLogo: 'kitty_logo_dark.svg',
    isCompleted: false,
    totalRaised: 562500,
    returnToATH: 15,
    participants: 0,
    startDate: '12.17.2021',
    startTimestamp: 1639764000,
    endTimestamp: 1640649540,
    tokenPrice: 0.045,
    soldTokenAmount: '0',
    distributedTokenAmount: '12.5M',
    saleProgress: '0',
    status: 'In Progress',
    link: '/launchpad-kitty',
  },
  {
    tokenSymbol: 'BOOFI',
    whiteLogo: 'boofi_logo_white.png',
    darkLogo: 'boofi_logo_dark.png',
    isCompleted: true,
    totalRaised: 250000,
    returnToATH: 15,
    participants: 2256,
    startDate: '09.24.2021',
    startTimestamp: 1632409200,
    endTimestamp: 1633604400,
    tokenPrice: 0.125,
    soldTokenAmount: '1.96M',
    distributedTokenAmount: '2M',
    saleProgress: '100',
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
    startTimestamp: 1626620400,
    endTimestamp: 1627984800,
    tokenPrice: 0.15,
    soldTokenAmount: '536K',
    distributedTokenAmount: '600K',
    saleProgress: '100',
    status: 'Launched',
    link: '/launchpad-sherpa',
  },
]

export const getUpcomingIDOs = () => {
  const currentTime = Math.floor(Date.now() / 1000)
  const upcomingIDOs = launchpadIDOs.filter((row) => row.startTimestamp > currentTime)
  return upcomingIDOs.map((row) => {
    return {
      ...row,
      status: 'SOON',
      isCompleted: false,
    }
  })
}

export const getOngoingIDOs = () => {
  const currentTime = Math.floor(Date.now() / 1000)
  const ongoingIDOs = launchpadIDOs.filter((row) => row.startTimestamp < currentTime && currentTime < row.endTimestamp)
  return ongoingIDOs.map((row) => {
    return {
      ...row,
      status: 'In Progress',
      isCompleted: false,
    }
  })
}

export const getCompletedIDOs = () => {
  const currentTime = Math.floor(Date.now() / 1000)
  const completedIDOs = launchpadIDOs.filter((row) => currentTime > row.endTimestamp)

  return completedIDOs.map((row) => {
    return {
      ...row,
      status: 'Completed',
      isCompleted: true,
    }
  })
}
