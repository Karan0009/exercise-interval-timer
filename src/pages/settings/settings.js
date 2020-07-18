import React, { Component } from "react";

import "./settings.css";
import Input from "../../components/commonComponents/input/input";
import Button from "../../components/commonComponents/Button/Button";
import { sounds } from "./sounds/sounds.js";

const audio = new Audio();
class SettingsPage extends Component {
  state = {
    defaultRestTime: 3,
    startIndicatorSound: sounds[0].name,
    endIndicatorSound: sounds[0].name,
    soundNames: sounds.map((sound) => sound.name),
  };

  inputChangeHandler = (e) => {
    console.log(e.target.value);
    const inputId = e.target.id;
    if (inputId === "defaultRestTime") {
      if (isNaN(e.target.value)) {
        return;
      }
    } else {
      const sound = sounds.find((sound) => sound.name === e.target.value);
      if (sound) {
        this.playAudio(sound.src);
        this.setState({ [inputId]: e.target.value });
      } else {
        console.log("error in finding audio");
      }
    }
    this.setState({ [inputId]: e.target.value });
  };

  playAudio = (src) => {
    audio.pause();
    audio.src = src;
    audio.volume = 0.3;
    audio.play();
  };

  render() {
    return (
      <div className="settings_container">
        <h3>settings</h3>
        {/* <Audios a={sounds} playAudio={this.playAudio} /> */}
        <div className="settings_options">
          <div className="setting restTime_setting">
            <p>Rest Time(in seconds)</p>
            <Input
              type="number"
              placeholder="enter rest time"
              id="defaultRestTime"
              value={this.state.defaultRestTime}
              onChange={this.inputChangeHandler}
            />
          </div>
          <div className="setting startIndicator_setting">
            <p>start indicator sound</p>
            <Input
              type="select"
              classes=""
              options={this.state.soundNames}
              id="startIndicatorSound"
              value={this.state.startIndicatorSound}
              valid={true}
              onChange={this.inputChangeHandler}
            />
          </div>
          <div className="setting restIndicator_setting">
            <p>rest indicator sound</p>
            <Input
              type="select"
              classes=""
              options={this.state.soundNames}
              valid={true}
              id="endIndicatorSound"
              value={this.state.endIndicatorSound}
              onChange={this.inputChangeHandler}
            />
          </div>
        </div>
        <Button
          type="button"
          classes="btn_saveSettings"
          commonStyles
          onClick={() => this.props.saveSettingsHandler(this.state)}
        >
          Save
        </Button>
      </div>
    );
  }
}

export default SettingsPage;
