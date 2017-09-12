import React from 'react'
import ReactTooltip from 'react-tooltip'
import PropTypes from 'prop-types';
import AppContainer from './AppContainer'
import {BrowserRouter} from 'react-router-dom'

export default class RootContainer extends React.Component {
    static propTypes = {
        routes: PropTypes.array.isRequired,
        history: PropTypes.object.isRequired
    };

    render() {
        return (
            <div>
                <div className="poss">
                    <BrowserRouter>
                        <AppContainer appReady={false} routes={this.props.routes}/>
                    </BrowserRouter>
                    {this.renderServices()}
                </div>
            </div>
        );
    }

    renderServices() {
        return (<ReactTooltip id="globalTooltip"/>);
    }
}
