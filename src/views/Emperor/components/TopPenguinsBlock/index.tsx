import React from 'react'
import styled from 'styled-components'
import { Text } from '@penguinfinance/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from 'components/UnlockButton'
import { useEmperor } from 'state/hooks'
import { getShortenNickName, formatTime } from 'utils/address'
import SvgIcon from 'components/SvgIcon'

const CardBlock = styled.div`
`

const CardBlockHeader = styled.div`
  position: relative;  
  display: flex;
  justify-content: center;
  z-index: 1;
  padding: 16px;
`

const TitleBgWrapper = styled.div<{ color: string }>`
  z-index: -1;
  width: 100%;
  text-align: center;

  svg {
    #Layer_4 {
      #Color_1 {
        path {
          fill: ${({ color }) => `#${color}`};
        }
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
    >g {
      >path:first-child {
        fill: black;
      }
      #Color_1 {
        path {
          fill: ${({ color }) => `#${color}`};
          opacity: 0.6;
        }
      } 
      #Color_2 {
        path {
          fill: ${({ color }) => `#${color}`};
        }
      }      
    }
  }
`

const TopPenguinsBlock: React.FC = () => {
  const { account } = useWallet()
  const { currentEmperor, topEmperors } = useEmperor()
  const headerColor: string = topEmperors.length > 0 ? topEmperors[0].color : currentEmperor.color;

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
        {!account && <UnlockButton />}
        {account && topEmperors &&
          topEmperors.map((topEmperor, index) => {
            return (
              <EmperorRow key={topEmperor.lastCrowningBlockTimestamp}>
                <NumberField>
                  <Text color="secondary" fontSize="12px">
                    {`#${index + 1}`}
                  </Text>
                </NumberField>
                <TimeField>
                  <Text color="secondary" fontSize="12px">
                    {formatTime(topEmperor.timeAsEmperor)}
                  </Text>
                </TimeField>
                <AddressField>
                  <Text color="secondary" fontSize="12px">
                    {getShortenNickName(topEmperor.nickname)}
                  </Text>
                </AddressField>
                <AvatarField color={topEmperor.color}>
                  <SvgIcon
                    src={`${process.env.PUBLIC_URL}/images/emperor/penguin_red.svg`}
                    width="30px"
                    height="30px"
                  />
                </AvatarField>
              </EmperorRow>
            )
          })}
      </CardBlockContent>
    </CardBlock>

  )
}


export default TopPenguinsBlock
