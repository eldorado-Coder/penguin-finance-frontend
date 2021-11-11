import React from 'react'
import styled from 'styled-components'
import { Card, useMatchBreakpoints } from 'penguinfinance-uikit2'

const ArtworkCard = () => {
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl
  const onClickArtworkV2Card = () => {
    window.open(
      'https://penguin-finance.medium.com/an-epic-winter-is-coming-to-penguin-finance-%EF%B8%8F-d207a2eab3cd',
      '_blank',
    )
  }

  return (
    <StyledArtworkCard isMobile={isMobile}>
      <StyledArtworkCardBg onClick={onClickArtworkV2Card} />
    </StyledArtworkCard>
  )
}

const StyledArtworkCard = styled(Card)<{ isMobile?: boolean }>`
  // height: ${({ isMobile }) => (isMobile ? 'calc(50vw - 16px)' : '380px')};
  // /* margin-bottom: 24px; */
  // background: ${({ theme }) => theme.isDark && '#30264F'};

  height: calc(50vw - 16px);
  background: ${({ theme }) => theme.isDark && '#30264F'};

  @media (min-width: 968px) {
    height: 300px;
  }

  @media (min-width: 1080px) {
    height: 310px;
  }

  @media (min-width: 1200px) {
    height: 344px;
  }
`

const StyledArtworkCardBg = styled.div`
  height: 100%;
  background-size: cover;
  background-position: center center;
  background-image: url('/images/home/winter.jpg');
  cursor: pointer;
`

export default ArtworkCard
