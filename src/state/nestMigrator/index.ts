/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { fetchNestMigratorAllowance, fetchUserInfo } from './fetchUserData'
import { NestMigratorState } from '../types'

const initialState: NestMigratorState = {
  pefiAllowance: 0,
  xPefiAllowance: 0,
  expectedIPefi: 0,
}

export const NestMigratorSlice = createSlice({
  name: 'NestMigrator',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.pefiAllowance = action.payload.pefiAllowance
      state.xPefiAllowance = action.payload.xPefiAllowance
      state.expectedIPefi = action.payload.expectedIPefi
    },
    setPefiAllowance: (state, action) => {
      state.pefiAllowance = action.payload
    },
    setXPefiAllowance: (state, action) => {
      state.xPefiAllowance = action.payload
    },
    setExpectedIPefi: (state, action) => {
      state.expectedIPefi = action.payload
    },
  },
})

// Actions
export const { setUserData, setPefiAllowance, setXPefiAllowance, setExpectedIPefi } = NestMigratorSlice.actions

export const fetchNestMigratorUserDataAsync = (account: string) => async (dispatch) => {
  const { xPefiAllowance } = await fetchNestMigratorAllowance(account)
  const { expectedIPefi } = await fetchUserInfo(account)

  dispatch(
    setUserData({
      xPefiAllowance,
      expectedIPefi,
    }),
  )
}

export const updateNestMigratorAllowance = (account: string) => async (dispatch) => {
  const { xPefiAllowance } = await fetchNestMigratorAllowance(account)
  dispatch(setXPefiAllowance(xPefiAllowance))
}

export default NestMigratorSlice.reducer
