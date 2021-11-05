/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import v2FarmsConfig from 'config/constants/v2Farms'
import { readFromCache, writeToCache } from 'utils/cache'
import { fetchMasterChefGlobalData, fetchFarms } from './fetchFarms'
import {
  // fetchFarmUserEarnings,
  fetchFarmUserAllowances,
  fetchFarmUserTokenBalances,
  // fetchFarmUserStakedBalances,
  fetchFarmUserData,
} from './fetchFarmUser'
import { V2FarmsState, V2Farm } from '../types'

const initialState: V2FarmsState = { pefiPerSecond: 0, data: readFromCache('v2farms') ? [...readFromCache('v2farms')] : [...v2FarmsConfig] }

export const farmsSlice = createSlice({
  name: 'V2Farms',
  initialState,
  reducers: {
    setPefiPerSecond: (state, action) => {
      state.pefiPerSecond = action.payload
    },
    setFarmsPublicData: (state, action) => {
      const liveFarmsData: V2Farm[] = action.payload
      const newFarmsData = state.data.map((farm) => {
        const liveFarmData = liveFarmsData.find((f) => f.pid === farm.pid && f.type === farm.type)
        return { ...farm, ...liveFarmData }
      });
      state.data = [...newFarmsData];
      writeToCache('v2farms', newFarmsData);
    },
    setFarmUserData: (state, action) => {
      const { arrayOfUserDataObjects } = action.payload
      const newFarmsData = [...state.data];
      
      arrayOfUserDataObjects.forEach((userDataEl) => {
        const { index } = userDataEl
        newFarmsData[index] = { ...newFarmsData[index], userData: userDataEl }
      })
      state.data = [...newFarmsData];
      writeToCache('v2farms', newFarmsData);
    },
  },
})

// Actions
export const { setPefiPerSecond, setFarmsPublicData, setFarmUserData } = farmsSlice.actions

// Thunks
export const fetchMasterChefPefiPerBlock = () => async (dispatch) => {
  const { pefiPerSecond } = await fetchMasterChefGlobalData()
  dispatch(setPefiPerSecond(pefiPerSecond))
}
export const fetchFarmsPublicDataAsync = () => async (dispatch) => {
  const farms = await fetchFarms()
  dispatch(setFarmsPublicData(farms))
}
export const fetchFarmUserDataAsync = (account) => async (dispatch) => {
  if (!account) return
  const userFarmAllowances = await fetchFarmUserAllowances(account)
  const userFarmTokenBalances = await fetchFarmUserTokenBalances(account)
  // const userStakedBalances = await fetchFarmUserStakedBalances(account)
  // const userFarmEarnings = await fetchFarmUserEarnings(account)
  const userFarmData = await fetchFarmUserData(account)
  const {
    userStakedBalances,
    userFarmEarnings,
    userFarmShares,
    userPendingTokens,
    userIpefiDistributionBips,
  } = userFarmData

  const arrayOfUserDataObjects = userFarmAllowances.map((farmAllowance, index) => {
    return {
      index,
      allowance: userFarmAllowances[index],
      tokenBalance: userFarmTokenBalances[index],
      stakedBalance: userStakedBalances[index],
      earnings: userFarmEarnings[index],
      userShares: userFarmShares[index],
      userPendingTokens: userPendingTokens[index],
      userIpefiDistributionBips: userIpefiDistributionBips[index],
    }
  })

  dispatch(setFarmUserData({ arrayOfUserDataObjects }))
}

export default farmsSlice.reducer
