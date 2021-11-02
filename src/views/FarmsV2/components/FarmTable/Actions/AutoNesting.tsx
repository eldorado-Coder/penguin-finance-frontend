import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Text, Button, Flex } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import Slider from 'components/Slider'
import { useV2FarmSetAutoNestAllocation } from 'hooks/useV2Farm'

const AutoNesting = ({ currentAllocation, maxAllocation }) => {
  const [pendingTx, setPendingTx] = useState(false)
  const [allocation, setAllocation] = useState(currentAllocation)
  const [touched, setTouched] = useState(false)

  const { account } = useWeb3React()
  const { onSetAutoNestAllocation } = useV2FarmSetAutoNestAllocation()

  useEffect(() => {
    setAllocation(currentAllocation)
  }, [currentAllocation])

  const handleSetAllocation = (value) => {
    setAllocation((value * maxAllocation) / 100)
    if (!touched) {
      setTouched(true)
    }
  }

  const handleUpdateAllocation = async () => {
    setPendingTx(true)
    try {
      await onSetAutoNestAllocation(allocation)
      setPendingTx(false)
    } catch (error) {
      setPendingTx(false)
    }
    setTouched(false)
  }

  const sliderValue = 100 * (allocation / maxAllocation)

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between" mb="16px" flexWrap="wrap">
        <Label fontSize="20px" color="textSubtle" bold>
          iPEFI Auto-Nesting
        </Label>
        <AllocationText fontSize="14px">{`${
          touched ? 'New: ' : 'Current allocation: '
        }${sliderValue}%`}</AllocationText>
        <StyledButton color="primary" scale="sm" disabled={!account || pendingTx} onClick={handleUpdateAllocation}>
          Modify
        </StyledButton>
      </Flex>
      <Slider value={sliderValue} isDisabled={!account} onChange={handleSetAllocation} />
    </>
  )
}

const StyledButton = styled(Button)`
  font-weight: 600;
  height: 24px;
  font-size: 14px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.red};
  color: white;
  padding: 0 14px;
`

const Label = styled(Text)`
  white-space: nowrap;
`

const AllocationText = styled(Text)`
  min-width: 160px;
  text-align: center;
  margin-right: 4px;
  color: ${({ theme }) => (theme.isDark ? '#b2b2ce' : theme.colors.textSubtle)};
`

export default AutoNesting
