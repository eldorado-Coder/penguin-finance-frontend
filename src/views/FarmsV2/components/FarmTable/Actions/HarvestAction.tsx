import React, { useState } from 'react'
import { Button, Heading, Text } from 'penguinfinance-uikit2'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { getBalanceAmount } from 'utils/formatBalance'
import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync } from 'state/farms'
import useToast from 'hooks/useToast'
import { useHarvest } from 'hooks/useHarvest'
import { Farm as FarmTypes } from 'state/types'
import { ActionContainer, ActionTitles, ActionContent } from './styles'

interface FarmWithStakedValue extends FarmTypes {
  apy?: BigNumber
}

const HarvestAction: React.FunctionComponent<FarmWithStakedValue> = ({ pid, userData }) => {
  const { toastSuccess, toastError } = useToast()
  const earningsBigNumber = userData ? new BigNumber(userData.earnings) : new BigNumber(0)
  let earnings = new BigNumber(0)
  let displayBalance = earnings.toLocaleString()

  if (!earningsBigNumber.isZero()) {
    earnings = getBalanceAmount(earningsBigNumber)
    displayBalance = earnings.toFixed(3, BigNumber.ROUND_DOWN)
  }

  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()

  return (
    <ActionContainer>
      <ActionTitles>
        <Text bold textTransform="uppercase" color="textSubtle" fontSize="12px" pr="4px">
          PEFI
        </Text>
        <Text bold textTransform="uppercase" color="textSubtle" fontSize="12px">
          Earned
        </Text>
      </ActionTitles>
      <ActionContent>
        <div>
          <Heading>{displayBalance}</Heading>
        </div>
        <Button
          disabled={earnings.eq(0) || pendingTx || !userData}
          onClick={async () => {
            setPendingTx(true)
            try {
              await onReward()
              toastSuccess(
                'Harvested!',
                'Your pefi earnings have been sent to your wallet!',
              )
            } catch (e) {
              toastError(
                'Error',
                'Please try again. Confirm the transaction and make sure you are paying enough gas!',
              )
              console.error(e)
            } finally {
              setPendingTx(false)
            }
            dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
          }}
          ml="4px"
        >
          Harvest
        </Button>
      </ActionContent>
    </ActionContainer>
  )
}

export default HarvestAction
