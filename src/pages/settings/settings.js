import React, { Component } from "react";

import "./settings.css";
import Input from "../../components/commonComponents/input/input";
import Button from "../../components/commonComponents/Button/Button";

class SettingsPage extends Component {
  state = {
    defaultRestTime: 3,
    startIndicatorSound: null,
    endIndicatorSound: null,
    sounds: [],
  };

  inputChangeHandler = (e) => {
    const inputId = e.target.id;
    if (inputId === "defaultRestTime") {
      if (isNaN(e.target.value)) return;
    }
    this.setState({ inputId: e.target.value });
  };

  getSounds = () => {};

  render() {
    return (
      <div className="settings_container">
        <h3>settings</h3>
        <div className="settings_options">
          <div className="setting restTime_setting">
            <p>Rest Time(in seconds)</p>
            <Input
              type="number"
              placeholder="enter rest time"
              id="defaultRestTime"
              onChange={this.inputChangeHandler}
            />
          </div>
          <div className="setting startIndicator_setting">
            <p>start indicator sound</p>
            <Input
              type="select"
              options={["one", "two"]}
              id="startIndicatorSound"
              onChange={this.inputChangeHandler}
            />
          </div>
          <div className="setting restIndicator_setting">
            <p>rest indicator sound</p>
            <Input
              type="select"
              options={["one", "two"]}
              id="endIndicatorSound"
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
