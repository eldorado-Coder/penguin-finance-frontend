import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import Sound from 'react-sound'
import { useWeb3React } from '@web3-react/core'
import { Text } from 'penguinfinance-uikit2'

import { useEmperor } from 'state/hooks'
import Page from 'components/layout/Page'
import EmperorBlock from './components/EmperorBlock'
import YourScoreBlock from './components/YourScoreBlock'
import TopPenguinsBlock from './components/TopPenguinsBlock'

const JACKPOTS = {
  LOCK: `${process.env.PUBLIC_URL}/images/emperor/jackpot/jackpot_lock.gif`,
  OPEN: `${process.env.PUBLIC_URL}/images/emperor/jackpot/jackpot_open.gif`,
  UNLOCK: `${process.env.PUBLIC_URL}/images/emperor/jackpot/jackpot_unlock.gif`,
}

const ChestWrapper = styled.div<{ jackpot: string }>`
  position: absolute;
  width: 15%;
  left: 22%;
  bottom: 18%;

  &:hover {
    z-index: 15;
  }

  img {
    cursor: pointer;
  }
  .jackpot-lock {
    display: ${(props) => props.jackpot !== JACKPOTS.LOCK && 'none'};
  }
  .jackpot-open {
    display: ${(props) => props.jackpot !== JACKPOTS.OPEN && 'none'};
  }
  .jackpot-unlock {
    display: ${(props) => props.jackpot !== JACKPOTS.UNLOCK && 'none'};
  }
`

const PaperWrapper = styled.div`
  @font-face {
    font-family: 'GothamBold Font';
    src: url(${process.env.PUBLIC_URL}/fonts/GothamBold.ttf) format('truetype');
  }

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10%;

  div {
    position: absolute;
    font-family: 'GothamBold Font';
    min-width: 120px;
    text-align: center;

    span {
      color: #9b1919;
    }

    font-size: 10px;
    @media (min-width: 640px) {
      font-size: 12px;
    }
    @media (min-width: 768px) {
      font-size: 12px;
    }
    @media (min-width: 1200px) {
      font-size: 14px;
    }
    @media (min-width: 1450px) {
      font-size: 20px;
    }
    @media (min-width: 1600px) {
      font-size: 24px;
    }
  }
`

const JackpotPaper = styled.img`
  object-fit: cover;
  position: absolute;
  min-width: 120px;
`

const GridItem = styled.div`
  margin-bottom: '10px';
  width: 315px;
  margin: 0px 4px;
`

const Grid = styled.div<{ align: string }>`
  display: flex;
  margin-bottom: 24px;
  justify-content: space-between;
  justify-content: ${({ align }) => (align === 'center' ? 'center' : 'space-between')};
  margin: 0px -50px;
  margin-top: -20px;
`

const EmperorBgContainer = styled.video`
  object-fit: fill;
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  z-index: -1;
`

const Emperor: React.FC = () => {
  const [jackpot, setJackpot] = useState(JACKPOTS.LOCK)
  const { currentEmperor } = useEmperor()
  const { account } = useWeb3React()
  const [jackpotOpenSound, setJackpotOpenSound] = useState(false)
  const [showJackpot, setShowJackpot] = useState(false);
  const jackpotRef = useRef(jackpot);
  jackpotRef.current = jackpot;

  const handleOpenJackpot = () => {
    if (jackpotRef.current === JACKPOTS.LOCK) {
      setJackpotOpenSound(true)
      setJackpot(JACKPOTS.OPEN)
      setTimeout(() => {
        setJackpot(JACKPOTS.UNLOCK)
        setJackpotOpenSound(false)
      }, 800)
    } else if (jackpotRef.current === JACKPOTS.UNLOCK) {
      setJackpot(JACKPOTS.LOCK)
    }
  }

  const onJackpotLoaded = () => {
    setShowJackpot(true);
  }

  const renderEmperorStatsPage = () => {
    return (
      <>
        {account && (
          <ChestWrapper jackpot={jackpot} onClick={handleOpenJackpot}>
            {jackpot === JACKPOTS.UNLOCK && (
              <PaperWrapper>
                <JackpotPaper 
                  onLoad={onJackpotLoaded}
                  src={`${process.env.PUBLIC_URL}/images/emperor/jackpot/Mapefi.svg`} alt="jackpot_paper" />
                {showJackpot && 
                  <Text className="price" fontSize="24px">
                    {currentEmperor.jackpot} <span>x</span>PEFI
                  </Text>
                }
              </PaperWrapper>
            )}
            <img className="jackpot-lock" src={JACKPOTS.LOCK} alt="jackpot_lock" />
            <img className="jackpot-open" src={JACKPOTS.OPEN} alt="jackpot_open" />
            <img className="jackpot-unlock" src={JACKPOTS.UNLOCK} alt="jackpot_unlock" />
          </ChestWrapper>
        )}

        <Grid align="between">
          <GridItem>
            <TopPenguinsBlock />
          </GridItem>
          <GridItem>
            <EmperorBlock />
          </GridItem>
          <GridItem>
            <YourScoreBlock />
          </GridItem>
        </Grid>
      </>
    )
  }

  const renderEmperorEndPage = () => {
    return <>{/* <EmperorEndBgContainer /> */}</>
  }

  const emperorEnded = true
  const emperorDefaultVideo = '/videos/penguin_emperor.mp4'
  // to change the video of emperor winner page background video, please change this video path
  const emperorWinnerVideo = '/videos/PenguinEmperorWinner_Final.mp4'

  return (
    <Page>
      <Sound
        url={`${emperorEnded ? '/sounds/penguin_emperor_winner.mp3' : '/sounds/penguin_emperor_page.mp3'} `}
        playStatus={Sound.status.PLAYING}
        volume={20}
        loop
      />
      <Sound
        url="/sounds/jackpot_open.mp3"
        playStatus={jackpotOpenSound ? Sound.status.PLAYING : Sound.status.STOPPED}
        volume={100}
      />

      {/* background video */}
      <EmperorBgContainer width="100%" height="100%" autoPlay loop muted>
        <source src={emperorEnded ? emperorWinnerVideo : emperorDefaultVideo} />
      </EmperorBgContainer>

      {!emperorEnded ? <>{renderEmperorStatsPage()}</> : <>{renderEmperorEndPage()}</>}
    </Page>
  )
}

export default Emperor
