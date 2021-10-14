import React, { useState } from 'react'
import styled from 'styled-components'
import { useMatchBreakpoints, Flex } from 'penguinfinance-uikit2'
import ReactTooltip from 'react-tooltip'
import { useV2FarmUser } from 'state/hooks'
import useDelayedUnmount from 'hooks/useDelayedUnmount'
import useAssets from 'hooks/useAssets'
import { getBalanceNumber } from 'utils/formatBalance'
import Balance from 'components/Balance'
import useTheme from 'hooks/useTheme'
import Farm from './Farm'
import Details from './Details'
import CellLayout from './CellLayout'
import ActionPanel from './Actions/ActionPanel'
import { DesktopColumnSchema, MobileColumnSchema, FarmCardProps } from '../types'

const CellInner = styled.div<{ justifyContent?: string; minWidth?: number; smMinWidth?: number }>`
  padding: 12px 0px;
  display: flex;
  width: 100%;
  align-items: center;
  padding-right: 8px;
  justify-content: ${({ justifyContent }) => justifyContent};
  min-width: ${({ smMinWidth }) => `${smMinWidth}px`};

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

const StyledTr = styled.tr<{ shouldRenderChild?: boolean }>`
  cursor: pointer;
  border-bottom: ${({ theme, shouldRenderChild }) =>
    !shouldRenderChild && `3px solid ${theme.isDark ? theme.colors.background : 'rgb(231, 227, 235)'}`};
`

const EarnedMobileCell = styled.td`
  padding: 16px 0 24px 16px;
`

const AprBalanceWrapper = styled.div`
  > div {
    font-family: 'Kanit';
  }
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

const StyledTable = styled.table<{ index?: number }>`
  border-collapse: collapse;
  font-size: 14px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  background: ${({ theme }) => theme.card.background};
  border-radius: ${({ index }) => index === 0 && '16px 16px 0 0'};
  box-shadow: 0px 1px 4px rgb(0 0 0 / 16%);

  .name {
    width: 32%;
  }
  .your-stake {
    width: 14%;
  }
  .apr {
    width: 12%;
  }
  .liquidity {
    width: 14%;
  }
  .rewards {
    width: 14%;
  }
  .actions {
    width: 14%;
  }
`

const TableBody = styled.tbody`
  & tr {
    td {
      font-size: 16px;
      vertical-align: middle;
    }
  }
`

// tooltip
const CustomToolTipOrigin = styled.div``

const CustomAprToolTip = styled(ReactTooltip)<{ index: number }>`
  width: 100% !important;
  max-width: 285px !important;
  background: ${({ theme }) => (theme.isDark ? '#ffffff!important' : '#322C59!important')};
  box-shadow: ${(props) => `${props.theme.card.boxShadow}!important`};
  color: ${({ theme }) => (theme.isDark ? '#322C59!important' : '#ffffff!important')};
  opacity: 1 !important;
  padding: 0px 8px !important;
  font-size: 16px !important;
  border: 2px solid #fff !important;
  border-radius: 16px !important;
  margin-top: 0px !important;
  > div {
    width: 100%;
    white-space: pre-wrap !important;
  }
  p {
    margin-bottom: -20px !important;
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
  }
  &:after {
    border-top-color: ${({ theme }) => (theme.isDark ? '#ffffff!important' : '#322C59')};
    border-bottom-color: ${({ theme }) => (theme.isDark ? '#ffffff!important' : '#322C59')};
  }
`

const TableWrapper = styled.div<{ shouldRenderChild?: boolean }>`
  padding: 0 8px;
  margin-bottom: ${({ shouldRenderChild }) => shouldRenderChild && '8px'};
`

interface RowProps extends FarmCardProps {
  index: number
}

