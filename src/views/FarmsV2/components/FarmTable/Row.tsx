import React, { useState } from 'react'
import styled from 'styled-components'
import { useMatchBreakpoints, Flex, Text } from 'penguinfinance-uikit2'
import ReactTooltip from 'react-tooltip'
import { useV2FarmUser } from 'state/hooks'
import useDelayedUnmount from 'hooks/useDelayedUnmount'
import useAssets from 'hooks/useAssets'
import { getBalanceNumber } from 'utils/formatBalance'
import Balance from 'components/Balance'
import useTheme from 'hooks/useTheme'
import useUserSetting from 'hooks/useUserSetting'
import tokens from 'config/constants/tokens'
import { getAddress, getJoeTokenAddress } from 'utils/addressHelpers'
import Farm from './Farm'
import Details from './Details'
import CellLayout from './CellLayout'
import ActionPanel from './Actions/ActionPanel'
import { DesktopColumnSchema, MobileColumnSchema, FarmCardProps } from '../types'

interface RowProps extends FarmCardProps {
  index: number
}

const Row: React.FunctionComponent<RowProps> = (props) => {
  const [actionPanelExpanded, setActionPanelExpanded] = useState(false)

  const { farm, index } = props
  const { isIglooAprMode } = useUserSetting()
  const { stakedBalance } = useV2FarmUser(farm.pid, farm.type)
  const shouldRenderChild = useDelayedUnmount(actionPanelExpanded, 300)
  const { isXl } = useMatchBreakpoints()
  const { getTokenLogo } = useAssets()
  const { isDark, theme } = useTheme()
  const joeToken = tokens.find((row) => row.symbol === 'JOE')
  const pngToken = tokens.find((row) => row.symbol === 'PNG')
  const avaxToken = tokens.find((row) => row.symbol === 'AVAX')
  const { pendingTokens } = farm

  const getPendingTokensWithLogo = () => {
    let _pendingTokensWithLogo = pendingTokens
      ? pendingTokens.map((pendingTokenAddress) => {
          return { address: pendingTokenAddress, logo: getTokenLogo(pendingTokenAddress) }
        })
      : []

    if (farm.type === 'Joe') {
      _pendingTokensWithLogo = _pendingTokensWithLogo.filter(
        (row) => row.address.toLowerCase() !== getAddress(pngToken.address).toLowerCase(),
      )

      if (farm.lpSymbol === 'Joe AVAX-TIME LP') {
        _pendingTokensWithLogo = _pendingTokensWithLogo.filter(
          (row) => row.address.toLowerCase() !== getJoeTokenAddress().toLowerCase(),
        )
      }
    }
    if (farm.type === 'Pangolin') {
      _pendingTokensWithLogo = _pendingTokensWithLogo.filter(
        (row) => row.address.toLowerCase() !== getAddress(joeToken.address).toLowerCase(),
      )
    }
    if (farm.isPenguinRush) {
      if (farm.isPenguinRushFinished) {
        return _pendingTokensWithLogo.filter(
          (row) => row.address.toLowerCase() !== getAddress(avaxToken.address).toLowerCase(),
        )
      }

      // if (
      //   _pendingTokensWithLogo.slice(-1)[0] &&
      //   _pendingTokensWithLogo.slice(-1)[0].address.toLowerCase() === getAddress(avaxToken.address).toLowerCase()
      // ) {
      //   return _pendingTokensWithLogo.slice(0, -1)
      // }
    }

    if (farm.isJoeRushFinished) {
      if (farm.isPenguinRush && !farm.isPenguinRushFinished) {
        return _pendingTokensWithLogo
      }
      _pendingTokensWithLogo = _pendingTokensWithLogo.filter(
        (row) => row.address.toLowerCase() !== getAddress(avaxToken.address).toLowerCase(),
      )
    }
    return _pendingTokensWithLogo
  }

  const liquidity = farm.totalLiquidityInUsd
  const stakedBalanceInUsd = stakedBalance ? getBalanceNumber(stakedBalance) * farm.lpPrice : 0
  const farmApr = farm.apr >= 0 ? (100 * Number(farm.apr)).toFixed(2) : 0
  const farmApy = farm.apy >= 0 ? (100 * Number(farm.apy)).toFixed(2) : 0
  const pendingTokensWithLogo = getPendingTokensWithLogo()

  const isMobile = !isXl
  const tableSchema = isMobile ? MobileColumnSchema : DesktopColumnSchema
  const columnNames = tableSchema.map((column) => column.name)

  const toggleActionPanel = () => {
    setActionPanelExpanded(!actionPanelExpanded)
  }

  const getAPRTooltip = () => {
    let additionalStakingAprLabel = ''
    let additionalSwapAprLabel = ''
    if (farm.type === 'Pangolin') {
      additionalStakingAprLabel = 'Pangolin'
      additionalSwapAprLabel = 'Pangolin'
      if (farm.isBenqi) {
        additionalStakingAprLabel = 'Benqi'
      }
    }
    if (farm.type === 'Joe') {
      additionalStakingAprLabel = 'Trader Joe'
      additionalSwapAprLabel = 'Trader Joe'
    }
    if (farm.type === 'Sushi') {
      additionalStakingAprLabel = 'Sushiswap'
      additionalSwapAprLabel = 'Sushiswap'
    }
    if (farm.type === 'Lydia') {
      additionalStakingAprLabel = 'Lydia Finance'
      additionalSwapAprLabel = 'Lydia Finance'
    }
    const mainApr = 100 * (farm.pefiApr || 0)
    const additionalStakingApr = 100 * (farm.stakingApr || 0)
    const additionalSwapFeeApr = 100 * (farm.swapFeeApr || 0)
    const minwApr = 100 * (farm.minwApr || 0)
    const joeRushRewardApr = 100 * (farm.joeRushRewardApr || 0)
    const penguinRushRewardApr = 100 * (farm.penguinRushRewardApr || 0)
    const totalApr = 100 * (farm.apr || 0)

    const mainApy = 100 * (farm.pefiApy || 0)
    const additionalStakingApy = 100 * (farm.stakingApy || 0)
    const additionalSwapFeeApy = 100 * (farm.swapFeeApy || 0)
    const minwApy = 100 * (farm.minwApy || 0)
    const joeRushRewardApy = 100 * (farm.joeRushRewardApy || 0)
    const penguinRushRewardApy = 100 * (farm.penguinRushRewardApy || 0)
    const totalApy = 100 * (farm.apy || 0)

    if (isIglooAprMode) {
      return `
        <div style="display: flex; width: 100%; align-items: center;">
          <div style="width: 60%; text-align: center;">
            <p>Penguin Finance</p>
            <p>${additionalStakingAprLabel} Staking</p>
            <p>${additionalSwapAprLabel} Swap</p>
            ${
              minwApr > 0
                ? '<p>MINW Campaign</p>'
                : '<p style="line-height: 0px; height: 0px; margin-bottom: -30px !important;"></p>'
            }
            ${
              joeRushRewardApr > 0
                ? '<p>Joe Rush</p>'
                : '<p style="line-height: 0px; height: 0px; margin-bottom: -30px !important;"></p>'
            }
            ${
              farm.isPenguinRush && !farm.isPenguinRushFinished
                ? '<p>Penguin Rush</p>'
                : '<p style="line-height: 0px; height: 0px; margin-bottom: -30px !important;"></p>'
            }
            <p>Total APR</p>
          </div>
          <div style="margin-left: 5px; padding-right: 5px; ">
            <p style="font-weight: 500">${mainApr.toFixed(2)}% APR</p>
            <p style="font-weight: 500">${additionalStakingApr.toFixed(2)}% APR</p>
            <p style="font-weight: 500">${additionalSwapFeeApr.toFixed(2)}% APR</p>
            ${
              minwApr > 0
                ? `<p style="font-weight: 500">${minwApr.toFixed(2)}% APR</p>`
                : '<p style="line-height: 0px; height: 0px; margin-bottom: -30px !important;"></p>'
            }
            ${
              joeRushRewardApr > 0
                ? `<p style="font-weight: 500">${joeRushRewardApr.toFixed(2)}% APR</p>`
                : '<p style="line-height: 0px; height: 0px; margin-bottom: -30px !important;"></p>'
            }
            ${
              farm.isPenguinRush && !farm.isPenguinRushFinished
                ? `<p style="font-weight: 500">${penguinRushRewardApr.toFixed(2)}% APR</p>`
                : '<p style="line-height: 0px; height: 0px; margin-bottom: -30px !important;"></p>'
            }
            <p style="color: ${theme.colors.red}; font-weight: 500">${totalApr.toFixed(2)}% APR</p>
          </div>
        </div>
      `
    }

    return `
        <div style="display: flex; width: 100%; align-items: center;">
          <div style="width: 60%; text-align: center;">
            <p>Penguin Finance</p>
            <p>${additionalStakingAprLabel} Staking</p>
            <p>${additionalSwapAprLabel} Swap</p>
            ${
              minwApy > 0
                ? '<p>MINW Campaign</p>'
                : '<p style="line-height: 0px; height: 0px; margin-bottom: -30px !important;"></p>'
            }
            ${
              joeRushRewardApy > 0
                ? '<p>Joe Rush</p>'
                : '<p style="line-height: 0px; height: 0px; margin-bottom: -30px !important;"></p>'
            }
            ${
              farm.isPenguinRush && !farm.isPenguinRushFinished
                ? '<p>Penguin Rush</p>'
                : '<p style="line-height: 0px; height: 0px; margin-bottom: -30px !important;"></p>'
            }
            <p>Total APY</p>
          </div>
          <div style="margin-left: 5px; padding-right: 5px; ">
            <p style="font-weight: 500">${mainApy.toFixed(2)}% APY</p>
            <p style="font-weight: 500">${additionalStakingApy.toFixed(2)}% APY</p>
            <p style="font-weight: 500">${additionalSwapFeeApy.toFixed(2)}% APY</p>
            ${
              minwApy > 0
                ? `<p style="font-weight: 500">${minwApy.toFixed(2)}% APY</p>`
                : '<p style="line-height: 0px; height: 0px; margin-bottom: -30px !important;"></p>'
            }
            ${
              joeRushRewardApy > 0
                ? `<p style="font-weight: 500">${joeRushRewardApy.toFixed(2)}% APY</p>`
                : '<p style="line-height: 0px; height: 0px; margin-bottom: -30px !important;"></p>'
            }
            ${
              farm.isPenguinRush && !farm.isPenguinRushFinished
                ? `<p style="font-weight: 500">${penguinRushRewardApy.toFixed(2)}% APY</p>`
                : '<p style="line-height: 0px; height: 0px; margin-bottom: -30px !important;"></p>'
            }
            <p style="color: ${theme.colors.red}; font-weight: 500">${totalApy.toFixed(2)}% APY</p>
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
                      <CellLayout label={isIglooAprMode ? 'APR' : 'APY'}>
                        <CustomToolTipOrigin data-for={`apr-tooltip-${index}`} data-tip={getAPRTooltip()}>
                          <AprBalanceWrapper>
                            {/* <Balance
                              fontSize="16px"
                              fontWeight="600"
                              color={isDark ? '#C74F51' : 'red'}
                              suffix="%"
                              decimals={2}
                              value={isIglooAprMode ? Number(farmApr) : Number(farmApy)}
                            /> */}
                            <Text fontSize="16px" fontWeight="600" color={isDark ? '#C74F51' : 'red'}>
                              {isIglooAprMode && (
                                <Amount isPenguinRush={farm.isPenguinRush && !farm.isPenguinRushFinished}>{`${
                                  farm.isPenguinRush && !farm.isPenguinRushFinished
                                    ? `${((Number(farm.apr || 0) - Number(farm.penguinRushRewardApr || 0)) * 100 + Number(farm.penguinRushRewardApr || 0) * 100).toFixed(2)}` ||
                                      '--'
                                    : Number(farmApr) || '--'
                                }%`}</Amount>
                              )}
                              {!isIglooAprMode && (
                                <Amount isPenguinRush={farm.isPenguinRush && !farm.isPenguinRushFinished}>{`${
                                  farm.isPenguinRush && !farm.isPenguinRushFinished
                                    ? `${(100 * (Number(farm.apy) - Number(farm.penguinRushRewardApy)) + 100 * Number(farm.penguinRushRewardApy)).toFixed(
                                        2,
                                      )}` || '--'
                                    : farmApy || '--'
                                }%`}</Amount>
                              )}
                            </Text>
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
                            pendingTokensWithLogo.map((row, _idx) => {
                              const idx = _idx
                              return (
                                <div key={`farm-${farm.pid}-reward-token-${row.address}-${idx}`}>
                                  {row.logo && <PendingTokenLogo src={row.logo} alt="logo" />}
                                </div>
                              )
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
          <Flex flexDirection="column">
            <FarmMobileCell>
              <CellLayout>
                <Farm {...props} />
              </CellLayout>
            </FarmMobileCell>
            <Flex margin="16px 0 24px 16px" justifyContent="space-between">
              <EarnedMobileCell>
                <CellLayout label="Your Stake">
                  <Balance fontSize="16px" fontWeight="400" prefix="$" value={Number(stakedBalanceInUsd)} />
                </CellLayout>
              </EarnedMobileCell>
              <AprMobileCell>
                <CellLayout label={isIglooAprMode ? 'APR' : 'APY'}>
                  {isIglooAprMode && (
                    <Amount isPenguinRush={farm.isPenguinRush && !farm.isPenguinRushFinished}>{`${
                      farm.isPenguinRush && !farm.isPenguinRushFinished
                        ? `${((Number(farm.apr || 0) - Number(farm.penguinRushRewardApr || 0)) * 100).toFixed(2)}% + ${(
                            Number(farm.penguinRushRewardApr || 0) * 100
                          ).toFixed(2)}` || '--'
                        : Number(farmApr) || '--'
                    }%`}</Amount>
                  )}
                  {!isIglooAprMode && (
                    <Amount isPenguinRush={farm.isPenguinRush && !farm.isPenguinRushFinished}>{`${
                      farm.isPenguinRush && !farm.isPenguinRushFinished
                        ? `${(100 * (Number(farm.apy) - Number(farm.penguinRushRewardApy))).toFixed(2)} + ${(
                            100 * Number(farm.penguinRushRewardApy)
                          ).toFixed(2)}` || '--'
                        : farmApy || '--'
                    }%`}</Amount>
                  )}
                </CellLayout>
              </AprMobileCell>
            </Flex>
          </Flex>
        </td>
        <MobileActions>
          <DetailsCellInner>
            <CellLayout>
              <Details actionPanelToggled={actionPanelExpanded} />
            </CellLayout>
          </DetailsCellInner>
        </MobileActions>
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

const DetailsCellInner = styled(CellInner)`
  justify-content: flex-end;
  padding-right: 24px;
  @media (max-width: 480px) {
    padding-right: 8px;
  }
`

const MobileActions = styled.td`
  width: 100px;
`

const StyledTr = styled.tr<{ shouldRenderChild?: boolean }>`
  cursor: pointer;
  border-bottom: ${({ theme, shouldRenderChild }) =>
    !shouldRenderChild && `3px solid ${theme.isDark ? theme.colors.background : 'rgb(231, 227, 235)'}`};
`

const EarnedMobileCell = styled.td`
  width: 60%;
`

const AprBalanceWrapper = styled.div`
  > div {
    font-family: 'Kanit';
  }
`

const AprMobileCell = styled.td`
  width: 40%;
`

const FarmMobileCell = styled.td`
  padding-top: 24px;
`

const Amount = styled.span<{ isPenguinRush?: boolean }>`
  color: ${({ theme }) => theme.colors.textSubtle};
  color: ${({ theme, isPenguinRush }) => isPenguinRush && theme.isDark && '#da4b48'};
  color: ${({ theme, isPenguinRush }) => isPenguinRush && !theme.isDark && theme.colors.red};
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
    width: 16%;
  }
  .apr {
    width: 12%;
  }
  .liquidity {
    width: 15%;
  }
  .rewards {
    width: 18%;
  }
  .actions {
    width: 7%;
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
  max-width: 310px !important;
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

export default Row
