
import compounderFarms from 'config/constants/compounderFarms';

const getStrategyAddress = (pid: number, farmType: string) => {
  const farm = compounderFarms.find(farmItem => farmItem.pid === pid && farmItem.type === farmType);
  return farm.strategyAddress;
}

export default getStrategyAddress