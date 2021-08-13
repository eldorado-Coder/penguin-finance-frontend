import { penguinFinanceClient } from '../client'
import { ACCOUNTS_SEARCH, STAKE_TRANSACTIONS_SEARCH } from '../queries'

export const getAccounts = async (account: string) => {
  if (!account) return null
  const { accounts } = await penguinFinanceClient.request(ACCOUNTS_SEARCH({ account }))
  return accounts[0]
}

export const getStakeTransactions = async (account: string) => {
  if (!account) return []
  const { transactions } = await penguinFinanceClient.request(
    STAKE_TRANSACTIONS_SEARCH({ account: account.toLowerCase() }),
  )
  return transactions
}

export const getFirstStakeTime = async (account: string) => {
  if (!account) return 0
  const transactions = await getStakeTransactions(account)
  if (transactions.length > 0) {
    return Number(transactions[0].time)
  }
  return 0
}
