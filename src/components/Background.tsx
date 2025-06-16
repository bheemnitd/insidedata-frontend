import React from 'react';
import styled from 'styled-components';

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('/assets/background.png') center center/cover no-repeat fixed;
  z-index: -1;
`;

const Background: React.FC = () => {
  return <BackgroundContainer />;
};

export default Background; 