import React from 'react'
import styled from 'styled-components'
import { Text } from 'penguinfinance-uikit2'
import FlexLayout from 'components/layout/Flex'
import IDOCard from './IDOCard'
import { getUpcomingIDOs } from '../config'

const UpcomingIDOs = () => {
  const upcomingIDOs = getUpcomingIDOs()

  if (upcomingIDOs.length === 0) return null

  return (
    <>
      <Label id="upcoming-idos" fontSize="50px" mb="16px" fontWeight={500} color="white">
        Upcoming IDOs
      </Label>
      <StyledFlexLayout>
        {upcomingIDOs.map((idoData) => {
          return <IDOCard idoData={idoData} />
        })}
      </StyledFlexLayout>
    </>
  )
}

const StyledFlexLayout = styled(FlexLayout)`
  justify-content: center;

  @media (min-width: 640px) {
    justify-content: center;
  }

  @media (min-width: 968px) {
    justify-content: space-between;
  }

  & > * {
    max-width: unset;

    @media (min-width: 768px) {
      min-width: 320px;
      max-width: 600px;
      width: 100%;
    }

    @media (min-width: 968px) {
      min-width: 320px;
      max-width: 46%;
      width: 100%;
    }
  }

  & > * {
    @media (min-width: 1400px) {
      width: 100%;
    }
  }
`

const Label = styled(Text)`
  color: white;
  font-size: 24px;
  line-height: 36px;
  text-align: left;

  @media (min-width: 768px) {
    font-size: 40px;
    line-height: 60px;
    text-align: center;
  }

  @media (min-width: 968px) {
    font-size: 50px;
    line-height: 75px;
    text-align: left;
  }
  @media (max-width: 576px) {
    margin-left: 0px;
  }
`

export default UpcomingIDOs
