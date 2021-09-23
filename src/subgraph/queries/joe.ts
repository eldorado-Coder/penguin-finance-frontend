import gql from 'graphql-tag'

export const JOE_PAIRS_SEARCH = ({ address }: { address?: string }) => {
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
        hourData {
          date
          volumeUSD
        }
      }
    }`
  return gql(queryString)
}

export const POOL_SEARCH = ({ address }: { address?: string }) => {
  const queryString = `
    query pools {
      pools(
        first: 1,
        where: {
          ${address ? `pair: "${address}"` : ``}
        }
      )
      {
        allocPoint
        jlpBalance
        pair
      }
    }`
  return gql(queryString)
}

export const POOL_DETAIL_SEARCH1 = ({ address }: { address?: string }) => {
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
