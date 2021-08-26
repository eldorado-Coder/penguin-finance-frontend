import React from 'react'
import styled from 'styled-components'
import { Card } from 'penguinfinance-uikit2'

const StyledNestIglooCard = styled(Card)`
  height: 230px;
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
  const onClickNestIglooV2Card = () => {
    const iglooV2Url = 'https://penguin-finance.medium.com/introducing-ipefi-the-nest-evolution-d002f8548276'
    window.open(iglooV2Url, '_blank')
  }

  return (
    <StyledNestIglooCard>
      <StyledNestIglooCardBg onClick={onClickNestIglooV2Card} />
    </StyledNestIglooCard>
  )
}

export default NestIglooV2Card
