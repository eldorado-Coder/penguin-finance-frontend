import BigNumber from 'bignumber.js'
import { Farm as FarmTypes } from 'state/types'

export type ColumnsDefTypes = {
  id: number
  label: string
  name: string
  sortable: boolean
}

export const MobileColumnSchema: ColumnsDefTypes[] = [
  {
    id: 1,
    name: 'farm',
    sortable: true,
    label: '',
  },
  {
    id: 2,
    name: 'earned',
    sortable: true,
    label: 'Your Stake',
  },
  {
    id: 3,
    name: 'apr',
    sortable: true,
    label: 'APR',
  },
  {
    id: 6,
    name: 'details',
    sortable: true,
    label: '',
  },
]

export const DesktopColumnSchema: ColumnsDefTypes[] = [
  {
    id: 1,
    name: 'farm',
    sortable: true,
    label: '',
  },
  {
    id: 2,
    name: 'staked',
    sortable: true,
    label: 'Your Stake',
  },
  {
    id: 3,
    name: 'apr',
    sortable: true,
    label: 'APR',
  },
  {
    id: 4,
    name: 'liquidity',
    sortable: true,
    label: 'Liquidity',
  },
  {
    id: 5,
    name: 'rewards',
    sortable: true,
    label: 'Rewards',
  },
  {
    id: 6,
    name: 'details',
    sortable: true,
    label: '',
  },
]

export interface FarmWithStakedValue extends FarmTypes {
  apy?: BigNumber
}

export interface FarmCardProps {
  farm: FarmWithStakedValue
  removed: boolean
  pefiPrice?: BigNumber
  avaxPrice?: BigNumber
  ethPrice?: BigNumber
  account?: string
  expanded?: boolean
  lpPrice?: number
}
