import React from 'react'
import styled from 'styled-components'
import { Card } from 'penguinfinance-uikit2'

const LearnMorePefiCard = () => {
  const onClickCard = () => {
    window.open('https://docs.penguinfinance.io/', '_blank')
  }

  return <StyledCard onClick={onClickCard} />
}

const StyledCard = styled(Card)`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  width: 100%;
  background-size: cover;
  background-position: left center;
  background-image: url('/images/home-v2/learn_more_new.png');
  border-radius: 26px;
  box-shadow: 0px 1px 8px rgb(0 0 0 / 24%);
  min-height: 110px;
  cursor: pointer;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    min-height: 157px;
  }
`

export default LearnMorePefiCard
