import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { migrateNest } from 'utils/callHelpers'
import { useNestMigrateContract } from './useContract'

export const useNestMigrate = () => {
  const { account } = useWeb3React()
  const nestMigrateContract = useNestMigrateContract()

  const handleMigrate = useCallback(async () => {
    const txHash = await migrateNest(nestMigrateContract, account)
    console.info('nest migrate tx hash--->', txHash)
    return txHash
  }, [account, nestMigrateContract])

  return {
    onNestMigrate: handleMigrate,
  }
}

export default useNestMigrate
