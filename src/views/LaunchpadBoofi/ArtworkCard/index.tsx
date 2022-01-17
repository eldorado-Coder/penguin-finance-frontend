import React from 'react'
import styled from 'styled-components'
import { useMatchBreakpoints } from 'penguinfinance-uikit2'
// import { useHistory } from 'react-router-dom'
import Card from '../Card'

const ArtworkCard = () => {
  // const history = useHistory()
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl

  const onClickArtworkCard = () => {
    // history.push('/club')
    window.open(
      'https://penguin-finance.medium.com/the-club-penguin-initiative-is-live-on-avalanche-9cd08a133f2',
      '_blank',
    )
  }

  return (
    <StyledCard isMobile={isMobile}>
      <StyledCardBg onClick={onClickArtworkCard} />
    </StyledCard>
  )
}

const StyledCard = styled(Card)<{ isMobile?: boolean }>`
  border-radius: 8px;
  margin-top: 16px;
  width: 100%;
  box-shadow: 0px 1px 6px rgb(0 0 0 / 16%);
  height: ${({ isMobile }) => isMobile && 'calc(50vw - 16px)'};

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 49%;
  }
`

const StyledCardBg = styled.div`
  border-radius: 8px;
  height: 100%;
  background-size: cover;
  background-position: center center;
  background-image: url('/images/launchpad/club_penguin_live.png');
  cursor: pointer;
`

export default ArtworkCard
