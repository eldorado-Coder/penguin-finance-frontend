export const getTokenLogoFromSymbol = (symbol: string): string => {
  switch (symbol) {
    case 'PEFI-AVAX' || 'AVAX-PEFI':
      return '/images/farms/pefi-avax.svg'
    case 'PEFI-DAI':
      return '/images/farms/pefi-dai.svg'
    default:
      return '/images/farms/pefi-avax.svg'
  }
}

export const getTokenLogoFromAddress = (address: string): string => {
  switch (address) {
    case '0x494dd9f783daf777d3fb4303da4de795953592d0':
      return '/images/farms/pefi-avax.svg'
    default:
      return '/images/farms/pefi-avax.svg'
  }
}
