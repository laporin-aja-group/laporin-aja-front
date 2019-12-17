// import React, { Component } from "react";

// class Landing extends Component {
//   render() {
//     return (
//       <div>
//         <h1>Landing Page</h1>
//       </div>
//     );
//   }
// }

// export default Landing;

import React, { Component } from "react";
import { Grid, Cell, Button } from "react-mdl";

class Landing extends Component {
  render() {
    return (
      <div style={{ width: "100%", margin: "auto" }}>
        <Grid className="landing-grid">
          <Cell col={12}>
            <h3 className="text">Welcome</h3>
            <img src="./logo-hafiz1.png" alt="avatar" className="avatar" />

            <div className="banner-text">
              <h6>
                LaporinAja! A social application created specifically to assist
                the Indonesian community in reporting problems around their
                environment. By using this application, people can save time and
                energy. This application makes it easy to provide reports
                remotely and will be immediately followed up if it has been
                approved.
              </h6>
              <Button raised colored>
                <a href="./Team.js">Get Started</a>
              </Button>

              <hr />

              <p>
                HTML/CSS | JavaScript | React | React-Dom | React-mdl |
                React-Bootstrap | Material-ui | NodeJS | Express | MongoDB |
                Mongoose | Sweetalert2 |
              </p>
            </div>
          </Cell>
        </Grid>
      </div>
    );
  }
}

export default Landing;
