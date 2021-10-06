import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Card,
  CardBody,
  Heading,
  Tag,
  Button,
  ChevronUpIcon,
  ChevronDownIcon,
  Text,
  CardFooter,
  useModal,
  Flex,
} from 'penguinfinance-uikit2'
import { Nft } from 'config/constants/types'
import { useNftDistributor } from 'hooks/useNftDistributor'
import ClaimNftModal from '../Modals/ClaimNftModal'
import Preview from './Preview'

interface NftCardProps {
  nft: Nft
  canClaim?: boolean
  tokenIds?: number[]
}

const NftCard: React.FC<NftCardProps> = ({ nft, canClaim = false, tokenIds = [] }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { name, description } = nft
  const walletOwnsNft = tokenIds.length > 0
  const Icon = isOpen ? ChevronUpIcon : ChevronDownIcon
  const { onClaim } = useNftDistributor(nft.collection)

  const handleClick = async () => {
    setIsOpen(!isOpen)
  }

  const onConfirm = async () => {
    onClaim()
  }

  const [onPresentClaimModal] = useModal(<ClaimNftModal nft={nft} onConfirm={onConfirm} />)

  return (
    <PGCard isActive={walletOwnsNft || canClaim}>
      <PGCardBody>
        <Header alignItems="center" justifyContent="space-between">
          <Heading size="lg">{name}</Heading>
          {walletOwnsNft && (
            <Tag outline variant="secondary">
              In Wallet
            </Tag>
          )}
        </Header>
        {canClaim && (
          <Button scale="sm" onClick={onPresentClaimModal}>
            Claim
          </Button>
        )}
      </PGCardBody>
      <Preview nft={nft} isOwned={walletOwnsNft} />
      <Footer p="16px 0 0">
        <DetailsButton endIcon={<Icon width="32px" color="primary" />} onClick={handleClick}>
          Details
        </DetailsButton>
        {isOpen && (
          <InfoBlock flexDirection="column" alignItems="center">
            {nft.rarity > 0 && (
              <Text as="p" color="textSubtle" mb="8px" mt="4px">
                {`1 / ${nft.rarity}`}
              </Text>
            )}
            <Text as="p" color="textSubtle">
              {description}
            </Text>
            <Button mt="16px">Coming Soon</Button>
          </InfoBlock>
        )}
      </Footer>
    </PGCard>
  )
}

const Header = styled(Flex)`
  min-height: 28px;
`

const DetailsButton = styled(Button).attrs({ variant: 'text', fullWidth: true })`
  height: auto;
  border-radius: 8px;
  padding: 4px 24px;
  margin-bottom: 8px;
  font-weight: 500;
  background-color: ${({ theme }) => (theme.isDark ? '#121021' : '#fbca30')};
  color: #ffffff;

  svg {
    fill: #ffffff;
  }

  &:focus:not(:active) {
    box-shadow: none;
  }
`

const InfoBlock = styled(Flex)`
  padding: 0px 24px 24px;

  p {
    text-align: center;
  }

  button {
    border-radius: 30px;
    background: #f5c83b;
    font-size: 14px;
    height: 36px;
    cursor: default;

    &:hover:not(:disabled):not(.button--disabled):not(:active),
    :active {
      opacity: 1 !important;
    }
  }
`

const Footer = styled(CardFooter)`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: none;
`

const PGCard = styled(Card)`
  border-radius: 20px;
  padding: 8px 24px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  background: ${({ theme }) => theme.card.background};

  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 360px;
  }
`

const PGCardBody = styled(CardBody)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0 12px;
`

export default NftCard