const Row: React.FunctionComponent<RowProps> = (props) => {
  const [actionPanelExpanded, setActionPanelExpanded] = useState(false)

  const { farm, index } = props
  const { stakedBalance } = useV2FarmUser(farm.pid, farm.type)
  const shouldRenderChild = useDelayedUnmount(actionPanelExpanded, 300)
  const { isXl } = useMatchBreakpoints()
  const { getTokenLogo } = useAssets()
  const { isDark, theme } = useTheme()

  const { pendingTokens } = farm
  const pendingTokensWithLogo =
    pendingTokens &&
    pendingTokens.map((pendingTokenAddress) => {
      return { address: pendingTokenAddress, logo: getTokenLogo(pendingTokenAddress) }
    })
  const liquidity = farm.totalLiquidityInUsd
  const stakedBalanceInUsd = stakedBalance ? getBalanceNumber(stakedBalance) * farm.lpPrice : 0
  const farmApr = farm.apr >= 0 ? (100 * Number(farm.apr)).toFixed(2) : 0

  const toggleActionPanel = () => {
    setActionPanelExpanded(!actionPanelExpanded)
  }

  const isMobile = !isXl
  const tableSchema = isMobile ? MobileColumnSchema : DesktopColumnSchema
  const columnNames = tableSchema.map((column) => column.name)

  const getAPRTooltip = () => {
    let additionalAprLabel = ''
    if (farm.type === 'Pangolin') {
      additionalAprLabel = 'Pangolin'
    }
    if (farm.type === 'Joe') {
      additionalAprLabel = 'Trader Joe'
    }
    if (farm.type === 'Sushi') {
      additionalAprLabel = 'Sushiswap'
    }
    if (farm.type === 'Lydia') {
      additionalAprLabel = 'Lydia Finance'
    }
    const mainApr = farm.pefiApr || 0
    const additionalStakingApr = farm.stakingApr || 0
    const additionalSwapFeeApr = farm.swapFeeApr || 0
    const additionalBenqiStakingApr = farm.benqiStakingApr || 0
    const totalApr = farm.apr || 0
    if (farm.isBenqi) {
      return `
      <div style="display: flex; width: 100%; align-items: center;">
        <div style="width: 60%; text-align: center;">
          <p>Penguin Finance</p>
          <p>${additionalAprLabel} Staking</p>
          <p>${additionalAprLabel} Swap</p>
          <p>Benqi Staking</p>
          <p>Total APR</p>
        </div>
        <div style="margin-left: 5px; padding-right: 5px; ">
          <p style="font-weight: 500">${(mainApr * 100).toFixed(2)}% APR</p>
          <p style="font-weight: 500">${(additionalStakingApr * 100).toFixed(2)}% APR</p>
          <p style="font-weight: 500">${(additionalSwapFeeApr * 100).toFixed(2)}% APR</p>
          <p style="font-weight: 500">${(additionalBenqiStakingApr * 100).toFixed(2)}% APR</p>
          <p style="color: ${theme.colors.red}; font-weight: 500">${(totalApr * 100).toFixed(2)}% APR</p>
        </div>
      </div>
    `
    }

    return `
      <div style="display: flex; width: 100%; align-items: center;">
        <div style="width: 60%; text-align: center;">
          <p>Penguin Finance</p>
          <p>${additionalAprLabel} Staking</p>
          <p>${additionalAprLabel} Swap</p>
          <p>Total APR</p>
        </div>
        <div style="margin-left: 5px; padding-right: 5px; ">
          <p style="font-weight: 500">${(mainApr * 100).toFixed(2)}% APR</p>
          <p style="font-weight: 500">${(additionalStakingApr * 100).toFixed(2)}% APR</p>
          <p style="font-weight: 500">${(additionalSwapFeeApr * 100).toFixed(2)}% APR</p>
          <p style="color: ${theme.colors.red}; font-weight: 500">${(totalApr * 100).toFixed(2)}% APR</p>
        </div>
      </div>
    `
  }

  const handleRenderRow = () => {
    if (!isMobile) {
      return (
        <StyledTr shouldRenderChild={shouldRenderChild} onClick={toggleActionPanel}>
          {columnNames.map((key) => {
            switch (key) {
              case 'farm':
                return (
                  <td className="name" key={key}>
                    <CellInner>
                      <CellLayout>
                        <Farm {...props} />
                      </CellLayout>
                    </CellInner>
                  </td>
                )
              case 'staked':
                return (
                  <td className="your-stake" key={key}>
                    <CellInner>
                      <CellLayout label="Your Stake">
                        <Balance fontSize="16px" fontWeight="400" prefix="$" value={Number(stakedBalanceInUsd)} />
                      </CellLayout>
                    </CellInner>
                  </td>
                )
              case 'apr':
                return (
                  <td className="apr" key={key}>
                    <CellInner>
                      <CellLayout label="APR">
                        <CustomToolTipOrigin data-for={`apr-tooltip-${index}`} data-tip={getAPRTooltip()}>
                          <AprBalanceWrapper>
                            <Balance
                              fontSize="16px"
                              fontWeight="600"
                              color={isDark ? '#C74F51' : 'red'}
                              suffix="%"
                              decimals={2}
                              value={Number(farmApr) || 0}
                            />
                          </AprBalanceWrapper>
                        </CustomToolTipOrigin>
                      </CellLayout>
                    </CellInner>
                    <CustomAprToolTip
                      id={`apr-tooltip-${index}`}
                      wrapper="div"
                      delayHide={0}
                      effect="solid"
                      index={index}
                      multiline
                      place="top"
                      html
                    />
                  </td>
                )
              case 'liquidity':
                return (
                  <td className="liquidity" key={key}>
                    <CellInner>
                      <CellLayout label="Liquidity">
                        <Balance fontSize="16px" fontWeight="400" prefix="$" value={Number(liquidity) || 0} />
                      </CellLayout>
                    </CellInner>
                  </td>
                )
              case 'rewards':
                return (
                  <td className="rewards" key={key}>
                    <CellInner justifyContent="center">
                      <CellLayout label="Rewards" alignItems="center">
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
                  <td className="actions" key={key}>
                    <CellInner justifyContent="center">
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
      <StyledTr shouldRenderChild={shouldRenderChild} onClick={toggleActionPanel}>
        <td>
          <tr>
            <Flex flexDirection="column">
              <FarmMobileCell>
                <CellLayout>
                  <Farm {...props} />
                </CellLayout>
              </FarmMobileCell>
              <Flex justifyContent="space-between">
                <EarnedMobileCell>
                  <CellLayout label="Your Stake">
                    <Balance fontSize="16px" fontWeight="400" prefix="$" value={Number(stakedBalanceInUsd)} />
                  </CellLayout>
                </EarnedMobileCell>
                <AprMobileCell>
                  <CellLayout label="APR">
                    <Amount>{`${farmApr || '--'}%`}</Amount>
                  </CellLayout>
                </AprMobileCell>
              </Flex>
            </Flex>
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
      <TableWrapper shouldRenderChild={shouldRenderChild}>
        <StyledTable index={index}>
          <TableBody>{handleRenderRow()}</TableBody>
        </StyledTable>
      </TableWrapper>
      {shouldRenderChild && <ActionPanel {...props} lpPrice={farm.lpPrice} expanded={actionPanelExpanded} />}
    </>
  )
}

export default Row
