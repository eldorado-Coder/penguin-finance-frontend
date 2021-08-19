import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { LinkExternal } from 'penguinfinance-uikit2'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { CommunityTag, CoreTag } from 'components/Tags'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import HarvestAction from './HarvestAction'
import StakedAction from './StakedAction'
import { FarmCardProps } from '../../types';

const expandAnimation = keyframes`
  from {
    max-height: 0px;
  }
  to {
    max-height: 500px;
  }
`

const collapseAnimation = keyframes`
  from {
    max-height: 500px;
  }
  to {
    max-height: 0px;
  }
`

const Container = styled.div<{ expanded }>`
  animation: ${({ expanded }) =>
    expanded
      ? css`
          ${expandAnimation} 300ms linear forwards
        `
      : css`
          ${collapseAnimation} 300ms linear forwards
        `};
  overflow: hidden;
  background: ${({ theme }) => theme.isDark ? '#121021' : theme.colors.background};
  display: flex;
  width: 100%;
  flex-direction: column-reverse;
  padding: 24px;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    padding: 16px 32px;
  }
`

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
`

const StakeContainer = styled.div`
  color: ${({ theme }) => theme.colors.text};
  align-items: center;
  display: flex;
  justify-content: space-between;

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
  }
`

const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 16px;
  }

  > div {
    height: 24px;
    padding: 0 6px;
    font-size: 14px;
    margin-right: 4px;

    svg {
      width: 14px;
    }
  }
`

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    flex-basis: 0;
  }
`

const InfoContainer = styled.div`
  min-width: 200px;
`

const ActionPanel: React.FunctionComponent<FarmCardProps> = ({
  farm,
  expanded,
}) => {
  const isActive = farm.multiplier !== '0X'
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAddresses: farm.quoteTokenAddresses, quoteTokenSymbol: farm.quoteTokenSymbol, tokenAddresses: farm.tokenAddresses })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`

  const chainLink = `https://cchain.explorer.avax.network/address/${
    farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]
  }`
  const info = `https://info.pangolin.exchange/#/pair/${farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]}`

  return (
    <Container expanded={expanded}>
      <InfoContainer>
        {isActive && (
          <StakeContainer>
            <StyledLinkExternal href={addLiquidityUrl}>
              {`Get ${farm.lpSymbol.toUpperCase()}`}
            </StyledLinkExternal>
          </StakeContainer>
        )}
        <StyledLinkExternal href={chainLink}>View Contract</StyledLinkExternal>
        <StyledLinkExternal href={info}>See Pair Info</StyledLinkExternal>
        <TagsContainer>
          {farm.isCommunity ? <CommunityTag /> : <CoreTag />}
        </TagsContainer>
      </InfoContainer>
      <ActionContainer>
        <HarvestAction {...farm} />
        <StakedAction {...farm} />
      </ActionContainer>
    </Container>
  )
}

export default ActionPanel
