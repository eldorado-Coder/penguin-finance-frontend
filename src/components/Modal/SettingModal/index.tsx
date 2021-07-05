import React from 'react'
import { Text, Toggle, Modal, Heading } from 'penguinfinance-uikit2'
import styled from 'styled-components'
import useUserSetting from 'hooks/useUserSetting'
import Select from 'components/Select/Select'

interface SettingModalProps {
  onDismiss?: () => void
}

// header
const ModalHeader = styled.div`
  padding: 16px;
  font-weight: 600;
  margin: auto;
  margin-top: -22px;
`

// content
const ModalContent = styled.div`
  border-top: ${({ theme }) => (theme.isDark ? '1px solid #26183f' : '1px solid #e9eaeb')};
  padding: 24px 24px 16px;
`

const ToggleContainer = styled.div<{ checked?: boolean }>`
  padding: 0px 16px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > div:last-child {
    background-color: ${({ theme, checked }) => checked && theme.colors.primary};
  }
`

const CustomToggle = styled(Toggle)`
  background: white;
`

const REFRESH_RATE_OPTIONS = [
  { label: '5 seconds', value: 5000 },
  { label: '3 seconds', value: 3000 },
  { label: '1.5 seconds', value: 1500 },
];

const SettingModal: React.FC<SettingModalProps> = ({ onDismiss }) => {
  const { isMusic, toggleMusic, visibleBlock, toggleVisibleBlock, refreshRate, updateRefreshRate } = useUserSetting()

  return (
    <Modal title="" hideCloseButton bodyPadding="0px" onDismiss={onDismiss}>
      <ModalHeader>
        <Heading>Settings</Heading>
      </ModalHeader>
      <ModalContent>
        <ToggleContainer checked={visibleBlock}>
          <Text color="primary" fontSize="14px">
            Show current block
          </Text>
          <CustomToggle scale="sm" checked={visibleBlock} onChange={toggleVisibleBlock} />
        </ToggleContainer>
        <ToggleContainer checked={isMusic}>
          <Text color="primary" fontSize="14px">
            Music
          </Text>
          <CustomToggle scale="sm" checked={isMusic} onChange={toggleMusic} />
        </ToggleContainer>
        <ToggleContainer>
          <Text color="primary" fontSize="14px">
            Refresh Interval
          </Text>
          <Select
            selectWidth={140}
            value={refreshRate}
            options={REFRESH_RATE_OPTIONS}
            onChange={updateRefreshRate}
          />
        </ToggleContainer>
      </ModalContent>
    </Modal>
  )
}

export default SettingModal
