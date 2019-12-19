import React, { Component } from "react";
import { Grid, Cell } from "react-mdl";
import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import axios from 'axios'
import Swal from 'sweetalert2'

class Contact extends Component {
  render() {
    let urlLoginLive = process.env.REACT_APP_API_LOGIN_LIVE;
    return (
      <div className="contact">
        <Grid className="contact-grid">
          <Cell col={6}>
            <h2>Criticism and Suggestions </h2>
            <hr />
            <Formik
                initialValues={{
                  name: "",
                  email: "",
                  message: ""

                }}
                onSubmit={values => {
                  axios.post(`${urlLoginLive}suggest`, {name : values.name, email : values.email, suggestion : values.message})
                    .then((response) => {
                      if (values.name === "" || values.email === "" || values.message === "") {
                        Swal.fire({
                          icon: 'error',
                          title: 'Make sure all columns are filled'
                        })
                      } else {
                        if (response.status === 200) {
                          Swal.fire({
                            icon: 'success',
                            title: 'Successfully sent criticisms and suggestions',
                            text: 'Thank you, your advice really helped us grow in the future',
                          }).then(response => {
                            window.location.reload();
                          })
                        } else {
                          Swal.fire({
                            icon: 'error',
                            title: 'There`s something error when you sent suggestion, please repeat again'
                          })
                        }
                      }
                    })

                }}>
                  {({
                    values,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                    isSubmitting
                  }) => (         
                    <form onSubmit={handleSubmit} noValidate>    
                      <Form className="iniform">
                      <Form.Group controlId="exampleForm.ControlInput1">
                          <Form.Label>Name</Form.Label>
                            <Form.Control onChange={handleChange} onBlur={handleBlur} defaultValue={values.name} id="name" autoComplete="name" name="name" type="textarea" placeholder="John Smith" />
                      </Form.Group>
                      <Form.Group controlId="exampleForm.ControlInput1">
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control onChange={handleChange} onBlur={handleBlur} defaultValue={values.email} id="email" autoComplete="email" name="email" type="email" placeholder="name@example.com" />
                      </Form.Group>
                      <Form.Group controlId="exampleForm.ControlTextarea1">
                          <Form.Label>Message</Form.Label>
                          <Form.Control onChange={handleChange} onBlur={handleBlur} defaultValue={values.message} id="message" autoComplete="message" name="message" as="textarea" rows="3" />
                      </Form.Group>
                      <Button variant="primary" type="submit">
                          Submit
                      </Button>
                    </Form>
                    </form>
            )}
            </Formik>
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
