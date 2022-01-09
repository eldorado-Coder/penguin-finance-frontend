/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { fetchGlobalData } from './fetchFarms'
import { BenqiFarmsState } from '../types'

const initialState: BenqiFarmsState = {
  avaxPerSec: 0,
  benqiPerSec: 0,
  totalSupply: 0,
}

export const farmsSlice = createSlice({
  name: 'BenqiFarms',
  initialState,
  reducers: {
    setGlobalData: (state, action) => {
      const { avaxPerSec, benqiPerSec, totalSupply } = action.payload
      state.avaxPerSec = avaxPerSec
      state.benqiPerSec = benqiPerSec
      state.totalSupply = totalSupply
    },
    setFarmsPublicData: () => {
      // console.log('123')
    },
  },
})

// Actions
export const { setGlobalData, setFarmsPublicData } = farmsSlice.actions

// Thunks
export const fetchMasterChefGlobalData = () => async (dispatch) => {
  const { avaxPerSec, benqiPerSec, totalSupply } = await fetchGlobalData()
  dispatch(setGlobalData({ avaxPerSec, benqiPerSec, totalSupply }))
}

export default farmsSlice.reducer
