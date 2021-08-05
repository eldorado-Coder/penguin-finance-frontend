import { penguinFinanceClient } from '../client'
import { ACCOUNTS_SEARCH, NEST_TRANSACTIONS_SEARCH } from '../queries'

export const getAccounts = async (account: string) => {
  if (!account) return null
  const { accounts } = await penguinFinanceClient.request(ACCOUNTS_SEARCH({ account }))
  return accounts[0]
}

export const getTransactions = async (account: string) => {
  if (!account) return []
  const { transactions } = await penguinFinanceClient.request(NEST_TRANSACTIONS_SEARCH({ account }))
  return transactions
}
