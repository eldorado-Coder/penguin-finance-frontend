import React, { useEffect, useRef } from 'react'
import { useCountUp } from 'react-countup'
import { Text } from 'penguinfinance-uikit2'

export interface CardValueProps {
  value: number
  decimals?: number
  fontSize?: string
  lineHeight?: string
  prefix?: string
  suffix?: string
  bold?: boolean
  color?: string
  updateInterval?: number
}

const CardValue: React.FC<CardValueProps> = ({
  value,
  decimals,
  fontSize = '40px',
  lineHeight = '1',
  prefix = '',
  suffix = '',
  bold = true,
  color = 'text',
  updateInterval,
  ...rest
}) => {
  const { countUp, update, start, reset } = useCountUp({
    start: 0,
    end: value || 0,
    duration: 1,
    separator: ',',
    decimals:
      // eslint-disable-next-line no-nested-ternary
      decimals !== undefined ? decimals : value < 0 ? 4 : value > 1e5 ? 0 : 3,
  })

  const updateValue = useRef(update)

  useEffect(() => {
    updateValue.current(value)
  }, [value, updateValue])

  useEffect(() => {
    let interval
    if (updateInterval) {
      interval = setInterval(async () => {
        reset()
        start()
        update(value)
      }, updateInterval)
    }
    return () => interval && clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateInterval, start, reset, update])

  return (
    <Text bold={bold} fontSize={fontSize} style={{ lineHeight }} color={color} {...rest}>
      {prefix}
      {countUp}
      {suffix}
    </Text>
  )
}

export default CardValue
