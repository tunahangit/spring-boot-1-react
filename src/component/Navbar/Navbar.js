import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LockOpenIcon from '@material-ui/icons/LockOpen';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "left"
  },
  link: {
    textDecoration: "none",
    boxShadow: "none",
    color: "#eeff41"
  }
}));

function Navbar() {

  const classes = useStyles();
  let navigate = useNavigate();


  const onClick = () => {
    localStorage.removeItem("tokenKey");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("username");
    navigate(0);
  }



  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.link} to="/">Home</Link>
          </Typography>
          <Typography variant="h6">
            {localStorage.getItem("currentUser") == null ? <Link className={classes.link} to="/auth">Login/Register</Link> :
              <div>
                <IconButton onClick={onClick}>
                  <LockOpenIcon></LockOpenIcon>
                </IconButton>
                <Link className={classes.link} to={{ pathname: '/users/' + localStorage.getItem("currentUser") }}>Profile</Link>
              </div>}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar;