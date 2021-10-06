import React, { Suspense, lazy } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { ResetCSS } from 'penguinfinance-uikit2'
import BigNumber from 'bignumber.js'
import { useFetchProfile, useFetchPublicData } from 'state/hooks'
import GlobalStyle from 'style/Global'
import Menu from 'components/Menu'
import ToastListener from 'components/ToastListener'
import PageLoader from 'components/PageLoader'
import CurrentBlockWrapper from 'components/CurrentBlockWrapper'
import history from './routerHistory'
import LaunchpadVideo from './views/LaunchpadVideo'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page'
const HomeV1 = lazy(() => import('./views/Home'))
const HomeV2 = lazy(() => import('./views/HomeV2'))
const Farms = lazy(() => import('./views/Farms'))
const FarmsV2 = lazy(() => import('./views/FarmsV2'))
const Arena = lazy(() => import('./views/Arena'))
const Launchpad = lazy(() => import('./views/Launchpad'))
const LaunchpadWithVideo = lazy(() => import('./views/LaunchpadVideo'))
const LaunchpadDistribution = lazy(() => import('./views/LaunchpadDistribution'))
const LaunchpadBoofi = lazy(() => import('./views/LaunchpadBoofi'))
const Emperor = lazy(() => import('./views/Emperor'))
// const CovidEmperor = lazy(() => import('./views/CovidEmperor'))
const Club = lazy(() => import('./views/Club'))
const NotFound = lazy(() => import('./views/NotFound'))

// const Nests = lazy(() => import('./views/Nests'))
// const Lottery = lazy(() => import('./views/Lottery'))
const Info = lazy(() => import('./views/Info'))
const ClubPenguin = lazy(() => import('./views/ClubPenguin'))
const Collectibles = lazy(() => import('./views/Collectibles'))
const CompounderIgloos = lazy(() => import('./views/CompounderIgloos'))
const IPefi = lazy(() => import('./views/IPefi'))
const Nest = lazy(() => import('./views/Nest'))

// This config is required for number formating
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  useFetchPublicData()
  useFetchProfile()

  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <Menu>
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route path="/compounder">
              <CompounderIgloos />
            </Route>
            <Route path="/" exact>
              {/* <HomeV2 /> */}
              <HomeV1 />
            </Route>
            <Route path="/farms">
              <FarmsV2 />
            </Route>
            <Route path="/old-farms">
              <Farms />
            </Route>
            <Route path="/nests">
              <Nest />
            </Route>
            <Route path="/ipefi">
              <IPefi />
            </Route>
            <Route path="/nest">
              <Nest />
            </Route>
            <Route path="/nest-v2">
              <Nest />
            </Route>
            <Route path="/arena">
              <Arena />
            </Route>
            <Route path="/info">
              <Info />
            </Route>
            <Route path="/club">
              <ClubPenguin />
            </Route>
            <Route path="/launchpad">
              {/* <LaunchpadVideo /> */}
              <LaunchpadBoofi />
            </Route>
            <Route path="/launchpad-boofi">
              <LaunchpadBoofi />
            </Route>
            <Route path="/sherpa-launchpad">
              <LaunchpadDistribution />
            </Route>
            <Route path="/club">
              <Club />
            </Route>
            <Route path="/emperor">
              <Emperor />
            </Route>
            {/* temporary covid penguin emperor page */}
            {/* <Route path="/emperor">
              <CovidEmperor />
            </Route> */}
            {/* Redirect */}
            {/* <Route path="/staking">
              <Redirect to="/pools" />
            </Route>
            <Route path="/syrup">
              <Redirect to="/pools" />
            </Route> */}
            <Route path="/collectibles">
              <Collectibles />
            </Route>
            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Menu>
      <ToastListener />
      <CurrentBlockWrapper />
    </Router>
  )
}

export default React.memo(App)
