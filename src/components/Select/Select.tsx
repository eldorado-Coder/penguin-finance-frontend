import React, { useState, useRef, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { ArrowDropDownIcon, Text } from 'penguinfinance-uikit2'

const DropDownHeader = styled.div<{ size: string }>`
  width: 100%;
  height: ${props => props.size === 'sm' ? '32px' : '40px'};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 16px;
  box-shadow: ${({ theme }) => theme.shadows.inset};
  border: 1px solid ${({ theme }) => theme.colors.inputSecondary};
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.input};
  transition: border-radius 0.15s;
`

const DropDownListContainer = styled.div<{ selectWidth: number }>`
  min-width: 136px;
  height: 0;
  position: absolute;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.input};
  z-index: ${({ theme }) => theme.zIndices.dropdown};
  transition: transform 0.15s, opacity 0.15s;
  transform: scaleY(0);
  transform-origin: top;
  opacity: 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: ${({ selectWidth }) => selectWidth || 168}px;
  }
`

const DropDownContainer = styled.div<{ isOpen: boolean; width: number; height: number; size: string; selectWidth: number }>`
  cursor: pointer;
  width: ${({ width, selectWidth }) => selectWidth || width}px;
  // position: relative;
  background: ${({ theme }) => theme.colors.input};
  border-radius: 16px;
  height: ${props => props.size === 'sm' ? '32px' : '40px'};
  min-width: 136px;
  user-select: none;

  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: ${({ selectWidth }) => selectWidth || 168}px;
  }

  ${(props) =>
    props.isOpen &&
    css`
      ${DropDownHeader} {
        border-bottom: 1px solid ${({ theme }) => theme.colors.inputSecondary};
        box-shadow: ${({ theme }) => theme.tooltip.boxShadow};
        border-radius: 16px 16px 0 0;
      }

      ${DropDownListContainer} {
        height: auto;
        max-height: 260px; // for modal
        overflow-y: auto; // for modal
        transform: scaleY(1);
        opacity: 1;
        border: 1px solid ${({ theme }) => theme.colors.inputSecondary};
        border-top-width: 0;
        border-radius: 0 0 16px 16px;
        box-shadow: ${({ theme }) => theme.tooltip.boxShadow};

        @media (max-height: 900px) {
          max-height: 200px;
        }

        &::-webkit-scrollbar {
          width: 4px;
        }
      }
    `}

  svg {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
  }
`

const InputContainer = styled.div`
  width: 100%;
  position: relative;
`;

const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  z-index: ${({ theme }) => theme.zIndices.dropdown};
`

const ListItem = styled.li`
  list-style: none;
  padding: 8px 16px;
  &:hover {
    background: ${({ theme }) => theme.colors.inputSecondary};
  }
`

export interface SelectProps {
  value?: any
  options: OptionProps[],
  size?: string
  selectWidth?: number
  onChange?: (option: string) => void
}

export interface OptionProps {
  label: string
  value: any
}

const Select: React.FunctionComponent<SelectProps> = ({ value, selectWidth, options, size, onChange }) => {
  const containerRef = useRef(null)
  const dropdownRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  const toggling = () => setIsOpen(!isOpen)

  const onOptionClicked = (option: OptionProps) => () => {
    setIsOpen(false)

    if (onChange) {
      onChange(option.value)
    }
  }

  useEffect(() => {
    setContainerSize({
      width: dropdownRef.current.offsetWidth, // Consider border
      height: dropdownRef.current.offsetHeight,
    })
  }, [])

  const selectedOption = options.find(option => option.value === value);
  return (
    <DropDownContainer selectWidth={selectWidth} size={size} isOpen={isOpen} ref={containerRef} {...containerSize}>
      <InputContainer>
        <DropDownHeader size={size} onClick={toggling}>
          <Text>{selectedOption ? selectedOption.label : ""}</Text>
        </DropDownHeader>
        <ArrowDropDownIcon color="text" onClick={toggling} />
      </InputContainer>
      <DropDownListContainer selectWidth={selectWidth}>
        <DropDownList ref={dropdownRef}>
          {options.map((option) =>
            option.value !== value ? (
              <ListItem onClick={onOptionClicked(option)} key={option.label}>
                <Text>{option.label}</Text>
              </ListItem>
            ) : null,
          )}
        </DropDownList>
      </DropDownListContainer>
    </DropDownContainer>
  )
}

export default Select
