import React from 'react';
import { Link,withRouter } from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { verify, axiosReportsUsers } from '../../helpers'
import ReactFilestack from 'filestack-react';
import Swal from 'sweetalert2'
import TextField from '@material-ui/core/TextField';
import { Badge } from 'react-bootstrap'

let img = ""

class ListProblem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data : [],
      filterProblem: "",
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

  onProgress = (id) => {
    Swal.fire({
      title: 'Make sure all parties are ready to resolve this problem immediately!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes everything is ready'
    }).then((result) => {
      if (result.value) {
        axiosReportsUsers()
        .put(`/reports/${id}`, {process:"Being Repaired", note : "Thank you, your report is on Progress", nameAdminHandling:verify().fullName, emailAdminHandling:verify().email})
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

  onDone = (id) => {
    Swal.fire({
      title: 'Make sure all problems have been fixed!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, all problems are resolved'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: 'Please enter a photo for proof that this problem has been resolved',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Upload photo'
        }).then((result) => {
          if (result.value) {

          }
        })
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

  handleChangeSearchProblem = event => {
    axiosReportsUsers().get(`/reports/search-problem/?q=${event.target.value}`).then(result=>{
      console.log(result);
      
      this.setState({data : result.data.data})
      
    }).catch(error=>{
      console.log(error);
      
    })
  };

  handleChangeSearchLocation = event => {
    axiosReportsUsers().get(`/reports/search-location/?q=${event.target.value}`).then(result=>{
      console.log(result);
      
      this.setState({data : result.data.data})
      
    }).catch(error=>{
      console.log(error);
      
    })
  };

  render () {
    return (
      <div style={{width:"100%", marginTop:"20px"}}>
        <div style={{marginTop:"20px", margin:"0 auto",marginBottom:"20px", width:"98%", overflowX:'auto'}}>
          <TextField style={{backgroundColor:"white", marginLeft:"10px", marginTop:"10px"}} id="outlined-basic" label="Search by problem" variant="outlined" onChange={this.handleChangeSearchProblem}/>
          <TextField style={{backgroundColor:"white", marginLeft:"10px", marginTop:"10px"}} id="outlined-basic" label="Search by location" variant="outlined" onChange={this.handleChangeSearchLocation}/>
        </div>
        <Paper style={{width:"98%", overflowX:'auto', margin:"0 auto"}}>
          <Table style={{minWidth:"650"}} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell style={{fontSize:"110%", fontWeight:"700"}}>Problem</TableCell>
                <TableCell style={{fontSize:"110%", fontWeight:"700"}} align="right">Location</TableCell>
                <TableCell style={{fontSize:"110%", fontWeight:"700"}} align="right">Description</TableCell>
                <TableCell style={{fontSize:"110%", fontWeight:"700"}} align="right">Report Sender</TableCell>
                <TableCell style={{fontSize:"110%", fontWeight:"700"}} align="right">Status</TableCell>
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
                      <TableCell align="right">{item.user.fullName}</TableCell>
                      <TableCell align="right">
                          {item.process == "Rejected" ? 
                          <Badge variant="danger" style={{fontSize:"13px"}}>{item.process}
                          </Badge> : item.process == "Sent" ? <Badge variant="secondary" style={{fontSize:"13px"}}>{item.process}
                          </Badge> : item.process == "Accepted" ? <Badge variant="success" style={{fontSize:"13px"}}>{item.process}
                          </Badge> : item.process == "Done" ? <Badge variant="info" style={{fontSize:"13px"}}>{item.process}
                          </Badge> : <Badge variant="primary" style={{fontSize:"13px"}}>{item.process}</Badge>}
                      </TableCell>
                      <TableCell align="right">
                        {item.process == "Sent" ? <div>
                          <Button style={{marginTop:"10px", marginRight:"10px"}} variant="contained" color="secondary" onClick={() =>this.onAccept(item._id, item.process)}>Accept</Button>
                          <Button style={{marginTop:"10px", marginRight:"10px"}} variant="contained" color="primary" component={Link} to={`/detail-admin/${item._id}`}>Detail</Button>
                          <Button style={{marginTop:"10px", marginRight:"10px"}} variant="contained" color="secondary" onClick={() =>this.onReject(item._id, item.note, item.process)}>Reject</Button>
                          </div> : item.process == "Rejected" ? <div>
                          <Button style={{marginTop:"10px", marginRight:"10px"}} variant="contained" color="primary" component={Link} to={`/detail-admin/${item._id}`}>Detail</Button>
                          </div> : item.process == "Accepted" ? <div>
                          <Button style={{marginTop:"10px", marginRight:"10px"}} variant="contained" color="secondary" onClick={() =>this.onProgress(item._id, item.process)}>Start Repaired</Button>
                          <Button style={{marginTop:"10px", marginRight:"10px"}} variant="contained" color="primary" component={Link} to={`/detail-admin/${item._id}`}>Detail</Button>  
                          </div> : item.process == "Done" ? <div>
                          <Button style={{marginTop:"10px", marginRight:"10px"}} variant="contained" color="primary" component={Link} to={`/detail-admin/${item._id}`}>Detail</Button>
                          </div> : <div>
                          <Button style={{marginTop:"10px", marginRight:"10px"}} variant="contained" color="secondary" onClick={() =>this.onDone(item._id, item.process)}>Done</Button>
                          <Button style={{marginTop:"10px", marginRight:"10px"}} variant="contained" color="primary" component={Link} to={`/detail-admin/${item._id}`}>Detail</Button>
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

// axiosReportsUsers()
//                 .put(`/reports/${id}`, {process:"Done", note : "Thank you, your report is Done", nameAdminHandling:verify().fullName, emailAdminHandling:verify().email})
//                 .then(response => {
//                   if(response.status == 200) {
//                     Swal.fire({
//                       icon: 'success',
//                       title: 'Data Updated'
//                     })
//                     this.showAllReport();
//                   }
//                 })
//                 .catch(error => {
//                   console.log(error);
//                 });