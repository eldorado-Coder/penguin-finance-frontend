import React from 'react'
import styled from 'styled-components'
import { Link, Text } from 'penguinfinance-uikit2'
import useBlock from 'hooks/useBlock'
import { useSetting } from 'state/hooks'

const CurrentBlockNumber = styled(Text)`
  position: absolute;
  right: 12px;
  bottom: 12px;
  font-size: 16px;
  float: right;
`

const CurrentBlockWrapper = () => {
  const currentBlockNumber = useBlock()
  const { isCurrentBlockShowed } = useSetting()

  if (!isCurrentBlockShowed) {
    return null
  }

  return (
    <CurrentBlockNumber color="primary" bold>
      {currentBlockNumber > 0 && (
        <Link
          href={`https://cchain.explorer.avax.network/blocks/${currentBlockNumber}`}
          target="blank"
          rel="noopener noreferrer"
        >
          {currentBlockNumber}
        </Link>
      )}
    </CurrentBlockNumber>
  )
}

export default CurrentBlockWrapper
