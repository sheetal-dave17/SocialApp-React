import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import { Link }  from 'react-router-dom'

// MUI Stuff
import AppBar  from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import HomeIcon from '@material-ui/icons/Home'
import Notifications from '@material-ui/icons/Notifications'

// Redux stuff
import {connect} from 'react-redux'

import MyButton from '../utils/MyButton'
import PostScream from './PostScream';


class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
        <AppBar>
           <Toolbar className="nav-container">
            {authenticated ? (
            <Fragment>
                <PostScream />
                <Link to='/'>
                <MyButton tip="Home">
                    <HomeIcon  />
                </MyButton>
                </Link>
               <MyButton tip="Notifications">
                    <Notifications  />
               </MyButton>
            </Fragment>

            ) : (
                <Fragment>
                 <Button color="inherit" component={Link} to="/login"> Login </Button>
                <Button color="inherit" component={Link} to="/"> Home </Button>
                <Button color="inherit" component={Link} to="/signup"> SignUp </Button>
                </Fragment>
               )}
           </Toolbar>
        </AppBar>
    );
  }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

const mapActionsToProps = {

}
export default connect(mapStateToProps, mapActionsToProps)(Navbar);
