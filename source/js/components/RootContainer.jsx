import React from 'react'
import ReactTooltip from 'react-tooltip'
import PropTypes from 'prop-types';
import AppContainer from './AppContainer'
import {BrowserRouter} from 'react-router-dom'
import DevTools from 'mobx-react-devtools'


class RootContainer extends React.Component {
    static propTypes = {
        routes: PropTypes.array.isRequired
    };

    render() {
        return (
            <div>
                <div className="poss">
                    <BrowserRouter>
                        <AppContainer routes={this.props.routes}/>
                    </BrowserRouter>
                    {this.renderServices()}
                    <DevTools />
                </div>
            </div>
        );
    }

    renderServices() {
        return (<ReactTooltip id="globalTooltip"/>);
    }
}

export default RootContainer