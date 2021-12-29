import React from 'react'
import { Card, CardBody, Heading, Text, Flex, useMatchBreakpoints } from 'penguinfinance-uikit2'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import SvgIcon from 'components/SvgIcon'

const ComingSoonCard: React.FC = () => {
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl

  const handleViewRoadMap = () => {
    window.open('https://docs.penguinfinance.io/roadmap', '_blank')
  }

  return (
    <CardContainer>
      <StyledCardBody>
        <StyledHeading size="xl" mb="8px" color="primary">
          Coming Soon
        </StyledHeading>
        <Row>
          <StyledText color="white">
            <a href="/" target="_blank" rel="noreferrer">
              Penguin Launchpad Rebirth
            </a>
          </StyledText>
        </Row>
        <Row>
          <StyledText color="white">
            <a href="https://twitter.com/CryptoPuffies" target="_blank" rel="noreferrer">
              CryptoPuffies
            </a>
          </StyledText>
        </Row>
        <Row>
          <StyledText color="white">
            <a
              href="https://penguin-finance.medium.com/an-epic-winter-is-coming-to-penguin-finance-%EF%B8%8F-d207a2eab3cd"
              target="_blank"
              rel="noreferrer"
            >
              Time Optimizer Igloo
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
          <RoadMapLink onClick={handleViewRoadMap}>
            <SvgIcon
              src={`${process.env.PUBLIC_URL}/images/home-v2/arrow-right.svg`}
              width={isMobile ? '25px' : '28px'}
              height={isMobile ? '25px' : '28px'}
            />
          </RoadMapLink>
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
  font-family: 'GothamBlack Font';

  @media (min-width: 1200px) {
    font-size: 48px;
    line-height: 60px;
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
  font-family: 'Telegraf Regular Font';

  a {
    &:hover {
      text-decoration: underline;
    }
  }

  @media (min-width: 1200px) {
    font-size: 18px;
    line-height: 20px;
  }
`

const RoadMapLink = styled.div`
  svg {
    cursor: pointer;
    path {
      fill: white;
    }
  }
`

export default ComingSoonCard
