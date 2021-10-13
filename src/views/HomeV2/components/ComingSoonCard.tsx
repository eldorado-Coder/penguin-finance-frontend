import React from 'react'
import { Card, CardBody, Heading, Text } from 'penguinfinance-uikit2'
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'
import CardValue from './CardValue'

const CardContainer = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  background: ${({ theme }) => theme.isDark ? '#272044' : '#342C6D'};
  border-radius: 26px;
  box-shadow: 0px 1px 8px rgb(0 0 0 / 24%);
`

const StyledHeading = styled(Heading)`
  font-weight: 800;
  color: white;

  @font-face {
    font-family: 'GothamUltra Font';
    src: url(${process.env.PUBLIC_URL}/fonts/GothamUltra.otf) format('truetype');
    font-display: swap;
  }
  font-family: 'GothamUltra Font';

  @media (min-width: 1200px) {
    font-size: 58px;
    line-height: 70px;
  }
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const StyledCardBody = styled(CardBody)`
  @media (min-width: 1200px) {
    padding: 24px 40px;
  }
`

const StyledText = styled(Text)`
  font-weight: 300;
  font-size: 14px;

  @font-face {
    font-family: 'Telegraf Regular Font';
    src: url(${process.env.PUBLIC_URL}/fonts/Telegraf-Regular.ttf) format('truetype');
    font-display: swap;
  }
  font-family: 'Telegraf Regular Font';

  @media (min-width: 1200px) {
    font-size: 20px;
    line-height: 25px;
  }
`;

const ComingSoonCard: React.FC = () => {
  const { isDark } = useTheme()

  return (
    <CardContainer>
      <StyledCardBody>
        <StyledHeading size="xl" mb="8px" color="primary">
          Coming Soon
        </StyledHeading>
        <Row>
          <StyledText color='white'>
            CryptoPuffies
          </StyledText>
        </Row>
        <Row>
          <StyledText color='white'>
            Pangolin vs Joe Emperor Game
          </StyledText>
        </Row>
        <Row>
          <StyledText color='white'>
            Make Igloos, Not War
          </StyledText>
        </Row>
        <Row>
          <StyledText color='white'>
            Penguin Arena
          </StyledText>
        </Row>
        <Row>
          <StyledText color='white'>
            Read our Roadmap
          </StyledText>
        </Row>
      </StyledCardBody>
    </CardContainer>
  )
}

export default ComingSoonCard
