/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { fetchUserCollectibles, fetchUserNftClaimStatus } from './fetchUserCollectibles'
import { UserCollectiblesState } from '../types'

const initialState: UserCollectiblesState = {
  nftCollections: [],
  nftClaimStatus: [],
}

export const UserCollectiblesSlice = createSlice({
  name: 'UserCollectibles',
  initialState,
  reducers: {
    setUserCollectiblesData: (state, action) => {
      state.nftCollections = action.payload.nftCollections
    },
    setUserNFTClaimStatus: (state, action) => {
      state.nftClaimStatus = action.payload.nftClaimStatus
    },
  },
})

// Actions
export const { setUserCollectiblesData, setUserNFTClaimStatus } = UserCollectiblesSlice.actions

export const fetchUserCollectiblesDataAsync = (account: string) => async (dispatch) => {
  if (!account) return
  const nftCollections = await fetchUserCollectibles(account)
  const nftClaimStatus = await fetchUserNftClaimStatus(account)

  dispatch(
    setUserCollectiblesData({
      nftCollections,
    }),
  )
  dispatch(
    setUserNFTClaimStatus({
      nftClaimStatus,
    }),
  )
}

export default UserCollectiblesSlice.reducer
