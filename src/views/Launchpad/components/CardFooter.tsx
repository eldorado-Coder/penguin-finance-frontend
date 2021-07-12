import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { Text, Flex } from 'penguinfinance-uikit2'
import useI18n from 'hooks/useI18n'
import { ChevronDown, ChevronUp } from 'react-feather'
import Balance from 'components/Balance'
import { CommunityTag, CoreTag, BinanceTag } from 'components/Tags'
import { PoolCategory } from 'config/constants/types'
import { usePricePefiUsdt } from 'state/hooks'

const tags = {
  [PoolCategory.BINANCE]: BinanceTag,
  [PoolCategory.CORE]: CoreTag,
  [PoolCategory.COMMUNITY]: CommunityTag,
}

interface Props {
  penguinNestsGuideLink: string
  totalPefiStaked: BigNumber
  totalXPefiBalance: BigNumber
  blocksRemaining: number
  isFinished: boolean
  blocksUntilStart: number
  poolCategory: PoolCategory
}

const StyledFooter = styled.div<{ isFinished: boolean }>`
  border-top: 1px solid ${({ theme }) => (theme.isDark ? '#524B63' : '#E9EAEB')};
  color: ${({ isFinished, theme }) => theme.colors[isFinished ? 'textDisabled2' : 'primary2']};
  padding: 16px 32px;
`

const StyledDetailsButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: 0;
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  display: inline-flex;
  font-size: 16px;
  font-weight: 600;
  height: 32px;
  justify-content: center;
  outline: 0;
  padding: 0;
  &:hover {
    opacity: 0.9;
  }

  & > svg {
    margin-left: 4px;
  }
`

const Details = styled.div`
  margin-top: 24px;
`

const Row = styled.div`
  align-items: center;
  display: flex;
`

const FlexFull = styled.div`
  flex: 1;
`
const Label = styled.div`
  font-size: 14px;
`
const TokenLink = styled.a`
  font-size: 14px;
  text-decoration: none;
  color: #12aab5;
`

const CardFooter: React.FC<Props> = ({
  penguinNestsGuideLink,
  totalPefiStaked,
  totalXPefiBalance,
  blocksRemaining,
  isFinished,
  blocksUntilStart,
  poolCategory,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const TranslateString = useI18n()
  const pefiPrice = usePricePefiUsdt()

  const Icon = isOpen ? ChevronUp : ChevronDown

  const handleClick = () => setIsOpen(!isOpen)
  const Tag = tags[poolCategory]

  // calculate TVL in pefi nest
  const getNestTVL = () => {
    if (totalPefiStaked) return pefiPrice.toNumber() * getBalanceNumber(totalPefiStaked)
    return 0
  }

  return (
    <StyledFooter isFinished={isFinished}>
      <Flex justifyContent='center'>
        {/* <FlexFull>
          <Tag />
        </FlexFull> */}
        <StyledDetailsButton onClick={handleClick}>
          {isOpen ? TranslateString(1066, 'Hide') : TranslateString(658, 'Show more info')} <Icon />
        </StyledDetailsButton>
      </Flex>
      {isOpen && (
        <Details>
          <Row style={{ marginBottom: '4px' }}>
            <FlexFull>
              <Label>
                <Text color="primary" fontSize="14px">
                  {TranslateString(408, 'Total Liquidity')}
                </Text>
              </Label>
            </FlexFull>
            <Balance fontSize="14px" isDisabled={isFinished} value={getNestTVL()} />
          </Row>
          <Row style={{ marginBottom: '4px' }}>
            <FlexFull>
              <Label>
                <Text color="primary" fontSize="14px">
                  {TranslateString(408, 'Total Supply(xPEFI)')}
                </Text>
              </Label>
            </FlexFull>
            <Balance fontSize="14px" isDisabled={isFinished} value={getBalanceNumber(totalXPefiBalance)} />
          </Row>
          {blocksUntilStart > 0 && (
            <Row>
              <FlexFull>
                <Label>{TranslateString(410, 'Start')}:</Label>
              </FlexFull>
              <Balance fontSize="14px" isDisabled={isFinished} value={blocksUntilStart} decimals={0} />
            </Row>
          )}
          {blocksUntilStart === 0 && blocksRemaining > 0 && (
            <Row>
              <FlexFull>
                <Label>{TranslateString(410, 'End')}:</Label>
              </FlexFull>
              <Balance fontSize="14px" isDisabled={isFinished} value={blocksRemaining} decimals={0} />
            </Row>
          )}
          <TokenLink href={penguinNestsGuideLink} target="_blank">
            <Text color="primary" fontSize="14px">
              {TranslateString(412, 'Learn more about xPEFI')}
            </Text>
          </TokenLink>
        </Details>
      )}
    </StyledFooter>
  )
}

export default React.memo(CardFooter)
