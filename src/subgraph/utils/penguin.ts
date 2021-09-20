import { penguinClient } from '../client'
import { PENGUIN_ACCOUNTS_SEARCH, PENGUIN_TRANSACTIONS_SEARCH } from '../queries'

export const getPenguinAccounts = async (account: string) => {
  if (!account) return null
  const { accounts } = await penguinClient.request(PENGUIN_ACCOUNTS_SEARCH({ account }))
  return accounts[0]
}

export const getPenguinStakeTransactions = async (account: string, type: string) => {
  if (!account) return []
  const { transactions } = await penguinClient.request(
    PENGUIN_TRANSACTIONS_SEARCH({ account: account.toLowerCase(), type }),
  )
  return transactions
}

export const getPenguinFirstStakeTime = async (account: string) => {
  if (!account) return 0
  const accountInfo = await getPenguinAccounts(account)
  if (accountInfo) {
    return Number(accountInfo.firstStakedTime)
  }
  return 0
}
