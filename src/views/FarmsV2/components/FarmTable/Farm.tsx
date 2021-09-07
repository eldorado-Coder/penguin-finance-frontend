import React from 'react'
import styled from 'styled-components'
import { Text, Image, Tag, Flex, useMatchBreakpoints } from 'penguinfinance-uikit2'
import { getBalanceNumber } from 'utils/formatBalance'
import { useFarmUser } from 'state/hooks'
import { FarmCardProps } from '../types'

const Container = styled.div`
  padding-left: 16px;
  display: flex;
  align-items: center;

  img {
    position: unset;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 32px;
  }
`

const FarmLabel = styled(Text)`
  color: ${({ theme }) => theme.colors.textSubtle};
  white-space: nowrap;
`

const FarmLabelWrapper = styled.div`
  margin-left: 16px;
`

const StyledTag = styled(Tag)`
  background: transparent;
  border-color: ${({ theme }) => theme.colors.red};
  border-width: 1px;
  height: 20px;

  div {
    color: ${({ theme }) => theme.colors.red};
    font-weight: 500;
  }
`

const MultiplierTag = styled(Tag)`
  height: 20px;
  margin-right: 4px;
  font-size: 12px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.red};
  border-color: ${({ theme }) => theme.colors.red};
  color: white;
`
const LpTag = styled(Tag)<{ type?: string }>`
  height: 20px;
  margin-right: 4px;
  background-color: ${({ type }) => type === 'Pangolin' && '#f97316'};
  background-color: ${({ type }) => type === 'Penguin' && '#FF4100'};
  background-color: ${({ type }) => type === 'Joe' && '#e3796f'};
  border-color: ${({ type }) => type === 'Pangolin' && '#f97316'};
  border-color: ${({ type }) => type === 'Penguin' && '#FF4100'};
  border-color: ${({ type }) => type === 'Joe' && '#e3796f'};
  color: white;
  font-size: 12px;
  border-radius: 8px;
`

const StyledImage = styled(Image)<{ isMobile?: boolean }>`
  width: 64px;
  height: 64px;
`

const Farm: React.FunctionComponent<FarmCardProps> = ({ farm }) => {
  const { stakedBalance } = useFarmUser(farm.pid, 'Penguin')
  const rawStakedBalance = getBalanceNumber(stakedBalance)
  const farmImage = farm.lpSymbol.split(' ')[0].toLocaleLowerCase()
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl

  const handleRenderFarming = (): JSX.Element => {
    if (rawStakedBalance) {
      return (
        <StyledTag variant="textSubtle">
          <FarmLabel fontSize="12px" bold textTransform="uppercase">
            Farming
          </FarmLabel>
        </StyledTag>
      )
    }

    return null
  }

  return (
    <Container>
      <StyledImage src={`/images/farms/${farmImage}.svg`} alt={farm.tokenSymbol} width={64} height={64} />
      <FarmLabelWrapper>
        <Flex>
          <FarmLabel bold>{farm.lpSymbol.replace(' LP', '')}</FarmLabel>
        </Flex>
        <Flex mt="4px">
          <MultiplierTag variant="primary">{`${farm.multiplier || 1}X`}</MultiplierTag>
          <LpTag type={farm.type}>{farm.type}</LpTag>
          {handleRenderFarming()}
        </Flex>
      </FarmLabelWrapper>
    </Container>
  )
}

export default Farm
