import React from 'react'
import { Text } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import useAllEarnings from 'hooks/useAllEarnings'
import { usePricePefiUsdt } from 'state/hooks'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'

const Block = styled.div`
  margin-bottom: 0px;
`

const PefiHarvestBalance = () => {
  const TranslateString = useI18n()
  const { account } = useWeb3React()
  const allEarnings = useAllEarnings()
  const earningsSum = allEarnings.reduce((accum, earning) => {
    return accum + new BigNumber(earning).div(new BigNumber(10).pow(18)).toNumber()
  }, 0)
  const earningsBusd = new BigNumber(earningsSum).multipliedBy(usePricePefiUsdt()).toNumber()

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '32px' }}>
        {TranslateString(298, 'Locked')}
      </Text>
    )
  }

  return (
    <Block>
      <CardValue fontSize="32px" value={earningsSum} lineHeight="1.2" decimals={2} />
      <CardBusdValue value={earningsBusd} />
    </Block>
  )
}

export default PefiHarvestBalance
