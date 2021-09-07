import React, { useEffect, useCallback, useState, useMemo } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Flex, Text, Toggle, Input } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import Page from 'components/layout/Page'
import { useV2Farms } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { getBalanceNumber } from 'utils/formatBalance'
import { fetchV2FarmUserDataAsync } from 'state/actions'

import Select from 'components/Select/Select'
import FarmTable from './components/FarmTable/FarmTable'
import { FarmWithStakedValue } from './components/types'

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

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  const { path } = useRouteMatch()
  const { account } = useWeb3React()
  const v2FarmsLP = useV2Farms()

  useEffect(() => {
    if (account) {
      dispatch(fetchV2FarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const activeFarms = v2FarmsLP.filter((farm) => Number(farm.multiplier) > 0)

  const filteredFarms = useMemo(() => {
    let farms = [...activeFarms]
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

    return farms
  }, [searchTerm, activeFarms, showStakedOnly, account, activeProjects, sortType])

  const farmsList = useCallback((farmsToDisplay, removed: boolean) => {
    const farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
      return { ...farm, apy: 0 }
    })

    return (
      <FarmTable
        data={farmsToDisplayWithAPY.map((farm) => ({
          farm,
          removed,
        }))}
      />
    )
  }, [])

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

  return (
    <FarmPage>
      <BgWrapper>
        <IgloosBgContainer />
      </BgWrapper>
      <IgloosBannerContainer>
        <BannerImage src={`${process.env.PUBLIC_URL}/images/farms/IglooHeader.gif`} alt="igloos banner" />
      </IgloosBannerContainer>
      <FilterWrapper justifyContent="space-between" alignItems="center" flexWrap="wrap">
        <LeftFilters alignItems="center" justifyContent="space-between" flexWrap="wrap">
          <Flex mt="16px" alignItems="center">
            <ToggleWrapper checked={showStakedOnly}>
              <Toggle checked={showStakedOnly} onChange={handleChangeStakedOnly} />
            </ToggleWrapper>
            <FilterText ml="8px" color="textSubtle">
              Staked Only
            </FilterText>
          </Flex>
        </LeftFilters>
        <Flex mt="16px">
          <Flex ml="16px" mt="16px" mr="16px">
            {PROJECT_LIST.map((project) => {
              const isActiveProject = activeProjects.find((row) => row === project.name)
              return (
                <ProjectLogo
                  key={project.name}
                  src={project.src}
                  alt={project.name}
                  isActive={!!isActiveProject}
                  width="32"
                  onClick={() => handleChangeActiveProject(project.name)}
                />
              )
            })}
          </Flex>

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
            <StyledInput placeholder="Search Farms..." value={searchTerm} onChange={handleChangeSearchTerm} />
          </Flex>
        </Flex>
      </FilterWrapper>
      {filteredFarms.length > 0 && (
        <IgloosContentContainer>
          <Route exact path={`${path}`}>
            {farmsList(filteredFarms, false)}
          </Route>
        </IgloosContentContainer>
      )}
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

// content
const IgloosContentContainer = styled.div`
  position: relative;
`

const SelectWrapper = styled.div`
  div {
    color: ${({ theme }) => theme.colors.textSubtle};
  }
`

const StyledInput = styled(Input)`
  color: ${({ theme }) => theme.colors.textSubtle};
  &:focus {
    box-shadow: none !important;
    border: ${({ theme }) => (theme.isDark ? '1px solid #66578d' : '1px solid #d7caec')};
  }
`

const ProjectLogo = styled.img<{ isActive?: boolean }>`
  width: 32px;
  height: 32px;
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

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    padding: 8px 8px 0;
  }
`

const LeftFilters = styled(Flex)`
  flex-direction: column;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`

const ToggleWrapper = styled.div<{ checked?: boolean }>`
  div {
    height: 32px;
    width: 56px;
    background: ${({ checked, theme }) => theme.isDark && !checked && '#bba6dd'};

    div {
      height: 24px;
      width: 24px;
      left: ${({ checked }) => checked && 'calc(100% - 28px) !important'};
      background: white;
    }
  }
`

export default Farms
