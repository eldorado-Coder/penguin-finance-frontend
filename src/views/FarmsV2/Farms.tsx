import React, { useEffect, useCallback } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
// import { SECONDS_PER_WEEK, WEEKS_PER_YEAR, PEFI_POOL_PID } from 'config'
import Page from 'components/layout/Page'
import { usePefiPerBlock, useV2Farms } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchV2FarmUserDataAsync } from 'state/actions'
import FarmTable from './components/FarmTable/FarmTable'
import { FarmWithStakedValue } from './components/types'

const Farms: React.FC = () => {
  const { path } = useRouteMatch()
  const v2FarmsLP = useV2Farms()
  const { account } = useWeb3React()

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    if (account) {
      dispatch(fetchV2FarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const activeFarms = v2FarmsLP.filter((farm) => farm.type === 'Pangolin' && farm.multiplier !== '0X')

  const farmsList = useCallback((farmsToDisplay, removed: boolean) => {
    const farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
      return { ...farm, apy: 0 }
    })

    return (
      <FarmTable
        data={farmsToDisplayWithAPY.map((farm) => ({
          farm,
          removed,
        }))}
      />
    )
  }, [])

  return (
    <FarmPage>
      <BgWrapper>
        <IgloosBgContainer />
      </BgWrapper>
      <IgloosBannerContainer>
        <BannerImage src={`${process.env.PUBLIC_URL}/images/farms/IglooHeader.gif`} alt="igloos banner" />
      </IgloosBannerContainer>
      <IgloosContentContainer>
        <Route exact path={`${path}`}>
          {farmsList(activeFarms, false)}
        </Route>
      </IgloosContentContainer>
    </FarmPage>
  )
}

const FarmPage = styled(Page)`
  max-width: 1200px;
`

// bg
const IgloosBgContainer = styled.div`
  background-image: url('/images/farms/igloo_background_${({ theme }) => (theme.isDark ? 'dark' : 'Light')}.png');
  background-repeat: repeat;
  background-size: contain;
  position: absolute;
  top: -8px;
  bottom: -8px;
  right: 0px;
  left: 0px;
  z-index: -1;
`

const BgWrapper = styled.div`
  background: ${({ theme }) => !theme.isDark && '#EBEEF7'};
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  z-index: -1;
`

// banner
const IgloosBannerContainer = styled.div`
  margin-bottom: 24px;

  @media (min-width: 640px) {
    margin-bottom: 64px;
  }
`
const BannerImage = styled.img`
  z-index: -1;
`

// content
const IgloosContentContainer = styled.div`
  position: relative;
`

export default Farms
