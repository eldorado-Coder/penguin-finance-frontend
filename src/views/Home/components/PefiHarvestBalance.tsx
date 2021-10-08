import React from 'react'
import { Text } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import CardValue from './CardValue'

interface PefiHarvestBalanceProps {
  value?: number
  detailedValue?: string
}

const PefiHarvestBalance: React.FC<PefiHarvestBalanceProps> = ({ value, detailedValue }) => {
  const TranslateString = useI18n()
  const { account } = useWeb3React()

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '32px' }}>
        {TranslateString(298, 'Locked')}
      </Text>
    )
  }

  return (
    <Block>
      <CardValue fontSize="32px" value={value} lineHeight="1.2" decimals={2} prefix="$" />
      <DetailedValue fontSize="12px" style={{ lineHeight: '12px' }}>
        {detailedValue}
      </DetailedValue>
    </Block>
  )
}

const Block = styled.div`
  margin-bottom: 0px;
`

const DetailedValue = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? 'white' : theme.colors.secondary)};
`

export default PefiHarvestBalance
