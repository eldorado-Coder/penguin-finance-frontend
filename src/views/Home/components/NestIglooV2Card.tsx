import React from 'react'
import styled from 'styled-components'
import { Card, useMatchBreakpoints } from 'penguinfinance-uikit2'

const StyledNestIglooCard = styled(Card)<{ isMobile?: boolean }>`
  height: ${({ isMobile }) => isMobile ? 'calc(50vw - 16px)' : '230px'};
  margin-bottom: 24px;
  background: ${({ theme }) => theme.isDark && '#30264F'};
`

const StyledNestIglooCardBg = styled.div`
  height: 100%;
  background-size: cover;
  background-position: center center;
  background-image: url('/images/home/ipefi-introducing.png');
  cursor: pointer;
`

const NestIglooV2Card = () => {
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl
  const onClickNestIglooV2Card = () => {
    const iglooV2Url = 'https://penguin-finance.medium.com/introducing-ipefi-the-nest-evolution-d002f8548276'
    window.open(iglooV2Url, '_blank')
  }

  return (
    <StyledNestIglooCard isMobile={isMobile}>
      <StyledNestIglooCardBg onClick={onClickNestIglooV2Card} />
    </StyledNestIglooCard>
  )
}

export default NestIglooV2Card
