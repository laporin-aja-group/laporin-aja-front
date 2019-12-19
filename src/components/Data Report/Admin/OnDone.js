import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { axiosReportsUsers } from '../../helpers';
import Swal from "sweetalert2"
import ReactFilestack from 'filestack-react';
import { Formik } from "formik";
import { Badge } from 'react-bootstrap'

class OnDone extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data : [],
            userDetail : [],
            id : ""
        };
    }

    showReport = () => {
        const {
            match: {
                params: { id }
            }
        } = this.props;
        
        axiosReportsUsers()
        .get(`reports/id/${id}`)
        .then(response => {
            this.setState({ data: response.data.data });
            this.setState({ userDetail : response.data.data.user})
            this.setState({ id : id})
        })
        .catch(error => {
            console.log(error);
        });
    }

    componentDidMount = () => {
        this.showReport();
    }

    render() {
        let urlImage = "";
        let fileStack = process.env.REACT_APP_API_KEY_FILESTACK;
        return (
            <div>
                 <Paper style={{marginTop:"20px", marginLeft:"20%", marginRight:"20%"}}>
                        <div style={{textAlign:"center", padding:"20px"}}>
                            <Typography variant="h4" component="h2">
                                User Detail
                            </Typography>
                        </div>

                        <div style={{marginLeft:"20px"}}>
                            <Typography style={{marginTop:"20px"}} variant="h5" component="h3">
                                Fullname
                            </Typography>
                            <Typography component="p">
                                {this.state.userDetail.fullName}
                            </Typography>
                            <Typography style={{marginTop:"20px"}} variant="h5" component="h3">
                                Phone Number
                            </Typography>
                            <Typography component="p">
                                {this.state.userDetail.phoneNumber}
                            </Typography>
                            <Typography style={{marginTop:"20px"}} variant="h5" component="h3">
                                Email
                            </Typography>
                            <Typography component="p">
                                {this.state.userDetail.email}
                            </Typography>
                        </div>
                        <div style={{textAlign:"center", padding:"20px"}}>
                            <Typography variant="h4" component="h2">
                                Report
                            </Typography>
                        </div>
                        <div style={{padding:"20px"}}>
                            <Typography variant="h5" component="h3">
                                Problem
                            </Typography>
                            <Typography component="p">
                                {this.state.data.problem}
                            </Typography>
                            <Typography style={{marginTop:"20px"}} variant="h5" component="h3">
                                Location
                            </Typography>
                            <Typography component="p">
                                {this.state.data.location}
                            </Typography>
                            <Typography style={{marginTop:"20px"}} variant="h5" component="h3">
                                Description
                            </Typography>
                            <Typography component="p">
                                {this.state.data.description}
                            </Typography>
                            <Typography style={{marginTop:"20px"}} variant="h5" component="h3">
                                Status
                            </Typography>
                            <Typography component="p">
                            {this.state.data.process == "Rejected" ? 
                                <Badge variant="danger" style={{fontSize:"13px"}}>{this.state.data.process}
                                </Badge> : this.state.data.process == "Sent" ? <Badge variant="secondary" style={{fontSize:"13px"}}>{this.state.data.process}
                                </Badge> : this.state.data.process == "Accepted" ? <Badge variant="success" style={{fontSize:"13px"}}>{this.state.data.process}
                                </Badge> : this.state.data.process == "Done" ? <Badge variant="info" style={{fontSize:"13px"}}>{this.state.data.process}
                                </Badge> : <Badge variant="primary" style={{fontSize:"13px"}}>{this.state.data.process}</Badge>}
                            </Typography>
                            <Typography style={{marginTop:"20px"}} variant="h5" component="h3">
                                Image
                            </Typography>
                            <img alt="report-problem" style={{width:"100%"}} src={this.state.data.image}/>
                            <Formik
                                initialValues={{
                                
                                }}
                                onSubmit={values => {
                                    if (urlImage === "") {
                                        Swal.fire({
                                            icon: 'error',
                                            title: "You must upload a photo as proof that the problem is resolved!",
                                          })
                                    } else {
                                        axiosReportsUsers()
                                            .put(`reports/${this.state.id}`, {problemSolving : values.image, process:"Done", note : "Thank you, your report is Done"})
                                            .then((response) => {
                                                Swal.fire({
                                                    icon: 'success',
                                                    title: 'Upload photo succesfully',
                                                    text: 'Now you can check user report',
                                                  }).then(response => {
                                                    this.props.history.push(`/afterdone/${this.state.id}`)
                                                  })
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
                                }) => (
                                    <form
                                    onSubmit={handleSubmit}
                                    noValidate
                                    style={{marginTop:"20px"}}>
                                        <Typography style={{marginTop:"20px"}} variant="h5" component="h3">
                                            Photo for proof
                                        </Typography>
                                        <div style={{marginTop:"20px"}}>
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
                                                customText: 'Upload Photo'
                                            }}
                                        />
                                        </div><a>{urlImage}</a>
                                        <div style={{textAlign:"center", marginTop:"20px"}}><Button variant="contained" color="primary" type="submit">Submit</Button></div>
                                    </form>
                                )}
                            </Formik>
                        </div>
                </Paper>
            </div>
        )
    }
}

export default withRouter(OnDone)