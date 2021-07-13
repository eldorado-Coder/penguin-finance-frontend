import React from 'react'
import styled from 'styled-components'
import { Link, Text } from 'penguinfinance-uikit2'
import useBlock from 'hooks/useBlock'
import useUserSetting from 'hooks/useUserSetting'

const CurrentBlockNumberWrapper = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  margin-top: -100vh;
  margin-right: -100vw;
  z-index: -1;
`

const CurrentBlockNumber = styled(Text)`
  position: absolute;
  right: 20px;
  top: calc(100vh - 30px);
  font-size: 16px;
`

const CurrentBlockWrapper = () => {
  const currentBlockNumber = useBlock()
  const { visibleBlock } = useUserSetting()

  if (!visibleBlock) {
    return null
  }

  return (
    <CurrentBlockNumberWrapper>
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
    </CurrentBlockNumberWrapper>
  )
}

export default CurrentBlockWrapper
