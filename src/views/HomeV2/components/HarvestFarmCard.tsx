import React, { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button, Text, Flex } from 'penguinfinance-uikit2'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { useAllV2FarmHarvest } from 'hooks/useHarvest'
import useRefresh from 'hooks/useRefresh'
import { useV2Farms, useV2Pools, usePricePefiUsdt, usePricePngUsdt } from 'state/hooks'
import { fetchV2FarmUserDataAsync } from 'state/actions'
import { getBalanceNumber } from 'utils/formatBalance'
import { getAddress } from 'utils/addressHelpers'
import tokens from 'config/constants/tokens'
import useJoePrice from 'hooks/useJoePrice'
import useTokenPrice from 'hooks/useTokenPrice'
import UnlockButton from 'components/UnlockButton'
import SvgIcon from 'components/SvgIcon'
import PefiHarvestBalance from './PefiHarvestBalance'

const HarvestFarmCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWeb3React()
  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  const history = useHistory()
  const v2Farms = useV2Farms()
  const v2Pools = useV2Pools(account)
  const v2Nest = v2Pools.length > 0 ? v2Pools[0] : null
  const pefiPriceUsd = usePricePefiUsdt().toNumber()
  const iPefiToPefiRatio = v2Nest.currentExchangeRate || 1
  const iPefiPriceUsd = iPefiToPefiRatio * pefiPriceUsd
  const pngPriceUsd = usePricePngUsdt().toNumber()
  const joePriceUsd = useJoePrice()
  const { lydPrice: lydPriceUsd, sushiPrice: sushiPriceUsd } = useTokenPrice()
  const v2FarmsWithRewards = v2Farms.filter((row) => row.userData && Number(row.userData.stakedBalance) > 0)

  const { onReward } = useAllV2FarmHarvest(v2FarmsWithRewards.map((farmWithBalance) => farmWithBalance.pid))

  useEffect(() => {
    if (account) {
      dispatch(fetchV2FarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

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

  const handleInfoIconClick = () => {
    history.push('/farms')
  }

  const getTokenPrice = (address) => {
    const rewardToken = tokens.find((row) => getAddress(row.address).toLowerCase() === address.toLowerCase())
    if (rewardToken && rewardToken.symbol === 'PEFI') return pefiPriceUsd
    if (rewardToken && rewardToken.symbol === 'iPEFI') return iPefiPriceUsd
    if (rewardToken && rewardToken.symbol === 'PNG') return pngPriceUsd
    if (rewardToken && rewardToken.symbol === 'JOE') return joePriceUsd
    if (rewardToken && rewardToken.symbol === 'LYD') return lydPriceUsd
    if (rewardToken && rewardToken.symbol === 'Sushi.e') return sushiPriceUsd
    return 1
  }

  const getTokenSymbol = (address) => {
    const rewardToken = tokens.find((row) => getAddress(row.address).toLowerCase() === address.toLowerCase())
    return rewardToken.symbol
  }

  const getRewardsArray = () => {
    const _rewardTokens = {}
    v2Farms.map((row) => {
      if (row.userData && getBalanceNumber(row.userData.stakedBalance) > 0) {
        const { userPendingTokens } = row.userData

        userPendingTokens.map((row1) => {
          const { address, amount } = row1
          if (_rewardTokens[address]) {
            _rewardTokens[address] += getBalanceNumber(amount)
          } else {
            _rewardTokens[address] = getBalanceNumber(amount)
          }
          return row1
        })
      }
      return row
    })

    let _rewards = []
    let _totalRewardInUsd = 0
    let _rewardString = ''
    // eslint-disable-next-line no-restricted-syntax
    for (const [address, amount] of Object.entries(_rewardTokens)) {
      const tokenRewardInUsd = Number(amount) * Number(getTokenPrice(address))
      _totalRewardInUsd += tokenRewardInUsd
      if (Number(amount) > 0) {
        _rewardString += `${Number(amount).toFixed(0)} ${getTokenSymbol(address)}, `
      }

      _rewards = [
        ..._rewards,
        {
          address,
          amount,
          tokenPrice: getTokenPrice(address),
          tokenRewardInUsd,
          symbol: getTokenSymbol(address),
        },
      ]
    }

    return { rewards: _rewards, totalRewardInUsd: _totalRewardInUsd, rewardString: _rewardString.slice(0, -2) }
  }

  const { totalRewardInUsd, rewardString } = getRewardsArray()

  return (
    <StyledCard>
      <StyledCardBody>
        <Flex justifyContent="space-between" alignItems="center">
          <StyledHeading size="xl" mb="8px" color="primary">
            Igloos (Farming)
          </StyledHeading>
          <InfoIconWrapper onClick={handleInfoIconClick}>
            <SvgIcon src={`${process.env.PUBLIC_URL}/images/home/info.svg`} width="25px" height="25px" />
          </InfoIconWrapper>
        </Flex>
        <StyledFlex mt="12px" mb="20px" ml="-16px">
          <CardImage src="/images/penguin-finance-logo.svg" alt="penguin logo" width={64} height={64} />
          <Block>
            <Label>{`Rewards to Harvest: `}</Label>
            <PefiHarvestBalance value={totalRewardInUsd} detailedValue={rewardString} />
          </Block>
        </StyledFlex>
        <Actions>
          {account ? (
            <StyledButton
              id="harvest-all"
              disabled={totalRewardInUsd === 0 || pendingTx}
              endIcon={<img src="/images/farms/harvest-coin.svg" alt="harvest" width={16} />}
              onClick={harvestAllFarms}
              scale="md"
            >
              {pendingTx ? 'Collecting Rewards' : 'Harvest All'}
            </StyledButton>
          ) : (
            <UnlockButton fullWidth isHomeButton />
          )}
        </Actions>
      </StyledCardBody>
    </StyledCard>
  )
}

const StyledCard = styled(Card)`
  min-height: 230px;
  height: 100%;
  background: ${({ theme }) => theme.isDark && '#30264F'};
`

const InfoIconWrapper = styled.div`
  svg {
    cursor: pointer;
    path {
      fill: ${({ theme }) => (theme.isDark ? 'white' : theme.colors.secondary)};
    }
  }
`

const StyledCardBody = styled(CardBody)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  @media (min-width: 1200px) {
    padding: 24px 40px 40px;
  }
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

const StyledHeading = styled(Heading)`
  color: white;
  font-weight: 300;

  @media (min-width: 1200px) {
    font-size: 50px;
    line-height: 70px;
  }
`

const StyledFlex = styled(Flex)`
  align-items: center;
`

const StyledButton = styled(Button)`
  img {
    margin-left: 8px;
  }
`

export default HarvestFarmCard
