import React from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Text, Flex } from 'penguinfinance-uikit2'
import BigNumber from 'bignumber.js'
import UnlockButton from 'components/UnlockButton'
import { useEmperor, useDonations } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { getShortenNickName, formatTime, badWordsFilter } from 'utils/address'
import SvgIcon from 'components/SvgIcon'
import { getPenguinColor } from '../utils'

const CardBlock = styled.div<{ account: string }>`
  display: ${props => props.account && 'flex'};
  flex-direction: column;
  align-items: center;
  margin-top: 200px;
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
  transform: scale(1.8);

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
  position: relative;
  padding: 24px;
  padding-bottom: 16px;
  position: relative;
  text-align: center;
  min-width: 240px;
  margin-top: -250px;
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
  const { currentEmperor, topEmperors } = useEmperor()
  const _topEmperors = topEmperors.map((row, index) => {
    return { id: index, ...row }
  })
  const donations = useDonations();

  const headerColor: string =
    topEmperors.length > 0 ? getPenguinColor(topEmperors[0]).code : getPenguinColor(currentEmperor).code
  
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
      <CardBlockContent>
        {!account && (
          <WalletContainer>
            <UnlockButton />
          </WalletContainer>
        )}
        {account && topEmperors && (
          <EmperorInfoContainer>
            <Flex justifyContent='space-between'>
              <Text bold color='secondary' fontSize="18px">AVAX</Text>
              <Text bold color="primaryBright" fontSize="18px">{getBalanceNumber(new BigNumber(donations.totalAvaxRaised))}</Text>
            </Flex>
            <Flex justifyContent='space-between'>
              <Text bold color='secondary' fontSize="18px">PEFI</Text>
              <Text bold color="primaryBright" fontSize="18px">{getBalanceNumber(new BigNumber(donations.totalPefiRaised))}</Text>
            </Flex>
            <Flex justifyContent='space-between' mt='8px'>
              <Text bold color='secondary' fontSize="14px">PEFI Burnt</Text>
              <Text bold color="primaryBright" fontSize="14px">{getBalanceNumber(new BigNumber(donations.totalPefiRaised * 0.25))}</Text>
            </Flex>
          </EmperorInfoContainer>
        )}
      </CardBlockContent>
    </CardBlock>
  )
}

export default TopRaisedBlock
