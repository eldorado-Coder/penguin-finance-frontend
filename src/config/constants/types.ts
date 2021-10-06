import { TranslatableText } from 'state/types'

export type IfoStatus = 'coming_soon' | 'live' | 'finished'

export interface Ifo {
  id: string
  isActive: boolean
  address: string
  name: string
  subTitle?: string
  description?: string
  launchDate: string
  launchTime: string
  saleAmount: string
  raiseAmount: string
  cakeToBurn: string
  projectSiteUrl: string
  currency: string
  currencyAddress: string
  tokenDecimals: number
  releaseBlockNumber: number
  campaignId?: string
}

export enum QuoteToken {
  'AVAX' = 'AVAX',
  'PEFI' = 'PEFI',
  'SYRUP' = 'SYRUP',
  'USDT' = 'USDT',
  'TWT' = 'TWT',
  'UST' = 'UST',
  'ETH' = 'ETH',
  'COMP' = 'COMP',
  'PNG' = 'PNG',
  'LINK' = 'LINK',
  'ZETH' = 'ZETH',
  'ZUSDT' = 'ZUSDT',
  'LYD' = 'LYD',
  'GDL' = 'GDL',
  'USDC' = 'USDC',
}

export enum PoolCategory {
  'COMMUNITY' = 'Community',
  'CORE' = 'Core',
  'BINANCE' = 'Binance', // Pools using native BNB behave differently than pools using a token
}

export interface Address {
  256?: string
  128?: string
  43113?: string
  43114: string
}

export interface FarmConfig {
  pid?: number
  lpSymbol: string
  lpAddresses: Address
  tokenSymbol: string
  tokenAddresses: Address
  quoteTokenSymbol: QuoteToken
  quoteTokenAddresses: Address
  multiplier?: string
  isCommunity?: boolean
  dual?: {
    rewardPerBlock: number
    earnLabel: string
    endBlock: number
  }
  withdrawalFee?: string
  hardApy?: string
  type?: string
  name?: string
  strategyAddress?: string
  stakingAddress?: string
  swapAddresses?: Address
  infoLink?: string
  guideLink?: string
}

export interface V2FarmConfig {
  pid?: number
  lpSymbol: string
  lpAddresses: Address
  strategyAddresses: Address
  tokenSymbol: string
  tokenAddresses: Address
  quoteTokenSymbol: QuoteToken
  quoteTokenAddresses: Address
  multiplier?: string
  isCommunity?: boolean
  dual?: {
    rewardPerBlock: number
    earnLabel: string
    endBlock: number
  }
  withdrawalFee?: string
  hardApy?: string
  type?: string
  name?: string
  strategyAddress?: string
  stakingAddress?: string
  swapAddresses?: Address
  pangolinRewardPoolAddresses?: Address
  lpPrice?: number
  displayedDecimals?: number
  infoLink?: string
  guideLink?: string
}

export interface LPConfig {
  lpSymbol: string
  lpAddresses: Address
  tokenSymbol: string
  tokenAddresses: Address
  quoteTokenSymbol: QuoteToken
  quoteTokenAddresses: Address
}

export interface PoolConfig {
  sousId: number
  image?: string
  tokenName: string
  stakingTokenName: QuoteToken
  stakingLimit?: number
  stakingTokenAddress?: string
  contractAddress: Address
  poolCategory: PoolCategory
  projectLink: string
  penguinNestsGuideLink: string
  tokenPerBlock: string
  sortOrder?: number
  harvest?: boolean
  isFinished?: boolean
  tokenDecimals: number
}

export type Images = {
  lg: string
  md: string
  sm: string
  ipfs?: string
}

export type NftImages = {
  blur?: string
} & Images

export type NftVideo = {
  webm: string
  mp4: string
}

export type Nft = {
  name: string
  description: string
  images: NftImages
  sortOrder: number
  bunnyId: number
  video?: NftVideo
  rarity?: number
  collection: string
  address: string
}

export type NftDistributor = {
  collection: string
  description: string
  address: Address
}

export type TeamImages = {
  alt: string
} & Images

export type Team = {
  id: number
  name: string
  description: string
  isJoinable?: boolean
  users: number
  points: number
  images: TeamImages
  background: string
  textColor: string
}

export type CampaignType = 'ifo'

export type Campaign = {
  id: string
  type: CampaignType
  title?: TranslatableText
  description?: TranslatableText
  badge?: string
}

export interface Token {
  symbol: string
  address?: Address
  decimals?: number
  projectLink?: string
}

export interface ClubPenguinFarmConfig {
  pid: number
  stakingTokenAddresses: Address
}
