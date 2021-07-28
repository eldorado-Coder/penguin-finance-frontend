/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import {
  fetchGlobalData, // global
  fetchUserData, // user
  fetchUserPayTokenBalance,
  fetchUserBuyTokenBalance,
} from './fetchBoosterRocket'
import { BoosterRocketState } from '../types'

const initialState: BoosterRocketState = {
  // user
  hasTheUserAgreed: false,
  canPurchaseAmount: 0,
  tokensPurchased: 0,
  payTokenBalance: 0,
  buyTokenBalance: 0,
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
    setBoosterRocketGlobalData: (state, action) => {
      state.eventStarted = action.payload.eventStarted
      state.eventOngoing = action.payload.eventOngoing
      state.tokensLeftToDistribute = action.payload.tokensLeftToDistribute
      state.totalTokensSold = action.payload.totalTokensSold
      state.totalProceeds = action.payload.totalProceeds
      state.allocationRate = action.payload.allocationRate
    },
    setBoosterRocketUserData: (state, action) => {
      state.hasTheUserAgreed = action.payload.hasTheUserAgreed
      state.canPurchaseAmount = action.payload.canPurchaseAmount
      state.tokensPurchased = action.payload.tokensPurchased
    },
    setBoosterRocketUserPayTokenBalance: (state, action) => {
      state.payTokenBalance = action.payload.payTokenBalance
    },
    setBoosterRocketUserBuyTokenBalance: (state, action) => {
      state.buyTokenBalance = action.payload.buyTokenBalance
    },
  },
})

// Actions
export const {
  setBoosterRocketGlobalData,
  setBoosterRocketUserData,
  setBoosterRocketUserPayTokenBalance,
  setBoosterRocketUserBuyTokenBalance,
} = BoosterRocketSlice.actions

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
  const payTokenBalance = await fetchUserPayTokenBalance(account)
  dispatch(
    setBoosterRocketUserPayTokenBalance({
      payTokenBalance,
    }),
  )
  const buyTokenBalance = await fetchUserBuyTokenBalance(account)

  dispatch(
    setBoosterRocketUserBuyTokenBalance({
      buyTokenBalance,
    }),
  )
}

export default BoosterRocketSlice.reducer
