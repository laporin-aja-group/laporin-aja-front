import React, { Component } from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import banner from "./banner.png"
export default class Header extends Component {
  render() {
    return (
      <div style={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          style={{
            color: "white",
            backgroundColor: "#c4c4c4"
          }}
        >
          <Toolbar>
            <Typography  variant="h6" style={{}}>
            <Link to="/"
            >
              <img style={{width:'12%', paddingTop:'10px', paddingBottom:'10px'}} src={banner} alt="banner"/>
            </Link>
            </Typography>
            <Typography
              variant="h6"
              style={{
                flexGrow: 1
              }}
            >
            </Typography>
            <Button color="inherit" id="Login-Button">
              <Link to="/login"
              className="Link-Login"
              style={{ textDecoration: "none" }}
              >
                Login</Link>
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
