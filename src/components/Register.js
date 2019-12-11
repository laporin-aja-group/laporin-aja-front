import React from 'react';
import { withRouter } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import RegisterLogo from "./Guest/banner.png"

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


function Register(props) {

    const classes = useStyles();
    const [image, setImage] = React.useState(null)
    const [type, setType] = React.useState(null)

    const handleImage = event => {
      setType(event.target.files[0])
      setImage(URL.createObjectURL(event.target.files[0]))
    }
        
        return (
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                    <img src={RegisterLogo} alt="register" id="Login-Image"/>
                <Formik
                initialValues={{
                  firstName:"",
                  lastName:"",
                  email:"",
                  password:""
                }}
                validate={""}
                onSubmit={""}
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
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        defaultValue={values.firstName}
                        autoFocus
                      />
                      <p
                      style={{
                        color:"red",
                        fontStyle:"italic"
                      }}
                      >
                        <ErrorMessage name="firstName" />
                      </p>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        defaultValue={values.lastName}
                        autoComplete="lname"
                      />
                      <p
                      style={{
                        color:"red",
                        fontStyle:"italic"
                      }}
                      >
                        <ErrorMessage name="lastName" />
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
                    <Grid item xs={6}>
                      <input
                          accept="/*"
                          id="contained-button-file"
                          type="file"
                          style={{display: "none"}}
                          onChange={event => {
                            setFieldValue(
                              "image", event.currentTarget.files[0]
                            );
                            handleImage(event)
                          }}
                      />
                      <label htmlFor="contained-button-file">
                        <Button
                          variant="contained"
                          color="primary"
                          component="span"
                        >Upload</Button>
                      </label>
                    </Grid>
                    <Grid item xs={6}>
                      {image && !type.type.includes("image") ? (
                        <video width="100%" controls>
                          <source src={image} type={image.type} />
                        </video>
                      ) : (
                        <img 
                        width={image && "100%"}
                        src={image}
                        alt=""
                        id="preview-image"
                      /> 
                      )}                        
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Sign Up
                  </Button>
                  <Grid container justify="flex-end">
                    <Grid item>
                      <Link href="/login" variant="body2">
                        Already have an account? Sign in
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

export default withRouter(Register)