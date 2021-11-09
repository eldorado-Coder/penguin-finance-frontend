import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Flex, Text, Toggle, Input, useMatchBreakpoints, ButtonMenu, ButtonMenuItem } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'
import Page from 'components/layout/Page'
import Select from 'components/Select/Select'
import Balance from 'components/Balance'
import {
  useV2Farms,
  useLydiaFarms,
  useLydiaFarmRewardRate,
  useJoeFarmsGlobalData,
  useJoeV3FarmsGlobalData,
  useJoeV3Farms,
  useBenqiFarmsGlobalData,
  usePricePefiUsdt,
  usePriceAvaxUsdt,
} from 'state/hooks'
import { fetchV2FarmUserDataAsync } from 'state/actions'
import useRefresh from 'hooks/useRefresh'
import useTheme from 'hooks/useTheme'
import useTokenPrice from 'hooks/useTokenPrice'
import useJoePrice from 'hooks/useJoePrice'
import useUserSetting from 'hooks/useUserSetting'
import { getBalanceNumber } from 'utils/formatBalance'
import { DAYS_PER_YEAR } from 'config'
import { getAddress } from 'utils/addressHelpers'
import { getApr, getApy, getFarmApr, getLydiaFarmApr, getJoeFarmApr, getBenqiFarmApr } from 'utils/apyHelpers'
import V2Farms from './V2'

const PROJECT_LIST = [
  { src: '/images/farms-v2/penguin.svg', name: 'Penguin' },
  { src: '/images/farms-v2/joe.svg', name: 'Joe' },
  { src: '/images/farms-v2/pangolin.svg', name: 'Pangolin' },
  { src: '/images/farms-v2/sushi.svg', name: 'Sushi' },
  { src: '/images/farms-v2/lydia.svg', name: 'Lydia' },
]

