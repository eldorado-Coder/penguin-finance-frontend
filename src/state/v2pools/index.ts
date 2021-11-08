/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import v2poolsConfig from 'config/constants/v2pools'
import { readFromCache, writeToCache } from 'utils/cache';
import { fetchPoolsTotalStaking, fetchPoolsGeneralInfos } from './fetchPools'
import {
  fetchPoolsAllowance,
  fetchUserBalances,
  fetchUserStakeBalances,
  fetchUserPendingRewards,
  // new
  fetchUserInfos,
} from './fetchPoolsUser'
import { PoolsState, Pool } from '../types'

const initialState: PoolsState = { data: readFromCache('v2pools') ? [...readFromCache('v2pools')] : [...v2poolsConfig] }

export const V2PoolsSlice = createSlice({
  name: 'V2Pools',
  initialState,
  reducers: {
    setPoolsPublicData: (state, action) => {
      const livePoolsData: Pool[] = action.payload
      const newPools = state.data.map((pool) => {
        const livePoolData = livePoolsData.find((entry) => entry.sousId === pool.sousId)
        return { ...pool, ...livePoolData }
      })
      state.data = [...newPools];
      writeToCache('v2pools', newPools);
    },
    setPoolsUserData: (state, action) => {
      const userData = action.payload
      const newPools = state.data.map((pool) => {
        const userPoolData = userData.find((entry) => entry.sousId === pool.sousId)
        return { ...pool, userData: userPoolData }
      })
      state.data = [...newPools];
      writeToCache('v2pools', newPools);
    },
    updatePoolsUserData: (state, action) => {
      const { field, value, sousId } = action.payload
      const index = state.data.findIndex((p) => p.sousId === sousId)
      const newPools = [...state.data];
      newPools[index] = { ...newPools[index], userData: { ...newPools[index].userData, [field]: value } }
      state.data = [...newPools];
      writeToCache('v2pools', newPools);
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
      historicalRates,
    } = generalData.find((entry) => entry.sousId === pool.sousId)

    return {
      ...totalStaking,
      dailyApr,
      currentExchangeRate,
      rateOfYesterday,
      avgDailyAprPerWeek,
      paperHandsPenalty,
      distributionPhp,
      historicalRates,
    }
  })

  dispatch(setPoolsPublicData(liveData))
}

export const fetchPoolsUserDataAsync = (account) => async (dispatch) => {
  if (!account) return

  const userData = await fetchUserInfos(account)
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
