import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Text, Flex, Button } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import { useBoofiLaunchpad } from 'state/hooks'
import { useBoofiLaunchpadUnstake } from 'hooks/useUnstake'
import UnstakeForm from './UnstakeForm'
import Card from '../Card'

const UnStakeCard = () => {
  const { account } = useWeb3React()
  const { onUnstake } = useBoofiLaunchpadUnstake()
  const { stakedBalance: staked, canUnstake, timeRemainingToUnstake } = useBoofiLaunchpad(account)
  const stakedBalance = new BigNumber(staked)

  return (
    <StyledCard>
      <CardContent>
        <TabWrapper>
          <TabButton scale="md">Unstake iPEFI</TabButton>
        </TabWrapper>
        <Flex mt="24px" mb="8px" justifyContent="space-between" alignItems="center">
          <StyledLabel color="primary" fontWeight="500">
            Unstake your iPEFI
          </StyledLabel>
        </Flex>
        <UnstakeForm
          max={stakedBalance}
          tokenName="iPEFI"
          account={account}
          unstakedEnabled={canUnstake}
          timeRemainingToUnstake={timeRemainingToUnstake}
          onConfirm={onUnstake}
        />
      </CardContent>
    </StyledCard>
  )
}

const StyledCard = styled(Card)<{ isNestPage?: boolean }>`
  border-radius: 8px;
  width: 100%;
  margin-top: 16px;
  box-shadow: 0px 1px 6px rgb(0 0 0 / 16%);

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 49%;
  }
`

const CardContent = styled.div`
  padding: 24px;
  background: ${(props) => props.theme.card.background};
  border-radius: 32px;
`

const TabWrapper = styled.div`
  width: 100%;
  div {
    width: 100%;
    background-color: ${({ theme }) => (theme.isDark ? '#604e84' : '#ece8f2')};
    border-radius: 8px;

    button {
      width: 50%;
      border-radius: 6px;
    }
  }
`

const TabButton = styled(Button)`
  width: 100%;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  background-color: #38db93;
  &:hover {
    opacity: 1 !important;
  }
`

const StyledLabel = styled(Text)`
  font-size: 18px;
  color: ${({ theme }) => (theme.isDark ? 'white' : '#372871')};

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 20px;
  }
`

export default UnStakeCard
