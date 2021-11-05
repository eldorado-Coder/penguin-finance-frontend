import React from 'react'
import styled from 'styled-components'
import { ChevronDownIcon, Flex } from 'penguinfinance-uikit2'

interface DetailsProps {
  actionPanelToggled: boolean
}

const Details: React.FC<DetailsProps> = ({ actionPanelToggled }) => {
  return (
    <Container>
      <Flex alignItems="center">
        <ArrowIcon toggled={actionPanelToggled} />
      </Flex>
    </Container>
  )
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
  @media (min-width: 2000px) {
    height: 30px;
    width: 30px;
  }
`
export default Details
