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
            <Text fontSize="20px" color="white">
              Your Rewards
            </Text>
          </InfoBlockTitle>
          <InfoBlockContent justifyContent="space-between" alignItems="center">
            <LogoWrapper type="sherpa">
              <img src="/images/club/sherpa_without_text.png" alt="sherpa" />
            </LogoWrapper>
            <BalanceWrapper flexDirection="column" alignItems="center">
              <StyledBalance fontWeight="400" fontSize="24px" color="#30264f" value={earningBalance} decimals={2} />
              <StyledText lineHeight={1} fontWeight="400" fontSize="28px" color="secondary" textAlign="right">
                SHERPA
              </StyledText>
            </BalanceWrapper>
          </InfoBlockContent>
        </InfoBlock>
        <InfoBlock>
          <InfoBlockTitle>
            <Text fontSize="20px" color="white">
              Your Stake
            </Text>
          </InfoBlockTitle>
          <InfoBlockContent justifyContent="space-between" alignItems="center">
            <LogoWrapper>
              <img src="/images/club/ipefi.svg" alt="sherpa" />
            </LogoWrapper>
            <BalanceWrapper flexDirection="column" alignItems="center">
              <StyledBalance fontWeight="400" fontSize="24px" color="#30264f" value={stakedBalance} decimals={2} />
              <StyledText lineHeight={1} fontWeight="400" fontSize="28px" color="secondary" textAlign="right">
                iPEFI
              </StyledText>
            </BalanceWrapper>
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
  padding: 8px 16px 16px;
  box-shadow: 0px 1px 6px rgb(0 0 0 / 16%);
  background-color: ${({ theme }) => theme.colors.red};
`
const StyledFlex = styled(Flex)`
  gap: 20px;
  flex-wrap: wrap;

  @media (min-width: 640px) {
    flex-wrap: nowrap;
  }
  @media (min-width: 1080px) {
    flex-wrap: wrap;
  }
  @media (min-width: 1200px) {
    flex-wrap: nowrap;
  }
`

const InfoBlock = styled.div`
  width: 100%;
`

const InfoBlockTitle = styled.div``

const InfoBlockContent = styled(Flex)`
  margin-top: 4px;
  background: white;
  border-radius: 20px;
  padding: 12px;
`

const LogoWrapper = styled(Flex)<{ type?: string }>`
  img {
    height: 72px;

    @media (min-width: 1200px) {
      height: 64px;
    }
    @media (min-width: 1450px) {
      height: 84px;
    }
  }
`

const StyledBalance = styled(Balance)`
  line-height: 1;
`

const StyledText = styled(Text)`
  font-size: 28px;

  @media (min-width: 1200px) {
    font-size: 24px;
  }
  @media (min-width: 1450px) {
    font-size: 28px;
  }
`

const BalanceWrapper = styled(Flex)`
  width: calc(100% - 84px);

  @media (min-width: 1200px) {
    width: calc(100% - 86px);
  }
  @media (min-width: 1450px) {
    width: calc(100% - 100px);
  }
`

export default RewardCard
