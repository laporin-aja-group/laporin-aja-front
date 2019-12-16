import React, { Component, Fragment } from 'react'
import ListSuggestion from './Admin/ListSuggestion'
import Nodata from './NoData'
import {withRouter} from 'react-router-dom'
import { axiosReportsUsers } from '../helpers'

class ListSuggestionAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    componentDidMount = () => {
        axiosReportsUsers()
            .get(`/suggest`)
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
                        <ListSuggestion/>
                    )}
                </Fragment>
            </div>
        )
    }
}

export default withRouter(ListSuggestionAdmin)