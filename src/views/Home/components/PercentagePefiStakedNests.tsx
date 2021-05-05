import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { Card, CardBody, Heading, Skeleton, Text } from 'penguinfinance-uikit2'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import Balance from 'components/Balance'
import useI18n from 'hooks/useI18n'
import { Pool } from 'state/types'
import { useGetStats } from 'hooks/api'

const StyledTotalValueLockedCard = styled(Card)`
  /* min-height: 150px; */
  align-items: center;
  display: flex;
  flex: 1;
`
const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
  line-height: 44px;
`

const CardBgImageContainer = styled.div`
  position: absolute;
  right: 0;
  padding: 10px;
  height: 100%;
  justify-content: flex-end;
  display: flex;
  align-items: center;
`

const CardBgImage = styled.img`
  height: 100%;
`

interface PoolWithApy extends Pool {
  apy: BigNumber
}

interface HarvestProps {
  pool: PoolWithApy
}

const PercentagePefiStakedNests: React.FC<HarvestProps> = ({ pool }) => {
  const totalSupply = useTotalSupply()

  const {
    totalStaked
  } = pool

  const TranslateString = useI18n()
  if (totalStaked) {
    const percentageStaked = (getBalanceNumber(totalStaked) / getBalanceNumber(totalSupply)) * 100;
    return (
      <StyledTotalValueLockedCard>
        <CardBgImageContainer>
          <CardBgImage
            src={`${process.env.PUBLIC_URL}/images/Penguins.svg`}
            alt="astronaut"
          />
        </CardBgImageContainer>
        <CardBody>
          <Heading color="contrast" size="md">
            {TranslateString(762, 'A total of')}
          </Heading>
          <CardMidContent color="primary">
            {parseInt(percentageStaked.toString()) ? (
              `${parseInt(percentageStaked.toString())}% ${TranslateString(736, 'of PEFI')}`
            ) : (
              <Skeleton animation="pulse" variant="rect" height="44px" />
            )}
          </CardMidContent>
          <Heading color="contrast" size="md">
            {TranslateString(764, 'Staked in Penguin Nests')}
          </Heading>
        </CardBody>
      </StyledTotalValueLockedCard>
    )
  }
  return (
    <StyledTotalValueLockedCard>
      <CardBody>
        <Heading color="contrast" size="md">
          {TranslateString(762, 'Stake your PEFI now!')}
        </Heading>
      </CardBody>
    </StyledTotalValueLockedCard>
  )
}

export default PercentagePefiStakedNests
