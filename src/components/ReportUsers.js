import React from 'react';
import { withRouter } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { verify, axiosReportsUsers } from './helpers'
import Swal from 'sweetalert2'

class ReportUsers extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            dataReportProcess: []
        };
    }

    showUserReports = () => {
        axiosReportsUsers()
            .get(`/report-users/${verify().email}`)
            .then(response => {
                this.setState({ data: response.data.data});
            })
            .catch(error => {
                console.log(error);
            });
    }

    showReportsByProcess = () => {
        axiosReportsUsers()
            .get(`/reports/${verify().email}/Sent`)
            .then(response => {
                this.setState({ dataReportProcess: response.data.data});
            }).catch(error => {
                console.log(error);
            });
    }


    componentDidMount = () => {
        this.showUserReports();
        this.showReportsByProcess();
     }

     submitProblem = (item) => {
         console.log(this.state.dataReportProcess.length);
         
        Swal.fire({
            title: 'Make sure all your reports are correct!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Submit now'
          }).then((result) => {
            if (result.value) {
                if (this.state.dataReportProcess.length >= 2) {
                    Swal.fire({
                        icon: 'error',
                        title: 'You cannot send a report, please wait for the report to be received from the admin'
                      })
                } else {
                    axiosReportsUsers()
                    .post(`/reports`, {
                        problem : item.problem,
                        problemSolving : "Your report has been sent",
                        location : item.location,
                        description : item.description,
                        image : item.image,
                        process : "Sent",
                        note : "Your report has been sent",
                        user : item.user
                    }).then(response => {
                        if (response.status === 200) {
                            axiosReportsUsers()
                                .delete(`/report-users/${item._id}`)
                                .then(response => {
                                    if (response.status === 200) {
                                        Swal.fire(
                                            'Submitted',
                                            'Your report has been sent, please wait for confirmation.',
                                            'success'
                                        )
                                        this.props.history.push("/listproblem")
                                    } else {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'There`s something error when you submit, please submit again'
                                        })
                                    }
                                })
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'There`s something error when you submit, please submit again'
                            })
                        }
                    });
                }
            }
          })
     }

     deleteProblem = (id, problem) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                axiosReportsUsers()
                .delete(`/report-users/${id}`)
                .then(response => {
                    if (response.status === 200) {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                          )
                    }
                })
                .then(() => {
                    this.showUserReports();
                });
            }
          })
     }

    render () {
        return (
            <div style={{display: "flex", flexWrap: "wrap", justifyContent:"center"}}>
                {this.state.data.length > 0 && this.state.data.map((item, key) => {
                    return(
                        <div style={{margin:"10px"}}>
                            <Card key={key} style={{maxWidth:"400px"}}>
                                <CardActionArea>
                                    <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    image={item.image}
                                    title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Problem
                                    </Typography>
                                    <Typography variant="h6" color="textSecondary" component="h6">
                                        {item.problem}
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button variant="contained" color="primary" onClick={() =>this.submitProblem(item)}>
                                        Submit
                                    </Button>
                                    <Button variant="contained">Edit</Button>
                                    <Button variant="contained" color="secondary" onClick={() =>this.deleteProblem(item._id, item.problem)}>
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        </div>
                    )
                })}
            </div>
        )
    }
}
export default withRouter(ReportUsers)