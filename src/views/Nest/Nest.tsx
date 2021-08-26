import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex, ButtonMenu, ButtonMenuItem, Text } from 'penguinfinance-uikit2'
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

  const renderV1Description = () => {
    return (
      <Flex justifyContent="center">
        <V1NestDetailsContainer>
          <Text color="primary" mb="12px" fontSize="24px" bold textAlign="center">
            Migrate your xPEFI and get iPEFI
          </Text>
          <NestDescription mb="24px" textAlign="center">
            The Nest V2 contract is here! Migrate from the old staking token (xPEFI) to receive the newer, improved
            iPEFI. After migration, your PEFI equivalent should be the same pre-migration. We&apos;ll keep the Paper
            Hands Penalty on the new contract the same as the old one for a week.
          </NestDescription>
        </V1NestDetailsContainer>
      </Flex>
    )
  }

  const renderV2Description = () => {
    return (
      <Flex justifyContent="center">
        <V2NestDetailsContainer>
          <Text color="primary" mb="12px" fontSize="24px" bold>
            Maximize yield by staking PEFI for iPEFI
          </Text>
          <NestDescription mb="24px">
            PEFI is minted & collected from fees within the Penguin Ecosystem and sent to the Penguin Nest (iPEFI
            holders). When your PEFI is staked into the Penguin Nest, you receive iPEFI, granting access to exclusive
            dApps within Penguin Finance. Your iPEFI is continuously compounding, when you unstake you will receive all
            the originally deposited PEFI and any earned PEFI minus the paper hands penalty (PPL).
          </NestDescription>
        </V2NestDetailsContainer>
      </Flex>
    )
  }

  return (
    <NestPage>
      <BgWrapper>
        <IgloosBgContainer />
      </BgWrapper>
      <NestBannerContainer>
        <BannerImage
          src={`${process.env.PUBLIC_URL}/images/pools/${isDark ? 'nest_banner_dark2.svg' : 'nest_banner_light2.svg'}`}
          alt="nest banner"
        />
      </NestBannerContainer>
      {activeTab === 0 && renderV2Description()}
      {activeTab === 1 && renderV1Description()}
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

const V1NestDetailsContainer = styled.div`
  max-width: 480px;
  width: 100%;
`

const V2NestDetailsContainer = styled.div`
  max-width: 720px;
  width: 100%;
`

const NestDescription = styled(Text)`
  max-width: 480px;
  color: ${({ theme }) => (theme.isDark ? '#DDD7ff' : theme.colors.secondary)};
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
