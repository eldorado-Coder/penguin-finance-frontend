/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import {
  fetchEmperorData,
  fetchCurrentEmperorAddress,
  fetchCurrentEmperorBid,
  fetchMaxBidIncrease,
  fetchMinBidIncrease,
  fetchOpeningBid,
  fetchTopEmperors,
  fetchCurrentEmperorJackpot,
} from './fetchEmperorData'
import { EmperorState } from '../types'

const initialState: EmperorState = {
  myEmperor: {},
  currentEmperor: {},
  topEmperors: [],
  maxBidIncrease: 0,
  minBidIncrease: 0,
  openingBib: 0,
}

export const EmperorSlice = createSlice({
  name: 'Emperor',
  initialState,
  reducers: {
    setInitialData: (state) => {
      state.currentEmperor = {}
    },
    setMyEmperor: (state, action) => {
      state.myEmperor = {
        ...state.myEmperor,
        ...action.payload,
      }
    },
    setCurrentEmperor: (state, action) => {
      state.currentEmperor = {
        ...state.currentEmperor,
        ...action.payload,
      }
    },
    setTopEmperors: (state, action) => {
      state.topEmperors = [...action.payload]
    },
    setMaxBidIncrease: (state, action) => {
      state.maxBidIncrease = action.payload
    },
    setMinBidIncrease: (state, action) => {
      state.minBidIncrease = action.payload
    },
    setopeningBib: (state, action) => {
      state.openingBib = action.payload
    },
  },
})

// Actions
export const {
  setInitialData,
  setMyEmperor,
  setCurrentEmperor,
  setTopEmperors,
  setMaxBidIncrease,
  setMinBidIncrease,
  setopeningBib,
} = EmperorSlice.actions

// Thunks

export const setInit = () => async (dispatch) => {
  dispatch(setInitialData())
}

export const fetchEmperor = (account) => async (dispatch) => {
  if (!account) return

  // fetch general Info
  const maxBidIncrease = await fetchMaxBidIncrease()
  dispatch(setMaxBidIncrease(maxBidIncrease))

  const minBidIncrease = await fetchMinBidIncrease()
  dispatch(setMinBidIncrease(minBidIncrease))

  const openingBid = await fetchOpeningBid()
  dispatch(setopeningBib(openingBid))

  // fetch current emperor
  const currentEmperorAddress = await fetchCurrentEmperorAddress()
  dispatch(setCurrentEmperor({ address: currentEmperorAddress }))

  const currentEmperorBid = await fetchCurrentEmperorBid()
  dispatch(setCurrentEmperor({ bidAmount: currentEmperorBid }))

  const currentEmperorJackpot = await fetchCurrentEmperorJackpot()
  dispatch(setCurrentEmperor({ jackpot: currentEmperorJackpot }))

  if (currentEmperorAddress && currentEmperorAddress.length > 0) {
    const currentEmperor = await fetchEmperorData(currentEmperorAddress)
    dispatch(setCurrentEmperor(currentEmperor))
  }

  // fetch my emperor
  const myEmperor = await fetchEmperorData(account)
  dispatch(setMyEmperor({ ...myEmperor, address: account }))

  // fetch top 5 emperor
  if (currentEmperorAddress && currentEmperorAddress.length > 0) {
    const topEmperors = await fetchTopEmperors()
    dispatch(setTopEmperors(topEmperors))
  }
}

export default EmperorSlice.reducer
