import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { axiosReportsUsers } from '../../helpers';
import { Badge } from 'react-bootstrap';

class DetailReport extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data : [],
            userDetail : []
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
        })
        .catch(error => {
            console.log(error);
        });
    }

    componentDidMount = () => {
        this.showReport();
    }

    render() {
        
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
                                Image Problem
                            </Typography>
                            <img alt="report-problem" style={{width:"100%"}} src={this.state.data.image}/>
                            <Typography style={{marginTop:"20px"}} variant="h5" component="h3">
                                After fixing the problem
                            </Typography>
                            <img alt="after-fixing-problem" style={{width:"100%"}} src={this.state.data.problemSolving}/>
                            <div style={{textAlign:"center", marginTop:"20px"}}><Button variant="contained" color="primary" component={Link} to="/list-problem-admin">OK</Button></div>
                        </div>
                </Paper>
            </div>
        )
    }
}

export default withRouter(DetailReport)