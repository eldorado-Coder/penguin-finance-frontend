import React, { useCallback } from 'react'
import { Text, Toggle, Modal, Heading } from 'penguinfinance-uikit2'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { useSetting } from 'state/hooks'
import { updateCurrentBlockShowed, updateMusicEnabled } from 'state/actions'

interface SettingModalProps {
  onConfirmChangeStyle: (color: string) => void
  onConfirmChangeColor: (style: string) => void
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

const ToggleContainer = styled.div<{ checked: boolean }>`
  padding: 0px 16px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  > div:last-child {
    background-color: ${({ theme, checked }) => checked && theme.colors.primary};
  }
`

const CustomToggle = styled(Toggle)`
  background: white;
`

const SettingModal: React.FC<SettingModalProps> = ({ onDismiss }) => {
  const dispatch = useDispatch()
  const { isCurrentBlockShowed, isMusicEnabled } = useSetting()

  const onChangeCurrentBlockShowed = useCallback(() => {
    dispatch(updateCurrentBlockShowed(!isCurrentBlockShowed))
  }, [dispatch, isCurrentBlockShowed])

  const onChangeMusicEnabled = useCallback(() => {
    dispatch(updateMusicEnabled(!isMusicEnabled))
  }, [dispatch, isMusicEnabled])

  return (
    <Modal title="" hideCloseButton bodyPadding="0px" onDismiss={onDismiss}>
      <ModalHeader>
        <Heading>Settings</Heading>
      </ModalHeader>
      <ModalContent>
        <ToggleContainer checked={isCurrentBlockShowed}>
          <Text color="primary" fontSize="14px">
            Show current block
          </Text>
          <CustomToggle scale="sm" checked={isCurrentBlockShowed} onChange={onChangeCurrentBlockShowed} />
        </ToggleContainer>
        <ToggleContainer checked={isMusicEnabled}>
          <Text color="primary" fontSize="14px">
            Music
          </Text>
          <CustomToggle scale="sm" checked={isMusicEnabled} onChange={onChangeMusicEnabled} />
        </ToggleContainer>
      </ModalContent>
    </Modal>
  )
}

export default SettingModal
