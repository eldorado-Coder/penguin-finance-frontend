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

export const fetchUserPenguinTier = async account => {
  const calls = [{
    address: getLaunchpadAddress(),
    name: 'penguinTiers',
    params: [account],
  }];

  const penguinTiers = await multicall(launchpadABI, calls)

  const penguinTier = new BigNumber(penguinTiers[0]).toJSON();
  return penguinTier;
};

export const fetchUserAllocation = async account => {
  const calls = [{
    address: getLaunchpadAddress(),
    name: 'allocations',
    params: [account],
  }];

  const allocations = await multicall(launchpadABI, calls)

  const allocation = new BigNumber(allocations[0]).toJSON();
  return allocation;
}

export const fetchUserCanUnstake = async account => {
  const calls = [{
    address: getLaunchpadAddress(),
    name: 'canUnstake',
    params: [account],
  }];

  const canUnStake = await multicall(launchpadABI, calls)
  return canUnStake[0][0];
}

export const fetchDepositEnd = async () => {
  const calls = [{
    address: getLaunchpadAddress(),
    name: 'depositEnd'
  }];

  const depositEnd = await multicall(launchpadABI, calls)
  return depositEnd[0][0].toNumber();
}