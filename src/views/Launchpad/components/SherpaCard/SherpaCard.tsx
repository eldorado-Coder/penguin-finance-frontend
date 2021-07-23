import React from 'react'
import styled from 'styled-components'
import { Image, Text, Flex, Progress, Input, Button } from 'penguinfinance-uikit2'
// import { useWeb3React } from '@web3-react/core'
import CardValue from 'components/CardValue'
// import SherpaCardFooter from './SherpaCardFooter'

const SherpaCard: React.FC = () => {
  // const { account } = useWeb3React()

  const handleViewHomePage = () => {
    window.open('https://www.sherpa.cash/', '_blank')
  }

  const handleViewDocumentation = () => {
    window.open('https://sherpa-cash.gitbook.io/sherpa-cash/', '_blank')
  }

  const handleViewMedium = () => {
    window.open('https://hariseldon2.medium.com/sherpas-version-of-a-fair-launch-53b8cd383be9', '_blank')
  }

  const handleViewTrailer = () => {
    window.open('https://res.cloudinary.com/dbyunrpzq/video/upload/v1624954572/Sample_Final_02_p5ubch.mp4', '_blank');
  }

  return (
    <FCard>
      <CardHeader justifyContent="space-between" alignItems="center">
        <CardBannerImage src={`${process.env.PUBLIC_URL}/images/launchpad/banners/sherpa_banner.png`} alt="banner" />
      </CardHeader>
      <CardContent>
        <Flex alignItems="center" mb="12px">
          <Image src="/images/launchpad/sherpalogo.png" width={64} height={64} alt="sherpa" mr="16px" />

          <div>
            <Text fontSize="18px" bold>
              SHERPA CASH (SHERPA)
            </Text>
            <Details>
              <Text fontSize="12px" onClick={handleViewHomePage}>
                Homepage
              </Text>
              <Text fontSize="12px" onClick={handleViewDocumentation}>
                Documentation
              </Text>
              <Text fontSize="12px" onClick={handleViewMedium}>
                Medium
              </Text>
            </Details>
          </div>
        </Flex>
        <Text fontSize="12px" mb='16px'>A fully decentralized protocol for private transactions on Avalanche</Text>
        <Flex justifyContent="space-between" mb="4px">
          <Text fontSize="12px">Launch Date</Text>
          <Text fontSize="14px">19:00 UTC July 29th, 2021</Text>
        </Flex>
        <Flex justifyContent="space-between" mb="24px">
          <Text fontSize="12px">For Sale</Text>
          <CardValue fontSize="14px" suffix=" SHERPA" value={600000} />
        </Flex>
        <Flex justifyContent='center'>
          <NormalButton onClick={handleViewTrailer}>View Trailer</NormalButton>
        </Flex>
        {/* <Text fontSize="12px" mb="4px">
          Progress
        </Text>
        <ProgressWrapper>
          <Progress primaryStep={0} />
        </ProgressWrapper>
        <Flex justifyContent="space-between" mt="4px">
          <Text fontSize="12px">0.00%</Text>
          <CardValue fontSize="12px" value={600000} />
        </Flex> */}
        <ClaimsWrapper>
          <Text className="your-token" fontSize="12px" mb="4px">
            Your tokens to claim
          </Text>
          <div className="claim-container">
            <StyledInput scale="sm" />
            <ClaimButton disabled height="32px" size="sm">
              Claim
            </ClaimButton>
          </div>
        </ClaimsWrapper>
      </CardContent>
      {/* <CardAction>
        <SherpaCardFooter />
      </CardAction> */}
    </FCard>
  )
}

const CardContent = styled.div`
  padding: 16px;
  background: ${(props) => props.theme.card.background};
  border-radius: 32px 32px 0 0;

  img {
    max-height: 330px;
  }
`

const CardHeader = styled(Flex)`
  height: 96px;
  background-image: url('/images/launchpad/banners/sherpa_banner.png');
  background-size: cover;
  background-position: center center;
  border-radius: 32px 32px 0 0;

  div {
    color: white;
  }
`

const CardBannerImage = styled.img`
  border-radius: 32px 32px 0 0;
`

const Details = styled(Flex)`
  div {
    margin-right: 12px;
    cursor: pointer;
  }
`

const ProgressWrapper = styled.div`
  div {
    height: 8px;
    div {
      background-color: #53dee9;
    }
  }
`

// const CardAction = styled.div`
//   background: ${(props) => props.theme.card.background};
//   border-radius: 0 0 32px 32px;
// `

const ClaimsWrapper = styled.div`
  margin-top: 24px;
  .your-token {
    text-decoration: underline;
  }

  .claim-container {
    position: relative;
  }
`

const FCard = styled.div`
  align-self: flex-start;
  background: ${(props) => props.theme.card.background};
  border-radius: 32px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  position: relative;
  min-height: 480px;
`

const StyledInput = styled(Input)`
  box-shadow: none;
  width: 100%;
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.input} !important;
  padding: 0 88px 0 12px;
  border-radius: 12px;
  font-size: 14px;

  &:focus:not(:disabled) {
    box-shadow: none;
  }
`

const ClaimButton = styled(Button)`
  height: 32px;
  border-radius: 12px;
  position: absolute;
  right: 0;
  top: 0;
  width: 80px;
  background: ${({ theme }) => theme.isDark && theme.colors.textDisabled};
  color: white;
`

const NormalButton = styled(Button)`
  border-radius: 10px;
  padding: 0 16px;
  min-width: 160px;
`

export default SherpaCard
