import React from 'react'
import { Svg, SvgProps } from 'penguinfinance-uikit2'
import styled from 'styled-components'

const CustomSvg = styled(Svg)`
  .cls-1 {
    fill: ${(props) => (props.theme.isDark ? '#483692' : '#b6b6db')};
  }
`

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <CustomSvg viewBox="0 0 46.27 38.25" {...props}>
      <g>
        <path
          className="cls-1"
          d="M2.84,16.66,30.4,5.31c2.72-1.19,11.94-5,11.94-5S46.6-1.32,46.25,2.7c-.12,1.66-1.07,7.45-2,13.72L41.28,35S41,37.71,39,38.19s-5.32-1.66-5.91-2.13-8.88-5.68-11.95-8.28c-.83-.71-1.77-2.13.12-3.79,4.26-3.9,9.34-8.75,12.42-11.83,1.42-1.41,2.84-4.73-3.08-.7L14,22.69s-1.89,1.18-5.44.12S.83,20.33.83,20.33s-2.84-1.78,2-3.67Z"
        />
      </g>
    </CustomSvg>
  )
}

export default Icon
