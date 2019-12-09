import React from "react";
import { Switch, Route } from "react-router-dom";
import Landingpage from "./Landingpage";
import Team from "./Team";
import Contact from "./Contact";
import Aduan from "./Aduan";
import Home from "./Home";

const Main = () => (
  <Switch>
    <Route exact path="/" component={Landingpage} />
    <Route path="/Team" component={Team} />
    <Route path="/Contact" component={Contact} />
    <Route path="/Aduan" component={Aduan} />
    <Route path="/Home" component={Home} />
  </Switch>
);
export default Main;
