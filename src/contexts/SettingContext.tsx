import React, { useState } from 'react'

const CACHE_MUSIC_KEY = 'IS_MUSIC'
const CACHE_VISIBLE_BLOCK_KEY = 'VISIBLE_BLOCK'
const CACHE_REFRESH_RATE = 'REFRESH_RATE'

const SettingContext = React.createContext({
  isMusic: null,
  toggleMusic: () => null,
  visibleBlock: null,
  toggleVisibleBlock: () => null,
  refreshRate: 3000,
  updateRefreshRate: (refreshRate: any) => null
})

const SettingContextProvider = ({ children }) => {
  const [isMusic, setIsMusic] = useState(() => {
    const isMusicUserSetting = localStorage.getItem(CACHE_MUSIC_KEY)
    return isMusicUserSetting ? JSON.parse(isMusicUserSetting) : true
  })

  const [visibleBlock, setVisibleBlock] = useState(() => {
    const visibleBlockUserSetting = localStorage.getItem(CACHE_VISIBLE_BLOCK_KEY)
    return visibleBlockUserSetting ? JSON.parse(visibleBlockUserSetting) : false
  })

  const [refreshRate, setRefreshRate] = useState(() => {
    const refreshRateUserSetting = localStorage.getItem(CACHE_REFRESH_RATE)
    return refreshRateUserSetting ? JSON.parse(refreshRateUserSetting) : 3000
  })

  const toggleMusic = () => {
    setIsMusic((prevState) => {
      localStorage.setItem(CACHE_MUSIC_KEY, JSON.stringify(!prevState))
      return !prevState
    })
  }

  const toggleVisibleBlock = () => {
    setVisibleBlock((prevState) => {
      localStorage.setItem(CACHE_VISIBLE_BLOCK_KEY, JSON.stringify(!prevState))
      return !prevState
    })
  }

  const updateRefreshRate = newRefreshRate => {
    setRefreshRate(() => {
      localStorage.setItem(CACHE_REFRESH_RATE, JSON.stringify(newRefreshRate))
      return newRefreshRate
    })
  }

  return (
    <SettingContext.Provider value={{ isMusic, toggleMusic, visibleBlock, toggleVisibleBlock, refreshRate, updateRefreshRate }}>
      {children}
    </SettingContext.Provider>
  )
}

export { SettingContext, SettingContextProvider }
