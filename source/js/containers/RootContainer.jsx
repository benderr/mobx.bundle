import React from 'react'
import {Provider} from 'react-redux';
import {ReduxRouter} from 'redux-router';

export default class RootContainer extends React.Component {
    static propTypes = {
        store: React.PropTypes.object.isRequired,
        routes: React.PropTypes.object.isRequired
    };

    render() {
        return (
            <Provider store={this.props.store}>
                <div className="poss">
                    <ReduxRouter routes={this.props.routes}/>
                    {this.renderDevTools()}
                </div>
            </Provider>
        );
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