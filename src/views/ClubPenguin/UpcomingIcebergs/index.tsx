import React from 'react';
import styled from 'styled-components';
import { Text, Flex, Image, Tag, VerifiedIcon, Button } from 'penguinfinance-uikit2';
import FlexLayout from 'components/layout/Flex'
import { Icebergs } from './Icebergs';

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

const IcebergTag = styled(Tag)`
  margin-left: 4px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 300;
  height: 32px;
  line-height: 1;
`

const StyledButton = styled(Button)`
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.red};
  color: white;
  height: 44px;
`;

const StyledFlexLayout = styled(FlexLayout)`
  margin-left: -8px;
  margin-right: -8px;

  @media (min-width: 640px) {
    margin-left: -16px;
    margin-right: -16px;
  }
`;

const UpcomingIcebergs = () => {
  return (
    <>
      <Text fontSize='24px' color='red' mt='16px' mb='16px' fontWeight={500}>Upcoming Icebergs</Text>
      <StyledFlexLayout>
        {Icebergs.map(iceberg => {
          return (
            <FCard
              key={iceberg.title}>
              <Flex justifyContent='space-between' alignItems='center' mb='16px'>
                <Image src={`/images/club/${iceberg.logo}`} alt={iceberg.title} width={96} height={96} />
                <Flex flexDirection='column' alignItems='flex-end'>
                  <Text fontSize='22px' bold>{iceberg.title}</Text>
                  <Flex>
                    {iceberg.coreTag &&
                      <IcebergTag variant="primary" outline startIcon={<VerifiedIcon />}>
                        {iceberg.coreTag}
                      </IcebergTag>
                    }
                    <IcebergTag variant='primary'>
                      {iceberg.tag}
                    </IcebergTag>
                  </Flex>
                </Flex>
              </Flex>
              <Flex justifyContent='space-between'>
                <Text fontSize='18px'>To Distribute:</Text>
                <Text fontSize='18px' fontWeight={500}>{iceberg.toDistribute}</Text>
              </Flex>
              <Flex justifyContent='space-between'>
                <Text fontSize='18px'>Earn:</Text>
                <Text fontSize='18px' fontWeight={500}>{iceberg.earn}</Text>
              </Flex>
              <Text mt='16px' mb='16px' textAlign='left'>{iceberg.description}</Text>
              <Flex>
                <StyledButton color='red'>Learn More</StyledButton>
              </Flex>
            </FCard>
          )
        })}
      </StyledFlexLayout>
    </>
  );
};

export default UpcomingIcebergs;