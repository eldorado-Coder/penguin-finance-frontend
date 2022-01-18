/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { fetchGlobalData, fetchTierHurdles } from './fetchLaunchpadKassandra'
import {
  fetchLaunchpadAllowance,
  fetchUserIPefiBalance,
  // launchpad
  fetchUserData,
} from './fetchLaunchpadKassandraUser'
import { LaunchpadKassandraState } from '../types'

const initialState: LaunchpadKassandraState = {
  allowance: 0,
  stakedBalance: '0',
  yourPenguinTier: 0,
  allocation: 0,
  canUnstake: false,
  timeRemainingToUnstake: 0,
  iPefi: 0,
  isRegistered: false,

  tierHurdles: [],
  registrationStart: 0,
  registrationEnd: 0,
  registrationPeriodOngoing: false,
  registeredPenguins: 0,
}

export const LaunchpadKassandraSlice = createSlice({
  name: 'LaunchpadKassandra',
  initialState,
  reducers: {
    setLaunchpadUserData: (state, action) => {
      state.allowance = action.payload.allowance
      state.stakedBalance = action.payload.stakedBalance
      state.yourPenguinTier = action.payload.yourPenguinTier
      state.allocation = action.payload.allocation
      state.canUnstake = action.payload.canUnstake
      state.timeRemainingToUnstake = action.payload.timeRemainingToUnstake
      state.iPefi = action.payload.iPefi
      state.isRegistered = action.payload.isRegistered
    },
    setLaunchpadGlobalData: (state, action) => {
      state.tierHurdles = [...action.payload.tierHurdles]
      state.registrationStart = action.payload.registrationStart
      state.registrationEnd = action.payload.registrationEnd
      state.registrationPeriodOngoing = action.payload.registrationPeriodOngoing
      state.registeredPenguins = action.payload.registeredPenguins
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
export const {
  setTierHurdles,
  setAllowance,
  setStakedValance,
  setLaunchpadUserData,
  setLaunchpadGlobalData,
} = LaunchpadKassandraSlice.actions

export const fetchLaunchpadKassandraUserDataAsync = (account: string) => async (dispatch) => {
  if (!account) return
  const allowance = await fetchLaunchpadAllowance(account)
  const iPefi = await fetchUserIPefiBalance(account)

  // from launchpad
  const {
    stakedBalance,
    penguinTier: yourPenguinTier,
    allocation,
    canUnstake,
    timeRemainingToUnstake,
    isRegistered,
  } = await fetchUserData(account)

  dispatch(
    setLaunchpadUserData({
      allowance,
      stakedBalance,
      yourPenguinTier,
      allocation,
      canUnstake,
      timeRemainingToUnstake,
      iPefi,
      isRegistered,
    }),
  )
}

export const fetchLaunchpadKassandraGlobalDataAsync = () => async (dispatch) => {
  const { registrationStart, registrationEnd, registrationPeriodOngoing, registeredPenguins } = await fetchGlobalData()
  const tierHurdles = await fetchTierHurdles()
  dispatch(
    setLaunchpadGlobalData({
      registrationStart,
      registrationEnd,
      registrationPeriodOngoing,
      registeredPenguins,
      tierHurdles,
    }),
  )
}

export const updateLaunchpadKassandraAllowance = (account: string) => async (dispatch) => {
  const allowance = await fetchLaunchpadAllowance(account)
  dispatch(setAllowance(allowance))
}

export const updateLaunchpadKassandraTierHurdles = () => async (dispatch) => {
  const tierHurdles = await fetchTierHurdles()
  dispatch(setTierHurdles(tierHurdles))
}

export default LaunchpadKassandraSlice.reducer
