import React from 'react'
import styled from 'styled-components'
import PurchaseForm from './PurchaseForm'

const ActionCard = () => {
  return (
    <StyledCard>
      <PurchaseForm tokenName="KACY" />
    </StyledCard>
  )
}

const StyledCard = styled.div`
  border-radius: 10px;
  width: 100%;
  background: ${({ theme }) => (theme.isDark ? '#3C3061' : '#F7F5FF')};
  padding: 8px 8px;
  @media (min-width: 576px) {
    padding: 16px 16px;
  }
  @media (min-width: 968px) {
    padding: 18px 35px;
  }
`

export default ActionCard
