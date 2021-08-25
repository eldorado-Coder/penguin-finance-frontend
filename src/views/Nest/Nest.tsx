import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex, ButtonMenu, ButtonMenuItem } from 'penguinfinance-uikit2'
import useTheme from 'hooks/useTheme'
import Page from 'components/layout/Page'
import NestV1 from './V1'
import NestV2 from './V2'

const Nest: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0) // 0: v2, 1: v1

  const handleSwitchTab = (tab) => {
    setActiveTab(tab)
  }

  const { isDark } = useTheme()

  return (
    <NestPage>
      <BgWrapper>
        <IgloosBgContainer />
      </BgWrapper>
      <NestBannerContainer>
        <BannerImage
          src={`${process.env.PUBLIC_URL}/images/pools/${isDark ? 'nest_banner_dark.svg' : 'nest_banner_light.svg'}`}
          alt="nest banner"
        />
      </NestBannerContainer>
      <Flex justifyContent="center" pb="32px">
        <TabWrapper>
          <ButtonMenu activeIndex={activeTab} onItemClick={handleSwitchTab} scale="sm">
            <OptionItem active={activeTab === 0}>{activeTab === 0 ? 'New(iPefi)' : 'New'}</OptionItem>
            <OptionItem active={activeTab === 1}>{activeTab === 1 ? 'Old(xPefi)' : 'Old'}</OptionItem>
          </ButtonMenu>
        </TabWrapper>
      </Flex>
      {activeTab === 0 && <NestV2 />}
      {activeTab === 1 && <NestV1 />}
    </NestPage>
  )
}

const NestPage = styled(Page)`
  max-width: 1200px;
`

// bg
const BgWrapper = styled.div`
  background: ${({ theme }) => (theme.isDark ? '#1A1028' : '#F9F8F9')};
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  z-index: -1;
`
const IgloosBgContainer = styled.div`
  background-image: url('/images/pools/nest_new_bg.png');
  background-repeat: repeat;
  background-size: contain;
  position: absolute;
  top: -8px;
  bottom: -8px;
  right: 0px;
  left: 0px;
  z-index: -1;
`

const NestBannerContainer = styled.div`
  margin-bottom: 24px;
  @media (min-width: 640px) {
    margin-bottom: 64px;
  }
`

const BannerImage = styled.img`
  z-index: -1;
  width: 100%;
`

// slider
const TabWrapper = styled.div`
  div {
    border: 2px solid ${({ theme }) => (theme.isDark ? '#221b38' : '#b2b2ce')};
    background-color: ${({ theme }) => (theme.isDark ? '#332654' : '#e8e4ef')};
    border-radius: 18px;
  }
`
const OptionItem = styled(ButtonMenuItem)<{ active: boolean }>`
  min-width: 100px;
  background-color: ${({ active, theme }) => active && theme.colors.red};
  color: ${({ active }) => (active ? 'white' : '#b2b2ce')};
`

export default Nest
