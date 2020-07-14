import React, { Component } from "react";
import { withRouter, Switch, Route } from "react-router-dom";
// import styled from "styled-components";

import "./App.css";

// import Input from "./components/commonComponents/input/input";
// import Button from "./components/commonComponents/Button/Button";
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
    showBackdrop: false,
    exercises: [
      {
        exerciseName: "one",
        exerciseDuration: 5,
        restDuration: 10,
      },
      {
        exerciseName: "two",
        exerciseDuration: 5,
        restDuration: 10,
      },
      {
        exerciseName: "three",
        exerciseDuration: 5,
        restDuration: 10,
      },
    ],
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
            render={(props) => <SettingsPage {...props} />}
          />
          <Route path="/" render={() => <div>wrong path bro</div>} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
