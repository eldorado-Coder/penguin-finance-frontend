/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import {
  fetchEmperorData,
  fetchCurrentEmperorAddress,
  fetchCurrentEmperorBid,
  fetchTopEmperors,
} from './fetchEmperorData'
import { EmperorState } from '../types'

const initialState: EmperorState = {
  myEmperor: {},
  currentEmperor: {},
  topEmperors: []
}

export const EmperorSlice = createSlice({
  name: 'Emperor',
  initialState,
  reducers: {
    setInitialData: (state) => {
      state.currentEmperor = {};
    },
    setMyEmperor: (state, action) => {
      state.myEmperor = {
        ...state.myEmperor,
        ...action.payload
      };
    },
    setCurrentEmperor: (state, action) => {
      state.currentEmperor = {
        ...state.currentEmperor,
        ...action.payload
      };
    },
    setTopEmperors: (state, action) => {
      state.topEmperors = [
        ...action.payload
      ]
    },
  },
})

// Actions
export const { setInitialData, setMyEmperor, setCurrentEmperor, setTopEmperors } = EmperorSlice.actions

// Thunks

export const setInit = () => async (dispatch) => {
  dispatch(setInitialData());
}

export const fetchEmperor = (account) => async (dispatch) => {
  if (!account) return;

  // fetch my emperor
  const myEmperor = await fetchEmperorData(account);
  dispatch(setMyEmperor({ ...myEmperor, address: account }));

  // fetch current emperor
  const currentEmperorAddress = await fetchCurrentEmperorAddress();
  dispatch(setCurrentEmperor({ address: currentEmperorAddress }));

  const currentEmperorBid = await fetchCurrentEmperorBid();
  dispatch(setCurrentEmperor({ bidAmount: currentEmperorBid }));

  if (currentEmperorAddress && currentEmperorAddress.length > 0) {
    const currentEmperor = await fetchEmperorData(currentEmperorAddress);
    dispatch(setCurrentEmperor(currentEmperor));
  }

  // fetch top 5 emperor
  if (currentEmperorAddress && currentEmperorAddress.length > 0) {
    const topEmperors = await fetchTopEmperors()
    dispatch(setTopEmperors(topEmperors));
  }
}


export default EmperorSlice.reducer
