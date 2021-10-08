import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Text, Flex, ButtonMenu, ButtonMenuItem } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import { useClubPenguinFarms } from 'state/hooks'
import { useClubPenguinStake } from 'hooks/useStake'
import { useClubPenguinUnstake } from 'hooks/useUnstake'
import { useClubPenguinApprove } from 'hooks/useApprove'
import StakeForm from './StakeForm'
import UnstakeForm from './UnstakeForm'
import Card from '../Card'

const StakeCard = () => {
  const [activeTab, setActiveTab] = useState(0)
  const { account } = useWeb3React()
  const { onStake } = useClubPenguinStake(0)
  const { onUnstake } = useClubPenguinUnstake(0)
  const { onApproveIPefi } = useClubPenguinApprove()
  const clubFarms = useClubPenguinFarms(account)
  const activeFarm = clubFarms[0]
  const { userData } = activeFarm
  const iPEFIBalance = userData ? new BigNumber(userData.tokenBalance) : new BigNumber(0)
  const stakedBalance = userData ? new BigNumber(userData.stakedBalance) : new BigNumber(0)

  const handleSwitchTab = (tab) => {
    setActiveTab(tab)
  }

  return (
    <StyledCard>
      <CardContent>
        <TabWrapper>
          <ButtonMenu variant="subtle" activeIndex={activeTab} onItemClick={handleSwitchTab}>
            <OptionItem active={activeTab === 0}>Stake iPEFI</OptionItem>
            <OptionItem active={activeTab === 1}>Unstake</OptionItem>
          </ButtonMenu>
        </TabWrapper>
        <Flex mt="24px" mb="8px" justifyContent="space-between" alignItems="center">
          <StakeLabel color="primary" fontWeight="500">
            {activeTab === 0 ? 'Stake iPEFI, Get SHERPA' : 'Unstake'}
          </StakeLabel>
        </Flex>
        {activeTab === 0 ? (
          <StakeForm
            max={iPEFIBalance}
            tokenName="iPEFI"
            account={account}
            stakedBalance={stakedBalance}
            onApprove={onApproveIPefi}
            onConfirm={onStake}
          />
        ) : (
          <UnstakeForm max={stakedBalance} tokenName="iPEFI" account={account} onConfirm={onUnstake} />
        )}
      </CardContent>
    </StyledCard>
  )
}

const StyledCard = styled(Card)<{ isNestPage?: boolean }>`
  border-radius: 8px;
  width: 100%;
  margin-top: 16px;
  box-shadow: 0px 1px 6px rgb(0 0 0 / 16%);

  /* ${({ theme }) => theme.mediaQueries.lg} {
    width: 49%;
  } */
`

const CardContent = styled.div`
  border-radius: 8px;
  padding: 24px;
  background: ${(props) => props.theme.card.background};
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

const OptionItem = styled(ButtonMenuItem)<{ active: boolean }>`
  min-width: 100px;
  font-weight: 500;
  box-shadow: none;
  background-color: ${({ active, theme }) => active && theme.colors.red};
  color: ${({ active }) => (active ? 'white' : '#A79FBC')};
  color: ${({ active, theme }) => theme.isDark && !active && '#BBA6DD'};
`

const StakeLabel = styled(Text)`
  font-size: 18px;
  color: ${({ theme }) => (theme.isDark ? 'white' : '#372871')};

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 20px;
  }
`

export default StakeCard
