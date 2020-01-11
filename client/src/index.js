import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import './index.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import App from './components/App/App';
import Navigation from './components/Navigation/navigation';
import SignIn from './components/SignIn/signin';
import SignUp from './components/SignUp/signup';
import CheckOut from './components/CheckOut/checkout';

const Root = () => (
    <Router>
        <><Navigation />
        <Switch>
            <Route component={App} exact path="/" />
            <Route component={SignIn} exact path="/signin" />
            <Route component={SignUp} exact path="/signup" />
            <Route component={CheckOut} exact path="/checkout" />
        </Switch></>
    </Router>
);
    

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
