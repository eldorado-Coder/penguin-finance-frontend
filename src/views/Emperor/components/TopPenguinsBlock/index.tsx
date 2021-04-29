import React from 'react'
import styled from 'styled-components'
import { Text } from '@penguinfinance/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from 'components/UnlockButton'
import { useEmperor } from 'state/hooks'
import { getShortenNickName, formatTime, badWordsFilter } from 'utils/address'
import SvgIcon from 'components/SvgIcon'
import { getPenguinColor } from '../utils'

const CardBlock = styled.div`
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
  padding: 16px;
  padding-top: 24px;
  position: relative;
  margin-top: -38px;
  text-align:center;
`

const WalletContainer = styled.div`
  position: relative;
  z-index: 10;
`

const EmperorInfoContainer = styled.div`
  position: relative;
  z-index: 10;
`

const EmperorRow = styled.div`
  padding: 12px 0px;
  border-top: 1px solid #42BCF5;
  display: flex;
  &:last-child {
    border-bottom: none;
  }
  /* position: relative;
  margin-top: -38px;
  text-align:center; */
`

const NumberField = styled.div`
  width: 10%;
  margin-right: 10px;
  align-items: center;
  display: flex;
  justify-content: center;
`

const TimeField = styled.div`
  width: 35%;
  padding-right: 10px;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
  >div {
    margin-right: 5px;
  }
`

const AddressField = styled.div`
  width: 35%;
  padding-right: 10px;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
`


const AvatarField = styled.div<{ color: string }>`
  width: 20%;
  overflow: hidden;
  align-items: center;
  display: flex;
  justify-content: center;
  svg {
    #Color_1_default {
      path {
        fill: ${({ color }) => `#${color}`};
      }
    }
  }
`

const TopPenguinsBlock: React.FC = () => {
  const { account } = useWallet()
  const { currentEmperor, topEmperors } = useEmperor()
  const _topEmperors = topEmperors.map((row, index) => {
    return { id: index, ...row }
  })

  const headerColor: string = topEmperors.length > 0 ? getPenguinColor(topEmperors[0]).code : getPenguinColor(currentEmperor).code;

  return (
    <CardBlock>
      <CardBlockHeader>
        <TitleBgWrapper color={headerColor}>
          <SvgIcon
            src={
              account
                ? `${process.env.PUBLIC_URL}/images/emperor/banner/top_penguins_banner_unlocked.svg`
                : `${process.env.PUBLIC_URL}/images/emperor/banner/top_penguins_banner_locked.svg`
            }
            width="100%"
          />
        </TitleBgWrapper>
      </CardBlockHeader>
      <CardBlockContent>
        {!account && (
          <WalletContainer>
            <UnlockButton />
          </WalletContainer>
        )
        }
        {account && topEmperors && (
          <EmperorInfoContainer>
            {_topEmperors.map((topEmperor, index) => {
              return (
                <EmperorRow key={topEmperor.id}>
                  <NumberField>
                    <Text color="secondary" fontSize="12px">
                      {`#${index + 1}`}
                    </Text>
                  </NumberField>
                  <TimeField>
                    <Text color="secondary" fontSize="12px">
                      {formatTime(topEmperor.timeAsEmperor)}
                    </Text>
                    <Text bold color="primary" fontSize="12px">
                      min
                    </Text>
                  </TimeField>
                  <AddressField>
                    <Text color="secondary" fontSize="12px">
                      {getShortenNickName(badWordsFilter(topEmperor.nickname))}
                    </Text>
                  </AddressField>
                  <AvatarField color={getPenguinColor(topEmperor).code}>
                    <SvgIcon
                      src={`${process.env.PUBLIC_URL}/images/emperor/penguin_red.svg`}
                      width="30px"
                      height="30px"
                    />
                  </AvatarField>
                </EmperorRow>
              )
            })}
          </EmperorInfoContainer>
        )}
      </CardBlockContent>
    </CardBlock>

  )
}


export default TopPenguinsBlock
