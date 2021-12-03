import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Text, Flex, Button } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import { useClubPenguinFarms } from 'state/hooks'
import { useClubPenguinUnstake } from '../../../hooks'
import UnstakeForm from './UnstakeForm'
import Card from '../../Card'
import { getCutdownType } from '../../../utils'

const StakeCard = () => {
  const { account } = useWeb3React()
  const { onUnstake } = useClubPenguinUnstake(2)

  const clubFarms = useClubPenguinFarms(account)
  const activeFarm = clubFarms[2]
  const { userData, rewardStartTimestamp, rewardEndTimestamp } = activeFarm
  const stakedBalance = userData ? new BigNumber(userData.stakedBalance) : new BigNumber(0)

  const currentTimestamp = Date.now()
  const rewardStartTime = rewardStartTimestamp ? 1000 * rewardStartTimestamp : 0
  const cutdownType = getCutdownType(currentTimestamp, rewardStartTime)
  const cutdownDate = cutdownType === 'start' ? rewardStartTime : rewardEndTimestamp

  return (
    <StyledCard>
      <CardContent>
        <OptionTitle scale="md">Unstake</OptionTitle>
        <Flex mt="24px" mb="8px" justifyContent="space-between" alignItems="center">
          <StakeLabel color="primary" fontWeight="500">
            Unstake from Iceberg
          </StakeLabel>
        </Flex>
        <UnstakeForm
          max={stakedBalance}
          tokenName="iPEFI"
          account={account}
          cutdownType={cutdownType}
          cutdownDate={cutdownDate}
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

  /* ${({ theme }) => theme.mediaQueries.lg} {
    width: 49%;
  } */
`

const CardContent = styled.div`
  border-radius: 8px;
  padding: 24px;
  background: ${(props) => props.theme.card.background};
`

const StakeLabel = styled(Text)`
  font-size: 18px;
  color: ${({ theme }) => (theme.isDark ? '#d1caf2' : '#372b70')};

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 20px;
  }
`

const OptionTitle = styled(Button)`
  color: white;
  background: #37DB92;
  width: 100%;
  border-radius: 8px;
  font-weight: 500;
  &:hover {
    opacity: 1 !important;
  }
`

export default StakeCard
