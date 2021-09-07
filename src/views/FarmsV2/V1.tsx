import React from 'react'
import styled from 'styled-components'
import FarmsContent from 'views/Farms/FarmsContent'

const V1Farms: React.FC = () => {
  return (
    <FarmsContainer>
      <FarmsContent />
    </FarmsContainer>
  )
}

const FarmsContainer = styled.div`
  margin-top: 16px;
`

export default V1Farms
