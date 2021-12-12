import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Sound from 'react-sound'
import { useWeb3React } from '@web3-react/core'
import { Text, useMatchBreakpoints, Flex } from 'penguinfinance-uikit2'
import { useDispatch } from 'react-redux'
import { fetchEmperor } from 'state/emperor'
import { useEmperor } from 'state/hooks'
import Page from 'components/layout/Page'
import useUserSetting from 'hooks/useUserSetting'
import EmperorBlock from './components/EmperorBlock'
import YourScoreBlock from './components/YourScoreBlock'
import EmperorNotLiveBlock from './components/EmperorNotLiveBlock'
import TopPenguinsBlock from './components/TopPenguinsBlock'

const JACKPOTS = {
  LOCK: `${process.env.PUBLIC_URL}/images/emperor/jackpot/jackpot_lock.gif`,
  OPEN: `${process.env.PUBLIC_URL}/images/emperor/jackpot/jackpot_open.gif`,
  UNLOCK: `${process.env.PUBLIC_URL}/images/emperor/jackpot/jackpot_unlock.gif`,
}

const Emperor: React.FC = () => {
  const [jackpot, setJackpot] = useState(JACKPOTS.LOCK)
  const { currentEmperor } = useEmperor()
  const { account } = useWeb3React()
  const [jackpotOpenSound, setJackpotOpenSound] = useState(false)
  const [showJackpot, setShowJackpot] = useState(false)
  const jackpotRef = useRef(jackpot)
  const { isMusic } = useUserSetting()
  const { isSm, isXs } = useMatchBreakpoints()
  const [showLastRound, setShowLastRound] = useState(false);
  const isMobile = isSm || isXs

  jackpotRef.current = jackpot

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchEmperor(account))

    const refreshInterval = setInterval(() => {
      dispatch(fetchEmperor(account))
    }, 5000)

    return () => clearInterval(refreshInterval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, account])

  useEffect(() => {
    if (!account) {
      setShowLastRound(false);
    }
  }, [account]);

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

  const handleShowLastRound = () => {
    setShowLastRound(true)
  }

  const onJackpotLoaded = () => {
    setShowJackpot(true)
  }

  const emperorEnded = true
  const emperorDefaultVideo = 'https://res.cloudinary.com/dbyunrpzq/video/upload/v1624544908/penguin_emperor_ldeorc.mp4'
  // to change the video of emperor winner page background video, please change this video path
  const emperorWinnerVideo = '/videos/penguin_emperor_winner.mp4'

  const renderEmperorStatsPage = () => {
    return (
      <>
        {account && (!emperorEnded || showLastRound) && (
          <Wrapper isMobile={isMobile}>
            <ChestWrapper isMobile={isMobile} jackpot={jackpot} onClick={handleOpenJackpot}>
              <PaperWrapper isOpen={jackpot === JACKPOTS.UNLOCK}>
                <JackpotPaper
                  isMobile={isMobile}
                  onLoad={onJackpotLoaded}
                  src={`${process.env.PUBLIC_URL}/images/emperor/jackpot/Mapefi.svg`}
                  alt="jackpot_paper"
                />
                {showJackpot && (
                  <Text className="price" fontSize="24px">
                    {currentEmperor.jackpot} <span>i</span>PEFI
                  </Text>
                )}
              </PaperWrapper>
              <img className="jackpot-lock" src={JACKPOTS.LOCK} alt="jackpot_lock" />
              <img className="jackpot-open" src={JACKPOTS.OPEN} alt="jackpot_open" />
              <img className="jackpot-unlock" src={JACKPOTS.UNLOCK} alt="jackpot_unlock" />
            </ChestWrapper>
          </Wrapper>
        )}
        {isMobile ? (
          <>
            <Flex flexDirection="column" alignItems="center" padding="40px 32px">
              {account && (!emperorEnded || showLastRound) && (
                <Flex width="100%" flexDirection="column" px="10px">
                  <YourScoreBlock />
                  <TopPenguinsBlock />
                </Flex>
              )}
            </Flex>
          </>
        ) : (
          <>
            {emperorEnded && !showLastRound &&
              <EmperorNotLiveBlock onShowLastRound={handleShowLastRound} />
            }
            {(!emperorEnded || (emperorEnded && account && showLastRound)) &&
              <Grid align="center" marginTop={{ xs: 80, sm: 100 }}>
                <GridItem>
                  <EmperorBlock />
                </GridItem>
              </Grid>
            }
            {account && (!emperorEnded || showLastRound) && (
              <PGGRid align="between" marginTop={{ xs: -40, sm: -100, md: -200, lg: -200 }}>
                <GridItem>
                  <TopPenguinsBlock />
                </GridItem>
                <GridItem>
                  <YourScoreBlock />
                </GridItem>
              </PGGRid>
            )}
          </>
        )}
      </>
    )
  }

  const renderEmperorEndPage = () => {
    return (
      <>
        <EmperorEndBgContainer>
          <BlitzImage
            src={isSm ? '/images/emperor/blitz_end2_mobile.png' : '/images/emperor/blitz_end2.png'}
            alt="blitz-img"
          />
        </EmperorEndBgContainer>
      </>
    )
  }

  return (
    <EmperorPage>
      <Sound
        url={`${emperorEnded ? '/sounds/penguin_emperor_winner.mp3' : '/sounds/emperor_blitz1.mp3'} `}
        playStatus={Sound.status.PLAYING}
        volume={isMusic ? 20 : 0}
        loop
      />
      <Sound
        url="/sounds/jackpot_open.mp3"
        playStatus={jackpotOpenSound ? Sound.status.PLAYING : Sound.status.STOPPED}
        volume={isMusic ? 100 : 0}
      />
      {/* background video on large screen and background image on small screen */}
      <EmperorWrapper isSm={isMobile}>
        {isMobile ? (
          <EmperorSmWrapper>
            <ThroneSmBgContainer>
              <EmperorSmBgImage src="/images/emperor/emperor-bg-sm.png" alt="emperor background" />
            </ThroneSmBgContainer>
            {(!emperorEnded || (emperorEnded && account && showLastRound)) && 
              <Flex flexDirection="column" alignItems="center" padding="40px 32px">
                <EmperorBlock />
              </Flex>
            }
            {emperorEnded && !showLastRound &&
              <EmperorNotLiveBlock onShowLastRound={handleShowLastRound} />
            }
          </EmperorSmWrapper>
        ) : (
          <EmperorBgContainer width="100%" height="100%" autoPlay loop muted>
            <source src={emperorDefaultVideo} />
            {/* <source src={emperorEnded ? emperorWinnerVideo : emperorDefaultVideo} /> */}
          </EmperorBgContainer>
        )}
        {renderEmperorStatsPage()}
        {/* {!emperorEnded ? <>{renderEmperorStatsPage()}</> : <>{renderEmperorEndPage()}</>} */}
      </EmperorWrapper>
    </EmperorPage>
  )
}

