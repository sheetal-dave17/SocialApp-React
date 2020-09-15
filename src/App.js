import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css'

// redux
import {Provider} from "react-redux";
import store from './redux/store'

import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import jwtDecode from 'jwt-decode';

import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';

import Navbar from './components/Navbar';
import AuthRoute from './utils/AuthRoute'

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#33c9dc',
            main: '#00bcd4',
            dark: '#008394',
            contrastText: '#fff'
        },
        secondary: {
            light: '#ff6333',
            main: '#ff3d00',
            dark: '#b22a00',
            contrastText: '#fff'
        }
    },
    typography: {
        useNextVariants: true
    },
    form: {
        textAlign: 'center',
    },
    image: {
        margin: '20px auto 20px auto'
    },
    pageTitle: {
        margin: '10px auto 20px auto'
    },
    textField: {
        margin: '10px auto 20px auto'
    },
    button: {
        marginTop: 20,
        position: 'relative'
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    progress: {
        position: 'absolute'
    }
})
let authenticated;
const token = localStorage.getItem('FBIdToken');
if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        window.location.href = '/login';
        authenticated = false;
    } else {
        authenticated = true;
    }
}

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Provider store={store}>
                    <Router>
                        <Navbar/>
                        <div className="container">
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <AuthRoute exact path="/login" component={Login} authenticated={authenticated}/>
                                <AuthRoute exact path="/signup" component={Signup} authenticated={authenticated}/>
                            </Switch>
                        </div>
                    </Router>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;
