import BigNumber from 'bignumber.js'
import { AbiItem } from 'web3-utils'
import pefiAbi from 'config/abi/erc20.json'
import xPefiAbi from 'config/abi/xPefi.json'
import nestMigratorAbi from 'config/abi/nest_migrate.json'
import multicall from 'utils/multicall'
import { getLaunchpadAddress, getNestMigratorAddress, getPefiAddress, getXPefiAddress } from 'utils/addressHelpers'
import { getWeb3 } from 'utils/web3'

export const fetchUserInfo = async (account) => {
  const calls = [
    {
      address: getNestMigratorAddress(),
      name: 'ipefiExpectedOnMigration',
      params: [account],
    },
  ]

  const [amountIPefiExpected] = await multicall(nestMigratorAbi, calls)

  return {
    expectedIPefi: new BigNumber(amountIPefiExpected).toNumber(),
  }
}

// xPefi & pefi allowance
export const fetchNestMigratorAllowance = async (account) => {
  const web3 = getWeb3()
  // fetch xPefi allowance
  const xPefiTokenAbi = (xPefiAbi as unknown) as AbiItem
  const xPefiContract = new web3.eth.Contract(xPefiTokenAbi, getXPefiAddress())
  const xPefiAllowance = (await xPefiContract.methods.allowance(account, getNestMigratorAddress()).call()) / 1e18

  // fetch pefi allowance
  const pefiTokenAbi = (pefiAbi as unknown) as AbiItem
  const pefiContract = new web3.eth.Contract(pefiTokenAbi, getPefiAddress())
  const pefiAllowance = (await pefiContract.methods.allowance(account, getNestMigratorAddress()).call()) / 1e18

  return { xPefiAllowance, pefiAllowance }
}
