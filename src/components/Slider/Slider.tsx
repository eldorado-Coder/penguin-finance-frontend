import React from 'react'
import styled from 'styled-components'
import { Flex, Text } from 'penguinfinance-uikit2'
import ReactSlider from 'react-slider'

const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 12px;
`

const ThumbWrapper = styled.div`
  height: 1px;
  width: 1px;
  position: relative;
`

const StyledThumb = styled.div`
  height: 16px;
  line-height: 16px;
  width: 16px;
  text-align: center;
  background-color: white;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.12);

  color: #fff;
  font-size: 10px;
  border-radius: 50%;
  cursor: pointer;
  margin-top: -2px;
  margin-left: -6px;
`

const MarkLabel = styled(Text)`
  width: 24px;
  color: ${({ theme }) => (theme.isDark ? '#b2b2ce' : theme.colors.textSubtle)};
`

const SliderWrapper = styled.div`
  // padding: 0 10px 0 8px;
`

const Thumb = (props) => {
  return (
    <ThumbWrapper {...props}>
      <StyledThumb />
    </ThumbWrapper>
  )
}

const StyledTrack = styled.div<{ index?: number }>`
  top: 0;
  bottom: 0;
  background: ${({ index, theme }) => (index === 1 && theme.isDark ? '#a893c9' : '#e6e7e8')};
  background: ${({ index }) => index === 0 && 'linear-gradient(90deg, #01dcff 0%, #8909c3 100%)'};
  border-radius: 999px;
`

const Track = (props, state) => {
  return <StyledTrack {...props} index={state.index} />
}

const marks = [0, 25, 50, 75, 100]
const Slider = ({ value, isDisabled, onChange }) => {
  return (
    <>
      <SliderWrapper>
        <StyledSlider value={value} disabled={isDisabled} renderTrack={Track} renderThumb={Thumb} onChange={onChange} />
      </SliderWrapper>
      <Flex justifyContent="space-between" mt="12px">
        {marks.map((mark) => (
          <MarkLabel key={mark} fontSize="14px">{`${mark}%`}</MarkLabel>
        ))}
      </Flex>
    </>
  )
}

export default Slider
