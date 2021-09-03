import React from 'react';
import styled from 'styled-components';
import { Flex, Text } from 'penguinfinance-uikit2';
import ReactSlider from 'react-slider';

const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 12px;
`;

const ThumbWrapper = styled.div`
  height: 1px;
  width: 1px;
  position: relative;
`;

const StyledThumb = styled.div`
  height: 32px;
  line-height: 32px;
  width: 32px;
  text-align: center;
  background-color: #8909c3;
  // ${({ theme }) => theme.isDark ? '#EC3E3F' : '#d4444C'};

  color: #fff;
  font-size: 10px;
  border-radius: 50%;
  cursor: grab;
  margin-top: -10px;
  margin-left: -16px;
`;

const MarkLabel = styled(Text)`
  width: 24px;
`;

const SliderWrapper = styled.div`
  padding: 0 10px 0 8px;
`;

const Thumb = (props, state) => {
  return (
    <ThumbWrapper {...props}>
      <StyledThumb>
        {state.valueNow}%
      </StyledThumb>
    </ThumbWrapper>
  )
};

const StyledTrack = styled.div<{ index?: number }>`
    top: 0;
    bottom: 0;
    background: ${({ index, theme }) => index === 1 ? '#e6e7e8' : 'linear-gradient(90deg, #01dcff 0%, #8909c3 100%)'};
    border-radius: 999px;
`;

const Track = (props, state) => {
  return (
    <StyledTrack {...props} index={state.index} />
  )
};

const marks = [0, 25, 50, 75, 100];
const Slider = ({ value, onChange }) => {
  return (
    <>  
      <SliderWrapper>
        <StyledSlider
          value={value}
          renderTrack={Track}
          renderThumb={Thumb}
          onChange={onChange}
        />
      </SliderWrapper>
      <Flex justifyContent='space-between' mt='12px'>
        {marks.map(mark => (
          <MarkLabel key={mark} fontSize='14px' color='textSubtle'>{`${mark}%`}</MarkLabel>
        ))}
      </Flex>
    </>
  )
};

export default Slider;