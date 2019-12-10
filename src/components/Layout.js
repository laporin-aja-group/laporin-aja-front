import React, { Component } from "react";
import { Layout, Header, Navigation, Drawer, Content } from "react-mdl";
import Main from "./Main";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
        <Layout>
          <Header title="Title" scroll>
            <Navigation>
              <Link to="/Home">Home</Link>
              <Link to="/Aduan">Aduan</Link>
              <Link to="/Team">Team</Link>
              <Link to="/Contact">Contact</Link>
            </Navigation>
          </Header>
          <Drawer title="Title">
            <Navigation>
              <Link to="/Home">Home</Link>
              <Link to="/Aduan">Aduan</Link>
              <Link to="/Team">Team</Link>
              <Link to="/Contact">Contact</Link>
            </Navigation>
          </Drawer>
          <Content>
            <div className="page-content" />
            <Main />
          </Content>
        </Layout>
    );
  }
}