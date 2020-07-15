import React, { Component } from "react";

import "./settings.css";
import Input from "../../components/commonComponents/input/input";
import Button from "../../components/commonComponents/Button/Button";

class SettingsPage extends Component {
  state = {};
  render() {
    return (
      <div className="settings_container">
        <h3>settings</h3>
        <div className="settings_options">
          <div className="setting restTime_setting">
            <p>Rest Time(in seconds)</p>
            <Input type="number" placeholder="enter rest time" />
          </div>
          <div className="setting startIndicator_setting">
            <p>start indicator sound</p>
            <Input type="select" options={["one", "two"]} />
          </div>
          <div className="setting restIndicator_setting">
            <p>rest indicator sound</p>
            <Input type="select" options={["one", "two"]} />
          </div>
        </div>
        <Button type="button" classes="btn_saveSettings" commonStyles>
          Save
        </Button>
      </div>
    );
  }
}

export default SettingsPage;
