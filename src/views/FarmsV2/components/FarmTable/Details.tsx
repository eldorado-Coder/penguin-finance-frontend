import React from 'react'
import styled from 'styled-components'
import { ChevronDownIcon, useMatchBreakpoints, Text, Flex } from 'penguinfinance-uikit2'

interface DetailsProps {
  actionPanelToggled: boolean
}

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding-right: 8px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: 0px;
  }
`

const DetailsLabel = styled(Text)`
  color: ${({ theme }) => theme.colors.red};
`;

const ArrowIcon = styled(ChevronDownIcon)<{ toggled: boolean }>`
  transform: ${({ toggled }) => (toggled ? 'rotate(180deg)' : 'rotate(0)')};
  fill: ${({ theme }) => theme.colors.red};
  height: 20px;
`

const Details: React.FC<DetailsProps> = ({ actionPanelToggled }) => {
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl

  return (
    <Container>
      <Flex alignItems='center'>
        {!isMobile && 
          <DetailsLabel fontSize='18px'>Details</DetailsLabel>
        }
        <ArrowIcon toggled={actionPanelToggled} />
      </Flex>
    </Container>
  )
}

export default Details
