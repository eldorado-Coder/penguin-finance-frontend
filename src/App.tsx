import React, { Suspense, lazy, useEffect } from 'react'
import { Router, Route, Switch, Redirect, useLocation } from 'react-router-dom'
import { ResetCSS } from 'penguinfinance-uikit2'
import BigNumber from 'bignumber.js'
import { useFetchProfile, useFetchPublicData } from 'state/hooks'
import GlobalStyle from 'style/Global'
import Menu from 'components/Menu'
import ToastListener from 'components/ToastListener'
import PageLoader from 'components/PageLoader'
import CurrentBlockWrapper from 'components/CurrentBlockWrapper'
import Footer from 'components/Footer/Footer'
import usePersistConnect from 'hooks/usePersistConnect'
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
const LaunchpadV2 = lazy(() => import('./views/LaunchpadV2'))
const Emperor = lazy(() => import('./views/Emperor'))
const EmperorV2 = lazy(() => import('./views/EmperorV2'))
const Club = lazy(() => import('./views/Club'))
const NotFound = lazy(() => import('./views/NotFound'))

// const Nests = lazy(() => import('./views/Nests'))
const Info = lazy(() => import('./views/Info'))
const ClubPenguin = lazy(() => import('./views/ClubPenguin'))
const Collectibles = lazy(() => import('./views/Collectibles'))
const CompounderIgloos = lazy(() => import('./views/CompounderIgloos'))
const IPefi = lazy(() => import('./views/IPefi'))
const Nest = lazy(() => import('./views/Nest'))

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    document.getElementById('root').scrollTo(0, 0)
  }, [pathname])

  return null
}

const App: React.FC = () => {
  useFetchPublicData()
  useFetchProfile()
  usePersistConnect()

  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <ScrollToTop />
      <Menu>
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route path="/compounder">
              <CompounderIgloos />
            </Route>
            <Route path="/home-old" exact>
              <HomeV1 />
            </Route>
            <Route path="/" exact>
              <HomeV2 />
            </Route>
            <Route path="/farms">
              <FarmsV2 />
            </Route>
            <Route path="/v1-farms">
              <Farms />
            </Route>
            <Route path="/stake">
              <Nest />
            </Route>
            <Route exact path="/nests" render={() => <Redirect to="/stake" />} />
            <Route exact path="/nest" render={() => <Redirect to="/stake" />} />
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
            <Route path="/club-old">
              <Club />
            </Route>
            <Route path="/launchpad">
              {/* <LaunchpadBoofi /> */}
              <LaunchpadV2 />
            </Route>
            <Route path="/launchpad-v2">
              <LaunchpadV2 />
            </Route>
            <Route path="/launchpad-boofi">
              <LaunchpadBoofi />
            </Route>
            <Route path="/sherpa-launchpad">
              <LaunchpadDistribution />
            </Route>
            <Route path="/emperor">
              <Emperor />
            </Route>
            <Route path="/emperor-v2">
              <EmperorV2 />
            </Route>
            <Route path="/collectibles">
              <Collectibles />
            </Route>
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </Suspense>
      </Menu>
      <ToastListener />
      <CurrentBlockWrapper />
    </Router>
  )
}

export default React.memo(App)
