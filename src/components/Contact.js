// import React, { Component } from "react";
// import { Form, Button } from "react-bootstrap";
// class Contact extends Component {
//   render() {
//     return (
//   <div className="iniform">
// <Form>
//   <Form.Group controlId="exampleForm.ControlInput1">
//     <Form.Label>Name</Form.Label>
//     <Form.Control type="email" placeholder="name@example.com" />
//   </Form.Group>
//   <Form.Group controlId="exampleForm.ControlInput1">
//     <Form.Label>Email address</Form.Label>
//     <Form.Control type="email" placeholder="name@example.com" />
//   </Form.Group>
//   <Form.Group controlId="exampleForm.ControlTextarea1">
//     <Form.Label>Message</Form.Label>
//     <Form.Control as="textarea" rows="3" />
//   </Form.Group>
//   <Button variant="primary" type="submit">
//     Submit
//   </Button>
// </Form>
//   </div>
//     );
//   }
// }

// export default Contact;

import React, { Component } from "react";
import { Grid, Cell } from "react-mdl";
import { Form, Button } from "react-bootstrap";

class Contact extends Component {
  render() {
    return (
      <div className="contact">
        <Grid className="contact-grid">
          <Cell col={6}>
            <h2>Criticism and Suggestions </h2>
            <hr />

            <Form className="iniform">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows="3" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Cell>
          <Cell col={6}>
            <h2>Contact Us</h2>
            <hr />
            <div className="contact-list">
              <hr style={{ borderTop: "3px solid #ffffff", width: "50%" }} />
              <h5>Address</h5>
              <p>Kemang Barat, Jakarta Selatan</p>
              <h5>Phone</h5>
              <p>62+852-441-964-73</p>
              <h5>Email</h5>
              <p>meghakasmin99@gmail.com</p>
              <hr style={{ borderTop: "3px solid #ffffff", width: "50%" }} />
            </div>
          </Cell>
        </Grid>
      </div>
    );
  }
}
export default Contact;