const EmperorPage = styled(Page)`
  max-width: 100%; //1120px;
  overflow: hidden;
  padding: 0px;
  background: #231631;
  position: relative;

  @media (min-width: 576px) {
    // height: 100%;
    height: calc(100vh - 170px);
    min-height: calc(100vh - 170px);
  }
  @media (min-width: 768px) {
    padding: 40px 30px;
  }
`

const Wrapper = styled.div<{ isMobile?: boolean }>`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  height: ${({ isMobile }) => (isMobile ? '440px' : '100%')};
`

const ChestWrapper = styled.div<{ jackpot: string; isMobile?: boolean }>`
  position: absolute;
  width: ${({ isMobile }) => (isMobile ? '25%' : '9.5%')};
  left: ${({ isMobile }) => (isMobile ? '1.5%' : '26%')};
  bottom: 18%;
  z-index: 11;

  @media (min-width: 1450px) {
    width: 8%;
    left: 27%;
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

const PaperWrapper = styled.div<{ isOpen: boolean }>`
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
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
      font-size: 14px;
    }
    @media (min-width: 1200px) {
      min-width: 180px;
      font-size: 16px;
    }
    @media (min-width: 1450px) {
      min-width: 12 0px;
      font-size: 16px;
    }
    @media (min-width: 1600px) {
      font-size: 20px;
    }
  }
  @media (min-width: 1200px) {
    margin-bottom: 14%;
  }
  @media (min-width: 1450px) {
    margin-bottom: 12%;
  }
