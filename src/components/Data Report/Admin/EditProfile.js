import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { axiosReportsUsers, verify } from '../../helpers';
import { Formik, ErrorMessage } from "formik";
import Swal from "sweetalert2"
import ReactFilestack from 'filestack-react';

class EditProfileAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fullName : "",
            phoneNumber : "",
            email : "",
            imageUrl : "",
            password : ""
        };
    }

    showData = () => {
        axiosReportsUsers()
            .get(`/users/id/${verify()._id}`)
            .then(response => {               
                this.setState({ fullName: response.data.data[0].fullName});
                this.setState({ phoneNumber: response.data.data[0].phoneNumber});
                this.setState({ email: response.data.data[0].email});
                this.setState({ imageUrl: response.data.data[0].imageUrl});
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentDidMount = () => {
        this.showData();
    }

    onChangePassword = () => {
        Swal.mixin({
            input: 'password',
            confirmButtonText: 'Check Password &rarr;',
            showCancelButton: true,
            progressSteps: ['1']
          }).queue([
            {
              title: 'Please enter your password before'
            }
          ]).then((result) => {
            if (result.value) {
                const answer = result.value
                const data = answer.toString()

                axiosReportsUsers()
                    .post(`/users/checkpassword`, { email : verify().email, password : data})
                    .then(response => {
                        console.log(response.data.message);
                        if (response.data.message === "The password you entered is correct") {
                            Swal.mixin({
                                input: 'password',
                                confirmButtonText: 'Change Password &rarr;',
                                showCancelButton: true,
                                progressSteps: ['1']
                              }).queue([
                                {
                                  title: 'Please enter your new password'
                                }
                              ]).then((result) => {
                                if (result.value) {
                                    const answer = result.value
                                    const data = answer.toString()
                                    if (data.length < 8) {
                                        Swal.fire({
                                            icon: 'error',
                                            title: `Password must be at least 8 characters long`,
                                          })
                                    } else {
                                        this.setState({password : data})
                                        Swal.fire({
                                            icon: 'success',
                                            title: `Password successfully updated`,
                                          })
                                    }
                                }
                              })
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: `${response.data.message}`,
                              })
                        }
                        
                    })
            }
          })
    }

    render() {
        
        let fileStack = process.env.REACT_APP_API_KEY_FILESTACK;

        let fullName = this.state.fullName
        let phoneNumber = this.state.phoneNumber
        let email = this.state.email
        let imageOne = this.state.imageUrl
        let  imageUrl = this.state.imageUrl
        
        return (
            <div>
                <Paper style={{marginTop:"20px", marginLeft:"30%", marginRight:"30%"}}>
                <Formik
                initialValues={{
                  fullName: fullName!==""?fullName:"",
                  phoneNumber: phoneNumber!==""?phoneNumber:"",
                  email: email!==""?email:"",
                  imageUrl: imageUrl
                }}
                enableReinitialize={true}
                onSubmit={values => {
                    if (this.state.password !== "") {
                        Object.assign(values, {password : this.state.password})
                    }
                    
                    if (values.email === email && values.phoneNumber === phoneNumber && values.fullName === fullName && values.imageUrl === imageOne && this.state.password === "") {
                        Swal.fire({
                            icon: 'warning',
                            title: `Nothing changed`,
                          }).then((result) => {
                            this.props.history.push("/view-profile-admin")
                          })
                    } else {
                        Swal.fire({
                            title: 'Are you sure?',
                            text: "If you have finished editing your profile, then you must login again!",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes, delete it!'
                          }).then((result) => {
                            if (result.value) {
                                axiosReportsUsers()
                                .put(`/users/update-user/${verify()._id}`, {...values})
                                .then(response => {
                                    if (response.status === 200) {
                                        Swal.fire({
                                            icon: 'success',
                                            title: `Profile successfully updated`,
                                          }).then((result) => {
                                            Swal.fire({
                                                icon: 'warning',
                                                title: `You must login again`,
                                              }).then((result) => {
                                                localStorage.removeItem("token");
                                                this.props.history.push("/login")
                                                window.location.reload();
                                              })
                                          })
                                          
                                    } else {
                                        Swal.fire({
                                            icon: 'error',
                                            title: `Profile cant updated, please repeat again`,
                                          })
                                    }
                                })
                            }
                          })
                    }
                    
                }}>
                    {({
                      values,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      setFieldValue,
                      isSubmitting  
                    }) => {
                        return(
                        <form onSubmit={handleSubmit}
                        noValidate>
                            <div style={{padding:"20px", textAlign:"center"}}>
                                <img alt="profile-image" style={{width:"85%"}} src={imageUrl}></img>
                                    <div style={{marginTop:"10px"}}>
                                        <ReactFilestack
                                            apikey={`AhoCB9ZadTsGGPJ7vtOp2z`}
                                            actionOptions ={{
                                            accept: ["image/*"]
                                            }}
                                            onSuccess={(res) => {
                                            setFieldValue(
                                                "imageUrl", res.filesUploaded[0].url
                                            );
                                            imageUrl = res.filesUploaded[0].url;
                                            
                                            }}
                                            componentDisplayMode={{
                                                type: 'button',
                                                customText: 'Change photo profile',
                                            }}
                                        />
                                </div>
                            </div>
                            <div style={{padding:"20px"}}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="fullName"
                                label="Full name"
                                name="fullName"
                                autoComplete="fullName"
                                value={values.fullName}
                                onChange={handleChange}
                            />
                            </div>
                            <div style={{padding:"20px"}}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="phoneNumber"
                                label="Phone number"
                                name="phoneNumber"
                                autoComplete="phoneNumber"
                                multiline
                                value={values.phoneNumber}
                                onChange={handleChange}
                            />
                            </div>
                            <div style={{padding:"20px"}}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                multiline
                                value={values.email}
                                onChange={handleChange}
                            />
                            </div>
                            
                            <div style={{padding:"20px"}}>

                                <Button
                                    style={{marginBottom:"10px"}}
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    onClick={() =>this.onChangePassword()}
                                >
                                    Change Password
                                </Button>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                >
                                    Edit
                                </Button>
                            </div>
                        </form>
                    )}}
                </Formik>
                    
                </Paper>
            </div>
        )
    }
}

export default withRouter(EditProfileAdmin)
