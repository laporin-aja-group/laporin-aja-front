import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import AccountProfileIcon from '@material-ui/icons/AccountCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ViewListIcon from '@material-ui/icons/ViewList';
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

        {['List User Report'].map((text, index) => (
          <ListItem 
          button 
          key={text}
          component={Link}
          to="/list-problem-admin"
          >
            <ListItemIcon><ViewListIcon /></ListItemIcon>
            <ListItemText primary={text} ></ListItemText>
          </ListItem>
        ))}

        {['List Criticism & Suggestions'].map((text, index) => (
          <ListItem 
          button 
          key={text}
          component={Link}
          to="/list-suggestion"
          >
            <ListItemIcon><SpeakerNotesIcon /></ListItemIcon>
            <ListItemText primary={text} ></ListItemText>
          </ListItem>
        ))} 

        {['Add new Admin'].map((text, index) => (
          <ListItem 
          button 
          key={text}
          component={Link}
          to="/register-admin"
          >
            <ListItemIcon><PersonAddIcon /></ListItemIcon>
            <ListItemText primary={text} ></ListItemText>
          </ListItem>
        ))}

        {['Profile Account'].map((text, index) => (
          <ListItem 
          button 
          key={text}
          component={Link}
          to={`/view-profile-admin`}
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