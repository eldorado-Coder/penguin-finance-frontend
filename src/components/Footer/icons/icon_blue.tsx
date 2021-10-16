import React from 'react'
import { Svg, SvgProps } from 'penguinfinance-uikit2'
import styled from 'styled-components'

const CustomSvg = styled(Svg)`
  .cls-1 {
    fill: #325ed1;
  }
`
const Icon: React.FC<SvgProps> = (props) => {
  return (
    <CustomSvg viewBox="0 0 52.84 60.94" {...props}>
      <g>
        <path
          className="cls-1"
          d="M26.42,0,20.83,3.21,5.59,12,0,15.24V45.71l5.59,3.21L21,57.73l5.59,3.21,5.59-3.21,15.1-8.81,5.59-3.21V15.24L47.25,12,32,3.21ZM11.18,39.28V21.67l15.24-8.81,15.23,8.81V39.28l-15.23,8.8Z"
        />
      </g>
    </CustomSvg>
  )
}

export default Icon