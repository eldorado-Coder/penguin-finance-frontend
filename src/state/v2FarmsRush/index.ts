/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import v2FarmsConfig from 'config/constants/v2Farms'
import { fetchFarms } from './fetchFarms'
import { V2FarmsState, V2Farm } from '../types'

const initialState: V2FarmsState = { data: [...v2FarmsConfig] }

export const farmsSlice = createSlice({
  name: 'V2FarmsRush',
  initialState,
  reducers: {
    setFarmsPublicData: (state, action) => {
      const liveFarmsData: V2Farm[] = action.payload
      state.data = state.data.map((farm) => {
        const liveFarmData = liveFarmsData.find((f) => f.pid === farm.pid && f.type === farm.type)
        return { ...farm, ...liveFarmData }
      })
    },
  },
})

// Actions
export const { setFarmsPublicData } = farmsSlice.actions

// Thunks
export const fetchFarmsPublicDataAsync = () => async (dispatch) => {
  const farms = await fetchFarms()
  dispatch(setFarmsPublicData(farms))
}

export default farmsSlice.reducer
