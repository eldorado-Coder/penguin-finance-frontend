import React from 'react'
import { Card, CardBody, Heading, Text } from 'penguinfinance-uikit2'
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'
import CardValue from './CardValue'

const CardContainer = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  background: ${({ theme }) => theme.isDark && '#30264F'};
`

const StyledHeading = styled(Heading)`
  font-weight: 800;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const ComingSoonCard: React.FC = () => {
  const { isDark } = useTheme()

  return (
    <CardContainer>
      <CardBody>
        <StyledHeading size="xl" mb="24px" color="primary">
          Coming Soon
        </StyledHeading>
        <Row>
          <Text bold color={isDark ? 'red' : 'textSubtle'} fontSize="14px">
            Club Penguin dApp
          </Text>
        </Row>
        <Row>
          <Text bold color={isDark ? 'red' : 'textSubtle'} fontSize="14px">
            Penguin Collectible NFTs
          </Text>
        </Row>
        <Row>
          <Text bold color={isDark ? 'red' : 'textSubtle'} fontSize="14px">
            CryptoPuffies
          </Text>
        </Row>
        <Row>
          <Text bold color={isDark ? 'red' : 'textSubtle'} fontSize="14px">
            Pangolin vs Joe Emperor Game
          </Text>
        </Row>
        <Row>
          <Text bold color={isDark ? 'red' : 'textSubtle'} fontSize="14px">
            Make Igloos, Not War
          </Text>
        </Row>
        <Row>
          <Text bold color={isDark ? 'red' : 'textSubtle'} fontSize="14px">
            Penguin Area
          </Text>
        </Row>
        <Row>
          <Text bold color={isDark ? 'red' : 'textSubtle'} fontSize="14px">
            Read our Roadmap
          </Text>
        </Row>
      </CardBody>
    </CardContainer>
  )
}

export default ComingSoonCard
