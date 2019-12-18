import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { axiosReportsUsers } from '../../helpers';
import Grid from '@material-ui/core/Grid';
import { Formik, ErrorMessage } from "formik";
import ReactFilestack from 'filestack-react';
import swal from "sweetalert2"

class EditProblem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data : [],
            problem : "",
            location : "",
            description : "",
            image : "",
            id : ""
        };
    }

    showData = () => {
        const {
            match: {
                params: { id }
            }
        } = this.props;
        

        axiosReportsUsers()
            .get(`report-users/id/${id}`)
            .then(response => {
                this.setState({ data: response.data.data[0]});
                this.setState({ problem : response.data.data[0].problem})
                this.setState({ location : response.data.data[0].location})
                this.setState({ description : response.data.data[0].description})
                this.setState({ image : response.data.data[0].image})
                this.setState({ id : id})
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentDidMount = () => {
        this.showData();
    }

    render() {
        let problem = this.state.problem
        let location = this.state.location
        let description = this.state.description
        let image = this.state.image

        let fileStack = process.env.REACT_APP_API_KEY_FILESTACK;
        let urlImage = "";
        
        return (
            <div>
                <Paper style={{marginTop:"20px", marginLeft:"30%", marginRight:"30%"}}>
                <Formik
                initialValues={{
                  problem: problem!==""?problem:"",
                  location: location!==""?location:"",
                  description: description!==""?description:"",
                  image: image!==""?image:""
                }}
                enableReinitialize={true}
                onSubmit={values => {
                    if (values.problem === problem && values.location === location && values.description === description && values.image === image) {
                        swal.fire({
                            title: 'No edited report, still continue?',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes still continue'
                          }).then((result) => {
                            if (result.value) {
                                axiosReportsUsers()
                                    .put(`/report-users/${this.state.id}`, {problem : values.problem, location : values.location, description : values.description, image : values.image})
                                    .then((response => {
                                        if (response.status === 200) {
                                            swal.fire({
                                                icon: 'success',
                                                title: 'Edit report successfully',
                                            })
                                            this.props.history.push('/report-users')
                                        } else {
                                            swal.fire({
                                                icon: 'error',
                                                title: 'Error when update report, please repeat again',
                                            })
                                        }
                                }))
                            }
                          })
                    } else {
                        axiosReportsUsers()
                            .put(`/report-users/${this.state.id}`, {problem : values.problem, location : values.location, description : values.description, image : values.image})
                            .then((response => {
                                if (response.status === 200) {
                                    swal.fire({
                                        icon: 'success',
                                        title: 'Edit report successfully',
                                    })
                                    this.props.history.push('/report-users')
                                } else {
                                    swal.fire({
                                        icon: 'error',
                                        title: 'Error when update report, please repeat again',
                                    })
                                }
                        }))
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
                            <div style={{padding:"20px"}}>
                            <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="problem"
                                label="Problem"
                                name="problem"
                                autoComplete="problem"
                                value={values.problem}
                                onChange={handleChange}
                            />
                            </Grid>
                            </div>
                            <div style={{padding:"20px"}}>
                            <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="location"
                                label="Detail Location"
                                name="location"
                                autoComplete="location"
                                multiline
                                value={values.location}
                                onChange={handleChange}
                            />
                            </Grid>
                            </div>
                            <div style={{padding:"20px"}}>
                            <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                rows="4"
                                required
                                fullWidth
                                id="description"
                                label="Description"
                                name="description"
                                autoComplete="description"
                                multiline
                                value={values.description}
                                onChange={handleChange}
                            />
                            </Grid>
                            </div>
                            {urlImage === "" ? <div style={{padding:"20px"}}>
                                        <img alt="report-problem" style={{width:"100%"}} src={this.state.image}/>
                                    </div> : <div></div>}
                            <div style={{padding:"20px"}}>
                            <ReactFilestack
                                apikey={fileStack}
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
                                    customText: 'Change photo',
                                }}
                            /><a style={{marginLeft:"10px"}}>{urlImage}</a>
                            </div>
                            
                            <div style={{padding:"20px"}}>
                                <Button
                                    style={{marginBottom:"10px"}}
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    component={Link}
                                    to="/report-users"
                                >
                                    Back
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

export default withRouter(EditProblem)
