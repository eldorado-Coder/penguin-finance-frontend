import React, { useContext } from 'react'
import { Menu as UikitMenu } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { allLanguages } from 'config/localisation/languageCodes'
import { LanguageContext } from 'contexts/Localisation/languageContext'
import useTheme from 'hooks/useTheme'
import useAuth from 'hooks/useAuth'
import { usePricePefiUsdt, usePools } from 'state/hooks'
import WalletConnectGuideModal from 'components/Modal/WalletConnectGuideModal'
import { config, socials } from './config'

const Menu = (props) => {
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const pefiPriceUsd = usePricePefiUsdt()
  const pools = usePools(account)
  const pefiPool = pools.length > 0 ? pools[0] : null

  const getXPefiToPefiRatio = (pool) => {
    return pool.totalStaked && pool.totalSupply
      ? new BigNumber(pool.totalStaked).div(new BigNumber(pool.totalSupply)).toJSON()
      : 1
  }

  const xPefiToPefiRatio = getXPefiToPefiRatio(pefiPool)
  const isLive = true; // event status
  const links = [...config];
  if (isLive) {
    const emperorIndex = links.findIndex(link => link.label === 'Emperor');
    links[emperorIndex] = {
      ...links[emperorIndex],
      badge: 'LIVE'
    }
  }

  return (
    <>
      <WalletConnectGuideModal />
      <UikitMenu
        account={account}
        login={login}
        logout={logout}
        isDark={isDark}
        toggleTheme={toggleTheme}
        currentLang={selectedLanguage && selectedLanguage.code}
        langs={allLanguages}
        setLang={setSelectedLanguage}
        penguinPriceUsd={pefiPriceUsd.toNumber()}
        pefiRatio={Number(xPefiToPefiRatio)}
        links={links}
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
    </>
  )
}

export default Menu
