import React, { useEffect, useCallback, useState, useMemo } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Flex, Text, Toggle, Input } from 'penguinfinance-uikit2';
// import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
// import { SECONDS_PER_WEEK, WEEKS_PER_YEAR, PEFI_POOL_PID } from 'config'
import Page from 'components/layout/Page'
import { useV2Farms } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchV2FarmUserDataAsync } from 'state/actions'
import Select from 'components/Select/Select'
import FarmTable from './components/FarmTable/FarmTable'
import { FarmWithStakedValue } from './components/types'

const Farms: React.FC = () => {
  const { path } = useRouteMatch()
  const { account } = useWeb3React()
  const v2FarmsLP = useV2Farms()
  const [sortType, setSortType] = useState('farm-tvl')
  const [showStakedOnly, setShowStakedOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    if (account) {
      dispatch(fetchV2FarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const activeFarms = v2FarmsLP.filter((farm) => farm.type === 'Pangolin' && farm.multiplier !== '0X')

  const filteredFarms = useMemo(() => {
    if (searchTerm) {
      return activeFarms.filter(farm => farm.lpSymbol.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return activeFarms
  }, [searchTerm, activeFarms]);

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

  const handleChangeStakedOnly = event => {
    setShowStakedOnly(event.target.checked);
  };

  const handleChangeSearchTerm = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <FarmPage>
      <BgWrapper>
        <IgloosBgContainer />
      </BgWrapper>
      <IgloosBannerContainer>
        <BannerImage src={`${process.env.PUBLIC_URL}/images/farms/IglooHeader.gif`} alt="igloos banner" />
      </IgloosBannerContainer>
      <Flex justifyContent='space-between' alignItems='center' flexWrap='wrap'>
        <Flex mt='8px' alignItems='center'>
          <Toggle scale='sm' checked={showStakedOnly} onChange={handleChangeStakedOnly} />
          <Text ml='8px' color='textSubtle'>Staked Only</Text>
        </Flex>
        <Flex mt='8px'>
          <Flex flexDirection='column'>
            <Text fontSize='12px' textTransform="uppercase" color='textSubtle'>Sort by</Text>
            <SelectWrapper>
              <Select
                value={sortType}
                options={[
                  { label: 'Farm TVL', value: 'farm-tvl' },
                  { label: 'APY', value: 'apy' },
                ]}
                onChange={setSortType}
              />
            </SelectWrapper>
          </Flex>
          <Flex flexDirection='column' ml='16px'>
            <Text fontSize='12px' textTransform="uppercase" color='textSubtle'>Search</Text>
            <StyledInput
              placeholder='Search Farms...'
              value={searchTerm}
              onChange={handleChangeSearchTerm}
            />
          </Flex>
        </Flex>
      </Flex>
      {filteredFarms.length > 0 && 
        <IgloosContentContainer>
          <Route exact path={`${path}`}>
            {farmsList(filteredFarms, false)}
          </Route>
        </IgloosContentContainer>
      }
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
`;

const StyledInput = styled(Input)`
  color: ${({ theme }) => theme.colors.textSubtle};
`;

export default Farms
