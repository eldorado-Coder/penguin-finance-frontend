import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, Skeleton } from 'penguinfinance-uikit2'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getPefiAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'

const StyledFarmStakingCard = styled(Card)`
  min-height: 150px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
`
const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
  line-height: 44px;
`

const CardBgImageContainer = styled.div`
  position: absolute;
  right: 0;
  padding: 10px;
  height: 100%;
  opacity: 0.3;
  justify-content: flex-end;
  display: flex;
  align-items: center;
`

const CardBgImage = styled.img`
  height: 100%;
`

const BurnedPefiCard = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getPefiAddress())
  const percentage = (100 * getBalanceNumber(burnedBalance)) / getBalanceNumber(totalSupply) || 0

  return (
    <StyledFarmStakingCard>
      <CardBgImageContainer>
        <CardBgImage src={`${process.env.PUBLIC_URL}/images/Big_Igloo_EarnUp.svg`} alt="astronaut" />
      </CardBgImageContainer>
      <CardBody>
        <Heading color="contrast" size="md">
          {TranslateString(534, 'A total of')}
        </Heading>
        <CardMidContent color="primary">{percentage.toFixed(2)}% of PEFI</CardMidContent>
        <Flex justifyContent="space-between">
          <Heading color="contrast" size="md">
            {TranslateString(534, 'has been burned forever!')}
          </Heading>
        </Flex>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default BurnedPefiCard
