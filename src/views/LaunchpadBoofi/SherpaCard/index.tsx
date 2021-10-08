import React from 'react'
import styled from 'styled-components'
import { Text, Flex, Button, useMatchBreakpoints } from 'penguinfinance-uikit2'

const SherpaCard = () => {
  const { isXl, isXs, isSm } = useMatchBreakpoints()
  const isMobile = !isXl

  const handleViewWebs = () => {
    window.open('https://sherpa.cash/', '_blank')
  }

  const handleBuySherpa = () => {
    window.open(
      'https://app.pangolin.exchange/#/swap?outputCurrency=0xa5E59761eBD4436fa4d20E1A27cBa29FB2471Fc6',
      '_blank',
    )
  }

  return (
    <SherpaCardWrapper>
      <SherpaContainer flexWrap="wrap">
        <SherpaLogo src="/images/launchpad/sherpa-logo.svg" alt="sherpa" width={180} />
        <SherpaDetailWrapper justifyContent="space-between">
          <Flex flexDirection="column" alignItems="center" mt="4px" mr="16px">
            <SherpaText fontWeight={600} fontSize={isXs || isSm ? '24px' : '32px'} lineHeight={1}>
              $0.15
            </SherpaText>
            <SherpaText fontWeight={500} fontSize={isXs || isSm ? '14px' : '18px'} lineHeight={1.5}>
              Listing Price
            </SherpaText>
          </Flex>
          <Flex flexDirection="column" alignItems="center" mt="4px" mr="16px">
            <SherpaText fontWeight={600} fontSize={isXs || isSm ? '24px' : '32px'} lineHeight={1}>
              $4.70
            </SherpaText>
            <SherpaText fontWeight={500} fontSize={isXs || isSm ? '14px' : '18px'} lineHeight={1.5}>
              All Time High
            </SherpaText>
          </Flex>
          <Flex flexDirection="column" alignItems="center" mt="4px" mr="16px">
            <SherpaText fontWeight={600} fontSize={isXs || isSm ? '24px' : '32px'} lineHeight={1}>
              31x
            </SherpaText>
            <SherpaText fontWeight={500} fontSize={isXs || isSm ? '14px' : '18px'} lineHeight={1.5}>
              Return to ATH
            </SherpaText>
            <ATHPercentage lineHeight={1}>+3100%</ATHPercentage>
          </Flex>
        </SherpaDetailWrapper>
      </SherpaContainer>
      <SherpaActions flexDirection={isMobile ? 'row' : 'column'} justifyContent="center">
        <WebViewButton onClick={handleViewWebs}>View Website</WebViewButton>
        <BuySherpaButton onClick={handleBuySherpa}>Buy SHERPA</BuySherpaButton>
      </SherpaActions>
    </SherpaCardWrapper>
  )
}

const SherpaCardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-self: flex-start;
  background: #f24e4d;
  color: white;
  border-radius: 8px;
  position: relative;
  padding: 24px;
  margin-top: 8px;
`

const SherpaContainer = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;

  @media (min-width: 720px) {
    flex-direction: row;
    align-items: flex-start;
  }
  @media (min-width: 1100px) {
    width: unset;
  }
`

const SherpaText = styled(Text)`
  color: white;
`

const WebViewButton = styled(Button)`
  background: white;
  color: #f24e4d;
  height: 32px;
  font-weight: 500;
  white-space: nowrap;
  border-radius: 6px;
  margin-bottom: 8px;
  font-size: 14px;

  @media (min-width: 640px) {
    font-size: 16px;
  }
`

const BuySherpaButton = styled(Button)`
  background: #32283d;
  color: #f24e4d;
  height: 32px;
  white-space: nowrap;
  font-weight: 500;
  border-radius: 6px;
  font-size: 14px;

  @media (min-width: 640px) {
    font-size: 16px;
  }
`

const ATHPercentage = styled(Text)`
  color: #32283d;
`

const SherpaLogo = styled.img`
  width: 180px;
  min-width: 180px;
  margin-right: 0;

  @media (min-width: 720px) {
    margin-right: 56px;
  }
`

const SherpaActions = styled(Flex)`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  margin-top: 16px;

  button:first-child {
    margin-right: 16px;
    margin-bottom: 0;
  }

  @media (min-width: 720px) {
    min-width: 400px;
    margin-top: 0;
  }

  @media (min-width: 1100px) {
    width: unset;
    min-width: unset;
    flex-direction: column;
    button:first-child {
      margin-right: 0px;
      margin-bottom: 8px;
    }
  }
`

const SherpaDetailWrapper = styled(Flex)`
  min-width: 100%;
  margin-top: 8px;

  @media (min-width: 720px) {
    min-width: 400px;
    margin-top: 0;
  }
  @media (min-width: 1200px) {
    min-width: 450px;
  }
`

export default SherpaCard
