import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NotifIcon from '@material-ui/icons/NotificationsNone';
import AccountProfileIcon from '@material-ui/icons/AccountCircle';
import ViewListIcon from '@material-ui/icons/ViewList';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { Link } from "react-router-dom";
import { verify, axiosReportsUsers } from '../helpers'


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  bold: {
    fontWeight: 'bold'
  }
});

export default function SwipeableTemporaryDrawer() {
  const classes = useStyles();
  const [data, setData] = React.useState("")
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  useEffect(() => {
    axiosReportsUsers()
        .get(`users/id/${verify()._id}`)
        .then(response => {
          setData({ data : response.data.data[0].fullName })
        })
  }, [])

  let namee = data.data

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem>
          <ListItemText>Welcome, {namee}</ListItemText>
        </ListItem>

        {['Problem'].map((text, index) => (
          <ListItem 
          button 
          key={text}
          component={Link}
          to="/problem"
          >
            <ListItemIcon><NotifIcon /></ListItemIcon>
            <ListItemText primary={text} ></ListItemText>
          </ListItem>
        ))}

        {['Report'].map((text, index) => (
          <ListItem 
          button 
          key={text}
          component={Link}
          to="/report-users"
          >
            <ListItemIcon><ReceiptIcon /></ListItemIcon>
            <ListItemText primary={text} ></ListItemText>
          </ListItem>
        ))}

        {['List Report'].map((text, index) => (
          <ListItem 
          button 
          key={text}
          component={Link}
          to="/listproblem"
          >
            <ListItemIcon><ViewListIcon /></ListItemIcon>
            <ListItemText primary={text} ></ListItemText>
          </ListItem>
        ))}

        {['Profile Account'].map((text, index) => (
          <ListItem 
          button 
          key={text}
          component={Link}
          to={`/view-profile`}
          >
            <ListItemIcon><AccountProfileIcon /></ListItemIcon>
            <ListItemText primary={text} ></ListItemText>
          </ListItem>
        ))}
          
      </List>
    </div>
  );

  return (
    <div>
      <Button 
      onClick={toggleDrawer('left', true)}
      id="Menu-User"
      >
        Menu
      </Button>
      <SwipeableDrawer
        open={state.left}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
      >
        {sideList('left')}
      </SwipeableDrawer>
    </div>
  );
}