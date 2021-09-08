import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Flex, Text, Toggle, Input, useMatchBreakpoints, ButtonMenu, ButtonMenuItem } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import Page from 'components/layout/Page'
import Select from 'components/Select/Select'
import { useV2Farms, usePricePefiUsdt } from 'state/hooks'
import { fetchV2FarmUserDataAsync } from 'state/actions'
import useRefresh from 'hooks/useRefresh'
import useTheme from 'hooks/useTheme';
import { getBalanceNumber } from 'utils/formatBalance'
import { DAYS_PER_YEAR } from 'config'
import { getApy } from 'utils/apyHelpers'

import V1Farms from './V1'
import V2Farms from './V2'

const PROJECT_LIST = [
  { src: '/images/farms-v2/penguin.svg', name: 'Penguin' },
  { src: '/images/farms-v2/joe.svg', name: 'Joe' },
  { src: '/images/farms-v2/pangolin.svg', name: 'Pangolin' },
]

const Farms: React.FC = () => {
  const [sortType, setSortType] = useState('liquidity')
  const [showStakedOnly, setShowStakedOnly] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeProjects, setActiveProjects] = useState(PROJECT_LIST.map((row) => row.name))
  const [activeTab, setActiveTab] = useState(0) // 0: v2, 1: v1

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  const { account } = useWeb3React()
  const v2FarmsLP = useV2Farms()
  const { isXl, isSm } = useMatchBreakpoints()
  const pefiPriceUsd = usePricePefiUsdt().toNumber()
  const isMobile = !isXl;
  const theme = useTheme();

  useEffect(() => {
    if (account) {
      dispatch(fetchV2FarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const activeFarms = v2FarmsLP.filter((farm) => Number(farm.multiplier) > 0)
  const activeFarmsWithApy = activeFarms.map((farm) => {
    const pefiPerYear = getBalanceNumber(farm.pefiPerYear)
    const pefiPerDay = pefiPerYear / DAYS_PER_YEAR
    const pefiRewardPerDayInUsd = pefiPriceUsd * pefiPerDay

    const totalLp = getBalanceNumber(farm.totalLp)
    const liquidityInUsd = totalLp ? totalLp * farm.lpPrice : 0

    const pefiDailyApr = pefiRewardPerDayInUsd / liquidityInUsd
    const { pngDailyApr } = farm
    const pngApy = getApy(pngDailyApr)
    const pefiApy = getApy(pefiDailyApr) === Infinity ? 999999 : getApy(pefiDailyApr)

    return { ...farm, pefiDailyApr, apr: pefiDailyApr + pngDailyApr, apy: pefiApy + pngApy }
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
    setActiveTab(tab)
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
  );

  const renderActiveFilter = (
    <Flex margin={isMobile ? '8px 0' : '8px 16px 8px 0'} justifyContent="center" alignItems="center">
      <TabWrapper>
        <ButtonMenu activeIndex={activeTab} onItemClick={handleSwitchTab} scale="sm">
          <OptionItem active={activeTab === 0}>New (V2)</OptionItem>
          <OptionItem active={activeTab === 1}>Old (V1)</OptionItem>
        </ButtonMenu>
      </TabWrapper>
    </Flex>
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

  return (
    <FarmPage>
      <BgWrapper>
        <IgloosBgContainer />
      </BgWrapper>
      <IgloosBannerContainer>
        <BannerImage src={`${process.env.PUBLIC_URL}/images/farms-v2/Igloo-${theme.isDark ? 'dark' : 'light'}.svg`} alt="igloos banner" />
      </IgloosBannerContainer>
      {isMobile ?
        <FilterWrapper justifyContent="space-between" alignItems="center" flexWrap="wrap">
          <Flex mt='8px' justifyContent='center' mb='8px' flexWrap='wrap'>
            {renderStakedOnlyFilter}
            {renderActiveFilter}
          </Flex>
          {renderSearchAndSortFilter}
          <Flex mt='16px'>
            {renderProjectsFilters}
          </Flex>
        </FilterWrapper>
        : 
        <FilterWrapper justifyContent="space-between" alignItems="center" flexWrap="wrap" mt='-24px'>
          <LeftFilters alignItems="center" mt="16px" justifyContent="space-between" flexWrap={isSm ? 'nowrap' : 'wrap'}>
            {renderStakedOnlyFilter}
            {renderProjectsFilters}
          </LeftFilters>
          <Flex display={isSm ? 'block !important' : 'flex'} mt="16px">
            {renderActiveFilter}
            {renderSearchAndSortFilter}
          </Flex>
        </FilterWrapper>
      }
      <IgloosContentContainer>
        {activeTab === 0 && filteredFarms.length > 0 && <V2Farms farms={filteredFarms} />}
        {activeTab === 1 && 
          <V1Farms 
            searchTerm={searchTerm} 
            showStakedOnly={showStakedOnly} 
            activeProjects={activeProjects} 
            sortType={sortType}
          />
        }
      </IgloosContentContainer>
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
  top: -8px;
  bottom: -8px;
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
    margin-bottom: 64px;
  }
`
const BannerImage = styled.img`
  z-index: -1;
`

// slider
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

export default Farms
