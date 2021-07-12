import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { approveXPefi } from 'utils/callHelpers'
import { getLaunchpadAddress } from 'utils/addressHelpers'
import { useXPefi } from './useContract'

const useLaunchpadXPefiApprove = () => {
  const { account } = useWeb3React()
  const xPefiContract = useXPefi()

  const handleXPefiApprove = useCallback(async () => {
    const txHash = await approveXPefi(xPefiContract, account, getLaunchpadAddress())
    console.info(txHash)
  }, [account, xPefiContract])

  return { onApproveXPefi: handleXPefiApprove }
}

export default useLaunchpadXPefiApprove;
