import { useContext } from 'react'
import { SettingContext } from 'contexts/SettingContext'

const useUserSetting = () => {
  const { isMusic, toggleMusic, visibleBlock, toggleVisibleBlock, refreshRate, updateRefreshRate } = useContext(SettingContext)
  return { isMusic, toggleMusic, visibleBlock, toggleVisibleBlock, refreshRate, updateRefreshRate }
};

export default useUserSetting
