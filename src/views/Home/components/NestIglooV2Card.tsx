import React from 'react'
import styled from 'styled-components'
import { Card } from 'penguinfinance-uikit2'

const StyledNestIglooCard = styled(Card)`
  height: 230px;
  background: ${({ theme }) => theme.isDark && '#30264F'};
`

const StyledNestIglooCardBg = styled.div`
  height: 100%;
  background-size: cover;
  background-position: center center;
  background-image: ${({ theme }) =>
    theme.isDark ? 'url(/images/home/nest_igloo_dark.png)' : 'url(/images/home/nest_igloo_light.png)'};
`

const NestIglooV2Card = () => {
  return (
    <StyledNestIglooCard>
      <StyledNestIglooCardBg />
    </StyledNestIglooCard>
  )
}

export default NestIglooV2Card
