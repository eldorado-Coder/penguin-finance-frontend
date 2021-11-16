import React from 'react'
import styled from 'styled-components'
import { Text, Image, Tag, Flex } from 'penguinfinance-uikit2'
import SvgIcon from 'components/SvgIcon'
import { FarmCardProps } from '../types'

const Farm: React.FunctionComponent<FarmCardProps> = ({ farm }) => {
  const farmImage = farm.lpSymbol.replace(' LP', '').toLocaleLowerCase()
  const farmType = farm.type === 'Joe' ? 'Trader Joe' : farm.type

  const handleViewInfo = () => {
    window.open(farm.infoLink, '_blank')
  }

  return (
    <Container>
      <StyledImage src={`/images/farms-v2/pools/${farmImage}.svg`} alt={farm.tokenSymbol} width={56} height={56} />
      <FarmLabelWrapper>
        <Flex alignItems="center">
          <FarmLabel bold>
            {farm.lpSymbol.replace('Joe ', '').replace('Lydia ', '').replace('Sushi ', '').replace(' LP', '')}
          </FarmLabel>
          {farm.infoLink && (
            <InfoIconWrapper onClick={handleViewInfo}>
              <SvgIcon src={`${process.env.PUBLIC_URL}/images/farms-v2/info.svg`} width="16px" height="16px" />
            </InfoIconWrapper>
          )}
        </Flex>
        <TagContainer mt="4px">
          <MultiplierTag variant="primary">{`${farm.multiplier || 1}X`}</MultiplierTag>
          <LpTag type={farm.type}>{farmType}</LpTag>
          {farm.isBenqi && <LpTag type="Benqi">BenQi</LpTag>}
          {farm.isMINW && <LpTag type="MINW">MINW</LpTag>}
          {farm.isJoeRush && !farm.isJoeRushFinished && <LpTag type="Joe Rush">JOE Rush</LpTag>}
        </TagContainer>
      </FarmLabelWrapper>
    </Container>
  )
}

const Container = styled.div`
  padding-left: 16px;
  display: flex;
  align-items: center;

  img {
    position: unset;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 32px;
  }
`

const FarmLabel = styled(Text)`
  color: ${({ theme }) => theme.colors.textSubtle};
  white-space: nowrap;
`

const FarmLabelWrapper = styled.div`
  margin-left: 16px;
`

const TagContainer = styled(Flex)`
  max-width: 170px;
  flex-wrap: wrap;
  @media (max-width: 972px) {
    max-width: 250px;
    flex-wrap: nowrap;
  }
  @media (max-width: 480px) {
    max-width: 170px;
    flex-wrap: wrap;
  }
`

const MultiplierTag = styled(Tag)`
  height: 20px;
  margin-right: 4px;
  margin-bottom: 4px;
  font-size: 12px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.red};
  border-color: ${({ theme }) => theme.colors.red};
  color: white;
`
const LpTag = styled(Tag)<{ type?: string }>`
  height: 20px;
  margin-right: 4px;
  margin-bottom: 4px;
  background-color: ${({ type }) => type === 'Pangolin' && '#f97316'};
  background-color: ${({ type }) => type === 'Penguin' && '#FF4100'};
  background-color: ${({ type }) => type === 'Joe' && '#e3796f'};
  background-color: ${({ type }) => type === 'Sushi' && '#fca4a4'};
  background-color: ${({ type }) => type === 'Lydia' && '#FBB040'};
  background-color: ${({ type }) => type === 'Benqi' && '#3AB0E7'};
  background-color: ${({ type }) => type === 'MINW' && '#165DC4'};
  background-color: ${({ type }) => type === 'Joe Rush' && '#F44E4A'};

  border-color: ${({ type }) => type === 'Pangolin' && '#f97316'};
  border-color: ${({ type }) => type === 'Penguin' && '#FF4100'};
  border-color: ${({ type }) => type === 'Joe' && '#e3796f'};
  border-color: ${({ type }) => type === 'Sushi' && '#fca4a4'};
  border-color: ${({ type }) => type === 'Lydia' && '#FBB040'};
  border-color: ${({ type }) => type === 'Benqi' && '#3AB0E7'};
  border-color: ${({ type }) => type === 'MINW' && '#165DC4'};
  border-color: ${({ type }) => type === 'Joe Rush' && '#F44E4A'};

  color: white;
  font-size: 12px;
  border-radius: 8px;
`

const StyledImage = styled(Image)<{ isMobile?: boolean }>`
  width: 64px;
  height: 64px;
`

const InfoIconWrapper = styled.div`
  margin-top: 2px;
  margin-left: 4px;
  svg {
    cursor: pointer;
    path {
      fill: ${({ theme }) => (theme.isDark ? 'white' : theme.colors.secondary)};
    }
  }
`

export default Farm
