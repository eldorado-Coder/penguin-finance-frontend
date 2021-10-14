import {
  getMasterChefAddress,
  getGondolaMasterChefAddress,
  getLydiaMasterChefAddress,
  getJoeMasterChefAddress,
  getPangolinAddress,
  getBenqiMasterChefAddress,
} from 'utils/addressHelpers'

const getFarmMasterChefAddress = (farmType: string) => {
  switch (farmType) {
    case 'Penguin':
      return getMasterChefAddress()
    case 'Lydia':
      return getLydiaMasterChefAddress()
    case 'Joe':
      return getJoeMasterChefAddress()
    case 'Gondola':
      return getGondolaMasterChefAddress()
    case 'Pangolin':
      return getPangolinAddress()
    case 'Benqi':
      return getBenqiMasterChefAddress()
    default:
      return getMasterChefAddress()
  }
}

export default getFarmMasterChefAddress
