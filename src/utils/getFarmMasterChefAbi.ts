
import masterchefABI from 'config/abi/masterchef.json'
import gondolaMasterchefABI from 'config/abi/gondolaMasterChef.json'
import lydiaMasterchefABI from 'config/abi/lydiaMasterChef.json'

const getFarmMasterChefAbi = (farmType: string) => {
  switch(farmType) {
    case 'Penguin Finance':
      return masterchefABI;
    case 'Lydia':
      return lydiaMasterchefABI;
    case 'Gondola':
      return gondolaMasterchefABI;
    default:
      return masterchefABI;
  }
}

export default getFarmMasterChefAbi