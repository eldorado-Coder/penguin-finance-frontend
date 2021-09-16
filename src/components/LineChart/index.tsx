import React, { Dispatch, SetStateAction, ReactNode } from 'react'
import { ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area, TooltipProps } from 'recharts'
import { ValueType, NameType } from 'recharts/src/component/DefaultTooltipContent'
import styled from 'styled-components'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { darken } from 'polished'
import Card from 'components/Card'
import { RowBetween } from 'components/Row'

dayjs.extend(utc)

const DEFAULT_HEIGHT = 300

const Wrapper = styled(Card)<{ height?: number }>`
  width: 100%;
  height: ${({ height }) => height || DEFAULT_HEIGHT}px;
  display: flex;
  padding: 0;
  flex-direction: column;
  > * {
    font-size: 1rem;
  }
`

const CustomTooltipWrapper = styled.div`
  border: 1px solid green;
  border-color: ${({ theme }) => (theme.isDark ? theme.colors.secondary : 'white')};
  padding: 8px;
  background: ${({ theme }) => (theme.isDark ? 'white' : theme.colors.secondary)};
`

const CustomTooltipTitle = styled.div`
  color: ${({ theme }) => (theme.isDark ? theme.colors.secondary : 'white')};
  line-height: 1.2;
`

const CustomTooltipContent = styled.div`
  color: ${({ theme }) => theme.colors.red};
`

const CustomLabel = styled.span``
const CustomValue = styled.span``

export type LineChartProps = {
  data: any[]
  color?: string | undefined
  height?: number | undefined
  minHeight?: number
  setValue?: Dispatch<SetStateAction<number | undefined>> // used for value on hover
  setLabel?: Dispatch<SetStateAction<string | undefined>> // used for label of valye
  value?: number
  label?: string
  topLeft?: ReactNode | undefined
  topRight?: ReactNode | undefined
  bottomLeft?: ReactNode | undefined
  bottomRight?: ReactNode | undefined
} & React.HTMLAttributes<HTMLDivElement>

const Chart = ({
  data,
  color = '#56B2A4',
  value,
  label,
  setValue,
  setLabel,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  height,
  minHeight = DEFAULT_HEIGHT,
  ...rest
}: LineChartProps) => {
  const CustomTooltip = ({ active, payload, label: label1 }: TooltipProps<ValueType, NameType>) => {
    if (active) {
      const rate = (Number(payload?.[0].value) + 1).toFixed(2)
      const date = dayjs(label1).format('YYYY-MM-DD')
      return (
        <CustomTooltipWrapper className="custom-tooltip">
          <CustomTooltipTitle>{date}</CustomTooltipTitle>
          <CustomTooltipContent className="label">
            <CustomLabel>{`Rate: `}</CustomLabel>
            <CustomValue>{rate}</CustomValue>
          </CustomTooltipContent>
        </CustomTooltipWrapper>
      )
    }

    return null
  }

  return (
    <Wrapper minHeight={minHeight} height={height} {...rest}>
      <RowBetween>
        {topLeft ?? null}
        {topRight ?? null}
      </RowBetween>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={height}
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: -10,
            bottom: 5,
          }}
          onMouseLeave={() => {
            if (setLabel) {
              setLabel(undefined)
            }
            if (setValue) {
              setValue(undefined)
            }
          }}
        >
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={darken(0.36, color)} stopOpacity={0.5} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tickFormatter={(time) => dayjs(time).format('DD')}
            minTickGap={10}
          />
          <YAxis
            dataKey="value"
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => {
              return v + 1
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area dataKey="value" type="monotone" stroke={color} fill="url(#gradient)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
      <RowBetween>
        {bottomLeft ?? null}
        {bottomRight ?? null}
      </RowBetween>
    </Wrapper>
  )
}

export default Chart
