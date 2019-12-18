import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { axiosReportsUsers } from '../../helpers';

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
                                    {this.state.data.process}
                                </Typography>
                                <Typography style={{marginTop:"20px"}} variant="h5" component="h3">
                                    Image
                                </Typography>
                                <img alt="report-problem" style={{width:"50%", height:"50%"}} src={this.state.data.image}/>
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
                                </div> : this.state.data.process === "Accepted" || this.state.data.process === "Being Repaired" || this.state.data.process === "Done"   ? <div>
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
                                </div> : <div>

                                </div>}
                                <div style={{textAlign:"center", marginTop:"20px"}}><Button variant="contained" color="primary" component={Link} to="/listproblem">OK</Button></div>
                            </div>
                </Paper>
            </div>
        )
    }
}

export default withRouter(DetailReport)