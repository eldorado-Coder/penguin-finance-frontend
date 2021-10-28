import { JoeV3FarmConfig } from 'config/constants/types'

const joeV3Farms: JoeV3FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'Joe JOE-AVAX LP',
    lpAddresses: {
      43113: '',
      43114: '0x454e67025631c065d3cfad6d71e6892f74487a15',
    },
  },
  {
    pid: 1,
    lpSymbol: 'Joe AVAX-YAK LP',
    lpAddresses: {
      43113: '',
      43114: '0xb5c9e891af3063004a441ba4fab4ca3d6deb5626',
    },
  },
  {
    pid: 2,
    lpSymbol: 'Joe XAVA-AVAX LP',
    lpAddresses: {
      43113: '',
      43114: '0x72c3438cf1c915ecf5d9f17a6ed346b273d5bf71',
    },
  },
]

export default joeV3Farms
