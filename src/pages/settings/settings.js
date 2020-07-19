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
    currentRoutineName: "",
    isLoadClicked: false,
    isSaveRoutineClicked: false,
    isSaveSettingsClicked: false,
    loadRoutineName: JSON.parse(localStorage.getItem("savedRoutines")).map(
      (routine) => routine.name
    )[0],
  };

  inputChangeHandler = (e) => {
    const inputId = e.target.id;
    if (inputId === "defaultRestTime") {
      if (isNaN(e.target.value)) {
        return;
      }
    } else if (
      inputId === "startIndicatorSound" ||
      inputId === "endIndicatorSound"
    ) {
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

  getSavedRoutines = () => {
    const routines = JSON.parse(localStorage.getItem("savedRoutines")).map(
      (routine) => routine.name
    );
    return routines;
  };

  changeButtonText = (whichButton, value) => {
    if (whichButton === "load") {
      this.setState({ isLoadClicked: value });
    } else if (whichButton === "saveRoutine") {
      this.setState({ isSaveRoutineClicked: value });
    } else if (whichButton === "saveSettings") {
      this.setState({ isSaveSettingsClicked: value });
    }
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
              onClick={() => this.changeButtonText("saveSettings", false)}
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
              onClick={() => this.changeButtonText("saveSettings", false)}
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
              onClick={() => this.changeButtonText("saveSettings", false)}
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
          onClick={() => {
            this.props.saveSettingsHandler(this.state);
            this.setState({ isSaveSettingsClicked: true });
          }}
        >
          {this.state.isSaveSettingsClicked ? "Saved" : "Save"}
        </Button>
        <h3>Load or save routines</h3>
        <div className="setting saveRoutine_setting">
          <p>save this routine</p>
          <div>
            <Input
              type="text"
              classes=""
              valid={true}
              id="currentRoutineName"
              onClick={() => this.changeButtonText("saveRoutine", false)}
              value={this.state.currentRoutineName}
              placeholder="name of this routine"
              onChange={this.inputChangeHandler}
            />
            <Button
              type="button"
              classes="btn btn_saveRoutine"
              onClick={() => {
                this.props.saveRoutineHandler(this.state.currentRoutineName);
                this.changeButtonText("saveRoutine", true);
              }}
            >
              {this.state.isSaveRoutineClicked ? "Saved" : "Save"}
            </Button>
          </div>
        </div>
        <div className="setting saveRoutine_setting">
          <p>Load routine</p>
          <div>
            <Input
              type="select"
              classes=""
              options={this.getSavedRoutines()}
              valid={true}
              id="loadRoutineName"
              onClick={() => this.changeButtonText("load", false)}
              value={this.state.loadRoutineName}
              placeholder="name of routine to load"
              onChange={this.inputChangeHandler}
            />
            <Button
              type="button"
              classes="btn btn_saveRoutine"
              disabled={this.getSavedRoutines().length > 0 ? "" : "disabled"}
              onClick={() => {
                this.props.loadRoutineHandler(this.state.loadRoutineName);
                this.changeButtonText("load", true);
              }}
            >
              {this.state.isLoadClicked ? "Loaded" : "Load"}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default SettingsPage;
