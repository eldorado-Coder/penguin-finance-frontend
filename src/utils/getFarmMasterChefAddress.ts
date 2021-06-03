
import { getMasterChefAddress, getGondolaMasterChefAddress, getLydiaMasterChefAddress } from 'utils/addressHelpers'

const getFarmMasterChefAddress = (farmType: string) => {
  switch(farmType) {
    case 'Penguin Finance':
      return getMasterChefAddress();
    case 'Lydia':
      return getLydiaMasterChefAddress();
    case 'Gondola':
      return getGondolaMasterChefAddress();
    default:
      return getMasterChefAddress();
  }
}

export default getFarmMasterChefAddress