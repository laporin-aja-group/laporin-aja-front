import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { axiosReportsUsers } from '../../helpers';

class EditProblem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data : []
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
                this.setState({ data: response.data.data});
                
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentDidMount = () => {
        this.showData();
    }

    render() {
        console.log(this.state.data);
        
        return (
            <div>
                <Paper style={{marginTop:"20px", marginLeft:"20%", marginRight:"20%"}}>
                    
                </Paper>
            </div>
        )
    }
}

export default withRouter(EditProblem)
