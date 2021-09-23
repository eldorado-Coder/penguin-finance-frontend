/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import {
  fetchLaunchpadAllowance,
  fetchUserStakedBalance,
  fetchDepositEnd,
  fetchUserXPefiBalance,
  // launchpad
  fetchUserData,
  fetchTierHurdles,
} from './fetchLaunchpadBoofiUser'
import { LaunchpadBoofiState } from '../types'

const initialState: LaunchpadBoofiState = {
  stakedBalance: 0,
  allowance: 0,
  yourPenguinTier: 0,
  allocation: 0,
  canUnstake: false,
  timeRemainingToUnstake: 0,
  depositEnd: 0,
  xPefi: 0,
  tierHurdles: [],
}

export const LaunchpadBoofiSlice = createSlice({
  name: 'LaunchpadBoofi',
  initialState,
  reducers: {
    setLaunchpadUserData: (state, action) => {
      state.allowance = action.payload.allowance
      state.stakedBalance = action.payload.stakedBalance
      state.yourPenguinTier = action.payload.yourPenguinTier
      state.allocation = action.payload.allocation
      state.canUnstake = action.payload.canUnstake
      state.timeRemainingToUnstake = action.payload.timeRemainingToUnstake
      state.depositEnd = action.payload.depositEnd
      state.xPefi = action.payload.xPefi
    },
    setStakedValance: (state, action) => {
      state.stakedBalance = action.payload
    },
    setAllowance: (state, action) => {
      state.allowance = action.payload
    },
    setTierHurdles: (state, action) => {
      state.tierHurdles = [...action.payload]
    },
  },
})

// Actions
export const { setTierHurdles, setAllowance, setStakedValance, setLaunchpadUserData } = LaunchpadBoofiSlice.actions

export const fetchLaunchpadBoofiUserDataAsync = (account: string) => async (dispatch) => {
  const allowance = await fetchLaunchpadAllowance(account)
  const xPefi = await fetchUserXPefiBalance(account)
  const depositEnd = await fetchDepositEnd()
  // from launchpad
  const {
    stakedBalance,
    penguinTier: yourPenguinTier,
    allocation,
    canUnstake,
    timeRemainingToUnstake,
  } = await fetchUserData(account)

  dispatch(
    setLaunchpadUserData({
      allowance,
      stakedBalance,
      yourPenguinTier,
      allocation,
      canUnstake,
      timeRemainingToUnstake,
      depositEnd,
      xPefi,
    }),
  )
}

export const updateLaunchpadBoofiAllowance = (account: string) => async (dispatch) => {
  const allowance = await fetchLaunchpadAllowance(account)
  dispatch(setAllowance(allowance))
}

export const updateLaunchpadBoofiStakedBalance = (account: string) => async (dispatch) => {
  const stakedBalance = await fetchUserStakedBalance(account)
  dispatch(setStakedValance(stakedBalance))
}

export const updateLaunchpadBoofiTierHurdles = () => async (dispatch) => {
  const tierHurdles = await fetchTierHurdles()
  dispatch(setTierHurdles(tierHurdles))
}

export default LaunchpadBoofiSlice.reducer
