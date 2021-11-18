import React from 'react'
import styled from 'styled-components'
import { Text, Flex, Tag, Progress } from 'penguinfinance-uikit2'
import useTheme from 'hooks/useTheme'
import { usePriceAvaxUsdt } from 'state/hooks'

import SvgIcon from 'components/SvgIcon'
import Balance from 'components/Balance'

const IDOCard = ({ idoData }) => {
  const { isDark } = useTheme()
  const avaxPriceInUsd = usePriceAvaxUsdt().toNumber()

  return (
    <FCard>
      <Flex justifyContent="space-between" alignItems="center" mb="16px">
        <IdoLogo
          src={
            isDark
              ? `/images/launchpad-v2/logos/${idoData.darkLogo}`
              : `/images/launchpad-v2/logos/${idoData.whiteLogo}`
          }
          alt={idoData.title}
          height={36}
        />
        <IdoTag variant="primary" completed={idoData.isCompleted}>
          {idoData.isCompleted ? 'Completed' : 'Coming Soon'}
        </IdoTag>
      </Flex>
      <Flex flexDirection="column" alignItems="flex-start" mb="12px">
        {idoData.isCompleted && (
          <PriceText fontSize="12px" mb="8px">
            1 {idoData.tokenSymbol} = {`${(idoData.tokenPrice / avaxPriceInUsd).toFixed(5)} AVAX`}
          </PriceText>
        )}
        <DetailText fontSize="12px">Total Raised</DetailText>
        {idoData.isCompleted ? (
          <Flex>
            <Balance
              fontSize="20px"
              color="#C0378C"
              fontWeight="600"
              prefix="$"
              decimals={0}
              value={(Number(idoData.totalRaised) * Number(idoData.saleProgress)) / 100}
            />
            <Balance
              fontSize="20px"
              color="#C0378C"
              fontWeight="600"
              prefix=" / "
              decimals={0}
              value={Number(idoData.totalRaised)}
            />
          </Flex>
        ) : (
          <Text fontSize="20px" color="#C0378C" fontWeight={600}>
            ??? / ???
          </Text>
        )}
      </Flex>
      <Flex justifyContent="space-between" mb="18px">
        <Flex>
          <SvgIcon src={`${process.env.PUBLIC_URL}/images/launchpad-v2/icons/user.svg`} width="18px" height="18px" />
          <Flex flexDirection="column" alignItems="flex-start" ml="2px">
            <DetailText fontSize="11px">Participants</DetailText>
            <Text fontSize="14px" color="#C0378C" fontWeight={600}>
              {idoData.participants}
            </Text>
          </Flex>
        </Flex>
        <Flex>
          <SvgIcon
            src={`${process.env.PUBLIC_URL}/images/launchpad-v2/icons/calendar.svg`}
            width="18px"
            height="18px"
          />
          <Flex flexDirection="column" alignItems="flex-start" ml="2px">
            <DetailText fontSize="11px">Start Date</DetailText>
            <Text fontSize="14px" color="#C0378C" fontWeight={600}>
              {idoData.startDate}
            </Text>
          </Flex>
        </Flex>
        <Flex>
          <SvgIcon src={`${process.env.PUBLIC_URL}/images/launchpad-v2/icons/wallet.svg`} width="18px" height="18px" />
          <Flex flexDirection="column" alignItems="flex-start" ml="2px">
            <DetailText fontSize="11px">Token Price</DetailText>
            <Text fontSize="14px" color="#C0378C" fontWeight={600}>
              {idoData.tokenPrice > 0 ? `$ ${idoData.tokenPrice}` : '???'}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex>
        <DetailText fontSize="12px">Sale</DetailText>
      </Flex>
      <ProgressWrapper>
        <Progress primaryStep={idoData.saleProgress} />
      </ProgressWrapper>
      <Flex justifyContent="space-between" mt="18px" flexWrap="wrap">
        <Flex>
          <SvgIcon
            src={`${process.env.PUBLIC_URL}/images/launchpad-v2/icons/time-circle.svg`}
            width="18px"
            height="18px"
          />
          <Flex flexDirection="column" alignItems="flex-start" ml="2px" mt="2px">
            <DetailText fontSize="9px">Time Until Launch</DetailText>
            <Text fontSize="9px" color="#C0378C">
              {idoData.status}
            </Text>
          </Flex>
        </Flex>
        <Flex>
          <SvgIcon src={`${process.env.PUBLIC_URL}/images/launchpad-v2/icons/graph.svg`} width="18px" height="18px" />
          <Flex flexDirection="column" alignItems="flex-start" ml="4px" mt="2px">
            <Flex>
              <DetailText fontSize="9px">Tokens Sold:</DetailText>
              <Text fontSize="9px" color="#C0378C" ml="2px">
                {idoData.soldTokenAmount}
              </Text>
            </Flex>
            <Flex>
              <DetailText fontSize="9px">Tokens Distribution:</DetailText>
              <Text fontSize="9px" color="#C0378C" ml="2px">
                {idoData.distributedTokenAmount}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex>
          <SvgIcon src={`${process.env.PUBLIC_URL}/images/launchpad-v2/icons/scan.svg`} width="18px" height="18px" />
          <Flex ml="4px" mt="2px">
            <DetailText fontSize="9px" color="#6B6B6B">
              Sales Progress:
            </DetailText>
            <Text fontSize="9px" color="#C0378C" ml="2px">
              {`${idoData.saleProgress}%`}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </FCard>
  )
}

const FCard = styled.div`
  align-self: baseline;
  background: ${(props) => props.theme.card.background};
  border-radius: 16px;
  box-shadow: 4px 4px 32px rgba(165, 165, 165, 0.25);
  backdrop-filter: blur(38px);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 24px 20px;
  position: relative;
  text-align: center;

  svg {
    path {
      stroke: ${({ theme }) => (theme.isDark ? '#B8A7D9' : '#313131')};
    }
  }
`

const IdoTag = styled(Tag)<{ completed?: boolean }>`
  border-radius: 6px;
  background: ${({ completed }) => (completed ? '#F39FD7' : '#FFD6A6')};
  font-size: 12px;
  line-height: 18px;
  color: ${({ completed }) => (completed ? '#AD4289' : '#EB780F')};
  border: none;
  height: 22px;
`

const IdoLogo = styled.img`
  height: 36px;
`

const ProgressWrapper = styled.div`
  div {
    height: 18px;
    background: ${(props) => (props.theme.isDark ? '#B8A7D9' : '#DFDBE9')};
    div {
      border-radius: 28px;
      background: linear-gradient(269.03deg, #483692 17.37%, #e83789 122.39%);
    }
  }
`

const PriceText = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? '#F3F3F3' : '#808080')};
`

const DetailText = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? '#B8A7D9' : '#313131')};
`

export default IDOCard
