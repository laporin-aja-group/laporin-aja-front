import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import RegisterLogo from "../../Guest/banner.png"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { axiosReportsUsers } from '../../helpers';
import Grid from '@material-ui/core/Grid';

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
                <Paper style={{marginTop:"20px", marginLeft:"30%", marginRight:"30%"}}>
                    <img src={RegisterLogo} alt="register" id="Login-Image"/>
                    <div style={{padding:"20px"}}>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="problem"
                        label="Problem"
                        name="problem"
                        autoComplete="problem"
                      />
                    </Grid>
                    </div>
                    <div style={{padding:"20px"}}>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="location"
                        label="Detail Location"
                        name="location"
                        autoComplete="location"
                        multiline
                      />
                    </Grid>
                    </div>
                    <div style={{padding:"20px"}}>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        rows="4"
                        required
                        fullWidth
                        id="description"
                        label="Description (Optional)"
                        name="description"
                        autoComplete="description"
                        multiline
                      />
                    </Grid>
                    </div>

                    <div style={{padding:"20px"}}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Back
                        </Button>
                    </div>

                    <div style={{padding:"20px"}}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Submit
                        </Button>
                    </div>
                </Paper>
            </div>
        )
    }
}

export default withRouter(EditProblem)
