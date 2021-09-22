import gql from 'graphql-tag'

export const PAIRS_SEARCH = ({ address }: { address?: string }) => {
  const queryString = `
    query pairs {
      pairs(
        first: 5,
        where: {
          ${address ? `id: "${address}"` : ``}
        }
      )
      {
        reserveUSD
        totalSupply
        reserve0
        reserve1
      }
    }`
  return gql(queryString)
}

export const PAIR_DAY_DATA_SEARCH = ({ address }: { address?: string }) => {
  const queryString = `
    query pairHourDatas {
      pairHourDatas(
        first: 24,
        orderBy: hourStartUnix, orderDirection: desc
        where: {
          ${address ? `pair: "${address}"` : ``}
        }
      )
      {
        hourStartUnix
        hourlyVolumeUSD
      }
    }`
  return gql(queryString)
}

export const PAIR_DAY_DATA_SEARCH1 = ({ address }: { address?: string }) => {
  const queryString = `
    query pairHourDatas {
      pairHourDatas(
        first: 24,
        orderBy: date, orderDirection: desc
        where: {
          ${address ? `pair: "${address}"` : ``}
        }
      )
      {
        date
        volumeUSD
      }
    }`
  return gql(queryString)
}

export const TOKENS_SEARCH = ({ address, symbol }: { address?: string; symbol?: string }) => {
  const queryString = `
    query tokens {
      tokens(
        first: 5,
        where: {
          ${address ? `id: "${address}"` : ``},
          ${symbol ? `symbol: "${symbol}"` : ``},
        }
      )
      {
        id
        symbol
        totalSupply
      }
    }`
  return gql(queryString)
}

export const BUNDLES_SEARCH = () => {
  const queryString = `
    query bundle {
      bundle(id: "1")
      {
        id
        ethPrice
      }
    }`
  return gql(queryString)
}
