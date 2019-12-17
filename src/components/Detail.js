import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { axiosReportsUsers } from './helpers';

class Detail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "",
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
                <Button variant="contained" color="primary" onClick={() =>this.showReport()}>Detail</Button>
            </div>
        )
    }
}

export default withRouter(Detail)