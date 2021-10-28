import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, Skeleton, useMatchBreakpoints } from 'penguinfinance-uikit2'
import { NavLink } from 'react-router-dom'
import SvgIcon from 'components/SvgIcon'
import { getNumberWithCommas } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'

const StyledCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  position: relative;
  width: 100%;
  background: ${({ theme }) => (theme.isDark ? '#272044' : '#342C6D')};
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
    padding: 24px 30px 20px;
  }
`

const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
  line-height: 44px;
  color: ${({ theme }) => (theme.isDark ? '#d4444c' : '#ffffff')};
  font-weight: 800;
  
  @font-face {
    font-family: 'GothamBold Font';
    src: url(${process.env.PUBLIC_URL}/fonts/GothamBold.ttf) format('truetype');
    font-display: swap;
  }
  font-family: 'GothamBold Font';

  @media (min-width: 1200px) {
    line-height: 60px;
    font-size: 48px;
  }
`

const Text = styled(Heading)`
  color: #ffffff;
  font-weight: 300;
  font-size: 18px;

  @font-face {
    font-family: 'Telegraf UltraBold Font';
    src: url(${process.env.PUBLIC_URL}/fonts/Telegraf-UltraBold.ttf) format('truetype');
    font-display: swap;
  }
  font-family: 'Telegraf UltraBold Font';
  
  @media (min-width: 640px) {
    font-size: 18px;
  }

  @media (min-width: 1200px) {
    font-size: 20px;
    line-height: 24px;
  }
`

const StyledNavLink = styled(NavLink)`
  svg {
    path {
      fill: white;
    }
  }
`

const EarnAPYCard = ({ apy }: { apy: BigNumber }) => {
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl

  const displayedApy = getNumberWithCommas((100 * apy.toNumber()).toFixed(2))
  return (
    <StyledCard>
      <StyledCardBody>
        <Text size="md">Enjoy a comfy</Text>
        <CardMidContent color="primary">
          {apy ? `${displayedApy}% APY` : <Skeleton animation="pulse" variant="rect" height="44px" />}
        </CardMidContent>
        <Flex justifyContent="space-between" alignItems='center'>
          <Text size="md">with no IL by holding iPEFI</Text>
          <StyledNavLink exact activeClassName="active" to="/nests" id="farm-apy-cta">
            <SvgIcon src={`${process.env.PUBLIC_URL}/images/home/arrow-right.svg`} width={isMobile ? '25px' : "28px"} height={isMobile ? '25px' : "28px"} />
          </StyledNavLink>
        </Flex>
      </StyledCardBody>
    </StyledCard>
  )
}

export default EarnAPYCard
