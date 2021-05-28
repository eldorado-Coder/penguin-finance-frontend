import { useEffect, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { kebabCase } from 'lodash'
import { useWeb3React } from '@web3-react/core'
import { Toast, toastTypes } from 'penguinfinance-uikit2'
import { useSelector, useDispatch } from 'react-redux'
import { Team } from 'config/constants/types'
import useRefresh from 'hooks/useRefresh'
import {
  fetchMasterChefPefiPerBlock,
  fetchFarmsPublicDataAsync,
  fetchLpsPublicDataAsync,
  fetchPoolsPublicDataAsync,
  fetchPoolsUserDataAsync,
  push as pushToast,
  remove as removeToast,
  clear as clearToast,
} from './actions'
import {
  State,
  Farm,
  Lp,
  Pool,
  ProfileState,
  TeamsState,
  AchievementState,
  EmperorState,
  GlobalState,
  DonationsState,
} from './types'
import { fetchProfile } from './profile'
import { fetchTeam, fetchTeams } from './teams'
import { fetchAchievements } from './achievements'
import { fetchEmperor } from './emperor'
import { fetchDonations } from './donations'

const ZERO = new BigNumber(0)

export const useFetchPublicData = () => {
  const dispatch = useDispatch()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    dispatch(fetchMasterChefPefiPerBlock())
    dispatch(fetchFarmsPublicDataAsync())
    dispatch(fetchLpsPublicDataAsync())
    // POOL REMOVAL
    dispatch(fetchPoolsPublicDataAsync())
  }, [dispatch, slowRefresh])
}

// Farms

export const usePefiPerBlock = (): BigNumber => {
  const pefiPerBlock = useSelector((state: State) => state.farms.pefiPerBlock)
  return new BigNumber(pefiPerBlock)
}

export const useFarms = (): Farm[] => {
  const farms = useSelector((state: State) => state.farms.data)
  return farms
}

export const useFarmFromPid = (pid): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.pid === pid))
  return farm
}

export const useFarmFromSymbol = (lpSymbol: string): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.lpSymbol === lpSymbol))
  return farm
}

export const useLPFromSymbol = (lpSymbol: string): Lp => {
  const lp = useSelector((state: State) => state.lps.data.find((f) => f.lpSymbol === lpSymbol))
  return lp
}

export const useFarmUser = (pid) => {
  const farm = useFarmFromPid(pid)

  return {
    allowance: farm.userData ? new BigNumber(farm.userData.allowance) : new BigNumber(0),
    tokenBalance: farm.userData ? new BigNumber(farm.userData.tokenBalance) : new BigNumber(0),
    stakedBalance: farm.userData ? new BigNumber(farm.userData.stakedBalance) : new BigNumber(0),
    earnings: farm.userData ? new BigNumber(farm.userData.earnings) : new BigNumber(0),
  }
}

// Pools

export const usePools = (account): Pool[] => {
  const { fastRefresh } = useRefresh()
  const dispatch = useDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchPoolsUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const pools = useSelector((state: State) => state.pools.data)
  return pools
}

export const usePoolFromPid = (sousId): Pool => {
  const pool = useSelector((state: State) => state.pools.data.find((p) => p.sousId === sousId))
  return pool
}

// Prices

export const usePriceAvaxUsdt = (): BigNumber => {
  const lpSymbol = 'USDT-AVAX LP' // USDT-AVAX LP
  const lp = useLPFromSymbol(lpSymbol)
  return lp.tokenPriceVsQuote ? new BigNumber(1).div(lp.tokenPriceVsQuote) : ZERO
}

export const usePricePefiUsdt = (): BigNumber => {
  const lpSymbol = 'PEFI-AVAX LP' // PEFI-AVAX LP
  const farm = useFarmFromSymbol(lpSymbol)
  const avaxPriceUSD = usePriceAvaxUsdt()
  return farm.tokenPriceVsQuote ? avaxPriceUSD.times(farm.tokenPriceVsQuote) : ZERO
}

export const usePriceEthUsdt = (): BigNumber => {
  const lpSymbol = 'ETH-AVAX LP' // ETH-AVAX LP
  const farm = useFarmFromSymbol(lpSymbol)
  const avaxPriceUSD = usePriceAvaxUsdt()
  return farm.tokenPriceVsQuote ? avaxPriceUSD.times(farm.tokenPriceVsQuote) : ZERO
}

export const usePriceEthAvax = (): BigNumber => {
  const priceAvaxUsdt = usePriceAvaxUsdt()
  const priceEthUsdt = usePriceEthUsdt()
  return priceEthUsdt.div(priceAvaxUsdt)
}

// Toasts
export const useToast = () => {
  const dispatch = useDispatch()
  const helpers = useMemo(() => {
    const push = (toast: Toast) => dispatch(pushToast(toast))

    return {
      toastError: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.DANGER, title, description })
      },
      toastInfo: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.INFO, title, description })
      },
      toastSuccess: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.SUCCESS, title, description })
      },
      toastWarning: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.WARNING, title, description })
      },
      push,
      remove: (id: string) => dispatch(removeToast(id)),
      clear: () => dispatch(clearToast()),
    }
  }, [dispatch])

  return helpers
}

// Profile

export const useFetchProfile = () => {
  const { account } = useWeb3React()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProfile(account))
  }, [account, dispatch])
}

export const useProfile = () => {
  const { isInitialized, isLoading, data, hasRegistered }: ProfileState = useSelector((state: State) => state.profile)
  return { profile: data, hasProfile: isInitialized && hasRegistered, isInitialized, isLoading }
}

// Teams

export const useTeam = (id: number) => {
  const team: Team = useSelector((state: State) => state.teams.data[id])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTeam(id))
  }, [id, dispatch])

  return team
}

export const useTeams = () => {
  const { isInitialized, isLoading, data }: TeamsState = useSelector((state: State) => state.teams)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTeams())
  }, [dispatch])

  return { teams: data, isInitialized, isLoading }
}

// Emperor
export const useEmperor = () => {
  const { account } = useWeb3React()
  const emperorState: EmperorState = useSelector((state: State) => state.emperor)
  const dispatch = useDispatch()

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      dispatch(fetchEmperor(account))
    }, 5000)

    return () => clearInterval(refreshInterval)
  }, [dispatch, account])

  return emperorState
}

// Achievements
export const useFetchAchievements = () => {
  const { account } = useWeb3React()
  const dispatch = useDispatch()

  useEffect(() => {
    if (account) {
      dispatch(fetchAchievements(account))
    }
  }, [account, dispatch])
}

// Global
export const useGlobal = () => {
  const { wrongNetworkGuideModalOpened }: GlobalState = useSelector((state: State) => state.global)

  return { wrongNetworkGuideModalOpened }
}

export const useAchievements = () => {
  const achievements: AchievementState['data'] = useSelector((state: State) => state.achievements.data)
  return achievements
}

// Donations
export const useDonations = () => {
  const { account } = useWeb3React()
  const donationsState: DonationsState = useSelector((state: State) => state.donations)
  const dispatch = useDispatch()

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      dispatch(fetchDonations(account))
    }, 5000)

    return () => clearInterval(refreshInterval)
  }, [dispatch, account])

  return donationsState
}
