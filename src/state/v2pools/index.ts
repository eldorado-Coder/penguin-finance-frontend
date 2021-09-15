/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import v2poolsConfig from 'config/constants/v2pools'
import { fetchPoolsTotalStaking, fetchPoolsGeneralInfos } from './fetchPools'
import {
  fetchPoolsAllowance,
  fetchUserBalances,
  fetchUserStakeBalances,
  fetchUserPendingRewards,
} from './fetchPoolsUser'
import { PoolsState, Pool } from '../types'

const initialState: PoolsState = { data: [...v2poolsConfig] }

export const V2PoolsSlice = createSlice({
  name: 'V2Pools',
  initialState,
  reducers: {
    setPoolsPublicData: (state, action) => {
      const livePoolsData: Pool[] = action.payload
      state.data = state.data.map((pool) => {
        const livePoolData = livePoolsData.find((entry) => entry.sousId === pool.sousId)
        return { ...pool, ...livePoolData }
      })
    },
    setPoolsUserData: (state, action) => {
      const userData = action.payload
      state.data = state.data.map((pool) => {
        const userPoolData = userData.find((entry) => entry.sousId === pool.sousId)
        return { ...pool, userData: userPoolData }
      })
    },
    updatePoolsUserData: (state, action) => {
      const { field, value, sousId } = action.payload
      const index = state.data.findIndex((p) => p.sousId === sousId)
      state.data[index] = { ...state.data[index], userData: { ...state.data[index].userData, [field]: value } }
    },
  },
})

// Actions
export const { setPoolsPublicData, setPoolsUserData, updatePoolsUserData } = V2PoolsSlice.actions

// Thunks
export const fetchPoolsPublicDataAsync = () => async (dispatch) => {
  const totalStakings = await fetchPoolsTotalStaking()
  const generalData = await fetchPoolsGeneralInfos()

  const liveData = v2poolsConfig.map((pool) => {
    const totalStaking = totalStakings.find((entry) => entry.sousId === pool.sousId)
    const {
      dailyApr,
      currentExchangeRate,
      rateOfYesterday,
      avgDailyAprPerWeek,
      paperHandsPenalty,
      distributionPhp,
    } = generalData.find((entry) => entry.sousId === pool.sousId)

    return {
      ...totalStaking,
      dailyApr,
      currentExchangeRate,
      rateOfYesterday,
      avgDailyAprPerWeek,
      paperHandsPenalty,
      distributionPhp,
    }
  })

  dispatch(setPoolsPublicData(liveData))
}

export const fetchPoolsUserDataAsync = (account) => async (dispatch) => {
  const allowances = await fetchPoolsAllowance(account)
  const stakingTokenBalances = await fetchUserBalances(account)
  const stakedBalances = await fetchUserStakeBalances(account)
  // const pendingRewards = await fetchUserPendingRewards(account)

  const userData = v2poolsConfig.map((pool) => ({
    sousId: pool.sousId,
    allowance: allowances[pool.sousId],
    stakingTokenBalance: stakingTokenBalances[pool.sousId],
    stakedBalance: stakedBalances[pool.sousId],
    // pendingReward: pendingRewards[pool.sousId],
  }))

  dispatch(setPoolsUserData(userData))
}

export const updateUserAllowance = (sousId: string, account: string) => async (dispatch) => {
  const allowances = await fetchPoolsAllowance(account)
  dispatch(updatePoolsUserData({ sousId, field: 'allowance', value: allowances[sousId] }))
}

export const updateUserBalance = (sousId: string, account: string) => async (dispatch) => {
  const tokenBalances = await fetchUserBalances(account)
  dispatch(updatePoolsUserData({ sousId, field: 'stakingTokenBalance', value: tokenBalances[sousId] }))
}

export const updateUserStakedBalance = (sousId: string, account: string) => async (dispatch) => {
  const stakedBalances = await fetchUserStakeBalances(account)
  dispatch(updatePoolsUserData({ sousId, field: 'stakedBalance', value: stakedBalances[sousId] }))
}

export const updateUserPendingReward = (sousId: string, account: string) => async (dispatch) => {
  const pendingRewards = await fetchUserPendingRewards(account)
  dispatch(updatePoolsUserData({ sousId, field: 'pendingReward', value: pendingRewards[sousId] }))
}

export default V2PoolsSlice.reducer
