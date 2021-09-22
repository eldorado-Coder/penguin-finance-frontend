/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import farmsConfig from 'config/constants/lydiaFarms'
import { fetchGlobalData, fetchFarms } from './fetchFarms'
import { JoeFarmsState, Farm } from '../types'

const initialState: JoeFarmsState = {
  joePerSec: 0,
  devPercent: 0,
  investorPercent: 0,
  treasuryPercent: 0,
  totalAllocPoint: 0,
  data: [...farmsConfig],
}

export const farmsSlice = createSlice({
  name: 'JoeFarms',
  initialState,
  reducers: {
    setGlobalData: (state, action) => {
      const { joePerSec, devPercent, investorPercent, treasuryPercent, totalAllocPoint } = action.payload
      state.joePerSec = joePerSec
      state.devPercent = devPercent
      state.investorPercent = investorPercent
      state.treasuryPercent = treasuryPercent
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
  const { joePerSec, devPercent, investorPercent, treasuryPercent, totalAllocPoint } = await fetchGlobalData()
  dispatch(setGlobalData({ joePerSec, devPercent, investorPercent, treasuryPercent, totalAllocPoint }))
}

export default farmsSlice.reducer
