import React from 'react'
import { ReactSVG } from 'react-svg'

interface IconProps {
  src: string
  width: string
  height: string,
  // eslint-disable-next-line react/require-default-props
  stroke?: string
}

const Icon = ({ src, width = '20px', height = '20px', stroke }: IconProps) => {
  return (
    <ReactSVG
      src={src}
      beforeInjection={(svg: any) => {
        svg.setAttribute('style', `height: ${height}`)
        svg.setAttribute('style', `width: ${width}`)

        if (stroke) {
          svg.setAttribute('stroke', stroke)
        }
      }}
    />
  )
}

export default Icon
