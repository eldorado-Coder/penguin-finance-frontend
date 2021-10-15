import { Toast } from 'penguinfinance-uikit2'
import BigNumber from 'bignumber.js'
import {
  CampaignType,
  LPConfig,
  FarmConfig,
  Nft,
  PoolConfig,
  Team,
  ClubPenguinFarmConfig,
} from 'config/constants/types'

export type TranslatableText =
  | string
  | {
      id: number
      fallback: string
      data?: {
        [key: string]: string | number
      }
    }

export interface Farm extends FarmConfig {
  tokenAmount?: BigNumber
  quoteTokenAmount?: BigNumber
  lpTotalInQuoteToken?: BigNumber
  tokenPriceVsQuote?: BigNumber
  strategyRatio?: number
  poolWeight?: BigNumber
  lpTokenBalanceMC?: BigNumber
  withdrawFee?: number
  userData?: {
    allowance: BigNumber
    tokenBalance: BigNumber
    stakedBalance: BigNumber
    stakedReceiptBalance?: BigNumber
    earnings: BigNumber
    pendingXPefi: BigNumber
    userPendingTokens?: any[]
    userShares: BigNumber
    userIpefiDistributionBips?: BigNumber
  }
  pendingTokens?: any[]
  totalLp?: BigNumber
  totalShares?: BigNumber
  pefiPerYear?: BigNumber
  maxBips?: number
  lpPrice?: number
  totalLiquidityInUsd?: number
  displayedDecimals?: number
}

export interface V2Farm extends FarmConfig {
  tokenAmount?: BigNumber
  quoteTokenAmount?: BigNumber
  lpTotalInQuoteToken?: BigNumber
  tokenPriceVsQuote?: BigNumber
  strategyRatio?: number
  poolWeight?: BigNumber
  withdrawFee?: number
  userData?: {
    allowance: BigNumber
    tokenBalance: BigNumber
    stakedBalance: BigNumber
    stakedReceiptBalance?: BigNumber
    earnings: BigNumber
    pendingXPefi: BigNumber
    userPendingTokens?: any[]
    userShares: BigNumber
    userIpefiDistributionBips?: BigNumber
  }
  pendingTokens?: any[]
  totalLp?: BigNumber
  totalShares?: BigNumber
  pefiPerYear?: BigNumber
  maxBips?: number
  lpPrice?: number
  totalLiquidityInUsd?: number
  stakingApr?: number
  swapFeeApr?: number
  pefiApr?: number
  apr?: number
  apy?: number
  displayedDecimals?: number
  joePoolAllocPoint?: number
  joePoolLpBalance?: number
  swapDailyReward?: number
  isBenqi?: boolean
}

export interface Lp extends LPConfig {
  tokenAmount?: BigNumber
  quoteTokenAmount?: BigNumber
  lpTotalInQuoteToken?: BigNumber
  tokenPriceVsQuote?: BigNumber
  userData?: {
    allowance?: BigNumber
    tokenBalance?: BigNumber
  }
}

export interface Pool extends PoolConfig {
  totalStaked?: BigNumber
  totalSupply?: BigNumber
  startBlock?: number
  endBlock?: number
  dailyApr?: number
  apy?: BigNumber
  userData?: {
    allowance: BigNumber
    stakingTokenBalance: BigNumber
    stakedBalance: BigNumber
    pendingReward: BigNumber
    depositAmount?: BigNumber
    withdrawAmount?: BigNumber
    profitAmount?: BigNumber
  }
  currentExchangeRate?: number
  rateOfYesterday?: number
  paperHandsPenalty?: number
  avgDailyAprPerWeek?: number
  distributionPhp?: number
  historicalRates?: any[]
}

export interface Profile {
  userId: number
  points: number
  teamId: number
  nftAddress: string
  tokenId: number
  isActive: boolean
  username: string
  nft?: Nft
  team: Team
  hasRegistered: boolean
}

// Slices states

export interface ToastsState {
  data: Toast[]
}

export interface FarmsState {
  pefiPerBlock?: number
  pefiPerSecond?: number
  data: Farm[]
}

export interface LydiaFarmsState {
  lydPerSec?: number
  data: Farm[]
}

export interface JoeFarmsState {
  joePerSec?: number
  devPercent?: number
  investorPercent?: number
  treasuryPercent?: number
  totalAllocPoint?: number
  data: Farm[]
}

export interface BenqiFarmsState {
  avaxPerSec?: number
  benqiPerSec?: number
  totalSupply?: number
}

export interface CompounderFarmsState {
  pefiPerBlock: number
  gondolaPerSec: number
  lydPerSec: number
  data: Farm[]
}

export interface LpsState {
  data: Lp[]
}

export interface PoolsState {
  data: Pool[]
}

