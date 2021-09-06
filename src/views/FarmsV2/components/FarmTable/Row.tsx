import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useMatchBreakpoints } from 'penguinfinance-uikit2'
import { useV2FarmUser } from 'state/hooks'
import useDelayedUnmount from 'hooks/useDelayedUnmount'
import useAssets from 'hooks/useAssets'
import { usePangolinLpPrice } from 'hooks/usePrice'
import { WEEKS_PER_YEAR } from 'config'
import { getBalanceNumber } from 'utils/formatBalance'
import Balance from 'components/Balance'
import { getAddress } from 'utils/addressHelpers'

import Farm from './Farm'
import Earned from './Earned'
import Details from './Details'
import CellLayout from './CellLayout'
import ActionPanel from './Actions/ActionPanel'
import { DesktopColumnSchema, MobileColumnSchema, FarmCardProps } from '../types'

const CellInner = styled.div<{ justifyContent?: string, minWidth?: number }>`
  padding: 12px 0px;
  display: flex;
  width: 100%;
  align-items: center;
  padding-right: 8px;
  justify-content: ${({ justifyContent }) => justifyContent};
  min-width: unset;

  @media (min-width: 1136px) {
    min-width: ${({ minWidth }) => `${minWidth}px`};
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    padding-right: 16px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    padding-right: 16px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    padding-right: 16px;
  }
`

const StyledTr = styled.tr`
  cursor: pointer;
  border-bottom: 3px solid ${({ theme }) => (theme.isDark ? theme.colors.background : 'rgb(231, 227, 235)')};
`

const EarnedMobileCell = styled.td`
  padding: 16px 0 24px 16px;
`

const AprMobileCell = styled.td`
  padding-top: 16px;
  padding-bottom: 24px;
`

const FarmMobileCell = styled.td`
  padding-top: 24px;
`

const Amount = styled.span`
  color: ${({ theme }) => theme.colors.textSubtle};
  display: flex;
  align-items: center;
`

const TokensWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`

const PendingTokenLogo = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin: 2px 2px;
`

const Row: React.FunctionComponent<FarmCardProps> = (props) => {
  const { farm } = props
  const [lpPrice, setLpPrice] = useState(1)
  const lpAddress = getAddress(farm.lpAddresses)
  const { onFetchLpPrice } = usePangolinLpPrice()
  const { stakedBalance, earnings } = useV2FarmUser(farm.pid, farm.type)
  const hasStakedAmount = !!stakedBalance.toNumber()
  const [actionPanelExpanded, setActionPanelExpanded] = useState(hasStakedAmount)
  const farmAPY =
    farm.apy && farm.apy.times(new BigNumber(WEEKS_PER_YEAR)).times(new BigNumber(100)).toNumber().toFixed(2)
  const shouldRenderChild = useDelayedUnmount(actionPanelExpanded, 300)
  const { isXl, isXs } = useMatchBreakpoints()
  const { getTokenLogo } = useAssets()

  const { pendingTokens } = farm
  const pendingTokensWithLogo =
    pendingTokens &&
    pendingTokens.map((pendingTokenAddress) => {
      return { address: pendingTokenAddress, logo: getTokenLogo(pendingTokenAddress) }
    })
  const liquidity = farm.totalLp ? getBalanceNumber(farm.totalLp) * lpPrice : '-'
  const stakedBalanceInUsd = stakedBalance ? getBalanceNumber(stakedBalance) * lpPrice : '-'

  const toggleActionPanel = () => {
    setActionPanelExpanded(!actionPanelExpanded)
  }

  const onSetLpPrice = async () => {
    const _lpPrice = await onFetchLpPrice(lpAddress)
    setLpPrice(_lpPrice)
  }

  useEffect(() => {
    setActionPanelExpanded(hasStakedAmount)
  }, [hasStakedAmount])

  useEffect(() => {
    onSetLpPrice()
    setInterval(() => {
      onSetLpPrice()
    }, 20000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isMobile = !isXl
  const tableSchema = isMobile ? MobileColumnSchema : DesktopColumnSchema
  const columnNames = tableSchema.map((column) => column.name)

  const handleRenderRow = () => {
    if (!isXs) {
      return (
        <StyledTr onClick={toggleActionPanel}>
          {columnNames.map((key) => {
            switch (key) {
              case 'farm':
                return (
                  <td key={key}>
                    <CellInner>
                      <CellLayout>
                        <Farm {...props} />
                      </CellLayout>
                    </CellInner>
                  </td>
                )
              case 'staked':
                return (
                  <td key={key}>
                    <CellInner minWidth={110}>
                      <CellLayout label="Your Stake">
                        {/* <Earned earnings={stakedBalanceInUsd} pid={farm.pid} userDataReady /> */}
                        <Balance fontSize="16px" fontWeight="400" prefix="$" value={Number(stakedBalanceInUsd)} />
                      </CellLayout>
                    </CellInner>
                  </td>
                )
              case 'apr':
                return (
                  <td key={key}>
                    <CellInner minWidth={110}>
                      <CellLayout label="APR">
                        <Amount>{`${farmAPY || '--'}%`}</Amount>
                      </CellLayout>
                    </CellInner>
                  </td>
                )
              case 'liquidity':
                return (
                  <td key={key}>
                    <CellInner minWidth={100}>
                      <CellLayout label="Liquidity">
                        <Balance fontSize="16px" fontWeight="400" prefix="$" value={Number(liquidity)} />
                      </CellLayout>
                    </CellInner>
                  </td>
                )
              case 'rewards':
                return (
                  <td key={key}>
                    <CellInner minWidth={120} justifyContent='center'>
                      <CellLayout label="Rewards" alignItems='center'>
                        <TokensWrapper>
                          {pendingTokensWithLogo &&
                            pendingTokensWithLogo.map((row) => {
                              return <div>{row.logo && <PendingTokenLogo src={row.logo} alt="logo" />}</div>
                            })}
                        </TokensWrapper>
                      </CellLayout>
                    </CellInner>
                  </td>
                )
              case 'details':
                return (
                  <td key={key}>
                    <CellInner justifyContent='center'>
                      <CellLayout>
                        <Details actionPanelToggled={actionPanelExpanded} />
                      </CellLayout>
                    </CellInner>
                  </td>
                )
              default:
                return (
                  <td key={key}>
                    <CellInner />
                  </td>
                )
            }
          })}
        </StyledTr>
      )
    }

    return (
      <StyledTr onClick={toggleActionPanel}>
        <td>
          <tr>
            <FarmMobileCell>
              <CellLayout>
                <Farm {...props} />
              </CellLayout>
            </FarmMobileCell>
          </tr>
          <tr>
            <EarnedMobileCell>
              <CellLayout label="Earned">
                <Earned earnings={earnings} pid={farm.pid} userDataReady />
              </CellLayout>
            </EarnedMobileCell>
            <AprMobileCell>
              <CellLayout label="APR">
                <Amount>{`${farmAPY || '--'}%`}</Amount>
              </CellLayout>
            </AprMobileCell>
          </tr>
        </td>
        <td>
          <CellInner>
            <CellLayout>
              <Details actionPanelToggled={actionPanelExpanded} />
            </CellLayout>
          </CellInner>
        </td>
      </StyledTr>
    )
  }

  return (
    <>
      {handleRenderRow()}
      {shouldRenderChild && (
        <tr>
          <td colSpan={6}>
            <ActionPanel {...props} lpPrice={lpPrice} expanded={actionPanelExpanded} />
          </td>
        </tr>
      )}
    </>
  )
}

export default Row
