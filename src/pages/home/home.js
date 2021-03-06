import React, { Component } from "react";
import "./home.css";

// import Input from "../../components/commonComponents/input/input";
import Button from "../../components/commonComponents/Button/Button";
import Workouts from "../../components/workouts/workouts";
import Timer from "../../components/timer/timer";
// import Countdown from "../../components/countdown/countdown";
import RestScreen from "../../components/restScreen/restScreen";
import { sounds } from "../settings/sounds/sounds";

const audio = new Audio();
class HomePage extends Component {
  state = {
    exerciseName: "",
    exerciseDuration: 30,
    showRestScreen: false,
    startTimerAfterRest: false,
    soundVolume: 0.5,
  };

  exerciseOrRestHandler = () => {};

  inputChangeHandler = (e) => {
    if (e.target.id === "exerciseDuration") {
      if (isNaN(e.target.value)) return;
    }
    this.setState({ [e.target.id]: e.target.value });
  };

  setShowRestScreen = (value) => {
    if (value) {
      this.setState({ showRestScreen: value, startTimerAfterRest: false });
      const sound = sounds.find(
        (sound) => sound.name === this.props.endIndicatorSound
      );
      audio.pause();
      audio.src = sound.src;
      audio.volume = this.state.soundVolume;
      audio.play();
      console.log("end audio played");
    } else {
      this.setState({ showRestScreen: value, startTimerAfterRest: true });
      const sound = sounds.find(
        (sound) => sound.name === this.props.startIndicatorSound
      );
      audio.pause();
      audio.src = sound.src;
      audio.volume = this.state.soundVolume;
      audio.play();
      console.log("start audio played");
    }
  };

  setTimerAfterRest = (value) => {
    this.setState({ startTimerAfterRest: value });
  };

  render() {
    return (
      <>
        {this.state.showRestScreen && (
          <RestScreen
            setShowRestScreen={this.setShowRestScreen}
            defaultRestTime={this.props.defaultRestTime}
            setTimerAfterRest={this.setTimerAfterRest}
          />
        )}

        <div className="main_wrapper">
          <div className="ad_wrapper">ad here</div>
          <div className="main">
            {this.props.showExerciseAddForm && (
              <div className="exercise_info">
                <form
                  className="exercise_info_form"
                  onSubmit={(e) =>
                    this.props.addExerciseHandler(e, {
                      exerciseName: this.state.exerciseName,
                      exerciseDuration: Number(this.state.exerciseDuration),
                    })
                  }
                >
                  <input
                    type="text"
                    id="exerciseName"
                    placeholder="Enter name"
                    classes="exercise_input_name"
                    value={this.state.exerciseName}
                    onChange={this.inputChangeHandler}
                  />
                  <input
                    type="text"
                    id="exerciseDuration"
                    placeholder="Exercise duration(in secs)"
                    classes="exercise_input_time"
                    value={this.state.exerciseDuration}
                    onChange={this.inputChangeHandler}
                  />
                  <Button type="submit" classes="btn_exercise_info_submit">
                    Add
                  </Button>
                </form>
                <Button
                  type="button"
                  classes="btn_exercise_info_close"
                  onClick={this.props.showExerciseAddFormHandler}
                >
                  <i class="fa fa-times" aria-hidden="true">
                    close
                  </i>
                </Button>
              </div>
            )}
            {/* <Countdown /> */}
            <Timer
              exercises={this.props.exercises}
              showTotal
              showButtons
              showElapsedTime
              setShowRestScreen={this.setShowRestScreen}
              startTimerAfterRest={this.state.startTimerAfterRest}
            />

            <Workouts
              className="workouts_home"
              exercises={this.props.exercises}
              removeExercise={this.props.removeExercise}
            />
          </div>
          <div className="ad_wrapper">ad here</div>
        </div>
      </>
    );
  }
}

export default HomePage;
