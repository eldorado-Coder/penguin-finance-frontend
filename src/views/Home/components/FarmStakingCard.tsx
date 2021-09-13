import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button, Text, Flex } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import useI18n from 'hooks/useI18n'
import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import CardValue from './CardValue'

const StyledFarmStakingCard = styled(Card)`
  height: 230px;
  background: ${({ theme }) => theme.isDark && '#30264F'};
`

const Block = styled.div`
  width: 100%;
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

const StyledButton = styled(Button)`
  font-weight: 500;
  background-color: ${({ theme }) => theme.colors.red};
  color: white;

  img {
    margin-left: 8px;
  }
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

  const rewardsSum = 23484.49;
  const pefiReward = 1580;
  const iPefiReward = 1360;
  const joeReward = 450;
  const pngReward = 356;

  const rewards = [
    { label: 'PEFI', value: pefiReward },
    { label: 'iPEFI', value: iPefiReward },
    { label: 'JOE', value: joeReward },
    { label: 'PNG', value: pngReward }
  ]

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Title size="xl" mb="0px" color="primary">
          {TranslateString(542, 'Farms & Staking')}
        </Title>
        <StyledFlex mt="12px" mb="16px">
          <CardImage src="/images/penguin-finance-logo.svg" alt="penguin logo" width={64} height={64} />
          <Block>
            <Label>{TranslateString(544, 'Rewards to Harvest')}:</Label>
            <CardValue fontSize="32px" value={rewardsSum} prefix='$' lineHeight="1.2" decimals={2} />
            <Flex>
              <Text fontSize='14px' color='textSubtle'>{rewards.filter(reward => reward.value).map(reward => `${reward.value} ${reward.label}`).join(', ')}</Text>
            </Flex>
          </Block>
        </StyledFlex>
        <Actions>
          {account ? (
            <StyledButton
              id="harvest-all"
              disabled={pendingTx}
              onClick={harvestAllFarms}
              scale="md"
              color='primary'
              endIcon={<img src="/images/farms/harvest-coin.svg" alt="harvest" width={16} />}
            >
              {pendingTx
                ? TranslateString(548, 'Collecting PEFI')
                : TranslateString(532, `Harvest All`)}
            </StyledButton>
          ) : (
            <UnlockButton fullWidth isHomeButton />
          )}
        </Actions>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default FarmedStakingCard
