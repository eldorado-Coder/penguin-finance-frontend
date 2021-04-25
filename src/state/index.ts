import { configureStore } from '@reduxjs/toolkit'
import farmsReducer from './farms'
import lpsReducer from './lps'
import toastsReducer from './toasts'
import poolsReducer from './pools'
import profileReducer from './profile'
import teamsReducer from './teams'
import emperorReducer from './emperor'
import achievementsReducer from './achievements'

export default configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    lps: lpsReducer,
    farms: farmsReducer,
    toasts: toastsReducer,
    pools: poolsReducer,
    emperor: emperorReducer,
    profile: profileReducer,
    teams: teamsReducer,
    achievements: achievementsReducer,
  },
})
