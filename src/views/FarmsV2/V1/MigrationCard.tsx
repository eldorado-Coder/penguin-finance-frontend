import { Flex, Button } from 'penguinfinance-uikit2';
import React, { useState, useRef } from 'react'
import styled from 'styled-components'

const FCard = styled.div`
  // align-self: baseline;
  background: ${(props) => props.theme.card.background};
  border-radius: 32px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
  position: relative;
  text-align: center;

  @media (min-width: 640px) {
    min-width: 320px;
    max-width: 100%;
    width: unset;
  }
  @media (min-width: 768px) {
    min-width: 656px;
    max-width: 67%;
    width: 100%;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 8px;

  @media (min-width: 640px) {
    width: 200px;
    margin-top: 16px;
  }
`;

const PangolinButton = styled(StyledButton)`
  background-color: #f97316;
  color: white;
  margin-top: 0;
`;

const Actions = styled(Flex)`
  width: 100%;

  @media (min-width: 640px) {
    width: unset;
}
`;

const MigrationVideo = styled.video`
  width: 100%;
  margin-bottom: 16px;
  border-radius: 16px;

  @media (min-width: 640px) {
    width: calc(100% - 216px);
    margin-right: 16px;
    margin-bottom: 0;
  }
`;

const MigrationCard: React.FC = () => {
  const videoRef = useRef(null);

  const handleViewVideoGuide = () => {
    if (videoRef && videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleViewTextGuide = () => {
    window.open('https://docs.penguinfinance.io/summary/igloos-liquidity-staking/igloo-v2-migration-guide', '_blank');
  };

  const handleGoPangolin = () => {
    window.open('https://app.pangolin.exchange/#/swap', '_blank');
  };

  return (
    <FCard>
      <Flex flexWrap='wrap'>
        <MigrationVideo ref={videoRef} controls>
          <source src='https://res.cloudinary.com/dbyunrpzq/video/upload/v1630028768/BooFiLaunchpad_nwkbrj.mp4' />
        </MigrationVideo>
        <Actions flexDirection='column' alignItems='center'>
          <PangolinButton onClick={handleGoPangolin}>Go to Pangolin</PangolinButton>
          <StyledButton color='primary' onClick={handleViewVideoGuide}>View Video Guide</StyledButton>
          <StyledButton color='primary' onClick={handleViewTextGuide}>View Text Guide</StyledButton>
        </Actions>
      </Flex>
    </FCard>
  )
}

export default MigrationCard
