import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  "@global": {
      body: {
          backgroundColor: theme.palette.common.white
      }
  },
  paper: {
      backgroundColor: "white",
      border: "solid",
      borderRadius: "3%",
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
  },
  form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1)
  },
  submit: {
      margin: theme.spacing(3, 0, 2),
      width: "50%",
      marginLeft: "25%",
      display: "flex",
      alignItems: "center"
  },
  filestack: {
      margin: theme.spacing(3, 0, 2),
      width: "30%",
      display: "flex",
      alignItems: "center"
  }

}));

export default function NoData() {
  const classes = useStyles();
  return (
    <div>
      <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
              <Typography style={{margin:"20px"}} variant="h4">
                      No report data here
              </Typography>
              </div>
      </Container>
    </div>
  )
}
