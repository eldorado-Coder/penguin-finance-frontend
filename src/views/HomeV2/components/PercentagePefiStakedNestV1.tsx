import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { Card, CardBody, Heading, Flex, Skeleton } from 'penguinfinance-uikit2'
import { NavLink } from 'react-router-dom'
import SvgIcon from 'components/SvgIcon'
import { useTotalSupply } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { Pool } from 'state/types'

const StyledCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  position: relative;
  width: 100%;
  background: ${({ theme }) => theme.colors.secondary};
  min-height: 141px;

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

const Title = styled(Heading)`
  color: #ffffff;
`

const StyledNavLink = styled(NavLink)`
  svg {
    path {
      fill: white;
    }
  }
`

interface PoolWithApy extends Pool {
  apy?: BigNumber
}

interface HarvestProps {
  pool: PoolWithApy
}

const PercentagePefiStakedNestV1: React.FC<HarvestProps> = ({ pool }) => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const { totalStaked } = pool

  if (totalStaked) {
    const stakedPercentage = (getBalanceNumber(totalStaked) / getBalanceNumber(totalSupply)) * 100
    return (
      <StyledCard>
        <CardBody>
          <Title size="md">{TranslateString(762, 'A total of')}</Title>
          <CardMidContent color="primary">
            {parseInt(stakedPercentage.toString()) ? (
              `${parseInt(stakedPercentage.toString())}% ${TranslateString(736, 'of PEFI')}`
            ) : (
              <Skeleton animation="pulse" variant="rect" height="44px" />
            )}
          </CardMidContent>
          <Flex justifyContent="space-between">
            <Title size="md">{TranslateString(764, 'Staked in Penguin Nests')}</Title>
            <StyledNavLink exact activeClassName="active" to="/nests" id="farm-apy-cta">
              <SvgIcon src={`${process.env.PUBLIC_URL}/images/home-v2/arrow-right.svg`} width="25px" height="25px" />
            </StyledNavLink>
          </Flex>
        </CardBody>
      </StyledCard>
    )
  }
  return (
    <StyledCard>
      <CardBody>
        <Title size="md">{TranslateString(762, 'Stake your PEFI now!')}</Title>
      </CardBody>
    </StyledCard>
  )
}

export default PercentagePefiStakedNestV1
