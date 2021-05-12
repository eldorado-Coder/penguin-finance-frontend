import React from 'react'
import styled from 'styled-components'
import { Text, Flex } from 'penguinfinance-uikit2'
import useI18n from 'hooks/useI18n'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { useEmperor, useDonations } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import SvgIcon from 'components/SvgIcon'
import { UnlockButton as Button, Title, Caption, CardBlockHeader, CardBlock as Block } from '../UI'
import { getPenguinColor, getKingPenguin, getNormalPenguin } from '../utils'

const CardBlock = styled(Block)`
  margin-top: -100px;

  @media (min-width: 1200px) and (max-height: 800px) {
    margin-top: -120px;
  }
`

const TitleBgWrapper = styled.div<{ color: string }>`
  z-index: -1;
  width: 100%;
  text-align: center;
  position: absolute;
  margin-top: -10%;

  svg {
    #Banner-Avatar {
      path {
        fill: ${({ color }) => `#${color}`};
      }
    }
  }

  transform: scale(3);
  @media (min-width: 640px) {
    transform: scale(3);
  }
  @media (min-width: 768px) {
    transform: scale(2.8);
  }
  @media (min-width: 1200px) {
    transform: scale(2.6);
  }
  @media (min-width: 1200px) and (max-height: 800px) {
    transform: scale(2.8);
  }
`

const CardBlockContent = styled.div`
  background: ${(props) => props.theme.card.background};
  border-radius: 8px;
  padding: 24px;
  padding-bottom: 16px;
  position: relative;
  text-align: center;
  margin-top: 30%;
  min-width: 150px;
  padding: 16px 8px 8px;
  @media (min-width: 640px) {
    width: 100%;
    margin-top: 30%;
    padding: 24px 16px 12px;
  }
  @media (min-width: 768px) {
    width: 100%;
    border-radius: 8px;
    margin-top: 32%;
    padding: 24px 20px 16px;
  }
  @media (min-width: 1200px) {
    width: 100%;
    margin-top: 32%;
    padding: 28px 24px 16px;
  }
  @media (min-width: 1450px) {
    min-width: 240px;
    padding: 24px 24px 16px;
    margin-top: 35%;
  }
  @media (min-width: 1200px) and (max-height: 800px) {
    padding: 8px;
  }
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

const DonationText = styled(Caption)`
  white-space: nowrap;
  @media (min-width: 768px) {
    margin-right: 4px;
  }
`

const Donations = styled(Flex)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .exclamation {
    display: none;
  }
  @media (min-width: 640px) {
    flex-direction: column;
    .exclamation {
      display: none;
    }
  }
  @media (min-width: 1200px) {
    flex-direction: row;
    .exclamation {
      display: inline;
    }
  }
  @media (min-width: 1200px) and (max-height: 800px) {
    flex-direction: column;
    .exclamation {
      display: none;
    }
  }
`

const UnlockButton = styled(Button)`
  margin-top: 4px;
  @media (min-width: 640px) {
    margin-top: 4px;
  }
  @media (min-width: 768px) {
    margin-top: 16px;
  }
  @media (min-width: 1200px) {
    margin-top: 8px;
  }
`

const LatestDonation: React.FC = () => {
  const TranslateString = useI18n()
  const { account } = useWeb3React()
  const { myEmperor, currentEmperor } = useEmperor()
  const currentEmperorPenguin = getKingPenguin(currentEmperor)
  const myEmperorPenguin = getNormalPenguin(myEmperor)
  const donations = useDonations()

  const avaxDonations = getBalanceNumber(new BigNumber(donations.latestDonor.avaxDonations))

  return (
    <CardBlock>
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
            <Title bold color="primaryBright">
              {TranslateString(1074, donations.latestDonor.latestDonorName)}
            </Title>
            {avaxDonations > 0 ? (
              <Donations>
                <DonationText bold color="secondary">
                  Thank you for donating
                </DonationText>
                <DonationText bold color="primaryBright" fontSize="14px">
                  {avaxDonations.toFixed(avaxDonations > 1 ? 0 : 3)} AVAX
                </DonationText>
                <Text className="exclamation" bold color="secondary" fontSize="16px" lineHeight={1.2}>
                  !
                </Text>
              </Donations>
            ) : (
              <DonationText bold color="secondary">
                Thank you for donating
              </DonationText>
            )}
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
