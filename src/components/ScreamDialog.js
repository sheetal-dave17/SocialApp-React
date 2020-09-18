import React, {Fragment, Component} from 'react';
import PropTypes from 'prop-types';

import MyButton from "../utils/MyButton";

import dayjs from "dayjs";

import {Link} from 'react-router-dom';

// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Mui icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from "@material-ui/icons/Chat";

import CircularProgress from "@material-ui/core/CircularProgress";

// Redux stuff
import {connect} from 'react-redux';
import {getScream} from "../redux/actions/dataActions";

import {LikeButton} from "./LikeButton";

const styles = {
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    profileImage: {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%',
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '91%',
        top: '6%'
    },
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
};

class ScreamDialog extends Component {

    state = {
        open: false
    }

    handleOpen = () => {
        this.setState({
            open: true
        })
        this.props.getScream(this.props.screamId)
    }

    handleClose = () => {
        this.setState({
            open: false,
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const newScream = {
            body: this.state.body
        }
        this.props.postScream(newScream);
        this.handleClose()
    }

    render() {
        const {
            classes,
            scream: {
                screamId, body, createdAt, likeCount, commentCount, userImage, userHandle
            },
            UI: {loading}
        } = this.props;
        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2}/>
            </div>
        ) : (
            <Grid container spacing={16}>
                <Grid item sm={5}>
                    <img src={userImage} alt='profile' className={classes.profileImage}/>
                </Grid>
                <Grid item sm={7}>
                    <Typography
                        component={Link}
                        color='primary'
                        variant='h5'
                        to={`users/${userHandle}`}>
                        @ {userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant='body2' color='textSecondary'>
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant='body1'>
                        {body}
                    </Typography>
                    <LikeButton screamId={screamId} />
                    <span> {likeCount} likes </span>
                    <MyButton tip='comments'>
                        <ChatIcon color='primary'/>
                    </MyButton>
                    <span> {commentCount} comments </span>
                </Grid>
            </Grid>
        );
        return (
            <Fragment>
                <MyButton tip="Expand Scream !"
                          tipClassName={classes.expandButton}
                          onClick={this.handleOpen}>
                    <UnfoldMore color='primary'/>
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth='sm'>
                    <MyButton tip='Close'
                              onClick={this.handleClose}
                              tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        );

    }
}

ScreamDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    scream: state.data.scream,
    UI: state.UI
});

const mapActionsToProps = {
    getScream
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog));