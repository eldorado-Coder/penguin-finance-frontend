import React from 'react'
import styled, { useTheme } from 'styled-components'
import { Text, ResetCSS, Link, useMatchBreakpoints, Image } from 'penguinfinance-uikit2'
import { FooterProps, FooterBodyProps, FlexProps } from './types'
import { FooterLinks, FooterIconLinks, FooterIconsSponsor } from './config'

const Footer: React.FC<FooterProps> = () => {
  const theme = useTheme()
  const { isLg, isXl } = useMatchBreakpoints()
  const isStacked = !isLg && !isXl

  return (
    <>
      <ResetCSS />
      <FooterWrapper>
        <FooterBody isStacked={isStacked}>
          <Column isStacked={isStacked} maxWidth="260px" mb={isStacked ? '2rem' : '0'}>
            <Div width="100%" height="35px" mb="5px" mt="-8px">
              <Image
                src={theme.isDark ? 'images/footer/logoDark.svg' : 'images/footer/logoLight.svg'}
                width={400}
                height={35}
              />
            </Div>
            <FooterParagraph as="p" textAlign={isStacked ? 'center' : 'left'} fontSize=".8rem" color="#B7B5DE" mb="6px">
              The Penguin Finance protocol is bringing yield-farming, staking and more functionalities to the Avalanche
              Network.
            </FooterParagraph>
            <Row isStacked={isStacked} alignItems="center">
              <Div width="16px" height="16px">
                <Image
                  src={theme.isDark ? 'images/footer/shieldDark.svg' : 'images/footer/shieldLight.svg'}
                  width={20}
                  height={20}
                />
              </Div>
              <TitleText ml="10px" color="#fff">
                Audited by Certik
              </TitleText>
            </Row>
          </Column>
          {FooterLinks.map((data) => (
            <Column isStacked={isStacked}>
              <TitleText color="#fff" mb="6px">
                {data.title}
              </TitleText>
              {data.links.map((link) => (
                //  we have link.url too "future use"
                <CustomLink href={link.url} target="_blank" rel="noreferrer">
                  {link.title}
                </CustomLink>
              ))}
            </Column>
          ))}
          <Column isStacked={isStacked} alignItems="center" maxWidth="350px">
            <TitleText color="#fff" mb="10px">
              Official Social Media
            </TitleText>
            <Row isStacked={isStacked} justifyContent="space-around" alignItems="center" width="200px">
              {FooterIconLinks[0].map((item) => {
                return (
                  <Div width="24px" height="24px">
                    <a href={item.url} target="_blank" rel="noreferrer">
                      <Image src={theme.isDark ? item.darkUrl : item.lightUrl} width={24} height={24} />
                    </a>
                  </Div>
                )
              })}
            </Row>
            <TitleText color="#fff" mt="1.5rem" mb="10px">
              Powered by
            </TitleText>
            <Row isStacked={isStacked} justifyContent="space-around" alignItems="center" width="100%">
              {FooterIconsSponsor.map((item) => {
                return (
                  <Div width="30px" height="30px">
                    <a href={item.url} target="_blank" rel="noreferrer">
                      <Image src={item.lightUrl} width={30} height={30} />
                    </a>
                  </Div>
                )
              })}
            </Row>
          </Column>
        </FooterBody>
      </FooterWrapper>
    </>
  )
}

const Column = styled.div<FlexProps>`
  display: flex;
  flex-direction: column;
  max-width: ${({ maxWidth }) => maxWidth || 'none'};
  width: ${({ width }) => width || 'auto'};
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
  align-items: ${({ alignItems, isStacked }) => (isStacked ? 'center' : alignItems || 'stretch')};
  margin-bottom: ${({ mb }) => mb || 0};
`

const Row = styled.div<FlexProps>`
  display: flex;
  max-width: ${({ maxWidth }) => maxWidth || 'none'};
  width: ${({ width }) => width || 'auto'};
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
  align-items: ${({ alignItems }) => alignItems || 'stretch'};
`

const FooterBody = styled.div<FooterBodyProps>`
  max-width: 1200px; //1200px
  display: flex;
  flex-direction: ${(props) => (props.isStacked ? 'column' : 'row')};
  justify-content: ${({ isStacked }) => (isStacked ? 'center' : 'space-around')};
  align-items: ${({ isStacked }) => (isStacked ? 'center' : 'stretch')};
  padding: 2rem 2rem 4rem 2rem;
  margin: auto;
`

const FooterWrapper = styled.div`
  width: '100%';
  background-color: ${(props) => (!props.theme.isDark ? '#2A2844' : '#121020')};
`

const CustomLink = styled(Link).attrs((props) => ({
  small: true,
  color: '#B7B5DE',
  fontSize: '0.7rem',
  mb: '6px',
}))`
  @font-face {
    font-family: 'Telegraf UltraLight';
    src: url(${process.env.PUBLIC_URL}/fonts/Telegraf-UltraLight.ttf) format('truetype');
    font-display: swap;
  }
  font-family: 'Telegraf UltraLight';
  font-weight: 200;
`

const TitleText = styled(Text)`
  @font-face {
    font-family: 'Telegraf Bold';
    src: url(${process.env.PUBLIC_URL}/fonts/Telegraf-Bold.ttf) format('truetype');
    font-display: swap;
  }
  font-family: 'Telegraf Bold';
`

const FooterParagraph = styled(Text)`
  @font-face {
    font-family: 'Telegraf UltraLight';
    src: url(${process.env.PUBLIC_URL}/fonts/Telegraf-UltraLight.ttf) format('truetype');
    font-display: swap;
  }
  font-family: 'Telegraf UltraLight';
`

const Div = styled.div<{ width: string; height: string; mb?: string; mt?: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin-bottom: ${(props) => props.mb || 0};
  margin-top: ${(props) => props.mt || 0};
`

export default Footer
