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
import Swal from 'sweetalert2'

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

  onAccept = (id) => {
    Swal.fire({
      title: 'Make sure all reports are correct!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Accept now'
    }).then((result) => {
      if (result.value) {
        axiosReportsUsers()
        .put(`/reports/${id}`, {process:"Accepted", note : "Thank you, your report will be processed immediately", nameAdminHandling:verify().fullName, emailAdminHandling:verify().email})
        .then(response => {
          if(response.status == 200) {
            Swal.fire({
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
    }) 
  }

  onReject = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reject it!'
    }).then((result) => {
      if (result.value) {
        Swal.mixin({
          input: 'text',
          confirmButtonText: 'Next &rarr;',
          showCancelButton: true,
          progressSteps: ['1']
        }).queue([
          {
            title: 'Reject Report',
            text: 'Give reasons why you reject this report'
          }
        ]).then((result) => {
          if (result.value) {
            const answer = result.value
            const data = answer.toString()

            axiosReportsUsers ()
                .put(`/reports/${id}`, {note : data, process:"Rejected", nameAdminHandling:verify().fullName, emailAdminHandling:verify().email})
                .then(response => {
                  if (response.status === 200) {
                    Swal.fire({
                      title: 'Succesfully reject report!',
                      html: `
                        Your Reasons:
                        <pre><code>${data}</code></pre>
                      `,
                      confirmButtonText: 'OK'
                    })
                    this.showAllReport();
                  } else {
                    Swal.fire(
                      'Cancelled',
                      'Theres some error when reject',
                      'error'
                    )
                  }
                })
          }
        })
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
                          <Button style={{marginTop:"10px", marginRight:"10px"}} variant="contained" color="secondary" onClick={() =>this.onAccept(item._id, item.process, item.nameAdminHandling, item.emailAdminHandling)}>Accept</Button>
                          <Button style={{marginTop:"10px", marginRight:"10px"}} variant="contained" color="primary">Detail</Button>
                          <Button style={{marginTop:"10px", marginRight:"10px"}} variant="contained" color="secondary" onClick={() =>this.onReject(item._id, item.note, item.process, item.nameAdminHandling, item.emailAdminHandling)}>Reject</Button>
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