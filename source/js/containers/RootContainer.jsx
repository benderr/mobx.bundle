import React from 'react'
import {Provider} from 'react-redux';
import ReactTooltip from 'react-tooltip'
import {Router, browserHistory, Route, IndexRoute} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import PropTypes from 'prop-types';
// import TransactionsContainer from 'modules/testSelectors/containers/TransactionsContainer'
// import TransactionsList from 'modules/finance/components/TransactionsList/TransactionsList';
// import SignInContainer from 'modules/account/containers/SignInContainer'
// import InternalLayout from 'components/InternalLayout'
// import ExternalLayout from 'components/ExternalLayout'

export default class RootContainer extends React.Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
        routes: PropTypes.array.isRequired
    };

    render() {
        const ss=PropTypes;
        const history = syncHistoryWithStore(browserHistory, this.props.store);
        return (
            <Provider store={this.props.store}>
                <div>
                    <Router history={history} routes={this.props.routes} />
                    {this.renderDevTools()}
                </div>
            </Provider>
        );
    }

    renderServices() {
        return ( <div><ReactTooltip /></div>);
    }

    renderDevTools() {
        let devTools = false;
        if (__DEV_TOOLS__ && !window.devToolsExtension) {
            const DevTools = require('../dev/DevTools.jsx').default;
            devTools = (<DevTools></DevTools>)
        }

        return devTools;
    }
}

