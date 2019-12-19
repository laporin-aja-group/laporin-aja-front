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
import Swal from "sweetalert2"
import ReactFilestack from 'filestack-react';
import { verify, axiosReportsUsers } from "./helpers"

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
    let fileStack = process.env.REACT_APP_API_KEY_FILESTACK;
    let urlImage = "";

        return (
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                    <img src={RegisterLogo} alt="register" id="Login-Image"/>
                <Formik
                initialValues={{
                  problem: "",
                  location: "",
                  description: ""
                }}
                validate=""
                onSubmit={values => {
                  
                  if (values.problem === "" || values.location === "" || values.description === "" || urlImage === "") {
                    Swal.fire({
                      icon: 'error',
                      title: "Make sure your report is filled in correctly!",
                    })
                  } else {
                  axiosReportsUsers()
                    .post(`${urlLoginLive}report-users`, {...values, user : verify()._id})
                    .then(response => {
                      if (response.status === 200) {
                        Swal.fire({
                          icon: 'success',
                          title: 'Add Report Successfully',
                          text: 'Now you can check your report',
                        }).then(response => {
                          props.history.push("/report-users")
                        })
                      } else {
                        Swal.fire({
                          icon: 'error',
                          title: 'There`s something error when you add report, please add report again'
                        })
                      }
                    })
                  }
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
                        id="location"
                        label="Detail Location"
                        name="location"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        defaultValue={values.location}
                        autoComplete="location"
                        multiline
                      />
                       <p
                      style={{
                        color:"red",
                        fontStyle:"italic"
                      }}
                      >
                        <ErrorMessage name="location" />
                      </p>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        rows="4"
                        required
                        fullWidth
                        id="description"
                        label="Description (Optional)"
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
                    apikey={`AhoCB9ZadTsGGPJ7vtOp2z`}
                    actionOptions ={{
                      accept: ["image/*"]
                    }}
                    onSuccess={(res) => {
                      setFieldValue(
                        "image", res.filesUploaded[0].url
                      );
                      urlImage = res.filesUploaded[0].filename;
                    }}
                    componentDisplayMode={{
                        type: 'button',
                        customText: 'Upload Photo',
                        customClass: classes.filestack
                    }}
                  /> <a>{urlImage}</a>

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