import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { Card, CardBody, Heading, Skeleton, Text } from 'penguinfinance-uikit2'
import Balance from 'components/Balance'
import useI18n from 'hooks/useI18n'
import { Pool } from 'state/types'
import { useGetStats } from 'hooks/api'

const StyledTotalValueLockedCard = styled(Card)`
  min-height: 150px;
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
  opacity: 0.3;
  justify-content: flex-end;
  display: flex;
  align-items: center;
`

const CardBgImage = styled.img`
  height: 70%;
`

interface PoolWithApy extends Pool {
  apy: BigNumber
}

interface HarvestProps {
  pool: PoolWithApy
}

const TotalPefiStakedNests: React.FC<HarvestProps> = ({ pool }) => {
  const { totalStaked } = pool

  const TranslateString = useI18n()
  if (totalStaked) {
    return (
      <StyledTotalValueLockedCard>
        <CardBgImageContainer>
          <CardBgImage src={`${process.env.PUBLIC_URL}/images/Big_Nest_Staked.png`} alt="astronaut" />
        </CardBgImageContainer>
        <CardBody>
          <Heading color="contrast" size="md">
            {TranslateString(762, 'A total of')}
          </Heading>
          <CardMidContent color="primary">
            {parseInt(getBalanceNumber(totalStaked).toString()) ? (
              `${parseInt(getBalanceNumber(totalStaked).toString())} ${TranslateString(736, 'PEFI')}`
            ) : (
              <Skeleton animation="pulse" variant="rect" height="44px" />
            )}
          </CardMidContent>
          {/* <Balance color="primary" fontSize="40px" value={getBalanceNumber(totalStaked)} unit={` PEFI`} /> */}
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

export default TotalPefiStakedNests
