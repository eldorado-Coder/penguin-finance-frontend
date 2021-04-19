import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, Skeleton } from '@penguinfinance/uikit'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getPefiAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'

const StyledFarmStakingCard = styled(Card)`
  background-image: url('/images/Big_Igloo_EarnUp.png');
  background-repeat: no-repeat;
  background-position: top right;
  min-height: 150px;

  margin-left: auto;
  margin-right: auto;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
`
const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
  line-height: 44px;
`
const BurnedPefiCard = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getPefiAddress())
  const percentage = 100 * getBalanceNumber(burnedBalance) / getBalanceNumber(totalSupply)

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading color="contrast" size="md">
          {TranslateString(534, 'A total PEFI of')}
        </Heading>
        <CardMidContent color="primary">
          {percentage.toFixed(2)}%
        </CardMidContent>
        <Flex justifyContent="space-between">
          <Heading color="contrast" size="md">
            {TranslateString(534, 'has been burnt forever!')}
          </Heading>
        </Flex>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default BurnedPefiCard
