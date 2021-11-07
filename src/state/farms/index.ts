/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import farmsConfig from 'config/constants/farms'
import { readFromCache, writeToCache } from 'utils/cache'
import { fetchMasterChefGlobalData, fetchFarms } from './fetchFarms'
import {
  fetchFarmUserEarnings,
  fetchFarmUserAllowances,
  fetchFarmUserTokenBalances,
  fetchFarmUserStakedBalances,
} from './fetchFarmUser'
import { FarmsState, Farm } from '../types'

const initialState: FarmsState = { pefiPerBlock: 0, data: readFromCache('farms') ? [...readFromCache('farms')] : [...farmsConfig] }

export const farmsSlice = createSlice({
  name: 'Farms',
  initialState,
  reducers: {
    setPefiPerBlock: (state, action) => {
      state.pefiPerBlock = action.payload
    },
    setFarmsPublicData: (state, action) => {
      const liveFarmsData: Farm[] = action.payload
      const newFarmsData = state.data.map((farm) => {
        const liveFarmData = liveFarmsData.find((f) => f.pid === farm.pid && f.type === farm.type)
        return { ...farm, ...liveFarmData }
      })
      state.data = [...newFarmsData];
      writeToCache('farms', newFarmsData);
    },
    setFarmUserData: (state, action) => {
      const { arrayOfUserDataObjects } = action.payload
      const newFarmsData = [...state.data];
      
      arrayOfUserDataObjects.forEach((userDataEl) => {
        const { index } = userDataEl
        newFarmsData[index] = { ...newFarmsData[index], userData: userDataEl }
      })
      state.data = [...newFarmsData];
      writeToCache('farms', newFarmsData);
    },
  },
})

// Actions
export const { setPefiPerBlock, setFarmsPublicData, setFarmUserData } = farmsSlice.actions

// Thunks
export const fetchMasterChefPefiPerBlock = () => async (dispatch) => {
  const { pefiPerBlock } = await fetchMasterChefGlobalData()
  dispatch(setPefiPerBlock(pefiPerBlock))
}
export const fetchFarmsPublicDataAsync = () => async (dispatch) => {
  const farms = await fetchFarms()
  dispatch(setFarmsPublicData(farms))
}
export const fetchFarmUserDataAsync = (account) => async (dispatch) => {
  const userFarmAllowances = await fetchFarmUserAllowances(account)
  const userFarmTokenBalances = await fetchFarmUserTokenBalances(account)
  const userStakedBalances = await fetchFarmUserStakedBalances(account)
  const userFarmEarnings = await fetchFarmUserEarnings(account)

  const arrayOfUserDataObjects = userFarmAllowances.map((farmAllowance, index) => {
    return {
      index,
      allowance: userFarmAllowances[index],
      tokenBalance: userFarmTokenBalances[index],
      stakedBalance: userStakedBalances[index],
      earnings: userFarmEarnings[index],
    }
  })

  dispatch(setFarmUserData({ arrayOfUserDataObjects }))
}

export default farmsSlice.reducer
