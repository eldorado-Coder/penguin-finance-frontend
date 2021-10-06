import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, useMatchBreakpoints } from 'penguinfinance-uikit2'
import { NavLink } from 'react-router-dom'
import SvgIcon from 'components/SvgIcon'

const StyledCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  position: relative;
  width: 100%;
  background: ${({ theme }) => theme.isDark ? '#272044' : '#fff' };
  border-radius: 26px;
  box-shadow: 0px 1px 8px rgb(0 0 0 / 24%);

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
`
const StyledCardBody = styled(CardBody)`
  padding: 24px;

  @media (min-width: 1200px) {
    padding: 24px 30px;
  }
`

const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
  line-height: 44px;
  color: ${({ theme }) => (theme.isDark ? '#d4444c' : '#EC3B40')};
  font-weight: 800;

  @media (min-width: 1200px) {
    line-height: 62px;
    font-size: 52px;
  }
`

const Text = styled(Heading)`
  color: ${({ theme }) => theme.isDark ? '#ffffff' : '#342C6D'};
  font-weight: 300;

  @media (min-width: 1200px) {
    font-size: 25px;
    line-height: 30px;
  }
`
const StyledNavLink = styled(NavLink)`
  svg {
    path {
      fill: ${({ theme }) => theme.isDark ? '#fff' : '#EC3B40'};
    }
  }
`

const IglooCard = () => {
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl

  return (
    <StyledCard>
      <StyledCardBody>
        <Text size="md">Experience the Penguin Rush</Text>
        <CardMidContent>PEFI, PNG & JOE</CardMidContent>
        <Flex justifyContent="space-between">
          <Text size="md">in Penguin Igloos</Text>
          <StyledNavLink exact activeClassName="active" to="/farms" id="farm-apy-cta">
            <SvgIcon src={`${process.env.PUBLIC_URL}/images/home/arrow-right.svg`} width={isMobile ? '25px' : "31px"} height={isMobile ? '25px' : "31px"} />
          </StyledNavLink>
        </Flex>
      </StyledCardBody>
    </StyledCard>
  )
}

export default IglooCard
