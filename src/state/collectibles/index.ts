/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { fetchUserCollectibles } from './fetchUserCollectibles'
import { UserCollectiblesState } from '../types'

const initialState: UserCollectiblesState = {
  nftIds: [],
}

export const UserCollectiblesSlice = createSlice({
  name: 'UserCollectibles',
  initialState,
  reducers: {
    setUserCollectiblesData: (state, action) => {
      state.nftIds = action.payload.nftIds
    }
  },
})

// Actions
export const { setUserCollectiblesData } = UserCollectiblesSlice.actions

export const fetchUserCollectiblesDataAsync = (account: string) => async (dispatch) => {
  const nftIds = await fetchUserCollectibles(account);

  dispatch(
    setUserCollectiblesData({
      nftIds
    }),
  )
}

export default UserCollectiblesSlice.reducer
