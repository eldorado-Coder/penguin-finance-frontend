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
    isIglooAprMode,
    toggleIglooAprMode,
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
    isIglooAprMode,
    toggleIglooAprMode,
  }
}

export default useUserSetting
