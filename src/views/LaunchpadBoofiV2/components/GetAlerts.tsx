import React from 'react'
import styled from 'styled-components'
import { Text, Flex, Button } from 'penguinfinance-uikit2'
import Page from 'components/layout/Page'

const GetAlerts = () => {
  const handleSignUp = () => {
    window.open('https://t.me/pefi_announcements', '_blank')
  }

  return (
    <Container>
      <SignUpContainer>
        <SignUpImage src={`${process.env.PUBLIC_URL}/images/ido/signup_banner.png`} />
        <SignUpDetails justifyContent="space-around" alignItems="center">
          <div className="signup-button">
            <SignUpLabel color="white" fontSize="31px" fontWeight={800}>
              Get Alerts For New Launches
            </SignUpLabel>
            <StyledButton onClick={handleSignUp} mt="20px">
              Sign Up
            </StyledButton>
          </div>
        </SignUpDetails>
      </SignUpContainer>
    </Container>
  )
}

const Container = styled.div`
  background-color: ${({ theme }) => !theme.isDark && 'white'};
  padding-bottom: 60px;
  padding-top: 20px;

  @media (min-width: 640px) {
    padding-top: 30px;
  }

  @media (min-width: 968px) {
    padding-top: 40px;
  }
`
const SignUpContainer = styled(Page)`
  max-width: 1200px;
  position: relative;
  margin-top: 20px;
  margin: auto;
  min-height: auto;

  @media (min-width: 900px) {
    /* margin-top: 38px; */
    margin-top: 0px;
  }
`

const SignUpImage = styled.img`
  width: 100%;
  background: linear-gradient(180deg, #7361be 0%, #3a258f 100%);
  border-radius: 10px;
  min-height: 200px;
  object-fit: cover;
`

const SignUpDetails = styled(Flex)`
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translate(0, -50%);
  min-height: 200px;

  .signup-button {
    width: 80%;

    @media (min-width: 768px) {
      width: 70%;
    }
  }

  @media (min-width: 768px) {
    top: 0;
    transform: unset;
  }
`

const SignUpLabel = styled(Text)`
  font-size: 24px;

  @media (min-width: 768px) {
    font-size: 31px;
  }
`

const StyledButton = styled(Button)`
  box-shadow: none;
  width: 180px;
  height: 48px;
  border-radius: 5px;
  background: white;
  color: #620aa8;
  font-size: 20px;
  font-weight: 500;

  @media (min-width: 768px) {
    font-size: 24px;
    width: 240px;
    height: 54px;
  }

  &:hover:not(:disabled):not(.penguin-button--disabled):not(.penguin-button--disabled):not(:active) {
    opacity: 1;
  }
`

export default GetAlerts
