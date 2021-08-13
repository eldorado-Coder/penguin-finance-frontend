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
        stakePefiAmount
        unStakePefiAmount
        stakeXPefiAmount
        unStakeXPefiAmount
      }
    }`
  return gql(queryString)
}

export const STAKE_TRANSACTIONS_SEARCH = ({ account }: { account?: string }) => {
  const queryString = `
    query transactions {
      transactions(
        first: 1000,
        orderBy: time,
        orderDirection: asc
        where: {
          ${account ? `account: "${account}"` : ``},
          transactionType: Stake
        }
      )
      {
        time
      }
    }`
  return gql(queryString)
}
