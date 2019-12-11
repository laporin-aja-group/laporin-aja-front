import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom'
import  { UserHeader , Login , Team , Register } from "./components";

class App extends Component {
  render() {
    return (
      <div className="demo-big-content">
        <Router>
          <UserHeader/>
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
              </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
