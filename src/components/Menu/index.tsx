import React, { useContext } from 'react'
import { Menu as UikitMenu } from 'penguinfinance-uikit2'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import { allLanguages } from 'config/localisation/languageCodes'
import { LanguageContext } from 'contexts/Localisation/languageContext'
import useTheme from 'hooks/useTheme'
import { usePricePefiUsdt, useProfile, usePools } from 'state/hooks'
import config from './config'

const socials = [
  {
    label: "Discord",
    icon: "DiscordIcon",
    href: "https://discord.gg/R5Rv68GXXc",
  },
  {
    label: 'Telegram',
    icon: "TelegramIcon",
    href: "https://t.me/penguin_defi"
  },
  {
    label: "Twitter",
    icon: "TwitterIcon",
    href: "https://twitter.com/penguin_defi",
  },
];

const Menu = (props) => {
  const { account, connect, reset } = useWallet()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const pefiPriceUsd = usePricePefiUsdt()
  const { profile } = useProfile()
  const pools = usePools(account)
  const pefiPool = pools.length > 0 ? pools[0] : null

  const getXPefiToPefiRatio = (pool) => {
    return pool.totalStaked && pool.totalSupply ? new BigNumber(pool.totalStaked).div(new BigNumber(pool.totalSupply)).toJSON() : 1
  }

  const xPefiToPefiRatio = getXPefiToPefiRatio(pefiPool);

  return (
    <UikitMenu
      account={account}
      login={connect}
      logout={reset}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage && selectedLanguage.code}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      penguinPriceUsd={pefiPriceUsd.toNumber()}
      pefiRatio={Number(xPefiToPefiRatio)}
      links={config}
      socials={socials}
      // profile={{
      //   username: profile?.username,
      //   image: profile?.nft ? `/images/nfts/${profile.nft?.images.sm}` : undefined,
      //   profileLink: '/profile',
      //   noProfileLink: '/profile',
      //   showPip: !profile?.username,
      // }}
      {...props}
    />
  )
}

export default Menu
