/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import farmsConfig from 'config/constants/lydiaFarms'
import { fetchMasterChefGlobalData, fetchFarms } from './fetchFarms'
import { LydiaFarmsState, Farm } from '../types'

const initialState: LydiaFarmsState = { lydPerSec: 0, data: [...farmsConfig] }

export const farmsSlice = createSlice({
  name: 'Farms',
  initialState,
  reducers: {
    setLydPerSec: (state, action) => {
      state.lydPerSec = action.payload
    },
    setFarmsPublicData: (state, action) => {
      const liveFarmsData: Farm[] = action.payload
      state.data = state.data.map((farm) => {
        const liveFarmData = liveFarmsData.find((f) => f.pid === farm.pid && f.type === farm.type)
        return { ...farm, ...liveFarmData }
      })
    },
  },
})

// Actions
export const { setLydPerSec, setFarmsPublicData } = farmsSlice.actions

// Thunks
export const fetchMasterChefLydPerSec = () => async (dispatch) => {
  const { lydPerSec } = await fetchMasterChefGlobalData()
  dispatch(setLydPerSec(lydPerSec))
}
export const fetchFarmsPublicDataAsync = () => async (dispatch) => {
  const farms = await fetchFarms()
  dispatch(setFarmsPublicData(farms))
}
export default farmsSlice.reducer
