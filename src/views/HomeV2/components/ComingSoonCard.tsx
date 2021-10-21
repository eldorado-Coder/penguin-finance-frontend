import React from 'react'
import { Card, CardBody, Heading, Text, Flex, useMatchBreakpoints } from 'penguinfinance-uikit2'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import SvgIcon from 'components/SvgIcon'

const ComingSoonCard: React.FC = () => {
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl

  return (
    <CardContainer>
      <StyledCardBody>
        <StyledHeading size="xl" mb="8px" color="primary">
          Coming Soon
        </StyledHeading>
        <Row>
          <StyledText color="white">
            <a href="https://twitter.com/CryptoPuffies/status/1438176283935092736" target="_blank" rel="noreferrer">
              CryptoPuffies
            </a>
          </StyledText>
        </Row>
        <Row>
          <StyledText color="white">
            <a href="https://penguinfinance.org/emperor" target="_blank" rel="noreferrer">
              Pangolin vs Joe Emperor Game
            </a>
          </StyledText>
        </Row>
        <Row>
          <StyledText color="white">
            <a
              href="https://penguin-finance.medium.com/make-igloos-not-war-new-joe-png-yield-farming-strategies-b70fac00807f"
              target="_blank"
              rel="noreferrer"
            >
              Make Igloos, Not War
            </a>
          </StyledText>
        </Row>
        <Row>
          <StyledText color="white">
            <a href="https://penguinfinance.org/arena" target="_blank" rel="noreferrer">
              Penguin Arena
            </a>
          </StyledText>
        </Row>
      </StyledCardBody>
      <StyledFooter>
        <Flex justifyContent="space-between" alignItems="center">
          <StyledText color="white" isBold>
            Read our Roadmap
          </StyledText>
          <StyledNavLink exact activeClassName="active" to="/">
            <SvgIcon
              src={`${process.env.PUBLIC_URL}/images/home/arrow-right.svg`}
              width={isMobile ? '25px' : '31px'}
              height={isMobile ? '25px' : '31px'}
            />
          </StyledNavLink>
        </Flex>
      </StyledFooter>
    </CardContainer>
  )
}

const CardContainer = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  background: ${({ theme }) => (theme.isDark ? '#272044' : '#342C6D')};
  border-radius: 26px;
  box-shadow: 0px 1px 8px rgb(0 0 0 / 24%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

const StyledFooter = styled(CardBody)`
  padding: 24px;

  @media (min-width: 1200px) {
    padding: 24px 30px 20px 40px;
  }
`

const StyledText = styled(Text)<{ isBold?: boolean }>`
  font-weight: ${({ isBold }) => (isBold ? 600 : 300)};
  font-size: 14px;

  a {
    &:hover {
      text-decoration: underline;
    }
  }

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
`

const StyledNavLink = styled(NavLink)`
  svg {
    path {
      fill: white;
    }
  }
`

export default ComingSoonCard
