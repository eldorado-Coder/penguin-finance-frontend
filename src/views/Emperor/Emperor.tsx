import React from 'react'
import styled from 'styled-components'
import Sound from 'react-sound';
import { Modal, Text, LinkExternal, Flex } from '@penguinfinance/uikit'
import useI18n from 'hooks/useI18n'

import Page from 'components/layout/Page'
import EmperorBlock from './components/EmperorBlock'
import YourScoreBlock from './components/YourScoreBlock'
import TopPenguinsBlock from './components/TopPenguinsBlock'


const Grid = styled.div<{ align: string }>`
  /* display: grid; */
  /* grid-template-columns: repeat(3, 1fr); */
  /* grid-template-rows: repeat(4, auto); */
  display: flex;
  margin-bottom: 24px;
  justify-content: space-between;
  justify-content: ${({ align }) => align === 'center' ? "center" : "space-between"};
  margin: 0px -50px;
  margin-top: -20px;
  &:last-child {
    margin-top: -100px;
  }
`

const GridItem = styled.div`
  margin-bottom: '10px';
  width: 315px;
`


const Emperor: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <Page>
      <Sound
        url="/sounds/penguin_emperor_page.mp3"
        playStatus={Sound.status.PLAYING}
        loop
      />
      <EmperorBgContainer width="100%" height="100%" autoPlay loop muted>
        <source src="/videos/penguin_emperor.mp4" />
      </EmperorBgContainer>

      <Grid align="center">
        <GridItem>
          <EmperorBlock />
        </GridItem>
      </Grid>

      <Grid align="between">
        <GridItem>
          <TopPenguinsBlock />
        </GridItem>
        <GridItem>
          <YourScoreBlock />
        </GridItem>
      </Grid>
    </Page >
  )
}

const EmperorBgContainer = styled.video`
  object-fit: fill;
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  z-index: -1;
  /* display: block;
  margin: auto; */
`

export default Emperor
