import React from 'react'
import styled from 'styled-components'
import { Text, Flex } from 'penguinfinance-uikit2'
import VersoCard from './verso/VersoCard'
import VersoStakeCard from './verso/VersoStakeCard/StakeCard'

const CurrentIcebergs = () => {
  return (
    <>
      <Label fontSize="24px" mt="32px" mb="16px" fontWeight={600}>
        Current Icebergs
      </Label>
      <Flex justifyContent="space-between" flexWrap="wrap">
        <VersoCard />
        <CardWrapper>
          <VersoStakeCard />
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
