import React, { Component } from "react";
import "./timer.css";

import Button from "../commonComponents/Button/Button";

let timerId = -1;
let exerciseIndex = 0;
let currentExerciseTime = 0;
class Timer extends Component {
  state = {
    totalTime: 0,
    hasStarted: false,
    timeCompleted: false,
    elapsedTime: 0,
    remainingTime: 0,
    exercises: this.props.exercises,
  };

  componentDidMount() {
    this.getTotalTime();
    if (this.props.auto) {
      this.startAutoTimer();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.startTimerAfterRest !== this.props.startTimerAfterRest) {
      if (this.props.startTimerAfterRest) {
        console.log("started");
        this.startTimer();
      }
    } else if (prevProps.exercises !== this.props.exercises) {
      this.getTotalTime();
    }
    //  else if (
    //   this.state.exercises !== this.props.exercises ||
    //   prevState.exercises !== this.state.exercises
    // ) {
    //   this.setState({ exercises: this.props.exercises });
    // }
  }

  startAutoTimer = () => {
    this.setState({ hasStarted: true });
    let interval = setInterval(() => {
      if (this.state.totalTime <= 0) {
        this.setState({ hasStarted: false, timeCompleted: true });
        clearInterval(interval);
        if (this.props.removeScreen) {
          this.props.setShowRestScreen(false);
          // this.props.setTimerAfterRest(true);
        }
      } else {
        let temp = this.state.totalTime;
        temp -= 1;
        this.setState({ totalTime: temp });
      }
    }, 1000);
  };

  startTimer = () => {
    console.log("should start timer");
    timerId = setInterval(() => {
      this.syncExercisesWithTimer();
      if (this.state.totalTime <= 0) {
        console.log("done");
        this.setState({ hasStarted: false, timeCompleted: true });
        clearInterval(timerId);
      } else {
        let temp = this.state.totalTime;
        let elapTime = this.state.elapsedTime;
        elapTime += 1;
        temp -= 1;
        // console.log(temp);
        this.setState({
          remainingTime: this.state.totalTime - this.state.elapsedTime,
          totalTime: temp,
          elapsedTime: elapTime,
        });
      }
    }, 1000);
    this.setState({ hasStarted: true });
  };

  startStopTimer = () => {
    this.setState({ hasStarted: !this.state.hasStarted });
    if (timerId === -1) {
      this.startTimer();
    } else {
      this.stopTimer();
    }
  };

  stopTimer = () => {
    this.setState({ hasStarted: false });
    console.log("should stop timer");
    clearInterval(timerId);
    timerId = -1;
  };

  syncExercisesWithTimer = () => {
    currentExerciseTime += 1;
    if (exerciseIndex + 1 > this.props.exercises.length) {
      console.log("all exercises done");
      this.stopTimer();
      return;
    } else {
      if (
        currentExerciseTime ===
        this.props.exercises[exerciseIndex].exerciseDuration
      ) {
        console.log("should show rest screen");
        currentExerciseTime = 0;
        exerciseIndex += 1;
        this.stopTimer();
        console.log("timer stopped");
        this.props.setShowRestScreen(true);
      }
    }
  };

  restartTimer = () => {
    this.getTotalTime();
    this.setState({
      hasStarted: false,
      elapsedTime: 0,
      remainingTime: this.state.totalTime,
    });
    clearInterval(timerId);
    timerId = -1;
    exerciseIndex = 0;
    currentExerciseTime = 0;
  };

  getTotalTime = () => {
    if (this.props.exercises) {
      if (this.props.exercises.length === 0) {
        this.setState({ totalTime: 0, timeCompleted: true });
      } else {
        if (this.props.exercises) {
          let time = 0;
          for (let i of this.props.exercises) {
            time += Number(i.exerciseDuration);
          }
          this.setState({ totalTime: time, timeCompleted: false });
        }
      }
    } else if (this.props.totalTime) {
      this.setState({ totalTime: this.props.totalTime });
    }
  };

  disableStartButton = () => {
    if (this.state.timeCompleted) {
      return true;
    } else return false;
  };

  render() {
    return (
      <div className="timer_container">
        {this.props.showTotal && <h3>Total:</h3>}
        <p className="timer">
          {isNaN(this.state.totalTime)
            ? "00"
            : Math.trunc(this.state.totalTime / 60)}
          :{isNaN(this.state.totalTime) ? "00" : this.state.totalTime % 60}
        </p>
        {this.props.showElapsedTime && (
          <div>
            <h3>Elapsed Time:</h3>
            <p className="elapsed_time">
              {isNaN(this.state.elapsedTime)
                ? "00"
                : Math.trunc(this.state.elapsedTime / 60)}
              :
              {isNaN(this.state.elapsedTime)
                ? "00"
                : this.state.elapsedTime % 60}
            </p>
          </div>
        )}
        {/* {this.props.showRemainingTime && (
          <div>
            <h3>Remaining Time:</h3>
            <p className="elapsed_time">
              {isNaN(this.state.elapsedTime) && isNaN(this.state.totalTime)
                ? "00"
                : Math.trunc(this.state.remainingTime / 60)}
              :
              {isNaN(this.state.elapsedTime) && isNaN(this.state.totalTime)
                ? "00"
                : this.state.remainingTime % 60}
            </p>
          </div>
        )} */}
        {this.props.showButtons && (
          <div className="interact_buttons">
            <Button
              commonStyles
              buttonAnimation
              type="button"
              classes="btn_interact"
              onClick={this.startStopTimer}
              disabled={this.state.timeCompleted ? "disabled" : ""}
            >
              {this.state.hasStarted ? "Stop" : "Start"}
            </Button>
            <Button
              commonStyles
              buttonAnimation
              type="button"
              classes="btn_interact"
              onClick={this.restartTimer}
            >
              Restart
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default Timer;
