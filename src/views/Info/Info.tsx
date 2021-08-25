import React, { useState } from 'react'
import styled from 'styled-components'
import { Text } from 'penguinfinance-uikit2'
import Page from 'components/layout/Page'
import LineChart from 'components/LineChart'
import BarChart from 'components/BarChart'
import { formatDollarAmount } from 'utils/numbers';
import CHART_DATA from './data';

const Info: React.FC = () => {
  const [volumeHover, setVolumeHover] = useState<number | undefined>()
  const [liquidityHover, setLiquidityHover] = useState<number | undefined>()
  const [leftLabel, setLeftLabel] = useState<string | undefined>()
  const [rightLabel, setRightLabel] = useState<string | undefined>()

  return (
    <InfoPage>
      <LineChart
        data={CHART_DATA}
        height={220}
        minHeight={332}
        value={liquidityHover}
        label={leftLabel}
        setValue={setLiquidityHover}
        setLabel={setLeftLabel}
        topLeft={
          <div>
            <Text fontSize="16px">PEFI/xPEFI Ratio</Text>
            <Text fontSize="32px">
              <div>{formatDollarAmount(liquidityHover, 2, true)} </div>
            </Text>
            <Text fontSize="12px">
              {leftLabel ? <div>{leftLabel} (UTC)</div> : null}
            </Text>
          </div>
        }
      />
      <BarChart
        data={CHART_DATA}
        height={220}
        minHeight={332}
        setValue={setVolumeHover}
        setLabel={setRightLabel}
        value={volumeHover}
        label={rightLabel}
        topLeft={
          <div>
            <Text fontSize="16px">PEFI/xPEFI Ratio</Text>
            <Text fontSize="32px">
              <div>{formatDollarAmount(volumeHover, 2, true)} </div>
            </Text>
            <Text fontSize="12px">
              {rightLabel ? <div>{rightLabel} (UTC)</div> : null}
            </Text>
          </div>
        }
      />
    </InfoPage>
  )
}

const InfoPage = styled(Page)`
  max-width: 1200px;
`

export default Info
