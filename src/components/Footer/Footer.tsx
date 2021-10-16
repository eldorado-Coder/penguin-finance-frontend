import React from 'react'
import styled from 'styled-components'
import { SvgProps, Text, ResetCSS, Link, useMatchBreakpoints } from 'penguinfinance-uikit2'
import * as IconModule from './icons'
import { FooterProps, FooterBodyProps, FlexProps } from './types'
import { FooterLinks, FooterIconLinks } from './config'

const Icons = (IconModule as unknown) as { [key: string]: React.FC<SvgProps> }
const Logo = Icons.FooterIcon
const Shield = Icons.ShieldIcon

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

const Footer: React.FC<FooterProps> = (props) => {
  // check if screen is in medium size or below
  const bPoints = useMatchBreakpoints()
  const isStacked = !bPoints.isLg && !bPoints.isXl
  return (
    <>
      <ResetCSS />
      <FooterWrapper>
        <FooterBody isStacked={isStacked}>
          <Column isStacked={isStacked} maxWidth="260px" mb={isStacked ? '2rem' : '0'}>
            <Logo width="100%" />
            <FooterParagraph as="p" textAlign={isStacked ? 'center' : 'left'} fontSize=".8rem" color="#B7B5DE" mb="6px">
              The Penguin Finance protocol is bringing yield-farming, staking and more functionalities to the Avalanche
              Network.
            </FooterParagraph>
            <Row isStacked={isStacked} alignItems="flex-end">
              <div>
                <Shield width="16px" />
              </div>
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
                <CustomLink href={link.url}>{link.title}</CustomLink>
              ))}
            </Column>
          ))}
          <Column isStacked={isStacked} alignItems="center" maxWidth="350px">
            <TitleText color="#fff" mb="10px">
              Official Social Media
            </TitleText>
            <Row isStacked={isStacked} justifyContent="space-around" alignItems="center" width="200px">
              {FooterIconLinks[0].map((item) => {
                const Icon = Icons[`${item.name}`]
                return (
                  <Link href={item.url}>
                    <Icon width="24px" height="24px" />
                  </Link>
                )
              })}
            </Row>
            <TitleText color="#fff" mt="1.5rem" mb="10px">
              Powered by
            </TitleText>
            <Row isStacked={isStacked} justifyContent="space-around" alignItems="center" width="100%">
              {FooterIconLinks[1].map((item) => {
                const Icon = Icons[`${item.name}`]
                return (
                  <Link href={item.url}>
                    <Icon width="30px" height="30px" />
                  </Link>
                )
              })}
            </Row>
          </Column>
        </FooterBody>
      </FooterWrapper>
    </>
  )
}

export default Footer
