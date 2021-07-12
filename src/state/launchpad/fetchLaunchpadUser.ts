import launchpadABI from 'config/abi/launchpad.json'
// import xPefiABI from 'config/abi/xPefi.json'
import { AbiItem } from 'web3-utils'
import xPefi from 'config/abi/xPefi.json'
import multicall from 'utils/multicall'
import { getLaunchpadAddress, getXPefiAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'
import { getWeb3 } from 'utils/web3'

export const fetchUserStakedBalance = async (account) => {
  const calls = [{
    address: getLaunchpadAddress(),
    name: 'amountStaked',
    params: [account],
  }];

  const amountStaked = await multicall(launchpadABI, calls)

  const stakedBalance = new BigNumber(amountStaked[0]).toJSON();
  return stakedBalance;
}

export const fetchLaunchpadAllowance = async account => {
  const web3 = getWeb3();  
  const abi = (xPefi as unknown) as AbiItem
  const xPefiContract = new web3.eth.Contract(abi, getXPefiAddress());
  const allowanceBalance = (await xPefiContract.methods.allowance(account, getLaunchpadAddress()).call()) / 1e18

  return allowanceBalance;
};