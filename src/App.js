import React, { Component } from "react";
import { withRouter, Switch, Route } from "react-router-dom";
// import styled from "styled-components";

import "./App.css";

// import Input from "./components/commonComponents/input/input";
import Button from "./components/commonComponents/Button/Button";
import Nav from "./components/commonComponents/nav/nav";
import Footer from "./components/commonComponents/footer/footer";
// import WorkoutAddForm from "./components/workoutAddForm/workoutAddForm";
import HomePage from "./pages/home/home";
import SettingsPage from "./pages/settings/settings";
import { sounds } from "./pages/settings/sounds/sounds.js";
import Backdrop from "./components/commonComponents/backdrop/backdrop";

class App extends Component {
  state = {
    appName: "Let's workout",
    defaultRestTime: 3,
    startIndicatorSound: sounds[0].name,
    endIndicatorSound: sounds[0].name,
    showBackdrop: false,
    exercises: [],
    showExerciseAddForm: false,
  };

  componentDidMount() {
    const startIndicatorSound = localStorage.getItem("startIndicatorSound");
    const endIndicatorSound = localStorage.getItem("endIndicatorSound");
    const defaultRestTime = localStorage.getItem("defaultRestTime");
    const savedRoutines = localStorage.getItem("savedRoutines");
    if (!savedRoutines) {
      localStorage.setItem("savedRoutines", JSON.stringify([]));
    }
    if (!startIndicatorSound || !endIndicatorSound || !defaultRestTime) {
      this.setState({
        defaultRestTime: 10,
        startIndicatorSound: sounds[0].name,
        endIndicatorSound: sounds[0].name,
      });
    } else {
      this.setState({
        defaultRestTime: defaultRestTime,
        startIndicatorSound: startIndicatorSound,
        endIndicatorSound: endIndicatorSound,
      });
    }
  }

  showExerciseAddFormHandler = () => {
    const showExerciseAddForm = this.state.showExerciseAddForm;
    this.setState({ showExerciseAddForm: !showExerciseAddForm });
  };

  removeExercise = (name) => {
    const exercises = this.state.exercises.filter(
      (exercise) => exercise.exerciseName !== name
    );
    this.setState({ exercises });
  };

  addExerciseHandler = (e, data) => {
    const exercises = this.state.exercises;
    e.preventDefault();
    const exercise = { ...data, restDuration: this.state.defaultRestTime };
    exercises.push(exercise);
    this.setState({ exercises });
  };

  saveSettingsHandler = (data) => {
    console.log(data);
    localStorage.setItem("startIndicatorSound", data.startIndicatorSound);
    localStorage.setItem("endIndicatorSound", data.endIndicatorSound);
    localStorage.setItem("defaultRestTime", Number(data.defaultRestTime));
    this.setState({
      defaultRestTime: Number(data.defaultRestTime),
      startIndicatorSound: data.startIndicatorSound,
      endIndicatorSound: data.endIndicatorSound,
    });
  };

  saveRoutineHandler = (name) => {
    const savedRoutines = JSON.parse(localStorage.getItem("savedRoutines"));
    const routine = { name: name, routine: this.state.exercises };
    savedRoutines.push(routine);
    localStorage.setItem("savedRoutines", JSON.stringify(savedRoutines));
  };

  loadRoutineHandler = (name) => {
    const savedRoutines = JSON.parse(localStorage.getItem("savedRoutines"));
    const routine = savedRoutines.find((routine) => routine.name === name);
    this.setState({ exercises: routine.routine });
  };

  render() {
    return (
      <div className="App">
        {this.state.showBackdrop && <Backdrop />}
        <Nav
          {...this.props}
          appName={this.state.appName}
          showForm={this.showExerciseAddFormHandler}
        />

        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <HomePage
                {...props}
                showExerciseAddFormHandler={this.showExerciseAddFormHandler}
                exercises={this.state.exercises}
                removeExercise={this.removeExercise}
                addExerciseHandler={this.addExerciseHandler}
                showExerciseAddForm={this.state.showExerciseAddForm}
                defaultRestTime={this.state.defaultRestTime}
                startIndicatorSound={this.state.startIndicatorSound}
                endIndicatorSound={this.state.endIndicatorSound}
              />
            )}
          />
          <Route
            exact
            path="/settings"
            render={(props) => (
              <SettingsPage
                {...props}
                loadRoutineHandler={this.loadRoutineHandler}
                saveRoutineHandler={this.saveRoutineHandler}
                saveSettingsHandler={this.saveSettingsHandler}
              />
            )}
          />
          <Route
            path="/"
            render={() => (
              <div className="container center">
                <h3>nothing here</h3>
                <Button link="/" classes="btn btn_home">
                  Home
                </Button>
              </div>
            )}
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
