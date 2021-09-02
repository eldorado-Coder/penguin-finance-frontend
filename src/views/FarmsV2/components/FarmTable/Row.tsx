import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useMatchBreakpoints } from 'penguinfinance-uikit2'
import { useFarmUser } from 'state/hooks'
import useDelayedUnmount from 'hooks/useDelayedUnmount'
import useAssets from 'hooks/useAssets'
import { WEEKS_PER_YEAR } from 'config'
import Farm from './Farm'
import Earned from './Earned'
import Details from './Details'
import CellLayout from './CellLayout'
import ActionPanel from './Actions/ActionPanel'
import { DesktopColumnSchema, MobileColumnSchema, FarmCardProps } from '../types'

const CellInner = styled.div`
  padding: 12px 0px;
  display: flex;
  width: 100%;
  align-items: center;
  padding-right: 8px;

  ${({ theme }) => theme.mediaQueries.xl} {
    padding-right: 32px;
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
`

const PendingTokenLogo = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 2px 2px;
`

const Row: React.FunctionComponent<FarmCardProps> = (props) => {
  const { farm } = props
  const { stakedBalance, earnings } = useFarmUser(farm.pid, farm.type)
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

  const toggleActionPanel = () => {
    setActionPanelExpanded(!actionPanelExpanded)
  }

  useEffect(() => {
    setActionPanelExpanded(hasStakedAmount)
  }, [hasStakedAmount])

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
              case 'earned':
                return (
                  <td key={key}>
                    <CellInner>
                      <CellLayout label="Earned">
                        <Earned earnings={earnings} pid={farm.pid} userDataReady />
                      </CellLayout>
                    </CellInner>
                  </td>
                )
              case 'details':
                return (
                  <td key={key}>
                    <CellInner>
                      <CellLayout>
                        <Details actionPanelToggled={actionPanelExpanded} />
                      </CellLayout>
                    </CellInner>
                  </td>
                )
              case 'apr':
                return (
                  <td key={key}>
                    <CellInner>
                      <CellLayout label="APR">
                        <Amount>{`${farmAPY || '--'}%`}</Amount>
                      </CellLayout>
                    </CellInner>
                  </td>
                )
              case 'rewards':
                return (
                  <td key={key}>
                    <CellInner>
                      <CellLayout label="Rewards">
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
              case 'liquidity':
                return (
                  <td key={key}>
                    <CellInner>
                      <CellLayout label="Liquidity">
                        <Amount>$498,136</Amount>
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
            <ActionPanel {...props} expanded={actionPanelExpanded} />
          </td>
        </tr>
      )}
    </>
  )
}

export default Row
