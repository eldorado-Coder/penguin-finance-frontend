import v2MasterChefABI from 'config/abi/v2Masterchef.json'

const getV2FarmMasterChefAbi = (farmType: string) => {
  switch (farmType) {
    case 'Penguin':
      return v2MasterChefABI
    default:
      return v2MasterChefABI
  }
}

export default getV2FarmMasterChefAbi
