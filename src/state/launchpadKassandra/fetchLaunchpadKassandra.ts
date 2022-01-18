import launchpadKittyABI from 'config/abi/launchpadKitty.json'
import multicall from 'utils/multicall'
import { getKassandraLaunchpadAddress } from 'utils/addressHelpers'

export const fetchGlobalData = async () => {
  const [registrationStart, registrationEnd, registrationPeriodOngoing, registeredPenguins] = await multicall(
    launchpadKittyABI,
    [
      {
        address: getKassandraLaunchpadAddress(),
        name: 'registrationStart',
      },
      {
        address: getKassandraLaunchpadAddress(),
        name: 'registrationEnd',
      },
      {
        address: getKassandraLaunchpadAddress(),
        name: 'registrationPeriodOngoing',
      },
      {
        address: getKassandraLaunchpadAddress(),
        name: 'numberRegisteredPenguins',
      },
    ],
  )

  return {
    registrationStart: registrationStart[0].toNumber(),
    registrationEnd: registrationEnd[0].toNumber(),
    registrationPeriodOngoing: registrationPeriodOngoing[0],
    registeredPenguins: registeredPenguins[0].toNumber(),
  }
}

export const fetchTierHurdles = async () => {
  const calls = []
  for (let i = 0; i < 3; i++) {
    calls.push({
      address: getKassandraLaunchpadAddress(),
      name: 'allocationsTierHurdles',
      params: [i + 1],
    })
  }

  const tierHurdles = await multicall(launchpadKittyABI, calls)

  return tierHurdles.map((tierHurdle) => (tierHurdle[0] / 1e18).toFixed(0))
}
