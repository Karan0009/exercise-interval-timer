import React, { useState } from "react";
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

const StyledButton = styled.button`
  color: white;
  background: #ffffff00;
  border: 3px solid white;
  padding: 0.5rem 0.3rem;
  text-align: center;
  font-size: ${(props) => props.fontSize};
  border-radius: 5px;
  z-index: 100;
  position: fixed;
  left: 50%;
  transform: translate(-50%, -50%);
  top: ${(props) => props.top};
`;

const RestScreen = (props) => {
  const [restDuration, setRestDuration] = useState(props.defaultRestTime);
  const [restIncrement, setRestIncrement] = useState(5);
  const skipRest = (e) => {
    props.setShowRestScreen(false);
    props.setTimerAfterRest(true);
  };

  const increaseRestTime = (e) => {
    setRestDuration(restDuration + restIncrement);
    console.log(restDuration);
  };

  return (
    <>
      <div>
        <Backdrop />
        <Styledp fontSize="8em">rest</Styledp>
        <Styledp top="50%">
          <Timer
            totalTime={restDuration}
            auto
            removeScreen
            setShowRestScreen={props.setShowRestScreen}
            setTimerAfterRest={props.setTimerAfterRest}
          />
        </Styledp>
        <StyledButton top="70%" fontSize="40px" onClick={increaseRestTime}>
          +{restIncrement} sec
        </StyledButton>
        <StyledButton top="85%" fontSize="40px" onClick={skipRest}>
          Skip rest
        </StyledButton>
      </div>
    </>
  );
};

export default RestScreen;
