import React from 'react'
import ReactTooltip from 'react-tooltip'
import PropTypes from 'prop-types';
import AppContainer from './AppContainer'
import {BrowserRouter} from 'react-router-dom'
import {observable} from 'mobx'
import {observer} from 'mobx-react'

@observer
class RootContainer extends React.Component {
    static propTypes = {
        routes: PropTypes.array.isRequired,
        history: PropTypes.object.isRequired
    };

    @observable count = 0;

    handleDec() {
        if (!this.count)
            this.count = 0;
        this.count += 1;
    }

    render() {
        return (
            <div>
                {/*<div className="poss">*/}
                    {/*<BrowserRouter>*/}
                        {/*<AppContainer appReady={false} routes={this.props.routes}/>*/}
                    {/*</BrowserRouter>*/}
                    {/*{this.renderServices()}*/}
                {/*</div>*/}
                <div className="poss" style={{marginTop:'300px'}}>
                    Counter: {this.count}
                    <button onClick={()=>this.handleDec()} className="button">Test</button>
                </div>
            </div>
        );
    } //

    renderServices() {
        return (<ReactTooltip id="globalTooltip"/>);
    }
}

export default RootContainer