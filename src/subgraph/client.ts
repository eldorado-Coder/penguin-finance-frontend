import { GraphQLClient } from 'graphql-request'

export const penguinFinanceClient = new GraphQLClient('https://api.thegraph.com/subgraphs/name/daisai3/pg_test')
export const pangolinClient = new GraphQLClient('https://api.thegraph.com/subgraphs/name/pangolindex/exchange')
export const joeClient = new GraphQLClient('https://api.thegraph.com/subgraphs/name/traderjoe-xyz/exchange')

export default {
  penguinFinanceClient,
}
