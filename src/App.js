import React,  {Component, Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';
// Redux
import {Provider} from 'react-redux';
import store from './redux/store';
import {SET_AUTHENTICATED} from './redux/types';
import {logoutUser, getUserData} from './redux/actions/userActions';

import themeObject from './util/theme';

// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user';

import axios from 'axios';

// Components
import AuthRoute from "./util/AuthRoute";
const Navbar = React.lazy(()=>import('./components/layout/Navbar'));

const theme = createMuiTheme(themeObject);

/*axios.defaults.baseURL = 'https://us-central1-socialapp-d0137.cloudfunctions.net/api';*/
axios.defaults.baseURL = 'https://europe-west1-socialape-d081e.cloudfunctions.net/api';

const token = localStorage.FBIdToken;
if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        store.dispatch(logoutUser());
        window.location.href = '/login';
    } else {
        store.dispatch({type: SET_AUTHENTICATED});
        axios.defaults.headers.common['Authorization'] = token;
        store.dispatch(getUserData());
    }
}

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Provider store={store}>
                    <Router>
                        <Suspense fallback={<div>loading ..</div>}>
                            <Navbar/>
                        </Suspense>

                        <div className="container">
                            <Switch>
                                <Route exact path="/" component={home}/>
                                <AuthRoute exact path="/login" component={login}/>
                                <AuthRoute exact path="/signup" component={signup}/>
                                <Route exact path="/users/:handle" component={user}/>
                                <Route
                                    exact
                                    path="/users/:handle/scream/:screamId"
                                    component={user}
                                />
                            </Switch>
                        </div>
                    </Router>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;
