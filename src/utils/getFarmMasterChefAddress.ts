import {
  getMasterChefAddress,
  getGondolaMasterChefAddress,
  getLydiaMasterChefAddress,
  getJoeMasterChefAddress,
  getJoeMasterChefV3Address,
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
    case 'Joe-v3':
      return getJoeMasterChefV3Address()
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
