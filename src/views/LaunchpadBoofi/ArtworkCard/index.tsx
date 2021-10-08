import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import Card from '../Card'

const ArtworkCard = () => {
  const history = useHistory()

  const onClickArtworkCard = () => {
    history.push('/club')
  }

  return (
    <StyledCard>
      <StyledCardBg onClick={onClickArtworkCard} />
    </StyledCard>
  )
}

const StyledCard = styled(Card)`
  border-radius: 8px;
  margin-top: 16px;
  width: 100%;
  box-shadow: 0px 1px 6px rgb(0 0 0 / 16%);

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
