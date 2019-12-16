import React from 'react';
import { withRouter } from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { verify, axiosReportsUsers } from '../../helpers'
import swal from 'sweetalert2'

class ListProblem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data : []
    };
  }

  showAllReport = () => {
    axiosReportsUsers()
      .get(`reports`)
      .then(response => {
        this.setState({ data: response.data.data })
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount = () => {
    this.showAllReport();
  }

  onAccept = (id, process) => {
    axiosReportsUsers()
      .put(`reports/${id}`, {process:"Accepted"})
      .then(response => {
        if(response.status == 200) {
          swal.fire({
            icon: 'success',
            title: 'Data Updated'
          })
          this.showAllReport();
        }
      })
      .catch(error => {
        console.log(error);
      });
    
  }

  render () {
    return (
      <div style={{width:"100%", marginTop:"20px"}}>
        <Paper style={{width:"98%", overflowX:'auto', margin:"0 auto"}}>
          <Table style={{minWidth:"650"}} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell style={{fontSize:"110%", fontWeight:"700"}}>Problem</TableCell>
                <TableCell style={{fontSize:"110%", fontWeight:"700"}} align="right">Location</TableCell>
                <TableCell style={{fontSize:"110%", fontWeight:"700"}} align="right">Description</TableCell>
                <TableCell style={{fontSize:"110%", fontWeight:"700"}} align="right">Process</TableCell>
                <TableCell style={{fontSize:"110%", fontWeight:"700"}} align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.map((item, key) => {
                return(
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {item.problem}
                      </TableCell>
                      <TableCell align="right">{item.location}</TableCell>
                      <TableCell align="right">{item.description}</TableCell>
                      <TableCell align="right"><Button variant="contained" color="primary" disabled>{item.process}</Button></TableCell>
                      <TableCell align="right">
                        {item.process == "Sent" ? <div>
                          <Button style={{marginTop:"10px", marginRight:"10px"}} variant="contained" color="secondary" onClick={() =>this.onAccept(item._id, item.process)}>Accept</Button>
                          <Button style={{marginTop:"10px", marginRight:"10px"}} variant="contained" color="primary">Detail</Button>
                          <Button style={{marginTop:"10px", marginRight:"10px"}} variant="contained" color="secondary">Reject</Button>
                          </div> : item.process == "Rejected" ? <div>
                          <Button style={{marginTop:"10px", marginRight:"10px"}} variant="contained" color="primary">Detail</Button>
                          </div> : <div>
                          <Button style={{marginTop:"10px", marginRight:"10px"}} variant="contained" color="secondary">Progress</Button>
                          <Button style={{marginTop:"10px", marginRight:"10px"}} variant="contained" color="primary">Detail</Button>
                          </div>
                        }
                        </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default withRouter(ListProblem)