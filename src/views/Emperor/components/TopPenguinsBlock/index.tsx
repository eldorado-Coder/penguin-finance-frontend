import React from 'react'
import styled from 'styled-components'
import { Modal, Text, LinkExternal, Flex } from '@penguinfinance/uikit'
import useI18n from 'hooks/useI18n'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from 'components/UnlockButton'
import { useEmperor } from 'state/hooks'
import { getShortenAddress, formatTime } from 'utils/address'

const CardBlock = styled.div`
  
`

const CardBlockHeader = styled.div`
  position: relative;  
  display: flex;
  justify-content: center;
  z-index: 1;
  padding: 16px;
`

const TitleBgWrapper = styled.div`
  z-index: -1;
  width: 100%;
  text-align: center;
`

const TitleImage = styled.img`
  z-index: -1;
`

const TitleAvatarWrapper = styled.div`
  text-align: center;
  position: absolute;
  top: 29px;
`
const TitleAvatar = styled.img`
  width: 80px;
`

const CardBlockContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 16px;
  position: relative;
  margin-top: -44px;
  text-align:center;
`

const EmperorRow = styled.div`
  padding: 12px 0px;
  border-top: 1px solid blue;
  display: flex;
  &:last-child {
    border-bottom: none;
  }
  /* position: relative;
  margin-top: -44px;
  text-align:center; */
`

const NumberField = styled.div`
  width: 10%;
  margin-right: 10px;
`

const TimeField = styled.div`
  width: 35%;
  padding-right: 10px;
  text-align: center;
`

const AddressField = styled.div`
  width: 35%;
  padding-right: 10px;
  text-align: center;
`

const AvatarField = styled.div`
  width: 20%;
  overflow: hidden;
`

const TopPenguinsBlock: React.FC = () => {
  const TranslateString = useI18n()
  const { account } = useWallet()
  const { topEmperors } = useEmperor()


  // console.log('999--->', topEmperors)


  return (
    <CardBlock>
      <CardBlockHeader>
        <TitleBgWrapper>
          <TitleImage
            src={
              `${process.env.PUBLIC_URL}/images/emperor/top_penguins_banner.svg`
            }
            alt="title banner"
          />
        </TitleBgWrapper>
        <TitleAvatarWrapper>
          <TitleAvatar
            src={
              `${process.env.PUBLIC_URL}/images/emperor/penguin_red.svg`
            }
            alt="title banner"
          />
        </TitleAvatarWrapper>
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
                    {getShortenAddress(topEmperor.address)}
                  </Text>
                </AddressField>
                <AvatarField>
                  {getShortenAddress(topEmperor.address)}
                </AvatarField>
              </EmperorRow>
            )
          })}
      </CardBlockContent>
    </CardBlock>

  )
}



export default TopPenguinsBlock
