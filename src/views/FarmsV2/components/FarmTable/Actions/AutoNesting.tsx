import React, { useState } from 'react'
import styled from 'styled-components'
import { Text, Button, Flex } from 'penguinfinance-uikit2'
import Slider from 'components/Slider';

const StyledButton = styled(Button)`
  font-weight: 600;
  height: 28px;
  font-size: 14px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.red};
  color: white;
`;

const Label = styled(Text)`
  white-space: nowrap;
`;

const AllocationText = styled(Text)`
  min-width: 160px;
  text-align: center;
  color: ${({ theme }) => theme.isDark ? '#b2b2ce' : theme.colors.textSubtle};
`;

const AutoNesting = ({ currentAllocation, onUpdateAllocation }) => {
  const [allocation, setAllocation] = useState(currentAllocation);
  const [touched, setTouched] = useState(false);

  const handleSetAllocation = value => {
    setAllocation(value);
    if (!touched) {
      setTouched(true);
    }
  };

  const handleUpdateAllocation = () => {
    onUpdateAllocation(allocation);
    setTouched(false);
  };

  return (
    <>
      <Flex alignItems='center' justifyContent='space-between' mb='16px' flexWrap='wrap'>
        <Label fontSize="20px" color='textSubtle' bold>iPEFI Auto-Nesting</Label>
        <AllocationText fontSize="14px">{`${touched ? 'New: ' : 'Current allocation: '}${allocation}%`}</AllocationText>
        <StyledButton color='primary' scale='sm' onClick={handleUpdateAllocation}>Modify</StyledButton>
      </Flex>
      <Slider value={allocation} onChange={handleSetAllocation} />
    </>
  )
}

export default AutoNesting