export interface LaunchpadState {
  allowance: number
  stakedBalance: number
  yourPenguinTier: number
  allocation: number
  canUnstake: boolean
  timeRemainingToUnstake: number
  depositEnd: number
  xPefi: number
  tierHurdles: number[]
}

export interface LaunchpadBoofiState {
  allowance: number
  stakedBalance: string
  yourPenguinTier: number
  allocation: number
  canUnstake: boolean
  timeRemainingToUnstake: number
  depositEnd: number
  iPefi: number
  tierHurdles: number[]
}

export interface BoosterRocketState {
  // user
  hasTheUserAgreed: boolean
  canPurchaseAmount: number
  tokensPurchased: number
  payTokenBalance: number
  buyTokenBalance: number
  // global
  eventStarted: boolean
  eventOngoing: boolean
  tokensLeftToDistribute: number
  totalTokensSold: number
  totalProceeds: number
  allocationRate: number
}

export interface ProfileState {
  isInitialized: boolean
  isLoading: boolean
  hasRegistered: boolean
  data: Profile
}

export type TeamResponse = {
  0: string
  1: string
  2: string
  3: string
  4: boolean
}

export type TeamsById = {
  [key: string]: Team
}

export interface TeamsState {
  isInitialized: boolean
  isLoading: boolean
  data: TeamsById
}

export interface Achievement {
  id: string
  type: CampaignType
  address: string
  title: TranslatableText
  description?: TranslatableText
  badge: string
  points: number
}

export interface AchievementState {
  data: Achievement[]
}

// emperor state

export interface Emperor {
  address?: string
  nickname?: string
  color?: string
  style?: number
  isRegistered?: boolean
  timeAsEmperor?: number
  lastCrowningBlockTimestamp?: number
  bidAmount?: number
  jackpot?: number
  canBePoisoned?: boolean
  lastTimePoisoned?: number
  lastPoisonedBy?: string
  timePoisonedRemaining?: number
  timeLeftForPoison?: number
}

export interface Player {
  avaxDonations?: number
  pefiDonations?: number
  latestDonorName?: string
  address?: string
  nickname?: string
  color?: string
  isRegistered?: boolean
  style?: string
}

export interface EmperorState {
  myEmperor: Emperor
  currentEmperor: Emperor
  topEmperors: Emperor[]
  maxBidIncrease: number
  minBidIncrease: number
  openingBid?: number
  finalDate?: number
  poisonDuration?: number
  poisonCost?: number
}

export interface DonationsState {
  totalPefiRaised: number
  totalAvaxRaised: number
  latestDonor: Player
  myDonor: Player
  finalDate: string
  minDonationAvax: number
  minDonationPefi: number
}

// Global state
export interface GlobalState {
  wrongNetworkGuideModalOpened: boolean
}

export interface State {
  lps: LpsState
  farms: FarmsState
  lydiaFarms: LydiaFarmsState
  joeFarms: JoeFarmsState
  benqiFarms: BenqiFarmsState
  compounderFarms: CompounderFarmsState
  toasts: ToastsState
  pools: PoolsState
  profile: ProfileState
  teams: TeamsState
  achievements: AchievementState
  // global
  global: GlobalState
  emperor: EmperorState
  donations: DonationsState

  // launchpad - sherpa
  launchpad: LaunchpadState
  boosterRocket: BoosterRocketState

  // launchpad - boofi
  launchpadBoofi: LaunchpadBoofiState
  boofiBoosterRocket: BoosterRocketState

  // nest
  nestMigrator: NestMigratorState
  v2Pools: PoolsState
  v2Farms: FarmsState

  // collectibles
  userCollectibles: UserCollectiblesState
  clubPenguinFarms: ClubPenguinFarmsState
}

// v2
export interface NestMigratorState {
  expectedIPefi: number
  pefiAllowance: number
  xPefiAllowance: number
}

export interface UserCollectiblesState {
  nftCollections: any[]
  nftClaimStatus: any[]
}

// club penguin farm
export interface ClubPenguinFarm extends ClubPenguinFarmConfig {
  userData?: {
    allowance: BigNumber
    tokenBalance: BigNumber
    stakedBalance: BigNumber
    stakedReceiptBalance?: BigNumber
    earnings: BigNumber
    pendingXPefi: BigNumber
    userPendingTokens?: any[]
    userShares: BigNumber
    userIpefiDistributionBips?: BigNumber
  }
  rewardToken?: string
  rewardStartTimestamp?: number
  rewardEndTimestamp?: number
  tokensPerSecond?: BigNumber
  totalIPEFIInPool?: BigNumber
  totalRewardAmount?: BigNumber
  rewardDistributed?: BigNumber
  poolTimeRemaining?: number
}

export interface ClubPenguinFarmsState {
  data: ClubPenguinFarm[]
}
