import React, { useContext } from 'react'
import { Menu as UikitMenu } from 'penguinfinance-uikit2'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import { allLanguages } from 'config/localisation/languageCodes'
import { LanguageContext } from 'contexts/Localisation/languageContext'
import useTheme from 'hooks/useTheme'
import { usePricePefiUsdt, useProfile, usePools } from 'state/hooks'
import { config, socials } from './config';

const Menu = (props) => {
  const { account, connect, reset } = useWallet()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const pefiPriceUsd = usePricePefiUsdt()
// <<<<<<< HEAD
  const { profile } = useProfile()
  const pools = usePools(account)
  const pefiPool = pools.length > 0 ? pools[0] : null

  const getXPefiToPefiRatio = (pool) => {
    return pool.totalStaked && pool.totalSupply ? new BigNumber(pool.totalStaked).div(new BigNumber(pool.totalSupply)).toJSON() : 1
  }

  const xPefiToPefiRatio = getXPefiToPefiRatio(pefiPool);
// =======
//   const { profile } = useProfile();
//   const pools = usePools(account);
  
//   const poolsWithApy = pools.map((pool) => {
//     return {
//       ...pool,
//       apy: new BigNumber(0)
//     }
//   })
//   const pefiPool = poolsWithApy.length > 0 ? poolsWithApy[0] : null

//   const getXPefiToPefiRatio = () => {
//     return pefiPool.totalStaked && pefiPool.totalSupply ? new BigNumber(pefiPool.totalStaked).div(new BigNumber(pefiPool.totalSupply)).toJSON() : 1
//   };

//   const xPefiToPefiRatio = getXPefiToPefiRatio();
// >>>>>>> 03c09a6 (feat: modified pefi nest card and footer)

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
// <<<<<<< HEAD
      pefiRatio={Number(xPefiToPefiRatio)}
// =======
//       pefiRatio={xPefiToPefiRatio}
// >>>>>>> 03c09a6 (feat: modified pefi nest card and footer)
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
