import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import farmsReducer from './farms'
import lydiaFarmsReducer from './lydiaFarms'
import compounderFarmsReducer from './compounderFarms'
import lpsReducer from './lps'
import toastsReducer from './toasts'
import poolsReducer from './pools'
import profileReducer from './profile'
import teamsReducer from './teams'
import emperorReducer from './emperor'
import achievementsReducer from './achievements'
import globalReducer from './global'
import donationsReducer from './donations'
import launchpadReducer from './launchpad'
import launchpadBoofiReducer from './launchpadBoofi'
import boosterRocketReducer from './boosterRocket'
// v2
import nestMigratorReducer from './nestMigrator'
import v2PoolsReducer from './v2pools'
import v2FarmsReducer from './v2Farms'

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    lps: lpsReducer,
    farms: farmsReducer,
    lydiaFarms: lydiaFarmsReducer,
    compounderFarms: compounderFarmsReducer,
    toasts: toastsReducer,
    pools: poolsReducer,
    emperor: emperorReducer,
    profile: profileReducer,
    teams: teamsReducer,
    achievements: achievementsReducer,
    global: globalReducer,
    donations: donationsReducer,
    launchpad: launchpadReducer,
    launchpadBoofi: launchpadBoofiReducer,
    boosterRocket: boosterRocketReducer,
    // v2
    nestMigrator: nestMigratorReducer,
    v2Pools: v2PoolsReducer,
    v2Farms: v2FarmsReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
