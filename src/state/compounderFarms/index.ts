/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import farmsConfig from 'config/constants/compounderFarms'
import { fetchMasterChefGlobalData, fetchCompounderFarms } from './fetchCompounderFarms'
import {
  fetchCompounderFarmUserEarnings,
  fetchCompounderFarmUserAllowances,
  fetchCompounderFarmUserTokenBalances,
  fetchCompounderFarmUserStakedBalances,
} from './fetchCompounderFarmUser'
import { FarmsState, Farm } from '../types'

const initialState: FarmsState = { pefiPerBlock: 0, data: [...farmsConfig] }

export const farmsSlice = createSlice({
  name: 'CompounderFarms',
  initialState,
  reducers: {
    setPefiPerBlock: (state, action) => {
      state.pefiPerBlock = action.payload
    },
    setFarmsPublicData: (state, action) => {
      const liveFarmsData: Farm[] = action.payload
      state.data = state.data.map((farm) => {
        const liveFarmData = liveFarmsData.find((f) => f.pid === farm.pid && f.type === farm.type)
        return { ...farm, ...liveFarmData }
      })
    },
    setFarmUserData: (state, action) => {
      const { arrayOfUserDataObjects } = action.payload
      arrayOfUserDataObjects.forEach((userDataEl) => {
        const { index } = userDataEl
        state.data[index] = { ...state.data[index], userData: userDataEl }
      })
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
export const fetchCompounderFarmsPublicDataAsync = () => async (dispatch) => {
  const farms = await fetchCompounderFarms()
  dispatch(setFarmsPublicData(farms))
}
export const fetchCompounderFarmUserDataAsync = (account) => async (dispatch) => {
  const userFarmAllowances = await fetchCompounderFarmUserAllowances(account)
  const userFarmTokenBalances = await fetchCompounderFarmUserTokenBalances(account)
  const userStakedBalances = await fetchCompounderFarmUserStakedBalances(account)
  const userFarmEarnings = await fetchCompounderFarmUserEarnings(account)

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
