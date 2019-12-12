import React from 'react';
import { withRouter } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import RegisterLogo from "./Guest/banner.png"
import axios from "axios"
import { registerValidation } from "./validation"
import Swal from "sweetalert2"
import ReactFilestack from 'filestack-react';

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
    },
    filestack: {
        margin: theme.spacing(3, 0, 2),
        width: "30%",
        display: "flex",
        alignItems: "center"
    }

}));


function Register(props) {

    const classes = useStyles();
    let urlLoginLive = process.env.REACT_APP_API_LOGIN_LIVE;

        return (
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                    <img src={RegisterLogo} alt="register" id="Login-Image"/>
                <Formik
                initialValues={{
                  problem: "",
                  detailLocation: "",
                  description: ""

                }}
                validate={registerValidation}
                onSubmit={values => {
                  axios
                      .post(`${urlLoginLive}users`, {...values, role:"users"})
                      .then(response => {
                        if (response.status === 201) {
                          Swal.fire({
                            icon: 'success',
                            title: 'Register Successfully',
                            text: 'Now you can login',
                          }).then(response => {
                            props.history.push("/dashboard")
                          })
                        } else {
                          Swal.fire({
                            icon: 'error',
                            title: 'There`s something error when you register, please register again'
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
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="problem"
                        label="Problem"
                        name="problem"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        defaultValue={values.problem}
                        autoComplete="problem"
                      />
                       <p
                      style={{
                        color:"red",
                        fontStyle:"italic"
                      }}
                      >
                        <ErrorMessage name="problem" />
                      </p>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="detailLocation"
                        label="Detail Location"
                        name="detailLocation"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        defaultValue={values.detailLocation}
                        autoComplete="detailLocation"
                        multiline
                      />
                       <p
                      style={{
                        color:"red",
                        fontStyle:"italic"
                      }}
                      >
                        <ErrorMessage name="detailLocation" />
                      </p>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="description"
                        label="Description"
                        name="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        defaultValue={values.description}
                        autoComplete="description"
                        multiline
                      />
                       <p
                      style={{
                        color:"red",
                        fontStyle:"italic"
                      }}
                      >
                        <ErrorMessage name="description" />
                      </p>
                    </Grid>
                    
                    <ReactFilestack
                    apikey={'ArL9fk9FQ9uV3Lj8BYAIJz'}
                    componentDisplayMode={{
                        type: 'button',
                        customText: 'Choose File',
                        customClass: classes.filestack
                    }}
                    />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Submit
                  </Button>
                </form>
                )}
                </Formik>
              </div>
            </Container>
          );   
}

export default withRouter(Register)