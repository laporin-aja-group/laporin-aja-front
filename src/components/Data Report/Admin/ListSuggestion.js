import React from 'react';
import { withRouter } from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { verify, axiosReportsUsers } from '../../helpers'
import Swal from 'sweetalert2'

class ListSuggestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data : []
    };
  }
  componentDidMount = () => {
    axiosReportsUsers()
      .get(`suggest`)
      .then(response => {
        this.setState({ data: response.data.data });
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
                <TableCell style={{fontSize:"110%", fontWeight:"700"}}>Name</TableCell>
                <TableCell style={{fontSize:"110%", fontWeight:"700"}} align="right">Email</TableCell>
                <TableCell style={{fontSize:"110%", fontWeight:"700"}} align="right">Criticism and Suggestions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.map((item, key) => {
                return(
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {item.name}
                      </TableCell>
                      <TableCell align="right">{item.email}</TableCell>
                      <TableCell align="right">{item.suggestion}</TableCell>
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

export default withRouter(ListSuggestion)