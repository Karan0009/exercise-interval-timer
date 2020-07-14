import React, { useState, useEffect } from "react";
import styled from "styled-components";

const CountDownNumber = styled.p`
  position: fixed;
  color: white;
  padding: 5px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 15em;
  font-weight: bold;
  z-index: 100;
  opacity: 75%;
`;

const Countdown = () => {
  const [time, setTime] = useState("3");

  useEffect(() => {
    countDown();
  });

  const countDown = () => {
    const interval = setInterval(() => {
      if (time === 0) {
        clearInterval(interval);
      } else {
        let temp = Number(time);
        temp -= 1;
        setTime(temp);
      }
    }, 1000);
  };

  return (
    <div className="countdown_container">
      <CountDownNumber>{time}</CountDownNumber>
    </div>
  );
};

export default Countdown;
