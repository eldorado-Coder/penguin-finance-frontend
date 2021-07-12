/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import {
  fetchLaunchpadAllowance,
  fetchUserStakedBalance,
  fetchUserPenguinTier,
  fetchUserAllocation,
  fetchUserCanUnstake,
  fetchDepositEnd
} from './fetchLaunchpadUser'
import { LaunchpadState } from '../types'

const initialState: LaunchpadState = { 
  stakedBalance: 0,
  allowance: 0,
  yourPenguinTier: 0,
  allocation: 0,
  canUnstake: false,
  depositEnd: 0
};

export const LaunchpadSlice = createSlice({
  name: 'Launchpad',
  initialState,
  reducers: {
    setLaunchpadUserData: (state, action) => {
      state.allowance = action.payload.allowance
      state.stakedBalance = action.payload.stakedBalance
      state.yourPenguinTier = action.payload.yourPenguinTier
      state.allocation = action.payload.allocation
      state.canUnstake = action.payload.canUnstake
      state.depositEnd = action.payload.depositEnd
    },
    setStakedValance: (state, action) => {
      state.stakedBalance = action.payload
    },
    setAllowance: (state, action) => {
      state.allowance = action.payload
    }
  },
})

// Actions
export const { setAllowance, setStakedValance, setLaunchpadUserData } = LaunchpadSlice.actions

export const fetchLaunchpadUserDataAsync = (account: string) => async (dispatch) => {
  const allowance = await fetchLaunchpadAllowance(account)
  const stakedBalance = await fetchUserStakedBalance(account)
  const yourPenguinTier = await fetchUserPenguinTier(account)
  const allocation = await fetchUserAllocation(account)
  const canUnstake = await fetchUserCanUnstake(account)
  const depositEnd = await fetchDepositEnd()

  dispatch(setLaunchpadUserData({
    allowance,
    stakedBalance,
    yourPenguinTier,
    allocation,
    canUnstake,
    depositEnd
  }))
}

export const updateLaunchpadStakedBalance = (account: string) => async (dispatch) => {
  const stakedBalance = await fetchUserStakedBalance(account)
  dispatch(setStakedValance(stakedBalance))
}

export const updateLaunchpadAllowance = (account: string) => async (dispatch) => {
  const allowance = await fetchLaunchpadAllowance(account)
  dispatch(setAllowance(allowance))
}

export default LaunchpadSlice.reducer
