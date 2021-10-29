import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import Page from 'components/layout/Page'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmUserDataAsync } from 'state/actions'
import FarmsContent from './FarmsContent'

const Farms: React.FC = () => {
  const { account } = useWeb3React()

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  return (
    <FarmPage>
      <BgWrapper>
        <IgloosBgContainer />
      </BgWrapper>
      <IgloosBannerContainer>
        <BannerImage src={`${process.env.PUBLIC_URL}/images/farms/IglooHeader.gif`} alt="igloos banner" />
      </IgloosBannerContainer>
      <IgloosContentContainer>
        <FarmsContent />
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
  top: 0;
  bottom: 0;
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
