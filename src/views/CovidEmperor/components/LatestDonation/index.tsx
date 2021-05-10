import React from 'react'
import styled from 'styled-components'
import { Text, Flex } from 'penguinfinance-uikit2'
import useI18n from 'hooks/useI18n'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import UnlockButton from 'components/UnlockButton'
import { useEmperor, useDonations } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { getShortenAddress, badWordsFilter } from 'utils/address'
import SvgIcon from 'components/SvgIcon'
import { getPenguinColor, getKingPenguin, getNormalPenguin } from '../utils'

const CardBlock = styled.div<{ account: string }>`
  display: ${props => props.account && 'flex'};
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
`

const CardBlockHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  z-index: 1;
  padding: 16px;
  margin-bottom: -120px;
  margin-top: -80px;
  min-height: 314px;
`

const TitleBgWrapper = styled.div<{ color: string }>`
  z-index: -1;
  width: 100%;
  text-align: center;
  transform: scale(2.6);

  svg {
    #Banner-Avatar {
      path {
        fill: ${({ color }) => `#${color}`};
      }
    }
  }
`

const CardBlockContent = styled.div`
  background: ${(props) => props.theme.card.background};
  border-radius: 16px;
  padding: 24px;
  padding-bottom: 16px;
  position: relative;
  margin-top: -275px;
  text-align: center;
`

const WalletContainer = styled.div`
  position: relative;
  z-index: 10;
`

const EmperorInfoContainer = styled.div`
  position: relative;
  z-index: 10;
`

const KingPenguinImageWrapper = styled.div`
  z-index: -1;
  position: absolute;
  width: 12.5%;
  left: 44%;
  bottom: 33%;
`

const MyPenguinImageWrapper = styled.div`
  position: absolute;
  width: 9.5%;
  right: 26%;
  bottom: 17%;

  svg {
    transform: scaleX(-1);
  }
`

const DonationText = styled(Text)`
  margin-left: 2px;
`;

const LatestDonation: React.FC = () => {
  const TranslateString = useI18n()
  const { account } = useWeb3React()
  const { myEmperor, currentEmperor } = useEmperor()
  const currentEmperorAddress = currentEmperor && currentEmperor.address
  const currentEmperorNickname = currentEmperor && badWordsFilter(currentEmperor.nickname)
  const currentEmperorBidAmount = (currentEmperor && currentEmperor.bidAmount) || 0
  const currentEmperorPenguin = getKingPenguin(currentEmperor)
  const myEmperorPenguin = getNormalPenguin(myEmperor)
  const donations = useDonations();

  return (
    <CardBlock account={account}>
      <CardBlockHeader>
        <TitleBgWrapper color={getPenguinColor(currentEmperor).code}>
          <SvgIcon
            src={`${process.env.PUBLIC_URL}/images/covid-emperor/banner/penguin_without_borders.svg`}
            width="100%"
            height="20px"
          />
        </TitleBgWrapper>
      </CardBlockHeader>
      <CardBlockContent>
        {!account && (
          <WalletContainer>
            <UnlockButton />
          </WalletContainer>
        )}
        {account && (
          <EmperorInfoContainer>
            <Text bold color="primaryBright" fontSize="22px">
              {TranslateString(1074, donations.latestDonor.latestDonorName)}
            </Text>
            <Flex justifyContent='center'>
              <Text bold color="secondary" fontSize="14px">Thank you for donating</Text>
              <DonationText bold color="primaryBright" fontSize="14px">{getBalanceNumber(new BigNumber(donations.latestDonor.avaxDonations)).toFixed(2)} AVAX</DonationText>
              <Text bold color="secondary" fontSize="14px">!</Text>
            </Flex>
          </EmperorInfoContainer>
        )}
      </CardBlockContent>
      <KingPenguinImageWrapper>
        <SvgIcon
          src={`${process.env.PUBLIC_URL}/images/emperor/penguins/${currentEmperorPenguin}_${
            getPenguinColor(currentEmperor).name
          }.svg`}
          width="100%"
          height="20px"
        />
      </KingPenguinImageWrapper>
      {currentEmperor.address && myEmperor.address && currentEmperor.address !== myEmperor.address && (
        <MyPenguinImageWrapper>
          <SvgIcon
            src={`${process.env.PUBLIC_URL}/images/emperor/penguins/${myEmperorPenguin}_${
              getPenguinColor(myEmperor).name
            }.svg`}
            width="100%"
            height="20px"
          />
        </MyPenguinImageWrapper>
      )}
    </CardBlock>
  )
}

export default LatestDonation
