import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex } from 'penguinfinance-uikit2'
import { NavLink } from 'react-router-dom'
import SvgIcon from 'components/SvgIcon'

const StyledCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  position: relative;
  width: 100%;
  background: ${({ theme }) => theme.colors.secondary};

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
`
const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
  line-height: 44px;
  color: ${({ theme }) => (theme.isDark ? '#d4444c' : '#ffffff')};
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

const IglooCard = () => {
  return (
    <StyledCard>
      <CardBody>
        <Text size="md">Earn</Text>
        <CardMidContent>PEFI & PNG</CardMidContent>
        <Flex justifyContent="space-between">
          <Text size="md">in Penguin Igloos</Text>
          <StyledNavLink exact activeClassName="active" to="/igloos" id="farm-apy-cta">
            <SvgIcon src={`${process.env.PUBLIC_URL}/images/home/arrow-right.svg`} width="25px" height="25px" />
          </StyledNavLink>
        </Flex>
      </CardBody>
    </StyledCard>
  )
}

export default IglooCard
