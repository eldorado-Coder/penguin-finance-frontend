import React from 'react'
import styled from 'styled-components'
import { Text, Flex, Tag, Progress } from 'penguinfinance-uikit2'
import FlexLayout from 'components/layout/Flex'

const AcoomalatingSteps = () => {
  return (
    <>
      <Label fontSize="36px" lineHeight='54px' mt="120px" mb="180px" fontWeight={500} color='white'>
        3 Simle Steps to Start Acoomalating
      </Label>
      <StyledFlexLayout>
        <FCard>
          <IdoLogo src='/images/launchpad/acoomalating-steps/pefi.png' alt='pefi' />
          <Text fontSize='24px' color='#131313' mb='20px'>1. Get PEGI</Text>
          <Description fontSize='18px' color='#131313'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
          </Description>
          <Flex justifyContent='flex-end' alignItems='center' ml='auto'>
            <Text fontSize='18px' color='red'>Buy PEFI</Text>
            <ArrowRightImg src='/images/launchpad/arrow-right.png' alt='arrow-right' />
          </Flex>
        </FCard>
        <IPefiCard>
          <IdoLogo src='/images/launchpad/acoomalating-steps/ipefi.png' alt='ipefi' />
          <Text fontSize='24px' color='white' mb='20px'>2. Stake PEFI for iPEFI</Text>
          <Description fontSize='18px' color='white'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
          </Description>
          <Flex justifyContent='flex-end' alignItems='center' ml='auto'>
            <Text fontSize='18px' color='red'>Buy PEFI</Text>
            <ArrowRightImg src='/images/launchpad/arrow-right.png' alt='arrow-right' />
          </Flex>
        </IPefiCard>
        <FCard>
          <IdoLogo src='/images/launchpad/acoomalating-steps/ido.png' alt='ido' />
          <Text fontSize='24px' color='#131313' mb='20px'>3. Register for an IDO</Text>
          <Description fontSize='18px' color='#131313'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
          </Description>
          <Flex justifyContent='flex-end' alignItems='center' ml='auto'>
            <Text fontSize='18px' color='red'>Buy PEFI</Text>
            <ArrowRightImg src='/images/launchpad/arrow-right.png' alt='arrow-right' />
          </Flex>
        </FCard>
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
  align-items: flex-start;
  justify-content: space-around;
  padding: 120px 24px 25px;
  position: relative;
  text-align: center;
  margin-bottom: 120px;
`

const IPefiCard = styled(FCard)`
  background: rgba(255, 255, 255, 0.2)
`;

const Description = styled(Text)`
  font-family: 'Fira Code';
  text-align: left;
`;

const StyledFlexLayout = styled(FlexLayout)`
  margin-left: -8px;
  margin-right: -8px;

  @media (min-width: 640px) {
    margin-left: -16px;
    margin-right: -16px;
  }
`

const Label = styled(Text)`
  color: white;
  font-size: 24px;
  line-height: 36px;
  margin-top: 60px;

  @media (min-width: 968px) {
    font-size: 36px;
    line-height: 54px;
    text-align: left;
    margin-top: 120px;
  }
`

const IdoLogo = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, -50%);
  box-shadow: 0px 1px 6px rgb(0 0 0 / 16%);
`;

const ArrowRightImg = styled.img`
  width: 32px;
  height: 32px;
  margin-left: 2px;
  cursor: pointer;
`;

export default AcoomalatingSteps
