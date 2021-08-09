import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button, Text, Flex } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import useI18n from 'hooks/useI18n'
import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import PefiHarvestBalance from './PefiHarvestBalance'
import PefiWalletBalance from './PefiWalletBalance'

const StyledFarmStakingCard = styled(Card)`
  height: 230px;
  background: ${({ theme }) => theme.isDark && '#30264F'};
`

const Block = styled.div`
  width: 40%;
`

const CardImage = styled.img`
  margin-right: 20px;
`

const Label = styled(Text).attrs({ color: 'red' })`
  line-height: 1;
  font-size: 14px;
`

const Actions = styled.div`
  margin-top: 12px;
`

const Title = styled(Heading)`
  font-weight: 800;
  line-height: 1;
`

const StyledFlex = styled(Flex)`
  align-items: center;
`

const FarmedStakingCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWeb3React()
  const TranslateString = useI18n()
  const farmsWithBalance = useFarmsWithBalance()
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)

  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onReward()
    } catch (error) {
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onReward])

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Title size="xl" mb="0px" color="primary">
          {TranslateString(542, 'Farms & Staking')}
        </Title>
        <StyledFlex mt='12px' mb='20px'>
          <CardImage src="/images/penguin-finance-logo.svg" alt="penguin logo" width={64} height={64} />
          <Block>
            <Label>{TranslateString(544, 'PEFI to Harvest')}:</Label>
            <PefiHarvestBalance />
          </Block>
          <Block>
            <Label>{TranslateString(546, 'PEFI in Wallet')}:</Label>
            <PefiWalletBalance />
          </Block>
        </StyledFlex>
        <Actions>
          {account ? (
            <Button
              id="harvest-all"
              disabled={balancesWithValue.length <= 0 || pendingTx}
              onClick={harvestAllFarms}
              scale="md"
            >
              {pendingTx
                ? TranslateString(548, 'Collecting PEFI')
                : TranslateString(532, `Harvest all (${balancesWithValue.length})`)}
            </Button>
          ) : (
            <UnlockButton fullWidth isHomeButton />
          )}
        </Actions>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default FarmedStakingCard
