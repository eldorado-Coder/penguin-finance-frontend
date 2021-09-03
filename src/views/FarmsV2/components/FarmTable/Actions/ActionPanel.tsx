import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled, { keyframes, css } from 'styled-components'
import { Card, Text, Button, Flex, useMatchBreakpoints } from 'penguinfinance-uikit2'
import { WEEKS_PER_YEAR } from 'config'
import useAssets from 'hooks/useAssets'
import { getBalanceNumber } from 'utils/formatBalance'
import { getTokenLogoFromSymbol } from 'utils/token'
import Balance from 'components/Balance'
import { FarmCardProps } from '../../types'
import StakePanel from './StakePanel'
import AutoNesting from './AutoNesting'

const expandAnimation = keyframes`
  from {
    max-height: 0px;
  }
  to {
    max-height: 1000px;
  }
`

const collapseAnimation = keyframes`
  from {
    max-height: 1000px;
  }
  to {
    max-height: 0px;
  }
`

const Container = styled.div<{ expanded }>`
  animation: ${({ expanded }) =>
    expanded
      ? css`
          ${expandAnimation} 300ms linear forwards
        `
      : css`
          ${collapseAnimation} 300ms linear forwards
        `};
  overflow: hidden;
  background: ${({ theme }) => (theme.isDark ? '#121021' : theme.colors.background)};
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 16px 16px 0;
  overflow: auto;

  ${({ theme }) => theme.mediaQueries.xl} {
    flex-direction: row;
    justify-content: space-between;
    padding: 16px 16px 0;
  }
`

const ActionCard = styled(Card)<{ minWidth?: number }>`
  border-radius: 16px;
  overflow: unset;
  min-width: ${({ minWidth }) => minWidth && `${minWidth}px`};
`

const RewardImage = styled.img<{ size: number; ml?: number }>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  margin: 0px 12px;
  margin-left: ${({ ml }) => ml && `${ml}px`};
  border-radius: 50%;
`

const StyledButton = styled(Button)`
  font-weight: 400;
  height: 28px;
  font-size: 14px;
`

const EarningsContainer = styled.div`
  min-width: 180px;
`

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.textSubtle};
  height: 2px;
  margin: 16px auto 8px;
  width: 100%;
`

const StyledBalance = styled(Balance)`
  margin: auto !important;
`

const ActionPanel: React.FunctionComponent<FarmCardProps> = ({ farm, expanded }) => {
  const { getTokenLogo, getTokenSymbol } = useAssets()
  const [allocation, setAllocation] = useState(50)
  const { isXl, isLg } = useMatchBreakpoints()
  const isMobile = !isXl
  const { pendingTokens, userData } = farm
  const userPendingTokens = userData ? userData.userPendingTokens : []
  const userShares = userData ? getBalanceNumber(userData.userShares) : 0
  const totalShares = getBalanceNumber(farm.totalShares)
  const totalLp = getBalanceNumber(farm.totalLp)
  const userSharePercentage = totalShares > 0 ? (100 * userShares) / totalShares : 0

  const pefiPerYear = getBalanceNumber(farm.pefiPerYear)
  const pefiPerWeek = pefiPerYear / WEEKS_PER_YEAR
  const pefiPerMonth = pefiPerWeek * 4

  const lpSymbol = farm.lpSymbol.replaceAll(' LP', '')
  const lpLogo = getTokenLogoFromSymbol(lpSymbol)

  return (
    <Container expanded={expanded}>
      <ActionCard padding="10px 16px" mr={!isMobile && '8px'} mb="16px">
        <StakePanel {...farm} />
      </ActionCard>
      <ActionCard padding="10px 16px" mr={!isMobile && '8px'} mb="16px" minWidth={300}>
        <Flex>
          <EarningsContainer>
            <Text fontSize="20px" color="textSubtle" bold lineHeight={1} mb="8px">
              Your PEFI Earnings
            </Text>
            <Balance
              fontSize="14px"
              color="textSubtle"
              fontWeight="400"
              prefix="Balance: "
              suffix=" LP"
              value={Number(totalLp)}
            />
            {userSharePercentage > 3 && (
              <Balance
                fontSize="14px"
                color="textSubtle"
                fontWeight="400"
                prefix="Share of Igloo: "
                suffix=" %"
                value={Number(userSharePercentage)}
              />
            )}
          </EarningsContainer>
          <RewardImage src={lpLogo} alt="pefi-earning" size={56} />
        </Flex>
        <Divider />
        <Flex>
          <EarningsContainer>
            <Text fontSize="20px" color="textSubtle" bold lineHeight={1} mb="8px">
              Igloo Stats
            </Text>
            <Balance fontSize="14px" color="textSubtle" fontWeight="400" prefix="TVL: $" value={Number(pefiPerWeek)} />
            <Balance
              fontSize="14px"
              color="textSubtle"
              fontWeight="400"
              prefix="PEFI/week: "
              value={Number(pefiPerWeek)}
            />
            <Balance
              fontSize="14px"
              color="textSubtle"
              fontWeight="400"
              prefix="PEFI/month: "
              value={Number(pefiPerMonth)}
            />
          </EarningsContainer>
          <RewardImage src={lpLogo} alt="igloo-stats" size={56} />
        </Flex>
      </ActionCard>
      <Flex flexDirection="column" mb="16px">
        <ActionCard padding="10px 16px">
          <Flex>
            <Flex flexDirection="column" justifyContent="space-between">
              <Text fontSize="20px" color="textSubtle" bold>
                Your Rewards
              </Text>
              <StyledButton color="primary" scale="sm">
                Harvest
              </StyledButton>
            </Flex>
            <Flex alignItems="center" justifyContent="space-around" ml="40px">
              {pendingTokens.map((pendingToken) => {
                const rewardTokenInfo = userPendingTokens.find((row) => row.address === pendingToken)
                const amount = rewardTokenInfo ? Number(rewardTokenInfo.amount) : 0
                return (
                  <Flex flexDirection="column">
                    <RewardImage src={getTokenLogo(pendingToken)} alt="penguin" size={50} />
                    <StyledBalance
                      fontSize="14px"
                      color="textSubtle"
                      fontWeight="400"
                      suffix={` ${getTokenSymbol(pendingToken)}`}
                      value={getBalanceNumber(new BigNumber(amount))}
                    />
                  </Flex>
                )
              })}
            </Flex>
          </Flex>
        </ActionCard>
        <ActionCard padding="10px 16px" mt="8px">
          <AutoNesting currentAllocation={allocation} onUpdateAllocation={setAllocation} />
        </ActionCard>
      </Flex>
    </Container>
  )
}

export default ActionPanel
