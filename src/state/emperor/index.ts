/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { fetchGeneralData, fetchEmperorData, fetchCurrentEmperorData, fetchTopEmperors } from './fetchEmperorData'
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
    setGeneralData: (state, action) => {
      state = { ...state, ...action.payload }
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
  },
})

// Actions
export const { setGeneralData, setInitialData, setMyEmperor, setCurrentEmperor, setTopEmperors } = EmperorSlice.actions

// Thunks
export const setInit = () => async (dispatch) => {
  dispatch(setInitialData())
}

export const fetchEmperor = (account) => async (dispatch) => {
  // fetch my emperor
  if (account) {
    const myEmperor = await fetchEmperorData(account)
    dispatch(
      setMyEmperor({
        ...myEmperor,
      }),
    )
  }

  // fetch general Info
  const generalData = await fetchGeneralData()
  dispatch(setGeneralData({ ...generalData }))

  // fetch current emperor
  const currentEmperorData = await fetchCurrentEmperorData()
  dispatch(
    setCurrentEmperor({
      ...currentEmperorData,
    }),
  )

  // fetch top 5 emperors
  const topEmperors = await fetchTopEmperors()
  dispatch(setTopEmperors(topEmperors))
}

export default EmperorSlice.reducer
