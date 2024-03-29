import React, { Component, Fragment } from 'react'
import ReportsUsers from './Data Report/User/ReportUsers'
import Nodata from './Data Report/NoData'
import {withRouter} from 'react-router-dom'
import { verify, axiosReportsUsers } from './helpers'

class ReportUsers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    componentDidMount = () => {
        axiosReportsUsers()
            .get(`/report-users/email/${verify().email}`)
            .then(response => {
                this.setState({ data: response.data.data});
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <Fragment>
                    {this.state.data.length === 0 ? (
                        <Nodata/>
                    ) : (
                        <ReportsUsers/>
                    )}
                </Fragment>
            </div>
        )
    }
}

export default withRouter(ReportUsers)
