import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex } from 'penguinfinance-uikit2'
import useI18n from 'hooks/useI18n'
import { ChevronDown, ChevronUp } from 'react-feather'

const StyledFooter = styled.div`
  border-top: 1px solid ${({ theme }) => (theme.isDark ? '#524B63' : '#E9EAEB')};
  color: ${({ theme }) => theme.colors.primary};
  padding: 16px 32px;
`

const StyledDetailsButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: 0;
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  display: inline-flex;
  font-size: 16px;
  font-weight: 600;
  height: 32px;
  justify-content: center;
  outline: 0;
  padding: 0;
  &:hover {
    opacity: 0.9;
  }

  & > svg {
    margin-left: 4px;
  }
`

const Details = styled.div`
  margin-top: 24px;
`

const PoolCardFooter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const TranslateString = useI18n()

  const Icon = isOpen ? ChevronUp : ChevronDown

  const handleClick = () => setIsOpen(!isOpen)

  return (
    <StyledFooter>
      <Flex justifyContent='center'>
        <StyledDetailsButton onClick={handleClick}>
          {isOpen ? TranslateString(1066, 'Hide') : TranslateString(658, 'Show more info')} <Icon />
        </StyledDetailsButton>
      </Flex>
      {isOpen && (
        <Details />
      )}
    </StyledFooter>
  )
}

export default React.memo(PoolCardFooter)
