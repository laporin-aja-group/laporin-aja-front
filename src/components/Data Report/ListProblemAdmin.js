import React, { Component, Fragment } from 'react'
import ListProblem from './Admin/ListProblem'
import Nodata from './NoData'
import {withRouter} from 'react-router-dom'
import { axiosReportsUsers } from '../helpers'

class ListProblemAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    componentDidMount = () => {
        axiosReportsUsers()
            .get(`/reports`)
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
                        <ListProblem/>
                    )}
                </Fragment>
            </div>
        )
    }
}

export default withRouter(ListProblemAdmin)