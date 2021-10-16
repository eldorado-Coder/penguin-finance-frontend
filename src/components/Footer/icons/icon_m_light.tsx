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
    <CustomSvg viewBox="0 0 48.18 38.25" {...props}>
      <g>
        <path
          className="cls-1"
          d="M5.71,7.8a1.86,1.86,0,0,0-.6-1.57L.61.81V0h14L25.37,23.68,34.87,0H48.18V.81L44.34,4.5a1.13,1.13,0,0,0-.43,1.08v27.1a1.13,1.13,0,0,0,.43,1.08l3.75,3.68v.81H29.2v-.81l3.89-3.77c.38-.39.38-.5.38-1.08V10.68L22.65,38.16H21.19L8.59,10.68V29.1a2.57,2.57,0,0,0,.7,2.11l5.06,6.14v.81H0v-.81l5.06-6.14a2.45,2.45,0,0,0,.65-2.11Z"
        />
      </g>
    </CustomSvg>
  )
}

export default Icon
