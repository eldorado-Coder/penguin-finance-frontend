/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import joeV3farmsConfig from './constant'
import { fetchGlobalData, fetchFarms } from './fetchFarms'
import { JoeV3FarmsState, Farm } from '../types'

const initialState: JoeV3FarmsState = {
  joePerSec: 0,
  totalAllocPoint: 0,
  data: [...joeV3farmsConfig],
}

export const farmsSlice = createSlice({
  name: 'JoeV3Farms',
  initialState,
  reducers: {
    setGlobalData: (state, action) => {
      const { joePerSec, totalAllocPoint } = action.payload
      state.joePerSec = joePerSec
      state.totalAllocPoint = totalAllocPoint
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
export const { setGlobalData, setFarmsPublicData } = farmsSlice.actions

// Thunks
export const fetchMasterChefGlobalData = () => async (dispatch) => {
  const { joePerSec, totalAllocPoint } = await fetchGlobalData()
  dispatch(setGlobalData({ joePerSec, totalAllocPoint }))
}

export const fetchFarmsPublicDataAsync = () => async (dispatch) => {
  const farms = await fetchFarms()
  dispatch(setFarmsPublicData(farms))
}

export default farmsSlice.reducer
