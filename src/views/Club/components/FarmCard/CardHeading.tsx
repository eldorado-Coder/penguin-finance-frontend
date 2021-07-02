import React from 'react'
import styled from 'styled-components'
import { Tag, Flex, Heading, Image } from 'penguinfinance-uikit2'
import { CommunityTag, CoreTag } from 'components/Tags'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  isCommunityFarm?: boolean
  farmImage?: string
  tokenSymbol?: string
}

const Wrapper = styled(Flex)`
  svg {
    margin-right: 0.25rem;
  }
`

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
`

const FarmImageContainer = styled.div`
  position: relative;
  width: 96px;
`;

const PenguinImage = styled(Image)`
  transform: scaleX(-1);
  position: absolute;
  top: 36px;
  left: 44px;
`;

const CardHeading: React.FC<ExpandableSectionProps> = ({
  lpLabel,
  multiplier,
  isCommunityFarm,
  tokenSymbol,
}) => {
  return (
    <Wrapper justifyContent="space-between" alignItems="center" mb="12px">
      <FarmImageContainer>
        <Image src="/images/club/iceberg.svg" alt={tokenSymbol} width={80} height={80} />
        <PenguinImage src="/images/penguin-logo.png" alt="penguin logo" width={48} height={48} />
      </FarmImageContainer>
      <Flex flexDirection="column" alignItems="flex-end">
        <Heading mb="4px">{lpLabel}</Heading>
        <Flex justifyContent="center">
          {isCommunityFarm ? <CommunityTag /> : <CoreTag />}
          <MultiplierTag variant="primary">{multiplier}</MultiplierTag>
        </Flex>
      </Flex>
    </Wrapper>
  )
}

export default CardHeading
