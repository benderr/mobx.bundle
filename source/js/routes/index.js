import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {routeCodes} from './routeCodes'

import App from 'views/App';
import Dashboard from 'views/Dashboard';
import SignIn from 'views/SignIn';

export default () => {
    return (
        <Router history={ browserHistory }>
            <Route path={ routeCodes.BASE } component={ App }>
                <IndexRoute component={ Dashboard }/>
                <Route path={ routeCodes.DASHBOARD } component={ Dashboard }/>
                <Route path={ routeCodes.SIGN_IN } component={ SignIn }/>
                <Route path='*' component={ Dashboard }/>
            </Route>
        </Router>
    );
}
