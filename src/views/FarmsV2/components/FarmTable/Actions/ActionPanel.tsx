import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { Card, Text, Button, Flex } from 'penguinfinance-uikit2'
import { ASSET_CONTENT_URL, WEEKS_PER_YEAR } from 'config'
import useAssets from 'hooks/useAssets'
import { getBalanceNumber } from 'utils/formatBalance'
import Balance from 'components/Balance'
import { FarmCardProps } from '../../types'
import StakePanel from './StakePanel'

const expandAnimation = keyframes`
  from {
    max-height: 0px;
  }
  to {
    max-height: 500px;
  }
`

const collapseAnimation = keyframes`
  from {
    max-height: 500px;
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
  flex-direction: column-reverse;
  padding: 16px 16px 0;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    justify-content: space-between;
    padding: 16px 16px 0;
  }
`

const ActionCard = styled(Card)`
  border-radius: 16px;
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
  background-color: ${({ theme }) => theme.colors.secondary};
  height: 2px;
  margin: 16px auto 8px;
  width: 100%;
`

const ActionPanel: React.FunctionComponent<FarmCardProps> = ({ farm, expanded }) => {
  const { getTokenLogo, getTokenSymbol } = useAssets()
  const { pendingTokens, userData } = farm
  const userPendingTokens = userData ? userData.userPendingTokens : []

  const pefiPerYear = getBalanceNumber(farm.pefiPerYear)
  const pefiPerWeek = pefiPerYear / WEEKS_PER_YEAR
  const pefiPerMonth = pefiPerWeek * 4

  return (
    <Container expanded={expanded}>
      <Flex flexDirection="column" mr="8px" mb="16px">
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
                    <Text fontSize="14px" color="textSubtle" textAlign="center">
                      {`${Number(amount).toFixed(2)} ${getTokenSymbol(pendingToken)}`}
                    </Text>
                  </Flex>
                )
              })}
            </Flex>
          </Flex>
        </ActionCard>
        <ActionCard padding="10px 16px" mt="8px">
          <Flex alignItems="center" justifyContent="space-between">
            <Text fontSize="20px" color="textSubtle" bold>
              iPEFI Auto-Nesting
            </Text>
            <Text fontSize="12px" color="textDisabled">
              Current Allocation: 50%
            </Text>
            <StyledButton color="primary" scale="sm">
              Modify
            </StyledButton>
          </Flex>
        </ActionCard>
      </Flex>
      <ActionCard padding="10px 16px" mr="8px" mb="16px">
        <Flex>
          <EarningsContainer>
            <Text fontSize="20px" color="textSubtle" bold lineHeight={1} mb="8px">
              Your PEFI Earnings
            </Text>
            <Text color="textSubtle" fontSize="14px">
              Balance: 500 LP
            </Text>
            <Text color="textSubtle" fontSize="14px">
              Share of Igloo: 15 %
            </Text>
          </EarningsContainer>
          <RewardImage src="/images/farms/pefi-dai.svg" alt="pefi-earning" size={56} />
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
          <RewardImage src="/images/farms/pefi-dai.svg" alt="igloo-stats" size={56} />
        </Flex>
      </ActionCard>
      <ActionCard padding="10px 16px" mb="16px">
        <StakePanel {...farm} />
      </ActionCard>
    </Container>
  )
}

export default ActionPanel
