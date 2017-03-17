import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {routeCodes} from './routeCodes'

import App from 'views/App';
import HomeComponent from 'views/Home';
import SignIn from 'views/SignIn';

export default () => {
    return (
        <Router history={ browserHistory }>
            <Route path={ routeCodes.BASE } component={ App }>
                <IndexRoute component={ HomeComponent }/>
                <Route path={ routeCodes.SIGN_IN } component={ SignIn }/>
                <Route path='*' component={ HomeComponent }/>
            </Route>
        </Router>
    );
}