const Farms: React.FC = () => {
  const [sortType, setSortType] = useState('liquidity')
  const [showStakedOnly, setShowStakedOnly] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeProjects, setActiveProjects] = useState(PROJECT_LIST.map((row) => row.name))

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  const { account } = useWeb3React()
  const { isIglooAprMode, toggleIglooAprMode } = useUserSetting()
  const v2Farms = useV2Farms()
  const lydiaFarms = useLydiaFarms()
  const joeV3Farms = useJoeV3Farms()
  const { isXl, isSm } = useMatchBreakpoints()
  const lydPerSec = useLydiaFarmRewardRate()
  const joeGlobalData = useJoeFarmsGlobalData()
  const joeV3GlobalData = useJoeV3FarmsGlobalData()
  const benqiGlobalData = useBenqiFarmsGlobalData()
  const pefiPriceUsd = usePricePefiUsdt().toNumber()
  const avaxPriceUsd = usePriceAvaxUsdt().toNumber()
  const { lydPrice: lydPriceUsd, qiPrice: qiPriceUsd } = useTokenPrice()
  const joePriceUsd = useJoePrice()
  const theme = useTheme()
  const isMobile = !isXl

  useEffect(() => {
    if (account) {
      dispatch(fetchV2FarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  // const activeFarms = v2Farms.filter((farm) => Number(farm.multiplier) > 0)
  const activeFarms = v2Farms

  const getV2FarmsTVL = () => {
    let v2FarmTvl = 0
    activeFarms.map((farm) => {
      v2FarmTvl += farm.totalLiquidityInUsd || 0
      return farm
    })
    return v2FarmTvl
  }

  const activeFarmsWithApy = activeFarms.map((farm) => {
    const pefiPerYear = getBalanceNumber(farm.pefiPerYear)
    const pefiPerDay = pefiPerYear / DAYS_PER_YEAR
    const pefiRewardPerDayInUsd = pefiPriceUsd * pefiPerDay * (1 - 0.15 - 0.1)
    const pefiDailyApr = farm.totalLiquidityInUsd > 0 ? pefiRewardPerDayInUsd / farm.totalLiquidityInUsd : 0
    const pefiApr = getApr(pefiDailyApr)

    // minw apr
    const minwApr = 0
    let { stakingApr, swapFeeApr } = farm
    let joeRushRewardApr = 0

    if (farm.type === 'Lydia') {
      const lydiaFarm = lydiaFarms.find((row) => row.lpSymbol === farm.lpSymbol)
      const poolLiquidityUsd = farm.lpPrice * getBalanceNumber(lydiaFarm.lpTokenBalanceMC)
      stakingApr = getLydiaFarmApr(lydiaFarm.poolWeight, lydPriceUsd, poolLiquidityUsd, lydPerSec) * 0.9
      swapFeeApr = getApr(farm.swapDailyReward / poolLiquidityUsd)
    }

    if (farm.type === 'Joe') {
      const poolLiquidityUsd = farm.lpPrice * Number(farm.joePoolLpBalance)
      let farmAllocPoint = farm.joePoolAllocPoint
      if (farm.isJoeRush) {
        const joeV3Farm = joeV3Farms.find(
          (row) => getAddress(row.lpAddresses).toLowerCase() === getAddress(farm.lpAddresses).toLowerCase(),
        )
        if (joeV3Farm) {
          farmAllocPoint = joeV3Farm.allocPoint
          joeRushRewardApr = getFarmApr(avaxPriceUsd, poolLiquidityUsd, joeV3Farm.joeRushRewardPerSec) * 0.9
        }
      }
      const poolWeight = farm.isJoeRush
        ? farmAllocPoint / joeV3GlobalData.totalAllocPoint
        : farmAllocPoint / joeGlobalData.totalAllocPoint
      stakingApr =
        getJoeFarmApr(
          poolWeight,
          joePriceUsd,
          poolLiquidityUsd,
          farm.isJoeRush ? joeV3GlobalData.joePerSec : joeGlobalData.joePerSec,
          farm.isJoeRush ? 1 : joeGlobalData.rewardPercentToFarm,
        ) * 0.9
      swapFeeApr = getApr(farm.swapDailyReward / (farm.joeSwapPoolUsdBalance || 1))
    }
    if (farm.isBenqi) {
      const { avaxPerSec: benqiAvaxRewardPerSec, benqiPerSec: benqiRewardPerSec, totalSupply } = benqiGlobalData
      const benqiPoolLiquidityUsd = farm.lpPrice * totalSupply
      const avaxStakingApr = getBenqiFarmApr(avaxPriceUsd, benqiPoolLiquidityUsd, benqiAvaxRewardPerSec)
      const qiStakingApr = getBenqiFarmApr(qiPriceUsd, benqiPoolLiquidityUsd, benqiRewardPerSec)
      stakingApr = avaxStakingApr + qiStakingApr
    }

    const totalApr = stakingApr + swapFeeApr + pefiApr + minwApr + joeRushRewardApr

    // apy calculation
    const pefiApy = getApy(pefiApr / DAYS_PER_YEAR)
    const stakingApy = getApy(stakingApr / DAYS_PER_YEAR)
    const swapFeeApy = getApy(swapFeeApr / DAYS_PER_YEAR)
    const minwApy = getApy(minwApr / DAYS_PER_YEAR)
    const joeRushRewardApy = getApy(joeRushRewardApr / DAYS_PER_YEAR)
    const totalApy = getApy(totalApr / DAYS_PER_YEAR)

    return {
      ...farm,
      pefiDailyApr,
      pefiApr,
      pefiApy,
      stakingApr,
      stakingApy,
      swapFeeApr,
      swapFeeApy,
      minwApr,
      minwApy,
      joeRushRewardApr,
      joeRushRewardApy,
      apr: totalApr,
      apy: totalApy,
    }
  })

  const filteredFarms = useMemo(() => {
    let farms = [...activeFarmsWithApy]
    // filter
    if (searchTerm) {
      farms = farms.filter((farm) => farm.lpSymbol.toLowerCase().includes(searchTerm.toLowerCase()))
    }
    if (account && showStakedOnly) {
      farms = farms.filter((farm) => farm.userData && getBalanceNumber(farm.userData.stakedBalance) > 0)
    }
    farms = farms.filter((farm) => farm.type && activeProjects.includes(farm.type))

    // sort
    if (sortType === 'liquidity') {
      farms = farms.sort((a, b) => b.totalLiquidityInUsd - a.totalLiquidityInUsd)
    }
    if (sortType === 'multiplier') {
      farms = farms.sort((a, b) => Number(b.multiplier) - Number(a.multiplier))
    }
    if (sortType === 'earned') {
      farms = farms.sort(
        (a, b) =>
          Number(b.lpPrice) * getBalanceNumber(b.userData?.stakedBalance) -
          Number(a.lpPrice) * getBalanceNumber(a.userData?.stakedBalance),
      )
    }
    if (sortType === 'apr') {
      farms = farms.sort((a, b) => b.apr - a.apr)
    }

    return farms
  }, [searchTerm, activeFarmsWithApy, showStakedOnly, account, activeProjects, sortType])

  const handleSwitchTab = (tab) => {
    toggleIglooAprMode(tab === 1)
  }

  const handleChangeStakedOnly = (event) => {
    setShowStakedOnly(event.target.checked)
  }

  const handleChangeSearchTerm = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleChangeActiveProject = (project) => {
    const isExisted = activeProjects.find((row) => row === project)
    if (isExisted) {
      setActiveProjects(activeProjects.filter((row) => row !== project))
    } else {
      setActiveProjects([...activeProjects, project])
    }
  }

  const renderProjectsFilters = (
    <Flex ml={isSm ? '0px' : '8px'} alignItems="center">
      {PROJECT_LIST.map((project) => {
        const isActiveProject = activeProjects.find((row) => row === project.name)
        return (
          <ProjectLogo
            key={project.name}
            src={project.src}
            alt={project.name}
            isActive={!!isActiveProject}
            onClick={() => handleChangeActiveProject(project.name)}
          />
        )
      })}
    </Flex>
  )

  const getAPRTooltip = () => {
    return `
      <div style="display: flex; width: 100%; align-items: center;">
        <p>APY values represent yield if one manually compounds the rewards every single day. APR refers to profit without any compounding.</p>
      </div>
    `
  }
  const renderActiveFilter = (
    <>
      <Flex margin={isMobile ? '8px 0' : '8px 16px 8px 0'} justifyContent="center" alignItems="center">
        <CustomToolTipOrigin data-for="apr-tooltip" data-tip={getAPRTooltip()}>
          <TabWrapper>
            <ButtonMenu activeIndex={isIglooAprMode ? 1 : 0} onItemClick={handleSwitchTab} scale="sm">
              <OptionItem active={!isIglooAprMode}>APY</OptionItem>
              <OptionItem active={isIglooAprMode}>APR</OptionItem>
            </ButtonMenu>
          </TabWrapper>
        </CustomToolTipOrigin>
        <CustomAprToolTip
          id="apr-tooltip"
          wrapper="div"
          delayHide={0}
          effect="solid"
          multiline
          isMobile={isMobile}
          place="top"
          html
        />
      </Flex>
    </>
  )

  const renderSearchAndSortFilter = (
    <Flex mb="16px">
      <Flex flexDirection="column">
        <Text fontSize="12px" textTransform="uppercase" color="textSubtle">
          Sort by
        </Text>
        <SelectWrapper>
          <Select
            value={sortType}
            options={[
              { label: 'Liquidity', value: 'liquidity' },
              { label: 'Hot', value: 'hot' },
              { label: 'APR', value: 'apr' },
              { label: 'Multiplier', value: 'multiplier' },
              { label: 'Earned', value: 'earned' },
            ]}
            onChange={setSortType}
          />
        </SelectWrapper>
      </Flex>
      <Flex flexDirection="column" ml="16px">
        <Text fontSize="12px" textTransform="uppercase" color="textSubtle">
          Search
        </Text>
        <StyledInput placeholder="Search Farms" value={searchTerm} onChange={handleChangeSearchTerm} />
      </Flex>
    </Flex>
  )

  const renderStakedOnlyFilter = (
    <Flex alignItems="center" mr={isMobile ? '8px' : '16px'}>
      <ToggleWrapper checked={showStakedOnly}>
        <Toggle checked={showStakedOnly} onChange={handleChangeStakedOnly} />
      </ToggleWrapper>
      <FilterText ml="8px" color="textSubtle">
        Staked Only
      </FilterText>
    </Flex>
  )

  const tvl = getV2FarmsTVL()

  return (
    <FarmPage>
      <BgWrapper>
        <IgloosBgContainer />
      </BgWrapper>
      <IgloosBannerContainer>
        <BannerImage
          src={`${process.env.PUBLIC_URL}/images/farms-v2/v2_farm_banner_animated_${
            theme.isDark ? 'dark' : 'light'
          }.svg`}
          alt="v2 farm banner"
        />
      </IgloosBannerContainer>
      <TvlContainer marginBottom={isMobile ? '30px' : '70px'}>
        <span>{`Total Value Locked (TVL): `}</span>
        <Balance
          fontSize="28px"
          color={theme.isDark ? '#bba6dd' : '#372871'}
          fontWeight="600"
          prefix="$"
          decimals={0}
          value={Number(tvl)}
        />
      </TvlContainer>
      {isMobile ? (
        <FilterWrapper justifyContent="space-between" alignItems="center" flexWrap="wrap">
          <Flex mt="8px" justifyContent="center" mb="8px" flexWrap="wrap">
            {renderStakedOnlyFilter}
            {renderActiveFilter}
          </Flex>
          {renderSearchAndSortFilter}
          <Flex mt="16px">{renderProjectsFilters}</Flex>
        </FilterWrapper>
      ) : (
        <FilterWrapper justifyContent="space-between" alignItems="center" flexWrap="wrap" mt="-24px">
          <LeftFilters alignItems="center" mt="16px" justifyContent="space-between" flexWrap={isSm ? 'nowrap' : 'wrap'}>
            {renderStakedOnlyFilter}
            {renderProjectsFilters}
          </LeftFilters>
          <Flex display={isSm ? 'block !important' : 'flex'} mt="16px">
            {renderActiveFilter}
            {renderSearchAndSortFilter}
          </Flex>
        </FilterWrapper>
      )}
      <IgloosContentContainer>{filteredFarms.length > 0 && <V2Farms farms={filteredFarms} />}</IgloosContentContainer>
    </FarmPage>
  )
}

const FarmPage = styled(Page)`
  max-width: 1200px;
`

// bg
const IgloosBgContainer = styled.div`
  background-repeat: repeat;
  background-size: contain;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0px;
  left: 0px;
  z-index: -1;
`

const BgWrapper = styled.div`
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  z-index: -1;
`

// banner
const IgloosBannerContainer = styled.div`
  margin-bottom: 24px;

  @media (min-width: 640px) {
    margin-bottom: 0px;
  }
`
const BannerImage = styled.img`
  z-index: -1;
`

// tvl container
const TvlContainer = styled(Flex)`
  color: ${({ theme }) => (theme.isDark ? '#bba6dd' : '#372871')};
  font-size: 28px;
  font-weight: 600;
  font-family: 'Kanit';
  white-space: break-spaces;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;

  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: flex-start;
  }
`

// apr/apy slider
const TabWrapper = styled.div`
  div {
    border: 2px solid ${({ theme }) => (theme.isDark ? '#221b38' : '#b2b2ce')};
    background-color: ${({ theme }) => (theme.isDark ? '#332654' : '#e8e4ef')};
    border-radius: 18px;
  }
`
const OptionItem = styled(ButtonMenuItem)<{ active: boolean }>`
  min-width: 70px;
  background-color: ${({ active, theme }) => active && theme.colors.red};
  color: ${({ active }) => (active ? 'white' : '#b2b2ce')};
  margin: 0px !important;
`

const SelectWrapper = styled.div`
  div {
    color: ${({ theme }) => theme.isDark && '#372871'};
    > div:first-child {
      > div {
        background: ${({ theme }) => theme.isDark && '#bba6dd'};
      }
    }
    > div:last-child {
      background: ${({ theme }) => theme.isDark && '#bba6dd'};
    }
  }
`

const StyledInput = styled(Input)`
  border: 1px solid transparent;
  color: ${({ theme }) => theme.isDark && '#372871'};
  background: ${({ theme }) => theme.isDark && '#bba6dd'};
  ::placeholder {
    color: ${({ theme }) => theme.isDark && '#927fbc'};
  }

  &:focus {
    box-shadow: none !important;
    border: ${({ theme }) => (theme.isDark ? '1px solid #66578d' : '1px solid #d7caec')};
  }
`

const ProjectLogo = styled.img<{ isActive?: boolean }>`
  width: 40px;
  height: 40px;
  margin-left: 8px;
  margin-right: 8px;
  cursor: pointer;
  opacity: ${({ isActive }) => (isActive ? 1 : 0.3)};
`

const FilterText = styled(Text)`
  white-space: nowrap;
`

const FilterWrapper = styled(Flex)`
  flex-direction: column;
  align-items: center;
  margin-top: -16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: -40px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    padding: 8px 8px 0;
    margin-top: -64px;
  }
`

const LeftFilters = styled(Flex)`
  flex-direction: column;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.xs} {
    flex-direction: row;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`

const ToggleWrapper = styled.div<{ checked?: boolean }>`
  div {
    height: 32px;
    width: 56px;
    background: ${({ checked, theme }) => theme.isDark && !checked && '#bba6dd'};
    background: ${({ checked, theme }) => theme.isDark && checked && '#d4444c'};
    background: ${({ checked, theme }) => !theme.isDark && checked && '#ec3e3f'};

    div {
      height: 24px;
      width: 24px;
      left: ${({ checked }) => checked && 'calc(100% - 28px) !important'};
      background: white;
    }
  }
`

// content
const IgloosContentContainer = styled.div`
  position: relative;
`

// tooltip
const CustomToolTipOrigin = styled.div``

const CustomAprToolTip = styled(ReactTooltip)<{ isMobile?: boolean }>`
  width: 100% !important;
  max-width: ${(props) => (props.isMobile ? '280px' : '310px')} !important;
  background: ${({ theme }) => (theme.isDark ? '#ffffff!important' : '#322C59!important')};
  box-shadow: ${(props) => `${props.theme.card.boxShadow}!important`};
  color: ${({ theme }) => (theme.isDark ? '#322C59!important' : '#ffffff!important')};
  opacity: 1 !important;
  padding: 0px 16px !important;
  font-size: 16px !important;
  border: 2px solid #fff !important;
  border-radius: 16px !important;
  margin-top: 0px !important;
  margin-left: ${(props) => props.isMobile && '-60px !important'};
  > div {
    width: 100%;
    min-height: 108px;
    white-space: pre-wrap !important;
  }
  p {
    margin-bottom: -20px !important;
    line-height: 1.3;
    &:first-child {
      margin-top: -20px !important;
    }
    &:last-child {
      margin-bottom: -20px !important;
    }
  }
  &:before {
    border-top-color: #ffffff !important;
    border-bottom-color: #ffffff !important;
    left: ${(props) => props.isMobile && '72% !important'};
  }
  &:after {
    border-top-color: ${({ theme }) => (theme.isDark ? '#ffffff!important' : '#322C59')};
    border-bottom-color: ${({ theme }) => (theme.isDark ? '#ffffff!important' : '#322C59')};
    left: ${(props) => props.isMobile && '72% !important'};
  }
`

export default Farms
