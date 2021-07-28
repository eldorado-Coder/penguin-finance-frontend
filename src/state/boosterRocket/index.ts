/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import {
  fetchGlobalData, // global
  fetchUserData, // user
} from './fetchBoosterRocket'
import { BoosterRocketState } from '../types'

const initialState: BoosterRocketState = {
  // user
  hasTheUserAgreed: false,
  canPurchaseAmount: 0,
  tokensPurchased: 0,
  // global
  eventStarted: false,
  eventOngoing: false,
  tokensLeftToDistribute: 0,
  totalTokensSold: 0,
  totalProceeds: 0,
  allocationRate: 1,
}

export const BoosterRocketSlice = createSlice({
  name: 'BoosterRocket',
  initialState,
  reducers: {
    setBoosterRocketUserData: (state, action) => {
      state.hasTheUserAgreed = action.payload.hasTheUserAgreed
      state.canPurchaseAmount = action.payload.canPurchaseAmount
      state.tokensPurchased = action.payload.tokensPurchased
    },
    setBoosterRocketGlobalData: (state, action) => {
      state.eventStarted = action.payload.eventStarted
      state.eventOngoing = action.payload.eventOngoing
      state.tokensLeftToDistribute = action.payload.tokensLeftToDistribute
      state.totalTokensSold = action.payload.totalTokensSold
      state.totalProceeds = action.payload.totalProceeds
      state.allocationRate = action.payload.allocationRate
    },
  },
})

// Actions
export const { setBoosterRocketUserData, setBoosterRocketGlobalData } = BoosterRocketSlice.actions

export const fetchBoosterRocketUserDataAsync = (account: string) => async (dispatch) => {
  // fetch global data
  const {
    eventStarted,
    eventOngoing,
    tokensLeftToDistribute,
    totalTokensSold,
    totalProceeds,
    allocationRate,
  } = await fetchGlobalData()
  console.log(
    '111--->data1',
    eventStarted,
    eventOngoing,
    tokensLeftToDistribute,
    totalTokensSold,
    totalProceeds,
    allocationRate,
  )

  dispatch(
    setBoosterRocketGlobalData({
      eventStarted,
      eventOngoing,
      tokensLeftToDistribute,
      totalTokensSold,
      totalProceeds,
      allocationRate,
    }),
  )

  // fetch user data
  if (!account) return
  const { hasTheUserAgreed, canPurchaseAmount, tokensPurchased } = await fetchUserData(account)
  dispatch(
    setBoosterRocketUserData({
      hasTheUserAgreed,
      canPurchaseAmount,
      tokensPurchased,
    }),
  )
}

export default BoosterRocketSlice.reducer
