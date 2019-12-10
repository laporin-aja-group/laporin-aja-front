import React, { Component } from "react";
import "./App.css";
import  { GuestHeader } from "./components";

class App extends Component {
  render() {
    return (
      <div className="demo-big-content">
        <GuestHeader/>
      </div>
    );
  }
}

export default App;
