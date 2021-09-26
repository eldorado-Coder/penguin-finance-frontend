import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, Skeleton } from 'penguinfinance-uikit2'
import { NavLink } from 'react-router-dom'
import SvgIcon from 'components/SvgIcon'
import { getNumberWithCommas } from 'utils/formatBalance'
import { useEmperor } from 'state/hooks'

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

const EmperorInfoCard = ({ iPefiPrice }: { iPefiPrice: number }) => {
  const { currentEmperor } = useEmperor()
  const currentEmperorJackpot =
    (currentEmperor && currentEmperor.jackpot && getNumberWithCommas(Number(currentEmperor.jackpot).toFixed(2))) || 0
  const currentEmperorJackpotInUsd =
    (currentEmperor &&
      currentEmperor.jackpot &&
      iPefiPrice &&
      getNumberWithCommas((Number(iPefiPrice) * Number(currentEmperor.jackpot)).toFixed(2))) ||
    0

  return (
    <StyledCard>
      <CardBody>
        <Text size="md">The current Penguin Emperor Jackpot is</Text>
        <CardMidContent color="primary">
          {currentEmperor && currentEmperor.jackpot ? (
            `${currentEmperorJackpot} iPEFI`
          ) : (
            <Skeleton animation="pulse" variant="rect" height="44px" />
          )}
        </CardMidContent>
        <Flex justifyContent="space-between">
          {currentEmperor && currentEmperor.jackpot && iPefiPrice ? (
            <Text size="md">{`($${currentEmperorJackpotInUsd})`}</Text>
          ) : (
            <Skeleton animation="pulse" variant="rect" height="22px" />
          )}
          <StyledNavLink exact activeClassName="active" to="/emperor" id="farm-apy-cta">
            <SvgIcon src={`${process.env.PUBLIC_URL}/images/home/arrow-right.svg`} width="25px" height="25px" />
          </StyledNavLink>
        </Flex>
      </CardBody>
    </StyledCard>
  )
}

export default EmperorInfoCard
