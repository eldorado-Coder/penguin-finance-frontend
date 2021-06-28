/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { SettingState } from 'state/types'

const initialState: SettingState = {
  isCurrentBlockShowed: true,
  isMusicEnabled: true,
}

export const SettingSlice = createSlice({
  name: 'Setting',
  initialState,
  reducers: {
    setCurrentBlockShowed: (state, action) => {
      state.isCurrentBlockShowed = action.payload
    },
    setMusicEnabled: (state, action) => {
      state.isMusicEnabled = action.payload
    },
  },
})

// Actions
export const { setCurrentBlockShowed, setMusicEnabled } = SettingSlice.actions

export const updateCurrentBlockShowed = (value) => async (dispatch) => {
  dispatch(setCurrentBlockShowed(value))
}

export const updateMusicEnabled = (value) => async (dispatch) => {
  dispatch(setMusicEnabled(value))
}

export default SettingSlice.reducer
