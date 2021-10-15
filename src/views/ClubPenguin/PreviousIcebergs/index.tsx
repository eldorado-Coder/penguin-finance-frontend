import React, { useState } from 'react'
import styled from 'styled-components'
import { Text, Flex, Image, Tag, VerifiedIcon, Button } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { useClubPenguinFarms } from 'state/hooks'
import FlexLayout from 'components/layout/Flex'
import UnlockButton from 'components/UnlockButton'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { Icebergs } from './Icebergs'
import { useClubPenguinUnstake } from '../hooks'

const PreviousIcebergs = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { onUnstake } = useClubPenguinUnstake(0)
  const { account } = useWeb3React()
  const clubFarms = useClubPenguinFarms(account)
  const activeFarm = clubFarms[0]
  const { userData } = activeFarm
  const stakedBalance = userData ? getFullDisplayBalance(new BigNumber(userData.stakedBalance)) : '0'

  const handleLearnMore = (url: string) => {
    window.open(url, '_blank')
  }

  const handleUnstake = async () => {
    setPendingTx(true)
    try {
      await onUnstake(stakedBalance)
      setPendingTx(false)
    } catch (error) {
      setPendingTx(false)
    }
  }

  const canUnStake = !pendingTx && Number(stakedBalance) > 0

  return (
    <>
      <Label fontSize="24px" mt="32px" mb="16px" fontWeight={600}>
        Previous Icebergs
      </Label>
      <StyledFlexLayout>
        {Icebergs.map((iceberg) => {
          return (
            <FCard key={iceberg.title}>
              <Flex justifyContent="space-between" alignItems="center" mb="16px">
                <Image src={`/images/club/${iceberg.logo}`} alt={iceberg.title} width={96} height={96} />
                <Flex flexDirection="column" alignItems="flex-end">
                  <Text fontSize="22px" bold>
                    {iceberg.title}
                  </Text>
                  <Flex>
                    {/* {iceberg.coreTag && (
                      <IcebergTag variant="primary" outline startIcon={<VerifiedIcon />}>
                        {iceberg.coreTag}
                      </IcebergTag>
                    )} */}
                    <IcebergTag variant="primary">{iceberg.tag}</IcebergTag>
                  </Flex>
                </Flex>
              </Flex>
              <Flex justifyContent="space-between">
                <Text fontSize="18px" fontWeight={400}>
                  To Distribute:
                </Text>
                <Text fontSize="18px" fontWeight={400}>
                  {`${iceberg.toDistribute} ${iceberg.tokenSymbol}`}
                </Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text fontSize="18px" fontWeight={400}>
                  End Date:
                </Text>
                <Text fontSize="18px" fontWeight={400}>
                  {iceberg.endDate}
                </Text>
              </Flex>
              <Description mt="16px" mb="16px" textAlign="left" fontWeight={400}>
                {iceberg.description}
              </Description>
              <StyledFlex justifyContent="space-between">
                {account ? (
                  <StyledButton color="red" disabled={!canUnStake} onClick={handleUnstake}>
                    {pendingTx ? 'Pending ...' : 'Unstake iPEFI'}
                  </StyledButton>
                ) : (
                  <StyledUnlockButton />
                )}

                <StyledButton color="red" onClick={() => handleLearnMore(iceberg.url)}>
                  Learn More
                </StyledButton>
              </StyledFlex>
            </FCard>
          )
        })}
      </StyledFlexLayout>
    </>
  )
}

const FCard = styled.div`
  align-self: baseline;
  background: ${(props) => props.theme.card.background};
  border-radius: 26px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
  position: relative;
  text-align: center;
`

const IcebergTag = styled(Tag)<{ outline?: boolean }>`
  margin-left: 4px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 300;
  height: 32px;
  line-height: 1;
  background: ${({ outline }) => !outline && '#f24e4d'};
  background: ${({ theme, outline }) => theme.isDark && !outline && '#d4444c'};
  color: ${({ theme }) => theme.isDark && 'white'};
  border-color: ${({ theme }) => theme.isDark && '#d4444c'};
`

const StyledButton = styled(Button)`
  border-radius: 8px;
  background-color: ${({ theme }) => (theme.isDark ? '#614e83' : '#f24e4d')};
  color: white;
  height: 44px;
  font-weight: 700;
  box-shadow: none;
`

const StyledUnlockButton = styled(UnlockButton)`
  border-radius: 8px;
  background-color: ${({ theme }) => (theme.isDark ? '#614e83' : '#f24e4d')};
  color: white;
  height: 44px;
  font-weight: 700;
  box-shadow: none;
`

const StyledFlexLayout = styled(FlexLayout)`
  margin-left: -8px;
  margin-right: -8px;
  justify-content: space-between;

  @media (min-width: 640px) {
    margin-left: -16px;
    margin-right: -16px;
  }
`

const StyledFlex = styled(Flex)`
  gap: 10px;
`

const Label = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? 'white' : theme.colors.red)};
`

const Description = styled(Text)`
  min-height: 96px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export default PreviousIcebergs
