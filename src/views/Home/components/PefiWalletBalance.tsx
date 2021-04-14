import React from 'react'
import { Text } from '@penguinfinance/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useTokenBalance from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getPefiAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePricePefiUsdt } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'

const PefiWalletBalance = () => {
  const TranslateString = useI18n()
  const pefiBalance = useTokenBalance(getPefiAddress())
  const usdtBalance = new BigNumber(getBalanceNumber(pefiBalance)).multipliedBy(usePricePefiUsdt()).toNumber()
  const { account } = useWallet()

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '54px' }}>
        {TranslateString(298, 'Locked')}
      </Text>
    )
  }

  return (
    <>
      <CardValue value={getBalanceNumber(pefiBalance)} decimals={4} fontSize="24px" lineHeight="36px" />
      <CardBusdValue value={usdtBalance} />
    </>
  )
}

export default PefiWalletBalance