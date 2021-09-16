import gql from 'graphql-tag'

export const PENGUIN_ACCOUNTS_SEARCH = ({ account }: { account?: string }) => {
  const queryString = `
    query accounts {
      accounts(
        first: 1000,
        where: {
          ${account ? `address: "${account}"` : ``}
        }
      )
      {
        stakedPefiAmount
        unStakedIPefiAmount
        firstStakedTime
      }
    }`
  return gql(queryString)
}

export const PENGUIN_TRANSACTIONS_SEARCH = ({ account, type }: { account?: string; type?: string }) => {
  const queryString = `
    query transactions {
      transactions(
        first: 1000,
        orderBy: time,
        orderDirection: asc
        where: {
          ${account ? `account: "${account}"` : ``},
          ${type ? `transactionType: "${type}"` : ``},
        }
      )
      {
        account
        amount
        time
      }
    }`
  return gql(queryString)
}
