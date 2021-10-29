import masterchefABI from 'config/abi/masterchef.json'
import gondolaMasterchefABI from 'config/abi/gondolaMasterChef.json'
import lydiaMasterchefABI from 'config/abi/lydiaMasterChef.json'
import joeMasterchefABI from 'config/abi/joeMasterchefABI.json'
import joeMasterchefV3ABI from 'config/abi/joeMasterchefV3ABI.json'
import pangolinManagerABI from 'config/abi/pangolinManager.json'
import pangolinStakingABI from 'config/abi/pangolinStaking.json'
import benqiMasterChefABI from 'config/abi/benqiMasterchefABI.json'

const getFarmMasterChefAbi = (farmType: string) => {
  switch (farmType) {
    case 'Penguin':
      return masterchefABI
    case 'Lydia':
      return lydiaMasterchefABI
    case 'Joe':
      return joeMasterchefABI
    case 'Joe-v3':
      return joeMasterchefV3ABI
    case 'Gondola':
      return gondolaMasterchefABI
    case 'Pangolin':
      return pangolinStakingABI
    case 'Pangolin-Manager':
      return pangolinManagerABI
    case 'Benqi':
      return benqiMasterChefABI
    default:
      return masterchefABI
  }
}

export default getFarmMasterChefAbi
