import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex, Text } from 'penguinfinance-uikit2'
import useTheme from 'hooks/useTheme'
import Page from 'components/layout/Page'
import NestV1 from './V1'
import NestV2 from './V2'

const Nest: React.FC = () => {
  const [activeTab] = useState(0) // 0: v2, 1: v1

  // const handleSwitchTab = (tab) => {
  //   setActiveTab(tab)
  // }

  const { isDark } = useTheme()

  const renderNestHeader = () => {
    return (
      <Flex justifyContent="center">
        {activeTab === 0 ? (
          <V2NestDetailsContainer>
            <Text color="primary" fontSize="32px" bold>
              Earn more PEFI
            </Text>
            <Description mb="16px" bold>
              Stake your PEFI for iPEFI and maximize your yield. No Impermanent Loss.
            </Description>
          </V2NestDetailsContainer>
        ) : (
          <V1NestDetailsContainer>
            <Text color="primary" mb="24px" fontSize="32px" bold textAlign="center">
              Migrate your xPEFI and get iPEFI
            </Text>
          </V1NestDetailsContainer>
        )}
      </Flex>
    )
  }

  const renderNestDescription = () => {
    return (
      <Flex justifyContent="center">
        {activeTab === 0 ? (
          <V2NestDetailsContainer>
            <NestDescription mb="24px">
              When your PEFI is staked into the Penguin Nest, you receive iPEFI. PEFI is minted & collected from fees
              within the Penguin Ecosystem and distributed among iPEFI holders. Your iPEFI is continuously compounding;
              when you unstake you will receive all the originally deposited PEFI and any earned PEFI minus the Paper
              Hands Penalty.
            </NestDescription>
          </V2NestDetailsContainer>
        ) : (
          <V1NestDetailsContainer>
            <NestDescription mb="24px" mt="24px" textAlign="center">
              The Nest V2 contract is here! Migrate from the old staking token (xPEFI) to receive the newer, improved
              iPEFI. After migration, your PEFI equivalent will remain unchanged, your xPEFI will simply be upgraded to
              iPEFI. We&apos;ll institute the new Paper Hands Penalty for iPEFI 48 hours after release.
            </NestDescription>
          </V1NestDetailsContainer>
        )}
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
          src={`${process.env.PUBLIC_URL}/images/pools/${isDark ? 'nest_banner_dark3.svg' : 'nest_banner_light3.svg'}`}
          alt="nest banner"
        />
      </NestBannerContainer>
      {renderNestHeader()}
      {renderNestDescription()}
      {/* <Flex justifyContent="center" pb="32px">
        <TabWrapper>
          <ButtonMenu activeIndex={activeTab} onItemClick={handleSwitchTab} scale="sm">
            <OptionItem active={activeTab === 0}>{activeTab === 0 ? 'New (iPEFI) ' : 'New'}</OptionItem>
            <OptionItem active={activeTab === 1}>{activeTab === 1 ? 'Old (xPEFI) ' : 'Old'}</OptionItem>
          </ButtonMenu>
        </TabWrapper>
      </Flex> */}
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
  top: 0;
  bottom: 0;
  right: 0px;
  left: 0px;
  z-index: -1;
`

const NestBannerContainer = styled.div`
  margin-bottom: 8px;
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
  max-width: 960px;
  width: 100%;
`

const NestDescription = styled(Text)`
  max-width: 960px;
  color: ${({ theme }) => (theme.isDark ? '#DDD7ff' : theme.colors.secondary)};
`

// slider
// const TabWrapper = styled.div`
//   div {
//     border: 2px solid ${({ theme }) => (theme.isDark ? '#221b38' : '#b2b2ce')};
//     background-color: ${({ theme }) => (theme.isDark ? '#332654' : '#e8e4ef')};
//     border-radius: 18px;
//   }
// `
// const OptionItem = styled(ButtonMenuItem)<{ active: boolean }>`
//   min-width: 70px;
//   background-color: ${({ active, theme }) => active && theme.colors.red};
//   color: ${({ active }) => (active ? 'white' : '#b2b2ce')};
//   margin: 0px !important;
// `

const Description = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? '#DDD7ff' : theme.colors.secondary)};
`

export default Nest
