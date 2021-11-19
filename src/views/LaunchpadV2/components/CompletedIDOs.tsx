import React from 'react'
import styled from 'styled-components'
import { Text } from 'penguinfinance-uikit2'
import FlexLayout from 'components/layout/Flex'
import IDOCard from './IDOCard'
import { completedIDOs } from '../config'

const CompletedIDOs = () => {
  return (
    <>
      <Label fontSize="40px" lineHeight="60px" mt="48px" mb="16px" fontWeight={500} color="white">
        Completed IDOs
      </Label>
      <StyledFlexLayout>
        {completedIDOs.map((idoData) => {
          return <IDOCard idoData={idoData} />
        })}
      </StyledFlexLayout>
    </>
  )
}

const StyledFlexLayout = styled(FlexLayout)`
  justify-content: center;

  @media (min-width: 640px) {
    margin-left: -8px;
    margin-right: -8px;
    justify-content: inherit;
  }

  & > * {
    @media (min-width: 1400px) {
      /* min-width: 320px; */
      /* max-width: 31.5%; */
      width: 100%;
    }
  }
`

const Label = styled(Text)`
  color: white;
  font-size: 24px;
  line-height: 36px;
  margin-left: 40px;

  @media (min-width: 968px) {
    font-size: 40px;
    line-height: 60px;
    text-align: left;
  }
  @media (max-width: 576px) {
    margin-left: 0px;
  }
`

export default CompletedIDOs
