import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex } from 'penguinfinance-uikit2'

const StyledFarmCard = styled(Card)`
  min-height: 150px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  width: 100%;
  background: #363266;
  background: ${({ theme }) => theme.isDark && '#30264F'};

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
`
const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
  line-height: 44px;
  color: #ffffff;
`

const Text = styled(Heading)`
  color: #ffffff;
`

const IglooCard = () => {
  return (
    <StyledFarmCard>
      <CardBody>
        <Text size="md">Earn</Text>
        <CardMidContent>PEFI & PNG</CardMidContent>
        <Flex justifyContent="space-between">
          <Text size="md">in Penguin Igloos</Text>
        </Flex>
      </CardBody>
    </StyledFarmCard>
  )
}

export default IglooCard
