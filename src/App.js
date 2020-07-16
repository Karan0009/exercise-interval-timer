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
import Backdrop from "./components/commonComponents/backdrop/backdrop";

class App extends Component {
  state = {
    appName: "Let's workout",
    defaultRestTime: 3,
    startIndicatorSound: null,
    endIndicatorSound: null,
    showBackdrop: false,
    exercises: [],
    showExerciseAddForm: false,
  };

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
    // this.setState({
    //   defaultRestTime: data.defaultRestTime,
    //   startIndicatorSound: data.startIndicatorSound,
    //   endIndicatorSound: data.endIndicatorSound,
    // });
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
              />
            )}
          />
          <Route
            exact
            path="/settings"
            render={(props) => (
              <SettingsPage
                {...props}
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
