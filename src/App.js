import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Header,
  Login,
  Team,
  Register,
  LandingPage,
  Problem,
  ReportsUsers,
  ListProblem,
  Contact
} from "./components";

class App extends Component {
  render() {
    return (
      <div className="demo-big-content">
        <Router>
          <Header />
          <Switch>
            <Route>
              <Route path="/" exact={true}>
                <LandingPage />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/team">
                <Team />
              </Route>
              {/* <Route path="/landing">
                <LandingPage />
              </Route> */}
              <Route path="/contact">
                <Contact />
              </Route>
              <Route path="/dashboard">
                <LandingPage />
              </Route>
              <Route path="/problem">
                <Problem />
              </Route>
              <Route path="/listproblem">
                <ListProblem />
              </Route>
              <Route path="/report-users">
                <ReportsUsers />
              </Route>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
