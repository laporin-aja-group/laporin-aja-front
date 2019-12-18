import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { axiosReportsUsers } from '../../helpers';
import { Badge } from 'react-bootstrap'

class DetailReport extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data : []
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
        })
        .catch(error => {
            console.log(error);
        });
    }

    componentDidMount = () => {
        this.showReport();
    }

    render() {
        console.log(this.state.data);
        
        return (
            <div>
                 <Paper style={{marginTop:"20px", marginLeft:"20%", marginRight:"20%"}}>
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
                                {this.state.data.process === "Accepted" || this.state.data.process === "Being Repaired" || this.state.data.process === "Sent" || this.state.data.process === "Rejected" ?
                                    <div>
                                        <Typography style={{marginTop:"20px"}} variant="h5" component="h3">
                                            Image
                                        </Typography>
                                        <img alt="report-problem" style={{width:"100%"}} src={this.state.data.image}/>
                                    </div>
                                 : <div></div>}
                                {this.state.data.process === "Rejected" ? <div>
                                    <Typography style={{marginTop:"20px"}} variant="h5" component="h3">
                                        Admin Handling
                                    </Typography>
                                    <Typography component="p">
                                        {this.state.data.nameAdminHandling} ({this.state.data.emailAdminHandling})
                                    </Typography>
                                    <Typography style={{marginTop:"20px"}} variant="h5" component="h3">
                                        Why your report was rejected
                                    </Typography>
                                    <Typography component="p">
                                        {this.state.data.note}
                                    </Typography>
                                </div> : this.state.data.process === "Accepted" || this.state.data.process === "Being Repaired"   ? <div>
                                    <Typography style={{marginTop:"20px"}} variant="h5" component="h3">
                                        Admin Handling
                                    </Typography>
                                    <Typography component="p">
                                        {this.state.data.nameAdminHandling} ({this.state.data.emailAdminHandling})
                                    </Typography>
                                    <Typography style={{marginTop:"20px"}} variant="h5" component="h3">
                                        Message from admin
                                    </Typography>
                                    <Typography component="p">
                                        {this.state.data.note}
                                    </Typography>
                                </div> : this.state.data.process === "Done" ? <div>
                                    <Typography style={{marginTop:"20px"}} variant="h5" component="h3">
                                        Image Problem
                                    </Typography>
                                    <img alt="report-problem" style={{width:"100%"}} src={this.state.data.image}/>
                                    <Typography style={{marginTop:"20px"}} variant="h5" component="h3">
                                        After fixing the problem
                                    </Typography>
                                    <img alt="report-problem" style={{width:"100%"}} src={this.state.data.problemSolving}/>
                                    <Typography style={{marginTop:"20px"}} variant="h5" component="h3">
                                        Admin Handling
                                    </Typography>
                                    <Typography component="p">
                                        {this.state.data.nameAdminHandling} ({this.state.data.emailAdminHandling})
                                    </Typography>
                                    <Typography style={{marginTop:"20px"}} variant="h5" component="h3">
                                        Message from admin
                                    </Typography>
                                    <Typography component="p">
                                        {this.state.data.note}
                                    </Typography>
                                </div> : <div></div>}
                                <div style={{textAlign:"center", marginTop:"20px"}}><Button variant="contained" color="primary" component={Link} to="/listproblem">OK</Button></div>
                            </div>
                </Paper>
            </div>
        )
    }
}

export default withRouter(DetailReport)