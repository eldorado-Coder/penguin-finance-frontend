import React from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Text, Flex } from 'penguinfinance-uikit2'
import BigNumber from 'bignumber.js'
import UnlockButton from 'components/UnlockButton'
import { useEmperor, useDonations } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import SvgIcon from 'components/SvgIcon'
import { getPenguinColor } from '../utils'

const CardBlock = styled.div<{ account: string }>`
  display: ${props => props.account && 'flex'};
  flex-direction: column;
  align-items: center;
`

const CardBlockHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  z-index: 1;
  padding: 16px;
  width: 100%;
`

const TitleBgWrapper = styled.div<{ color: string }>`
  z-index: -1;
  width: 100%;
  text-align: center;
  transform: scale(1.5);
  position: absolute;
  margin-top: 30%;

  svg {
    #Banner-Avatar {
      path {
        fill: ${({ color }) => `#${color}`};
      }
    }
  }
`

const CardBlockContent = styled.div<{ account: string }>`
  background: ${(props) => props.theme.card.background};
  border-radius: 16px;
  position: relative;
  padding: 24px;
  padding-bottom: 16px;
  position: relative;
  text-align: center;
  min-width: 240px;
  margin-top: ${props => props.account ? '57%' : '55%'};
`

const WalletContainer = styled.div`
  position: relative;
  z-index: 10;
`

const EmperorInfoContainer = styled.div`
  position: relative;
  z-index: 10;
`

const TopRaisedBlock: React.FC = () => {
  const { account } = useWeb3React()
  const { currentEmperor } = useEmperor();
  const donations = useDonations();

  const headerColor: string = getPenguinColor(currentEmperor).code;
  const totalAvaxRaised = getBalanceNumber(new BigNumber(donations.totalAvaxRaised));
  const totalPefiRaised = getBalanceNumber(new BigNumber(donations.totalPefiRaised));
  const pefiBurnt = getBalanceNumber(new BigNumber(donations.totalPefiRaised * 0.25));

  return (  
    <CardBlock account={account}>
      <CardBlockHeader>
        <TitleBgWrapper color={headerColor}>
          <SvgIcon
            src={`${process.env.PUBLIC_URL}/images/covid-emperor/banner/total_raised.svg`}
            width="100%"
            height="20px"
          />
        </TitleBgWrapper>
      </CardBlockHeader>
      <CardBlockContent account={account} >
        {!account && (
          <WalletContainer>
            <UnlockButton />
          </WalletContainer>
        )}
        {account && donations && (
          <EmperorInfoContainer>
            <Flex justifyContent='space-between'>
              <Text bold color='secondary' fontSize="18px">AVAX</Text>
              <Text bold color="primaryBright" fontSize="18px">{totalAvaxRaised.toFixed((!totalAvaxRaised || totalAvaxRaised > 1) ? 0 : 3)}</Text>
            </Flex>
            <Flex justifyContent='space-between'>
              <Text bold color='secondary' fontSize="18px">PEFI</Text>
              <Text bold color="primaryBright" fontSize="18px">{totalPefiRaised.toFixed((!totalPefiRaised || totalPefiRaised > 1) ? 0 : 3)}</Text>
            </Flex>
            <Flex justifyContent='space-between' mt='8px'>
              <Text bold color='secondary' fontSize="14px">PEFI Burnt</Text>
              <Text bold color="primaryBright" fontSize="14px">{pefiBurnt.toFixed((!pefiBurnt || pefiBurnt > 1) ? 0 : 3)}</Text>
            </Flex>
          </EmperorInfoContainer>
        )}
      </CardBlockContent>
    </CardBlock>
  )
}

export default TopRaisedBlock
