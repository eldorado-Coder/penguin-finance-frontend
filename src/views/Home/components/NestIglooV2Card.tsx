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
  background-image: url(/images/home/ipefi-introducing.png);
`

const NestIglooV2Card = () => {
  return (
    <StyledNestIglooCard>
      <StyledNestIglooCardBg />
    </StyledNestIglooCard>
  )
}

export default NestIglooV2Card
