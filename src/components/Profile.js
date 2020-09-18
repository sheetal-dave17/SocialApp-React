import React, {Fragment, Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from "@material-ui/core/Typography";

// Redux stuff
import {connect} from 'react-redux';
import {uploadImage, logout} from "../redux/actions/userActions";

// icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

import dayjs from "dayjs";

import EditDetails from './EditDetails'
import MyButton from '../utils/MyButton'

const styles = {
    paper: {
        padding: 20
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%',

        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: '#00bcd4'
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '& hover': {
                cursor: 'pointer'
            }
        }
    },
    button: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        },
    }
};


class Profile extends Component {

    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    }

    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click()
    }

    handleLogout = () => {
        this.props.logout()
    }

    render() {
        const {
            classes,
            user: {
                loading,
                credential: {handle, createdAt, imageUrl, bio, website, location}, authenticated
            }
        } = this.props
        let profileMarkup = !loading ? (
                authenticated ? (
                    <Paper className={classes.paper}>
                        <div className={classes.profile}>
                            <div className='image-wrapper'>
                                <img src={imageUrl} className='profile-image' alt='profile'/>
                                <input type='file' id='imageInput' hidden='hidden' onChange={this.handleImageChange}/>
                                <MyButton tip="Edit Profile Picture"
                                          btnClassName='button'
                                          onClick={this.handleEditPicture}>
                                    <EditIcon color='primary'/>
                                </MyButton>
                            </div>
                            <hr/>
                            <div className='profile-details'>
                                <MuiLink component={Link} to={`users/${handle}`} color="primary" variant="h5">
                                    @{handle}
                                </MuiLink>
                                <hr/>
                                {bio && <Typography variant="body2">{bio}</Typography>}
                                <hr/>
                                {location && (
                                    <Fragment>
                                        <LocationOn color='primary'/> <span> {location} </span>
                                        <hr/>
                                    </Fragment>
                                )}
                                {website && (
                                    <Fragment>
                                        <LinkIcon color='primary'/>
                                        <a href={website} target='_blank' rel='noopener noreferrer'>
                                            {' '} {website}
                                        </a>
                                        <hr/>
                                    </Fragment>
                                )}
                                <CalendarToday color='primary'/> {' '}
                                <span> joined {dayjs(createdAt).format('MMM YYYY')} </span>
                            </div>
                            <MyButton tip="logout"
                                      onClick={this.handleLogout}>
                                <KeyboardReturn color='primary'/>
                            </MyButton>
                            <EditDetails/>
                        </div>
                    </Paper>
                ) : (
                    <Paper className={classes.paper}>
                        <Typography variant='body2' align='center'>
                            No Profile found, please login
                        </Typography>
                        <div className={classes.button}>
                            <Button variant='contained' color='primary' component={Link} to='/login'>
                                Login
                            </Button>
                            <Button variant='contained' color='secondary' component={Link} to='/signup'>
                                SignUp
                            </Button>
                        </div>
                    </Paper>
                )
            )
            : (<p> Loading .... </p>)
        return profileMarkup;

    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    logout,
    uploadImage
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));