import React from 'react'
import styled from 'styled-components'
import { Text, Flex, Image, Tag, VerifiedIcon, Button } from 'penguinfinance-uikit2'
import FlexLayout from 'components/layout/Flex'
import { upcomingIcebergs } from '../config'

const UpcomingIcebergs = () => {
  const handleLearnMore = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <>
      <Label fontSize="24px" mt="32px" mb="16px" fontWeight={600}>
        Upcoming Icebergs
      </Label>
      <StyledFlexLayout>
        {upcomingIcebergs.map((iceberg) => {
          return (
            <FCard key={iceberg.title}>
              <Flex justifyContent="space-between" alignItems="center" mb="16px">
                <Image src={`/images/club/${iceberg.logo}`} alt={iceberg.title} width={96} height={96} />
                <Flex flexDirection="column" alignItems="flex-end">
                  <Text fontSize="22px" bold>
                    {iceberg.title}
                  </Text>
                  <Flex>
                    {/* {iceberg.coreTag && (
                      <IcebergTag variant="primary" outline startIcon={<VerifiedIcon />}>
                        {iceberg.coreTag}
                      </IcebergTag>
                    )} */}
                    <IcebergTag variant="primary">{iceberg.tag}</IcebergTag>
                  </Flex>
                </Flex>
              </Flex>
              <Flex justifyContent="space-between">
                <Text fontSize="18px" fontWeight={400}>
                  To Distribute:
                </Text>
                <Text fontSize="18px" fontWeight={400}>
                  {iceberg.toDistribute}
                </Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text fontSize="18px" fontWeight={400}>
                  Earn:
                </Text>
                <Text fontSize="18px" fontWeight={400}>
                  {iceberg.tokenSymbol}
                </Text>
              </Flex>
              <Description mt="16px" mb="16px" textAlign="left" fontWeight={400}>
                {iceberg.description}
              </Description>
              <Flex>
                <StyledButton color="red" onClick={() => handleLearnMore(iceberg.url)}>
                  Learn More
                </StyledButton>
              </Flex>
            </FCard>
          )
        })}
      </StyledFlexLayout>
    </>
  )
}

const FCard = styled.div`
  align-self: baseline;
  background: ${(props) => props.theme.card.background};
  border-radius: 26px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
  position: relative;
  text-align: center;
`

const IcebergTag = styled(Tag)<{ outline?: boolean }>`
  margin-left: 4px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 300;
  height: 32px;
  line-height: 1;
  background: ${({ outline }) => !outline && '#f24e4d'};
  background: ${({ theme, outline }) => theme.isDark && !outline && '#d4444c'};
  color: ${({ theme }) => theme.isDark && 'white'};
  border-color: ${({ theme }) => theme.isDark && '#d4444c'};
`

const StyledButton = styled(Button)`
  border-radius: 8px;
  background-color: ${({ theme }) => (theme.isDark ? '#614e83' : '#f24e4d')};
  color: white;
  height: 44px;
  font-weight: 700;
  box-shadow: none;
`

const StyledFlexLayout = styled(FlexLayout)`
  margin-left: -8px;
  margin-right: -8px;
  justify-content: start;

  @media (min-width: 640px) {
    margin-left: -16px;
    margin-right: -16px;
  }
`

const Label = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? 'white' : theme.colors.red)};
`

const Description = styled(Text)`
  min-height: 96px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

export default UpcomingIcebergs
