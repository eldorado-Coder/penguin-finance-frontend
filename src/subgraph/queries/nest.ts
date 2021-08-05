import gql from 'graphql-tag'

export const ACCOUNTS_SEARCH = ({ account }: { account?: string }) => {
  const queryString = `
    query accounts {
      accounts(
        first: 1000,
        where: {
          ${account ? `address: "${account}"` : ``}
        }
      )
      {
        address
        stakePefiAmount
        stakeXPefiAmount
      }
    }`
  return gql(queryString)
}

export const NEST_TRANSACTIONS_SEARCH = ({ account }: { account?: string }) => {
  const queryString = `
    query transactions {
      transactions(
        first: 1000,
        where: {
          ${account ? `account: "${account}"` : ``}
        }
      )
      {
        address
        transactionType
        from
        to
        amount
      }
    }`
  return gql(queryString)
}
