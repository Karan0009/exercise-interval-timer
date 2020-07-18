import React from "react";

const Sound = (props) => {
  return (
    <>
      <p onClick={() => props.playAudio(props.sound.src)}>{props.sound.name}</p>
    </>
  );
};

export default Sound;
