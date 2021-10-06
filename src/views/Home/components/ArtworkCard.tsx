import React from 'react'
import styled from 'styled-components'
import { Card, useMatchBreakpoints } from 'penguinfinance-uikit2'
import { useHistory } from 'react-router-dom'

const StyledArtworkCard = styled(Card)<{ isMobile?: boolean }>`
  height: ${({ isMobile }) => (isMobile ? 'calc(50vw - 16px)' : '258px')};
  /* margin-bottom: 24px; */
  background: ${({ theme }) => theme.isDark && '#30264F'};
`

const StyledArtworkCardBg = styled.div`
  height: 100%;
  background-size: cover;
  background-position: center center;
  background-image: url('/images/home/boofinance-tiersartwork.png');
  cursor: pointer;
`

const ArtworkCard = () => {
  const history = useHistory()
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl
  const onClickArtworkV2Card = () => {
    // history.push('/farms')
    window.open(
      'https://penguin-finance.medium.com/penguin-launchpad-boofinance-ido-tiers-are-here-29ba4cd90053',
      '_blank',
    )
  }

  return (
    <StyledArtworkCard isMobile={isMobile}>
      <StyledArtworkCardBg onClick={onClickArtworkV2Card} />
    </StyledArtworkCard>
  )
}

export default ArtworkCard
