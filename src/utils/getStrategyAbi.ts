// Pefi
import pefiAvax from 'config/abi/compounder/pefiAvax.json'
import ethAvaxPefi from 'config/abi/compounder/ethAvaxPefi.json'
import pngPefi from 'config/abi/compounder/pngPefi.json'
import snobPefi from 'config/abi/compounder/snobPefi.json'
import sushiPefi from 'config/abi/compounder/sushiPefi.json'
import daiPefi from 'config/abi/compounder/daiPefi.json'
import linkPefi from 'config/abi/compounder/linkPefi.json'
// Gondola
import ethZeth from 'config/abi/compounder/ethZeth.json'
import usdtZusdt from 'config/abi/compounder/usdtZusdt.json'
// Lydia
import avaxEthLyd from 'config/abi/compounder/avaxEthLyd.json'
import lydUsdt from 'config/abi/compounder/lydUsdt.json'
import lydPng from 'config/abi/compounder/lydPng.json'
// Pangolin
// import avaxEth from 'config/abi/compounder/avaxEth.json'
// import avaxLink from 'config/abi/compounder/avaxLink.json'
// import avaxPng from 'config/abi/compounder/avaxPng.json'
// import daiUsdt from 'config/abi/compounder/daiUsdt.json'

import compounderFarms from 'config/constants/compounderFarms';

const getStrategyAbi = (pid: number, farmType: string) => {
  const farm = compounderFarms.find(farmItem => farmItem.pid === pid && farmItem.type === farmType);

  if (farm.lpSymbol === "PEFI-AVAX LP") {
    return pefiAvax;
  } if (farm.lpSymbol === "ETH-AVAX LP") {
    return ethAvaxPefi;
  } if (farm.lpSymbol === "PEFI-PNG LP") {
    return pngPefi;
  } if (farm.lpSymbol === "PEFI-SNOB LP") {
    return snobPefi;
  } if (farm.lpSymbol === "PEFI-SUSHI LP") {
    return sushiPefi;
  } if (farm.lpSymbol === "PEFI-DAI LP") {
    return daiPefi;
  } if (farm.lpSymbol === "PEFI-LINK LP") {
    return linkPefi;
  } if (farm.lpSymbol === "ETH-ZETH LP") {
    return ethZeth;
  } if (farm.lpSymbol === "USDT-ZUSDT LP") {
    return usdtZusdt;
  } if (farm.lpSymbol === "AVAX-ETH LP") {
    return avaxEthLyd;
  } if (farm.lpSymbol === "LYD-USDT LP") {
    return lydUsdt;
  } if (farm.lpSymbol === "LYD-PNG LP") {
    return lydPng;
  } 
  return null;
};

export default getStrategyAbi