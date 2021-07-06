/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import {
  fetchEmperorData,
  fetchCurrentEmperorData,
  fetchMaxBidIncrease,
  fetchMinBidIncrease,
  fetchOpeningBid,
  fetchFinalDate,
  fetchPoisonDuration,
  fetchTopEmperors,
} from './fetchEmperorData'
import { EmperorState } from '../types'

const initialState: EmperorState = {
  myEmperor: {},
  currentEmperor: {},
  topEmperors: [],
  maxBidIncrease: 0,
  minBidIncrease: 0,
  openingBib: 0,
  finalDate: 0,
  poisonDuration: 0,
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
    setOpeningBib: (state, action) => {
      state.openingBib = action.payload
    },
    setFinalDate: (state, action) => {
      state.finalDate = action.payload
    },
    setPoisonDuration: (state, action) => {
      state.poisonDuration = action.payload
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
  setOpeningBib,
  setFinalDate,
  setPoisonDuration,
} = EmperorSlice.actions

// Thunks
export const setInit = () => async (dispatch) => {
  dispatch(setInitialData())
}

export const fetchEmperor = (account) => async (dispatch) => {

  // fetch current emperor
  const currentEmperorData = await fetchCurrentEmperorData()

  dispatch(
    setCurrentEmperor({
      ...currentEmperorData,
    }),
  )

  // fetch top 5 emperor
  const topEmperors = await fetchTopEmperors()
  dispatch(setTopEmperors(topEmperors))

  // fetch general Info
  const maxBidIncrease = await fetchMaxBidIncrease()
  dispatch(setMaxBidIncrease(maxBidIncrease))

  const minBidIncrease = await fetchMinBidIncrease()
  dispatch(setMinBidIncrease(minBidIncrease))

  const openingBid = await fetchOpeningBid()
  dispatch(setOpeningBib(openingBid))

  const finalDate = await fetchFinalDate()
  dispatch(setFinalDate(finalDate))

  const poisonDuration = await fetchPoisonDuration()
  dispatch(setPoisonDuration(poisonDuration))


  if (!account) return

  // fetch my emperor
  const myEmperor = await fetchEmperorData(account)

  dispatch(
    setMyEmperor({
      ...myEmperor,
    }),
  )
}

export default EmperorSlice.reducer
