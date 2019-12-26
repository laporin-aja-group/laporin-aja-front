import React from 'react';
import { withRouter, Link } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import NumberFormat from "react-number-format"
import axios from "axios"
import { registerValidation } from "../../validation"
import Swal from "sweetalert2"

const useStyles = makeStyles(theme => ({
    "@global": {
        body: {
            backgroundColor: theme.palette.common.white
        }
    },
    paper: {
        backgroundColor: "white",
        border: "solid",
        borderRadius: "3%",
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        width: "50%",
        marginLeft: "25%",
        display: "flex",
        alignItems: "center"
    }
}));


function RegisterAdmin(props) {

    const classes = useStyles();
    let urlLoginLive = process.env.REACT_APP_API_LOGIN_LIVE;

        return (
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Formik
                initialValues={{
                  fullName: "",
                  phoneNumber: "",
                  email: "",
                  password: ""

                }}
                validate={registerValidation}
                onSubmit={values => {
                  console.log(urlLoginLive);
                  
                  axios
                      .post(`${urlLoginLive}users`, {...values, role:"admin", imageUrl : "https://cdn.filestackcontent.com/GY9qvJDpQOi6O8wM1zei"})
                      .then(response => {
                        if (response.status === 201) {
                          Swal.fire({
                            icon: 'success',
                            title: 'Create a new admin account successfully',
                            text: 'Now you can login as admin with this account',
                          }).then(response => {
                            window.location.reload();
                          })
                        } else {
                          Swal.fire({
                            icon: 'error',
                            title: 'There`s something error when you create admin, please repeat again'
                          })
                        }
                      })
                }}
                >
                  {({
                    values,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                    isSubmitting
                  }) => (
                <form 
                className={classes.form}
                onSubmit={handleSubmit}
                noValidate
                style={{ margin:"0px", padding:"10px 30px 30px"}}
                >
                    <Grid item xs={12}>
                      <h4 style={{textAlign:"center" , fontWeight:"bold"}}>Admin form</h4>
                    </Grid>

                  <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="fullName"
                        label="Full Name"
                        name="fullName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        defaultValue={values.fullName}
                        autoComplete="fullName"
                      />
                       <p
                      style={{
                        color:"red",
                        fontStyle:"italic"
                      }}
                      >
                        <ErrorMessage name="fullName" />
                      </p>
                    </Grid>

                    <Grid item xs={12}>
                      <NumberFormat
                        variant="outlined" 
                        required 
                        fullWidth 
                        id="phoneNumber"
                        label="Phone Number"
                        name="phoneNumber"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        defaultValue={values.fullName}
                        autoComplete="phoneNumber"
                        customInput={TextField} 
                        format="+62 (###) #### ####"/>
                       <p
                      style={{
                        color:"red",
                        fontStyle:"italic"
                      }}
                      >
                        <ErrorMessage name="phoneNumber" />
                      </p>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        defaultValue={values.email}
                        autoComplete="email"
                      />
                       <p
                      style={{
                        color:"red",
                        fontStyle:"italic"
                      }}
                      >
                        <ErrorMessage name="email" />
                      </p>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        defaultValue={values.password}
                        autoComplete="current-password"
                      />
                      <p
                      style={{
                        color:"red",
                        fontStyle:"italic"
                      }}
                      >
                        <ErrorMessage name="password" />
                      </p>
                    </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Create admin
                  </Button>
                </form>
                )}
                </Formik>
              </div>
            </Container>
          );   
}

export default withRouter(RegisterAdmin)