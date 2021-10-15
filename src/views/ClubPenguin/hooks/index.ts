import { useCallback, useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { useClubPenguinMasterChef } from 'hooks/useContract'
import { fetchClubPenguinFarmUserDataAsync } from 'state/actions'
import { clubPenguinStake, clubPenguinUnstake, clubPenguinHarvest } from 'utils/callHelpers'
import { getPair } from 'subgraph/utils/joe'
import { usePriceAvaxUsdt } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'

export const useClubPenguinStake = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const clubPenguinMasterChefContract = useClubPenguinMasterChef()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await clubPenguinStake(clubPenguinMasterChefContract, pid, amount, account)
      dispatch(fetchClubPenguinFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, pid, dispatch, clubPenguinMasterChefContract],
  )

  return { onStake: handleStake }
}

export const useClubPenguinUnstake = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const clubPenguinMasterChefContract = useClubPenguinMasterChef()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await clubPenguinUnstake(clubPenguinMasterChefContract, pid, amount, account)
      dispatch(fetchClubPenguinFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, pid, dispatch, clubPenguinMasterChefContract],
  )

  return { onUnstake: handleUnstake }
}

export const useClubPenguinHarvest = (pid: number) => {
  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  const { account } = useWeb3React()
  const clubPenguinMasterChefContract = useClubPenguinMasterChef()

  const handleHarvest = useCallback(async () => {
    const txHash = await clubPenguinHarvest(clubPenguinMasterChefContract, pid, account)
    dispatch(fetchClubPenguinFarmUserDataAsync(account))
    console.info(txHash)
  }, [account, pid, dispatch, clubPenguinMasterChefContract])

  return { onHarvest: handleHarvest }
}

export const usePriceSherpa = (): number => {
  const [price, setPrice] = useState(1)
  const avaxPrice = usePriceAvaxUsdt()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchPrice = async () => {
      const sherpaAvaxPairAddress = '0xf0d7ec33147ec3befd24b880472307bf3a01bb8a'
      try {
        const sherpaAvaxPair = await getPair(sherpaAvaxPairAddress)
        const sherpaPrice = (avaxPrice.toNumber() * Number(sherpaAvaxPair.reserve1)) / Number(sherpaAvaxPair.reserve0)
        setPrice(sherpaPrice)
      } catch (error) {
        console.log('sherpa price fetch issue')
      }
    }

    fetchPrice()
  }, [avaxPrice, fastRefresh])

  return price
}
