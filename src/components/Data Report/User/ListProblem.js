import React from 'react';
import { withRouter, Link } from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { verify, axiosReportsUsers } from '../../helpers'
import Swal from 'sweetalert2'

class ListProblem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data : []
    };
  }

  showAllReports = () => {
    axiosReportsUsers()
      .get(`reports/email/${verify().email}`)
      .then(response => {
        this.setState({ data: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount = () => {
    this.showAllReports();
  }

  onCancel = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!'
    }).then((result) => {
      if (result.value) {
        axiosReportsUsers()
        .delete(`reports/${id}`)
        .then(response => {
          if(response.status == 200) {
            Swal.fire(
              'Canceled!',
              'Your report has been canceled.',
              'success'
            )
            this.showAllReports();
          }
        })
        .catch(error => {
          console.log(error);
        });
      }
    })
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
                          <Button style={{marginTop:"10px", marginRight:"10px"}} variant="contained" color="primary" component={Link} to={`/detail-report/${item._id}`}>Detail</Button>
                          <Button style={{marginTop:"10px", marginRight:"10px"}} variant="contained" color="secondary" onClick={() =>this.onCancel(item._id)}>Cancel</Button>
                          </div> : <div>
                            <Button style={{marginTop:"10px", marginRight:"10px"}} variant="contained" component={Link} to={`/detail-report/${item._id}`} color="primary">Detail</Button>
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