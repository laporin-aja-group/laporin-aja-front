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
          id="Appbar-Header-Guest"
          style={{
            color: "white",
            backgroundColor: "#c4c4c4",
            height:"100%"
          }}
        >
          <Toolbar>
            <Typography  variant="h6" style={{}}>
            <Link to="/"
            >
              <img style={{width:'20%', paddingTop:'10px', paddingBottom:'10px'}} src={banner} alt="banner"/>
            </Link>
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
            to="/login"
            style={{ width:"80px", height:"65px" , color:"blue" , fontWeight:"bold", fontSize:"16px" }}
            >
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
