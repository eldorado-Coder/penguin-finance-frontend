import React, { useContext } from 'react'
import { Menu as UikitMenu, useModal } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import { allLanguages } from 'config/localisation/languageCodes'
import { LanguageContext } from 'contexts/Localisation/languageContext'
import useTheme from 'hooks/useTheme'
import useAuth from 'hooks/useAuth'
import useTokenBalance from 'hooks/useTokenBalance'
import { usePricePefiUsdt, useV2Pools, useEmperor } from 'state/hooks'
import { getPefiAddress, getIPefiAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import WalletConnectGuideModal from 'components/Modal/WalletConnectGuideModal'
import SettingModal from 'components/Modal/SettingModal'
import { config, socials } from './config'

const Menu = (props) => {
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const pefiPriceUsd = usePricePefiUsdt()
  const v2Pools = useV2Pools(account)
  const pefiBalance = useTokenBalance(getPefiAddress())
  const iPefiBalance = useTokenBalance(getIPefiAddress())
  const avaxBalance = useTokenBalance()
  const [onToggleSettingModal] = useModal(<SettingModal />)

  const { myEmperor } = useEmperor()
  const myNickname = myEmperor.nickname
  const v2Nest = v2Pools.length > 0 ? v2Pools[0] : null
  const iPefiToPefiRatio = v2Nest.currentExchangeRate || 1

  // add badge to "emperor" and "launchpad" menu
  const isEmperorLive = false // event status
  const isLaunchpadLive = false // event status
  const isCollectiblesNew = true // event status

  const links = [...config]
  const emperorIndex = links.findIndex((link) => link.label === 'Emperor')
  const launchpadIndex = links.findIndex((link) => link.label === 'Launchpad')
  const collectiblesIndex = links.findIndex((link) => link.label === 'Collectibles')
  const clubIndex = links.findIndex((link) => link.label === 'The Club')

  // links[collectiblesIndex] = {
  //   ...links[collectiblesIndex],
  //   badge: isCollectiblesNew ? 'NEW' : '',
  // }
  // links[launchpadIndex] = {
  //   ...links[launchpadIndex],
  //   badge: 'LIVE',
  //   badgeLightColor: '#37DB94',
  //   badgeDarkColor: '#37DB94',
  // }

  // links[emperorIndex] = {
  //   ...links[emperorIndex],
  //   badge: 'NEW',
  //   badgeLightColor: '#EC3E3F',
  //   badgeDarkColor: '#ffffff',
  // }
  links[clubIndex] = {
    ...links[clubIndex],
    badge: 'SOON',
    badgeLightColor: '#3B88E7',
    badgeDarkColor: '#ffffff',
  }

  return (
    <>
      <WalletConnectGuideModal />
      <UikitMenu
        account={account}
        nickname={myNickname || ''}
        login={login}
        logout={logout}
        isDark={isDark}
        toggleTheme={toggleTheme}
        currentLang={selectedLanguage && selectedLanguage.code}
        langs={allLanguages}
        setLang={setSelectedLanguage}
        penguinPriceUsd={pefiPriceUsd.toNumber()}
        iPefiRatio={Number(iPefiToPefiRatio)}
        links={links}
        socials={socials}
        onSettingClick={onToggleSettingModal}
        pefiBalance={getBalanceNumber(pefiBalance).toFixed(3)}
        iPefiBalance={getBalanceNumber(iPefiBalance).toFixed(3)}
        avaxBalance={getBalanceNumber(avaxBalance).toFixed(3)}
        {...props}
      />
    </>
  )
}

export default Menu
