import React, { Component } from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Test from './Test'
export default class Header extends Component {
  render() {
    return (
      <div style={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          id="Appbar-Header-Guest"
          style={{
            color: "white",
            backgroundColor: "#c4c4c4",
            height:"100%"
          }}
        >
          <Toolbar>
            <Typography  variant="h6" style={{}}>
                <Test />
            </Typography>
            <Typography
              variant="h6"
              style={{
                flexGrow: 1
              }}
            >
            </Typography>
            <Button 
            color="inherit" 
            id="Login-Button"
            component={Link}
            to="/logout"
            style={{ width:"7%", height:"60px" , color:"blue" , fontWeight:"bold", fontSize:"16px"}}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
