import React from "react";
import { withRouter, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik, ErrorMessage } from "formik";
import image from "./Guest/banner.png"
import swal from "sweetalert2"
import axios from "axios"

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

function Login(props) {
    const classes = useStyles();
    let urlLoginLive = process.env.REACT_APP_API_LOGIN_LIVE;

    return (
        <Container 
        component="main" 
        maxWidth="xs"
        >
            <CssBaseline />
            <div className={classes.paper}>
                    <img src={image} alt="banner" id="Login-Image"/> 
                <Formik
                    initialValues={{
                        email: "",
                        password: ""
                    }}
                    validate=""
                    onSubmit={values => {
                        axios
                            .post(`${urlLoginLive}users/login`, values)
                            .then(response => {                                
                                if (values.email === "" || values.password === "") {
                                    swal.fire({
                                        icon: 'error',
                                        title: "Make sure your data is filled in correctly!",
                                      })
                                } else if (response.data.message === "Email not registered! please register") {
                                    swal.fire({
                                        title: 'There`s something wrong',
                                        text: `${response.data.message}`,
                                        icon: 'error',
                                        showCancelButton: true,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Register now'
                                      }).then((result) => {
                                        if (result.value) {
                                            props.history.push("/register");
                                        }
                                      })
                                } else if (response.data.message === "Password is wrong!") {
                                    swal.fire({
                                        icon: 'error',
                                        title: `${response.data.message}`,
                                      })
                                } else {
                                    if (response.data.message === "Login successfull") {
                                        localStorage.setItem(
                                            "token",
                                            JSON.stringify(response.data.data.token)
                                        );
                                        props.history.push("/");
                                    }
                                }
                            })
                        
                    }}
                >
                    {({
                        values,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting
                    }) => (
                        <form
                            className={classes.form}
                            noValidate
                            onSubmit={handleSubmit}
                            
                            style={{ margin:"0px", padding:"10px 30px 30px"}}
                        >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                defaultValue={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <p
                                style={{
                                    color: "red",
                                    fontStyle: "italic"
                                }}
                            >
                                <ErrorMessage name="email" />
                            </p>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                defaultValue={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <p
                                style={{
                                    color: "red",
                                    fontStyle: "italic"
                                }}
                            >
                                <ErrorMessage name="password" />
                            </p>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link 
                                    to="/register" 
                                    variant="body2"
                                    style={{ color : "blue" }}>
                                        {"Don't have an account?"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Formik>
            </div>
        </Container>
    );
}

export default withRouter(Login);