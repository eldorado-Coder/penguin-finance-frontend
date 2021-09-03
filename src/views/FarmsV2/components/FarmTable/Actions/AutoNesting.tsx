import React, { useState } from 'react'
import styled from 'styled-components'
import { Text, Button, Flex } from 'penguinfinance-uikit2'
import Slider from 'components/Slider';

const StyledButton = styled(Button)`
  font-weight: 600;
  height: 28px;
  font-size: 14px;
  border-radius: 10px;
`;

const Label = styled(Text)`
  white-space: nowrap;
`;

const AutoNesting = () => {
  const [allocation, setAllocation] = useState(50);

  return (
    <>
      <Flex alignItems='center' justifyContent='space-between' mb='16px' flexWrap='wrap'>
        <Label fontSize="20px" color='textSubtle' bold>iPEFI Auto-Nesting</Label>
        <Text fontSize="14px" color='textSubtle'>Current allocation: {allocation}%</Text>
        <StyledButton color='primary' scale='sm'>Modify</StyledButton>
      </Flex>
      <Slider value={allocation} onChange={setAllocation} />
    </>
  )
}

export default AutoNesting
