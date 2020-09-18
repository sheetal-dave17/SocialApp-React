import React, {Fragment, Component} from 'react';
import PropTypes from 'prop-types';

// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

// Mui stuff
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from "@material-ui/core/CircularProgress";


// Redux stuff
import {connect} from 'react-redux';
import {postScream, clearErrors} from "../redux/actions/dataActions";


import MyButton from "../utils/MyButton";

const styles = {
   submitButton: {
       marginTop: 10,
       position: 'relative',
       float: 'right'
   },
    progressSpinner: {
       position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '91%',
        top: '6%'
    }
};

class PostScream extends Component {
    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            })
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({
                body: '', open: false, errors: {}
            });
        }

    }

    state = {
        open: false,
        body: '',
        errors: {}
    }

    handleOpen = () => {
        this.setState({
            open: true
        })
    }

    handleClose = () => {
        this.props.clearErrors();
        this.setState({
            open: false,
            errors: {}
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
        const { errors } = this.state;
        const {classes, UI: { loading }} = this.props;
        return (
            <Fragment>
                <MyButton tip="Post a Scream !"
                          btnClassName={classes.button}
                          onClick={this.handleOpen}>
                    <AddIcon />
                   </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth='sm'>
                    <MyButton tip='Close'
                              onClick={this.handleClose}
                              tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>

                    <DialogTitle>
                        Post a new Scream
                    </DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                name='body'
                                type-='text'
                                label='Scream !!'
                                multiline
                                rows="3"
                                placeholder='Scream at your fellow apes'
                                error={!!errors.body}
                                helperText={errors.body}
                                className={classes.textField}
                                value={this.state.bio}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <Button type='submit' variant='contained'
                                    color='primary'
                                    disabled={loading}
                                    className={classes.submitButton}
                                    onClick={this.handleSubmit}>
                                Submit
                                {loading && (
                                    <CircularProgress size={30} className={classes.progressSpinner} />
                                )}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        );

    }
}

PostScream.propTypes = {
    classes: PropTypes.object.isRequired,
    postScream: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI
});

const mapActionsToProps = {
    postScream,
    clearErrors
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostScream));