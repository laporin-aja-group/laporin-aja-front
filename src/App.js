import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router , Route, Switch, Redirect } from 'react-router-dom'
import  { Header , Login , Team , Register, LandingPage , Problem, ReportsUsers, ListProblem, ListProblemAdmin, ListSuggestion, DetailReportUser } from "./components";

class App extends Component {
  render() {
    const isLogin = localStorage.getItem("token")
    console.log(isLogin);
    
    return (
      <div className="demo-big-content">
        <Router>
          <Header/>
          <Switch>
              <Route>
                <Route path="/" exact={true}>
                  {/* Kosong dlu */}
                </Route>
                <Route path="/login" >
                  <Login />
                </Route>
                <Route path="/register" >
                  <Register />
                </Route>  
                <Route path="/team" >
                  <Team /> 
                </Route> 
                <Route path="/dashboard" >
                  <LandingPage /> 
                </Route>
                <Route path="/problem" >
                  {isLogin ? <Problem /> : <Redirect to="/login"/> } 
                </Route>
                <Route path="/listproblem" >
                  <ListProblem /> 
                </Route>
                <Route path="/list-problem-admin" >
                  <ListProblemAdmin /> 
                </Route>
                <Route path="/list-suggestion" >
                  <ListSuggestion /> 
                </Route>
                <Route path="/report-users" >
                  <ReportsUsers /> 
                </Route>
                <Route path="/detail-report/:id" >
                  <DetailReportUser /> 
                </Route>
              </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
