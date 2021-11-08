import { useContext } from 'react'
import { SettingContext } from 'contexts/SettingContext'

const useUserSetting = () => {
  const {
    isMusic,
    toggleMusic,
    visibleBlock,
    toggleVisibleBlock,
    refreshRate,
    updateRefreshRate,
    visiblePlayer,
    toggleVisiblePlayer,
    isIglooApyMode,
    toggleIglooApyMode,
  } = useContext(SettingContext)
  return {
    isMusic,
    toggleMusic,
    visibleBlock,
    toggleVisibleBlock,
    refreshRate,
    updateRefreshRate,
    visiblePlayer,
    toggleVisiblePlayer,
    isIglooApyMode,
    toggleIglooApyMode,
  }
}

export default useUserSetting
