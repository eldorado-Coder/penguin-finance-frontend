import React from 'react'
import styled from 'styled-components'
import { Text, Flex } from 'penguinfinance-uikit2'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import Balance from 'components/Balance'
import { useClubPenguinFarms } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import Card from '../Card'

const RewardCard = () => {
  const { account } = useWeb3React()
  const clubFarms = useClubPenguinFarms(account)
  const activeFarm = clubFarms[0]
  const { userData } = activeFarm

  const earningBalance = userData ? getBalanceNumber(new BigNumber(userData.earnings)) : 0
  const stakedBalance = userData ? getBalanceNumber(new BigNumber(userData.stakedBalance)) : 0

  return (
    <StyledCard>
      <StyledFlex justifyContent="space-between">
        <InfoBlock>
          <InfoBlockTitle>
            <Text fontSize="18px" color="white" bold>
              Your Rewards
            </Text>
          </InfoBlockTitle>
          <InfoBlockContent justifyContent="space-between" alignItems="center">
            <LogoWrapper type="sherpa">
              <img src="/images/club/sherpa_without_text.png" alt="sherpa" />
            </LogoWrapper>
            <div>
              <StyledBalance fontSize="18px" color="#30264f" value={earningBalance} decimals={2} />
              <Text bold fontSize="20px" color="secondary" textAlign="right">
                SHERPA
              </Text>
            </div>
          </InfoBlockContent>
        </InfoBlock>
        <InfoBlock>
          <InfoBlockTitle>
            <Text fontSize="18px" color="white" bold>
              Your Stake
            </Text>
          </InfoBlockTitle>
          <InfoBlockContent justifyContent="space-between" alignItems="center">
            <LogoWrapper>
              <img src="/images/club/ipefi.svg" alt="sherpa" />
            </LogoWrapper>
            <div>
              <StyledBalance fontSize="18px" color="#30264f" value={stakedBalance} decimals={2} />
              <Text bold fontSize="20px" color="secondary" textAlign="right">
                iPEFI
              </Text>
            </div>
          </InfoBlockContent>
        </InfoBlock>
      </StyledFlex>
    </StyledCard>
  )
}

const StyledCard = styled(Card)`
  border-radius: 8px;
  margin-top: 16px;
  width: 100%;
  padding: 16px;
  box-shadow: 0px 1px 6px rgb(0 0 0 / 16%);
  background-color: ${({ theme }) => theme.colors.red};
`
const StyledFlex = styled(Flex)`
  gap: 10px;
`

const InfoBlock = styled.div`
  width: 100%;
`

const InfoBlockTitle = styled.div``

const InfoBlockContent = styled(Flex)`
  margin-top: 4px;
  background: white;
  border-radius: 8px;
  padding: 16px;
`

const LogoWrapper = styled(Flex)<{ type?: string }>`
  img {
    height: 70px;
  }
`

const StyledBalance = styled(Balance)``

export default RewardCard
