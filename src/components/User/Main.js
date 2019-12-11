import React from "react";
import { Switch, Route } from "react-router-dom";
import Landingpage from "../Landingpage";
import Contact from "../Contact";
import Aduan from "../Aduan";

const Main = () => (
  <Switch>
    <Route exact path="/" component={Landingpage} />
    <Route path="/contact" component={Contact} />
    <Route path="/aduan" component={Aduan} />
  </Switch>
);
export default Main;
