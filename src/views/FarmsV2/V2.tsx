import React, { useCallback } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import FarmTable from './components/FarmTable/FarmTable'
import { FarmWithStakedValue } from './components/types'

interface FarmProps {
  farms: any[]
}

const V2Farms: React.FC<FarmProps> = ({ farms }) => {
  const { path } = useRouteMatch()

  const farmsList = useCallback((farmsToDisplay, removed: boolean) => {
    const farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
      return { ...farm, apy: 0 }
    })

    return (
      <FarmTable
        data={farmsToDisplayWithAPY.map((farm) => ({
          farm,
          removed,
        }))}
      />
    )
  }, [])

  if (farms.length === 0) {
    return null
  }

  return (
    <Route exact path={`${path}`}>
      {farmsList(farms, false)}
    </Route>
  )
}

export default V2Farms
