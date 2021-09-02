import { getV2MasterChefAddress } from 'utils/addressHelpers'

const getV2FarmMasterChefAddress = (farmType: string) => {
  switch (farmType) {
    case 'Penguin':
      return getV2MasterChefAddress()
    default:
      return getV2MasterChefAddress()
  }
}

export default getV2FarmMasterChefAddress
