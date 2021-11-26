import React from 'react'
import styled from 'styled-components'
import { Text, Flex } from 'penguinfinance-uikit2'
import BoofiCard from './boofi/BoofiCard'
import BoofiStakeCard from './boofi/BoofiStakeCard/StakeCard'

const CurrentIcebergs = () => {
  return (
    <>
      <Label fontSize="24px" mt="32px" mb="16px" fontWeight={600}>
        Current Iceberg
      </Label>
      <Flex justifyContent="space-between" flexWrap="wrap">
        <BoofiCard />
        <CardWrapper>
          <BoofiStakeCard />
        </CardWrapper>
      </Flex>
    </>
  )
}

const Label = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? 'white' : theme.colors.red)};
`

const CardWrapper = styled(Flex)`
  width: 100%;
  ${({ theme }) => theme.mediaQueries.xl} {
    width: 49%;
  }
`

export default CurrentIcebergs
