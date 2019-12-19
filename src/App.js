import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import {
  Header,
  Login,
  Team,
  Register,
  RegisterAdmin,
  LandingPage,
  Problem,
  ReportsUsers,
  ListProblem,
  Contact,
  EditProfileUser,
  ViewProfileUser,
  EditProfileAdmin,
  ViewProfileAdmin,
  ListProblemAdmin,
  ListSuggestion,
  DetailReportUser,
  OnDone,
  AfterDone,
  DetailReportAdmin,
  EditProblem 
} from "./components";
import { verify } from "./components/helpers"

class App extends Component {
  render() {
    const isLogin = localStorage.getItem("token");

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
                {!isLogin ? <Login /> : verify().role == "users" ? <Redirect to="/problem"/> : <Redirect to="/list-problem-admin"/>}
              </Route>
              <Route path="/register">
                {!isLogin ? <Register /> : verify().role == "users" ? <Redirect to="/problem"/> : <Redirect to="/list-problem-admin"/>}
              </Route>
              <Route path="/register-admin">
                {isLogin ? <RegisterAdmin /> : <Redirect to="/login" />}
              </Route>
              <Route path="/team">
                <Team />
              </Route>
              <Route path="/contact">
                <Contact />
              </Route>
              <Route path="/dashboard">
                <LandingPage />
              </Route>
              <Route path="/problem">
                {isLogin ? <Problem /> : <Redirect to="/login" />}
              </Route>
              <Route path="/listproblem">
                {isLogin ? <ListProblem /> : <Redirect to="/login" />}
              </Route>
              <Route path="/list-problem-admin">
                {isLogin ? <ListProblemAdmin /> : <Redirect to="/login" />}
              </Route>
              <Route path="/view-profile">
                {isLogin ? <ViewProfileUser /> : <Redirect to="/login" />}
              </Route>
              <Route path="/edit-profile-user">
                {isLogin ? <EditProfileUser /> : <Redirect to="/login" />}
              </Route>
              <Route path="/edit-profile-admin">
                {isLogin ? <EditProfileAdmin /> : <Redirect to="/login" />}
              </Route>
              <Route path="/view-profile-admin">
                {isLogin ? <ViewProfileAdmin /> : <Redirect to="/login" />}
              </Route>
              <Route path="/detail-admin/:id">
                <DetailReportAdmin />
              </Route>
              <Route path="/ondone/:id">
                <OnDone />
              </Route>
              <Route path="/afterdone/:id">
                <AfterDone />
              </Route>
              <Route path="/list-suggestion">
                {isLogin ? <ListSuggestion /> : <Redirect to="/login" />}
              </Route>
              <Route path="/report-users">
                {isLogin ? <ReportsUsers /> : <Redirect to="/login" />}
              </Route>
              <Route path="/detail-report/:id">
                <DetailReportUser />
              </Route>
              <Route path="/edit-problem/:id">
                <EditProblem />
              </Route>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
