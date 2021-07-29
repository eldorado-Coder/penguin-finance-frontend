import React from 'react'
import styled from 'styled-components'
import { Image, Text, Flex, Progress, Button } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import CardValue from 'components/CardValue'
import { useBoosterRocket as useBoosterRocketStore } from 'state/hooks'

const SherpaCard: React.FC = () => {
  const { account } = useWeb3React()
  const { tokensLeftToDistribute, totalTokensSold } = useBoosterRocketStore(account)

  const totalTokensToDistribute = tokensLeftToDistribute + totalTokensSold
  const distributedPercentage = totalTokensToDistribute !== 0 ? (100 * totalTokensSold) / totalTokensToDistribute : 10

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
    window.open('https://res.cloudinary.com/dbyunrpzq/video/upload/v1624954572/Sample_Final_02_p5ubch.mp4', '_blank')
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
        <Text fontSize="12px" mb="16px">
          A fully decentralized protocol for private transactions on Avalanche
        </Text>
        <Flex justifyContent="space-between" mb="4px" alignItems='center'>
          <CardLabel fontSize="12px">Sale End Time</CardLabel>
          <Text fontSize="14px" color="text" fontWeight={600}>August 3rd</Text>
        </Flex>
        <Flex justifyContent="space-between" mb="24px" alignItems='center'>
          <CardLabel fontSize="12px">To Be Distributed</CardLabel>
          <CardValue fontSize="14px" color="text" suffix=" SHERPA" decimals={2} value={totalTokensToDistribute} />
        </Flex>
        <Text fontSize="12px" mb="4px">
          Progress
        </Text>
        <ProgressWrapper>
          <Progress primaryStep={distributedPercentage} />
        </ProgressWrapper>
        <Flex justifyContent="space-between" mt="4px">
          <Text fontSize="12px">{distributedPercentage.toFixed(2)}%</Text>
          <CardValue fontSize="12px" decimals={2} value={totalTokensToDistribute} />
        </Flex>
        <Flex justifyContent="center" mt="16px">
          <NormalButton onClick={handleViewTrailer}>View Trailer</NormalButton>
        </Flex>
      </CardContent>
    </FCard>
  )
}

const CardContent = styled.div`
  padding: 16px;
  background: ${(props) => (props.theme.isDark ? '#332654' : props.theme.card.background)};
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

const CardLabel = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? '#D8CFE2' : 'black')};
  font-weight: 400;
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
      border-radius: 2rem;
      background: linear-gradient(90deg, #00deff 0%, #8f00c1 100%);
    }
  }
`

const FCard = styled.div`
  align-self: flex-start;
  background: ${(props) => (props.theme.isDark ? '#332654' : props.theme.card.background)};
  border-radius: 32px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  position: relative;
  min-height: 490px;
`

const NormalButton = styled(Button)`
  border-radius: 10px;
  padding: 0 16px;
  min-width: 160px;
  color: ${(props) => props.theme.isDark && '#332654'};
`

export default SherpaCard
