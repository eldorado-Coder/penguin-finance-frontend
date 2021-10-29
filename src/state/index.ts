import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import farmsReducer from './farms'
import lydiaFarmsReducer from './lydiaFarms'
import joeFarmsReducer from './joeFarms'
import joeV3FarmsReducer from './joeV3Farms'
import benqiFarmsReducer from './benqiFarms'
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

// launchpad - Sherpa
import launchpadReducer from './launchpad'
import boosterRocketReducer from './boosterRocket'

// launchpad - Boofi
import launchpadBoofiReducer from './launchpadBoofi'
import boofiBoosterRocketReducer from './boofiBoosterRocket'

// v2
import nestMigratorReducer from './nestMigrator'
import v2PoolsReducer from './v2pools'
import v2FarmsReducer from './v2Farms'

// collectibles
import userCollectiblesReducer from './collectibles'
// collectibles
import clubPenguinFarmsReducer from './clubPenguin'

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    lps: lpsReducer,
    farms: farmsReducer,
    lydiaFarms: lydiaFarmsReducer,
    joeFarms: joeFarmsReducer,
    joeV3Farms: joeV3FarmsReducer,
    benqiFarms: benqiFarmsReducer,
    compounderFarms: compounderFarmsReducer,
    toasts: toastsReducer,
    pools: poolsReducer,
    emperor: emperorReducer,
    profile: profileReducer,
    teams: teamsReducer,
    achievements: achievementsReducer,
    global: globalReducer,
    donations: donationsReducer,

    // launchpad - Sherpa
    launchpad: launchpadReducer,
    boosterRocket: boosterRocketReducer,

    // launchpad - Boofi
    launchpadBoofi: launchpadBoofiReducer,
    boofiBoosterRocket: boofiBoosterRocketReducer,
    // v2
    nestMigrator: nestMigratorReducer,
    v2Pools: v2PoolsReducer,
    v2Farms: v2FarmsReducer,

    // collectibles
    userCollectibles: userCollectiblesReducer,

    // club penguin
    clubPenguinFarms: clubPenguinFarmsReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
