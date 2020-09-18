import React, {Fragment, Component} from 'react';
import PropTypes from 'prop-types';

// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from '@material-ui/icons/Edit';


// Redux stuff
import {connect} from 'react-redux';
import {editUserDetails} from "../redux/actions/userActions";


import MyButton from "../utils/MyButton";

const styles = {
    button: {
       float: 'right'
    }
};

class EditDetails extends Component {

    state = {
        bio: '',
        website: '',
        location: '',
        open: false,
    }

    componentDidMount() {
        const {credential} = this.props;
        this.mapUserDetailsToState(credential)
    }

    handleOpen = () => {
        this.setState({
            open: true
        })
        this.mapUserDetailsToState(this.props.credential)
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        }
        this.props.editUserDetails(userDetails);
        this.handleClose()
    }

    mapUserDetailsToState = (credential) => {
        this.setState({
            bio: credential.bio ? credential.bio : '',
            website: credential.website ? credential.website : '',
            location: credential.location ? credential.location : '',

        })
    }

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <MyButton tip="Edit details"
                          btnClassName={classes.button}
                          onClick={this.handleOpen}>
                    <EditIcon color='primary'/>
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth='sm'>
                    <DialogTitle>
                        Edit Your Details
                    </DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                name='bio'
                                type-='text'
                                label='Bio'
                                multiline
                                rows="3"
                                placeholder='A short bio about yourself'
                                className={classes.textField}
                                value={this.state.bio}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField
                                name='website'
                                type-='text'
                                label='Website'
                                placeholder='website'
                                className={classes.textField}
                                value={this.state.website}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField
                                name='location'
                                type-='text'
                                label='Location'
                                placeholder='location'
                                className={classes.textField}
                                value={this.state.location}
                                onChange={this.handleChange}
                                fullWidth
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='primary'>
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color='primary'>
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );

    }
}

EditDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    editUserDetails: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    credential: state.user.credential

});

const mapActionsToProps = {
    editUserDetails
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(EditDetails));