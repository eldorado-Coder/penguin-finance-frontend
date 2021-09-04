import React from 'react'
import styled from 'styled-components'
import { ChevronDownIcon, useMatchBreakpoints, Text, Flex, Button } from 'penguinfinance-uikit2'

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

const ArrowIcon = styled(ChevronDownIcon)<{ toggled: boolean }>`
  transform: ${({ toggled }) => (toggled ? 'rotate(180deg)' : 'rotate(0)')};
  fill: ${({ theme }) => theme.colors.red};
  height: 20px;
`

const ArrowDownIcon = styled(ChevronDownIcon)<{ toggled: boolean }>`
  transform: ${({ toggled }) => (toggled ? 'rotate(180deg)' : 'rotate(0)')};
  fill: white;
`

const StyledButton = styled(Button)`
  font-weight: 400;
  font-size: 14px;
  padding: 0 24px;
  border-radius: 10px;
  color: white;
  background-color: ${({ theme }) => theme.colors.red};
`

const Details: React.FC<DetailsProps> = ({ actionPanelToggled }) => {
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl

  return (
    <Container>
      <Flex alignItems="center">
        {!isMobile ? (
          <StyledButton scale="sm" color="primary" endIcon={<ArrowDownIcon toggled={actionPanelToggled} />}>
            View Farm
          </StyledButton>
        ) : (
          <ArrowIcon toggled={actionPanelToggled} />
        )}
      </Flex>
    </Container>
  )
}

export default Details
