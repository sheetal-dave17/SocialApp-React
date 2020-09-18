import React, {Component, Suspense} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';

// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// Icons
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import {connect} from 'react-redux';

import MyButton from '../../util/MyButton';
/*import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import LikeButton from './LikeButton';*/

const DeleteScream = React.lazy(() => import('./DeleteScream.js'))
const ScreamDialog = React.lazy(() => import('./ScreamDialog.js'))
const LikeButton = React.lazy(() => import('./LikeButton.js'))

const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: 200
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
};

class Scream extends Component {
    render() {
        dayjs.extend(relativeTime);
        const {
            classes,
            scream: {
                body,
                createdAt,
                userImage,
                userHandle,
                screamId,
                likeCount,
                commentCount
            },
            user: {
                authenticated,
                credentials: {handle}
            }
        } = this.props;

        const deleteButton =
            authenticated && userHandle === handle ? (
                <Suspense fallback={<div>loading ..</div>}>
                    <DeleteScream screamId={screamId}/>
                </Suspense>

            ) : null;
        return (
            <Card className={classes.card}>
                <CardMedia
                    image={userImage}
                    title="Profile image"
                    className={classes.image}
                />
                <CardContent className={classes.content}>
                    <Typography
                        variant="h5"
                        component={Link}
                        to={`/users/${userHandle}`}
                        color="primary"
                    >
                        {userHandle}
                    </Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).fromNow()}
                    </Typography>
                    <Typography variant="body1">{body}</Typography>
                    <Suspense fallback={<div>loading ..</div>}>
                        <LikeButton screamId={screamId}/>
                    </Suspense>
                    <span>{likeCount} Likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary"/>
                    </MyButton>
                    <span>{commentCount} comments</span>
                    <Suspense fallback={<div>loading ..</div>}>
                        <ScreamDialog
                            screamId={screamId}
                            userHandle={userHandle}
                            openDialog={this.props.openDialog}
                        />
                    </Suspense>
                </CardContent>
            </Card>
        );
    }
}

Scream.propTypes = {
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Scream));
