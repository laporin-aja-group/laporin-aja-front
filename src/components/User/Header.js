import React, { Component } from "react";
import { Layout, Header, Navigation, Drawer, Content } from "react-mdl";
import Main from "./Main";
import { Link } from "react-router-dom";

export default class GuestHeader extends Component {
  render() {
    return (
        <Layout>
          <Header title="User Dashboard" scroll>
            <Navigation>
              <Link to="/" className="Button-User">Home</Link>
              <Link to="/aduan" className="Button-User">Aduan</Link>
              <Link to="/contact" className="Button-User">Contact</Link>
              <Link to="/logout" className="Button-User">Logout</Link>
            </Navigation>
          </Header>
          <Drawer title="User Dashboard">
            <Navigation>
              <Link to="/">Home</Link>
              <Link to="/aduan">Aduan</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/logout">Logout</Link>
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