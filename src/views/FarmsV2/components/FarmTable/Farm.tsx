import React from 'react'
import styled from 'styled-components'
import { Text, Image, Tag, useMatchBreakpoints } from 'penguinfinance-uikit2'
import { getBalanceNumber } from 'utils/formatBalance'
import { useFarmUser } from 'state/hooks'
import { FarmCardProps } from '../types';

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
`;

const FarmLabelWrapper = styled.div`
  margin-left: 16px;
`;

const StyledTag = styled(Tag)`
  background: transparent;
  border-color: ${({ theme }) => theme.colors.red};
  border-width: 1px;
  height: 20px;
  margin-top: 4px;

  div {
    color: ${({ theme }) => theme.colors.red};
    font-weight: 500;
  }
`;

const Farm: React.FunctionComponent<FarmCardProps> = ({ farm }) => {
  const { stakedBalance } = useFarmUser(farm.pid, 'Penguin');
  const rawStakedBalance = getBalanceNumber(stakedBalance)
  const farmImage = farm.lpSymbol.split(' ')[0].toLocaleLowerCase()
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl

  const handleRenderFarming = (): JSX.Element => {
    if (rawStakedBalance) {
      return (
        <StyledTag variant='textSubtle'>
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
      <Image src={`/images/farms/${farmImage}.svg`} alt={farm.tokenSymbol} width={isMobile ? 24 : 64} height={isMobile ? 24 : 64} />
      <FarmLabelWrapper>
        <FarmLabel bold>{farm.lpSymbol}</FarmLabel>
        {handleRenderFarming()}
      </FarmLabelWrapper>
    </Container>
  )
}

export default Farm
