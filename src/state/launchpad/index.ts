/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import {
  fetchLaunchpadAllowance,
  fetchUserStakedBalance,
  fetchDepositEnd,
  fetchUserXPefiBalance,
  // launchpad
  fetchUserData,
} from './fetchLaunchpadUser'
import { LaunchpadState } from '../types'

const initialState: LaunchpadState = {
  stakedBalance: 0,
  allowance: 0,
  yourPenguinTier: 0,
  allocation: 0,
  canUnstake: false,
  depositEnd: 0,
  xPefi: 0,
}

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
      state.xPefi = action.payload.xPefi
    },
    setStakedValance: (state, action) => {
      state.stakedBalance = action.payload
    },
    setAllowance: (state, action) => {
      state.allowance = action.payload
    },
  },
})

// Actions
export const { setAllowance, setStakedValance, setLaunchpadUserData } = LaunchpadSlice.actions

export const fetchLaunchpadUserDataAsync = (account: string) => async (dispatch) => {
  const allowance = await fetchLaunchpadAllowance(account)
  const xPefi = await fetchUserXPefiBalance(account)
  const depositEnd = await fetchDepositEnd()
  // from launchpad
  const { stakedBalance, penguinTier: yourPenguinTier, allocation, canUnstake } = await fetchUserData(account)

  dispatch(
    setLaunchpadUserData({
      allowance,
      stakedBalance,
      yourPenguinTier,
      allocation,
      canUnstake,
      depositEnd,
      xPefi,
    }),
  )
}

export const updateLaunchpadAllowance = (account: string) => async (dispatch) => {
  const allowance = await fetchLaunchpadAllowance(account)
  dispatch(setAllowance(allowance))
}

export const updateLaunchpadStakedBalance = (account: string) => async (dispatch) => {
  const stakedBalance = await fetchUserStakedBalance(account)
  dispatch(setStakedValance(stakedBalance))
}

export default LaunchpadSlice.reducer
