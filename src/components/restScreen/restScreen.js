import React from "react";
import styled from "styled-components";

import Backdrop from "../commonComponents/backdrop/backdrop";
import Timer from "../../components/timer/timer";

const Styledp = styled.p`
  color: white;
  z-index: 100;
  font-size: ${(props) => props.fontSize};
  font-weight: bold;
  text-transform: capitalize;
  position: fixed;
  top: ${(props) => props.top};
  transform: translate(-50%, -50%);
  left: 50%;
  word-wrap: break-work;
  width: 100%;
  text-align: center;
  max-width: 100%;
`;

const RestScreen = (props) => {
  const skipRest = (e) => {
    props.setShowRestScreen(false);
  };
  return (
    <div onMouseDown={skipRest}>
      <Backdrop />
      <Styledp fontSize="8em">rest</Styledp>
      <Styledp top="50%">
        <Timer
          totalTime={props.defaultRestTime}
          auto
          removeScreen
          setShowRestScreen={props.setShowRestScreen}
        />
      </Styledp>
      <Styledp fontSize="2em" top="70%">
        click to skip
      </Styledp>
    </div>
  );
};

export default RestScreen;
