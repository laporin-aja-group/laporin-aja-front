import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { axiosReportsUsers, verify } from '../../helpers';
import { Formik, ErrorMessage } from "formik";

class ViewProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fullName : "",
            phoneNumber : "",
            email : "",
            imageUrl : ""
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

    render() {
        
        let fullName = this.state.fullName
        let phoneNumber = this.state.phoneNumber
        let email = this.state.email
        let imageUrl = this.state.imageUrl
        // let image = this.state.image
        
        return (
            <div>
                <Paper style={{marginTop:"20px", marginLeft:"30%", marginRight:"30%"}}>
                <Formik
                initialValues={{
                  fullName: fullName!==""?fullName:"",
                  phoneNumber: phoneNumber!==""?phoneNumber:"",
                  email: email!==""?email:""
                }}
                enableReinitialize={true}
                onSubmit={values => {
                    
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
                                <img alt="profile-image" style={{borderRadius:"50%", width:"80%", backgroundColor:"white"}} src={imageUrl}></img>
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
                            />
                            </div>
                            
                            <div style={{padding:"20px"}}>
                                <Button
                                    component={Link}
                                    to="/edit-profile-user"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                >
                                    Edit Profile
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

export default withRouter(ViewProfile)