`

const JackpotPaper = styled.img<{ isMobile?: boolean }>`
  object-fit: cover;
  position: absolute;
  min-width: ${({ isMobile }) => (isMobile ? '110px' : '120px')};

  @media (min-width: 1200px) {
    min-width: 180px;
  }
`

const GridItem = styled.div`
  margin-bottom: '10px';
  max-width: 280px;
  margin: 0px 4px;
  width: 200px;

  @media (min-width: 640px) {
    max-width: 280px;
    width: 240px;
  }
  @media (min-width: 768px) {
    max-width: 240px;
  }
  @media (min-width: 1200px) {
    width: 280px;
    max-width: 280px;
  }
  @media (min-width: 4000px) {
    width: 420px;
    max-width: 420px;
  }
`

const Grid = styled.div<{ align: string; marginTop?: { xs?: number; sm?: number; md?: number; lg?: number } }>`
  display: flex;
  margin-bottom: 24px;
  justify-content: space-around;
  justify-content: ${({ align }) => (align === 'center' ? 'center' : 'space-between')};
  margin-top: ${({ marginTop }) => `${marginTop.xs}px`};
  padding: 0 3%;
  @media (min-width: 640px) {
    ${({ marginTop }) =>
      marginTop.xs && {
        marginTop: `${marginTop.xs}px`,
      }}
  }
  @media (min-width: 768px) {
    ${({ marginTop }) =>
      marginTop.sm && {
        marginTop: `${marginTop.sm}px`,
      }}
  }
  @media (min-width: 1200px) {
    ${({ marginTop }) =>
      marginTop.md && {
        marginTop: `${marginTop.md}px`,
      }}
  }
  @media (min-width: 1450px) {
    ${({ marginTop }) =>
      marginTop.lg && {
        marginTop: `${marginTop.lg}px`,
      }}
  }
  @media (max-width: 1600px) {
    font-size: 24px;
  }
  width: 100%;
`

const PGGRid = styled(Grid)`
  @media (min-width: 640px) and (max-height: 900px) {
    margin-top: -80px;
  }
  @media (min-width: 768px) and (max-height: 900px) {
    margin-top: -140px;
  }
  @media (min-width: 992px) and (max-height: 900px) {
    margin-top: -160px;
  }
  @media (min-width: 1200px) and (max-height: 900px) {
    margin-top: -140px;
  }
`

const EmperorBgContainer = styled.video<{ isMobile?: boolean }>`
  object-fit: ${({ isMobile }) => (isMobile ? 'cover' : 'fill')};
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  z-index: 0;
  min-height: ${({ isMobile }) => isMobile && '440px'};
`
// emperor end
const EmperorEndBgContainer = styled.div``

const BlitzImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
`

const EmperorWrapper = styled.div<{ isSm: boolean }>`
  background: ${({ isSm }) => (isSm ? '#231631' : 'transparent')};
  z-index: -1;
  padding-bottom: 8px;
`
const EmperorSmWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 440px;
`
const ThroneSmBgContainer = styled.div`
  width: 100%;
  height: 100%;
  object-fit: fill;
  position: absolute;
  top: 0px;
  left: 0px;
`
const EmperorBlockWrapper = styled.div`
  margin-top: 100px;
  width: 180px;
  z-index: 1;
`

const EmperorSmBgImage = styled.img`
  width: 100%;
  height: 100%;
`

export default Emperor
