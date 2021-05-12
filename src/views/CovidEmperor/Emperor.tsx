import React, { useState } from 'react'
import styled from 'styled-components'
import Sound from 'react-sound'
import { useWeb3React } from '@web3-react/core'
import { Text } from 'penguinfinance-uikit2'

import { useEmperor } from 'state/hooks'
import Page from 'components/layout/Page'
import LatestDonation from './components/LatestDonation'
import YourScoreBlock from './components/YourScoreBlock'
import TopRaisedBlock from './components/TopRaisedBlock'

const JACKPOTS = {
  LOCK: `${process.env.PUBLIC_URL}/images/emperor/jackpot/jackpot_lock.gif`,
  OPEN: `${process.env.PUBLIC_URL}/images/emperor/jackpot/jackpot_open.gif`,
  UNLOCK: `${process.env.PUBLIC_URL}/images/emperor/jackpot/jackpot_unlock.gif`,
}

const EmperorPage = styled(Page)`
  max-width: 1120px;
`

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
  max-width: 315px;
  margin: 0px 4px;
  width: 30%;
  display: flex;
  justify-content: center;
`

const Grid = styled.div<{ align: string; marginTop?: { xs?: number; sm?: number; md?: number; lg?: number } }>`
  display: flex;
  margin-bottom: 24px;
  justify-content: space-around;
  justify-content: ${({ align }) => (align === 'center' ? 'center' : 'space-between')};
  margin-top: ${({ marginTop }) => `${marginTop.xs}px`};
  @media (max-width: 640px) {
    ${({ marginTop }) =>
      marginTop.xs && {
        marginTop: `${marginTop.xs}px`,
      }}
  }
  @media (max-width: 768px) {
    ${({ marginTop }) =>
      marginTop.sm && {
        marginTop: `${marginTop.sm}px`,
      }}
  }
  @media (max-width: 1200px) {
    ${({ marginTop }) =>
      marginTop.md && {
        marginTop: `${marginTop.md}px`,
      }}
  }
  @media (max-width: 1450px) {
    ${({ marginTop }) =>
      marginTop.lg && {
        marginTop: `${marginTop.lg}px`,
      }}
  }
  @media (max-width: 1600px) {
    font-size: 24px;
  }
  padding: 0 5%;
  width: 100%;
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

  const handleOpenJackpot = () => {
    if (jackpot === JACKPOTS.LOCK) {
      setJackpotOpenSound(true)
      setJackpot(JACKPOTS.OPEN)
      setTimeout(() => {
        setJackpot(JACKPOTS.UNLOCK)
        setJackpotOpenSound(false)
      }, 800)
    } else if (jackpot === JACKPOTS.UNLOCK) {
      setJackpot(JACKPOTS.LOCK)
    }
  }

  const renderEmperorStatsPage = () => {
    return (
      <>
        {account && (
          <ChestWrapper jackpot={jackpot} onClick={handleOpenJackpot}>
            {jackpot === JACKPOTS.UNLOCK && (
              <PaperWrapper>
                <JackpotPaper src={`${process.env.PUBLIC_URL}/images/emperor/jackpot/Mapefi.svg`} alt="jackpot_paper" />
                <Text className="price" fontSize="24px">
                  {currentEmperor.jackpot} <span>x</span>PEFI
                </Text>
              </PaperWrapper>
            )}
            <img className="jackpot-lock" src={JACKPOTS.LOCK} alt="jackpot_lock" />
            <img className="jackpot-open" src={JACKPOTS.OPEN} alt="jackpot_open" />
            <img className="jackpot-unlock" src={JACKPOTS.UNLOCK} alt="jackpot_unlock" />
          </ChestWrapper>
        )}
        <Grid align="center" marginTop={{ xs: 100 }}>
          <GridItem>
            <LatestDonation />
          </GridItem>
        </Grid>
        <Grid align="between" marginTop={{ sm: -50, md: -60 }}>
          <GridItem>
            <TopRaisedBlock />
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

  const emperorEnded = false
  const emperorDefaultVideo = '/videos/penguin_emperor.mp4'
  // to change the video of emperor winner page background video, please change this video path
  const emperorWinnerVideo = '/videos/PenguinEmperorWinner_Final.mp4'

  return (
    <EmperorPage>
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
    </EmperorPage>
  )
}

export default Emperor
