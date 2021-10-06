import React from 'react'
import { Text } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import useTokenBalance from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getPefiAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePricePefiUsdt } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'

const Block = styled.div`
  margin-bottom: 0px;
`

const PefiWalletBalance = () => {
  const TranslateString = useI18n()
  const pefiBalance = useTokenBalance(getPefiAddress())
  const usdtBalance = new BigNumber(getBalanceNumber(pefiBalance)).multipliedBy(usePricePefiUsdt()).toNumber()
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
      <CardValue fontSize="32px" value={getBalanceNumber(pefiBalance)} decimals={2} lineHeight="1.2" />
      <CardBusdValue value={usdtBalance} />
    </Block>
  )
}

export default PefiWalletBalance
