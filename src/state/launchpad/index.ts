/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import BigNumber from 'bignumber.js'
import {
  fetchLaunchpadAllowance,
  fetchUserStakedBalance,
} from './fetchLaunchpadUser'
import { LaunchpadState } from '../types'

const initialState: LaunchpadState = { 
  stakedBalance: 0,
  allowance: 0
};

export const LaunchpadSlice = createSlice({
  name: 'Launchpad',
  initialState,
  reducers: {
    setLaunchpadUserData: (state, action) => {
      state.allowance = action.payload.allowance
      state.stakedBalance = action.payload.stakedBalance
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

  dispatch(setLaunchpadUserData({
    allowance,
    stakedBalance
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
