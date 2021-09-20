import React from 'react'
import styled from 'styled-components'
import { Card, useMatchBreakpoints } from 'penguinfinance-uikit2'
import { useHistory } from 'react-router-dom'

const StyledNestIglooCard = styled(Card)<{ isMobile?: boolean }>`
  height: ${({ isMobile }) => (isMobile ? 'calc(50vw - 16px)' : '230px')};
  margin-bottom: 24px;
  background: ${({ theme }) => theme.isDark && '#30264F'};
`

const StyledNestIglooCardBg = styled.div`
  height: 100%;
  background-size: cover;
  background-position: center center;
  /* background-image: url('/images/home/turbo_igloo.png'); */
  background-image: url('/images/home/avalanche_autumn_is_coming.png');
  cursor: pointer;
`

const NestIglooV2Card = () => {
  const history = useHistory()
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl
  const onClickNestIglooV2Card = () => {
    history.push('/farms')
  }

  return (
    <StyledNestIglooCard isMobile={isMobile}>
      <StyledNestIglooCardBg onClick={onClickNestIglooV2Card} />
    </StyledNestIglooCard>
  )
}

export default NestIglooV2Card
