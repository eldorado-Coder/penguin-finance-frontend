import React from 'react'
import styled from 'styled-components'
import { Flex } from 'penguinfinance-uikit2'

const Label = styled.div`
  font-size: 14px;
  color: ${({ theme }) => (theme.isDark ? '#b2b2ce' : '#8F88A0')};
  text-align: left;
`

const ContentContainer = styled.div`
  min-height: 24px;
  display: flex;
  align-items: center;
`

interface CellLayoutProps {
  label?: string,
  alignItems?: string
}

const CellLayout: React.FC<CellLayoutProps> = ({ label = '', children, alignItems }) => {
  return (
    <Flex flexDirection='column' alignItems={alignItems || 'flex-start'}>
      {label && <Label>{label}</Label>}
      <ContentContainer>{children}</ContentContainer>
    </Flex>
  )
}

export default CellLayout
