import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, Skeleton } from 'penguinfinance-uikit2'
import { NavLink } from 'react-router-dom'
import SvgIcon from 'components/SvgIcon'
import { useNestApy } from 'state/hooks'
import { getNumberWithCommas } from 'utils/formatBalance'

const StyledCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  position: relative;
  width: 100%;
  background: ${({ theme }) => (theme.isDark ? theme.colors.secondary : theme.colors.primary)};

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
`
const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
  line-height: 44px;
  color: #ffffff;
  font-weight: 800;
`

const Text = styled(Heading)`
  color: #ffffff;
`

const StyledNavLink = styled(NavLink)`
  svg {
    path {
      fill: white;
    }
  }
`

const EarnAPYCard = () => {
  const displayedNestApy = (useNestApy() * 100).toFixed(2)

  return (
    <StyledCard>
      <CardBody>
        <Text size="md">Enjoy a comfy</Text>
        <CardMidContent color="primary">
          {displayedNestApy ? (
            `${getNumberWithCommas(displayedNestApy)}% APY`
          ) : (
            <Skeleton animation="pulse" variant="rect" height="44px" />
          )}
        </CardMidContent>
        <Flex justifyContent="space-between">
          <Text size="md">by holding xPEFI</Text>
          <StyledNavLink exact activeClassName="active" to="/nests" id="farm-apy-cta">
            <SvgIcon src={`${process.env.PUBLIC_URL}/images/home/arrow-right.svg`} width="25px" height="25px" />
          </StyledNavLink>
        </Flex>
      </CardBody>
    </StyledCard>
  )
}

export default EarnAPYCard
