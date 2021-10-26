import { useEffect } from 'react'
import { connectorLocalStorageKey, ConnectorNames } from 'penguinfinance-uikit2'
import useAuth from 'hooks/useAuth'

const usePersistConnect = () => {
  const { login } = useAuth()

  useEffect(() => {
    const connectorId = window.localStorage.getItem(connectorLocalStorageKey) as ConnectorNames

    if (connectorId) {
      login(connectorId)
    }
  }, [login])
}

export default usePersistConnect
