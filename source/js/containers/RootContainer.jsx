import React from 'react'
import {Provider} from 'react-redux';
import ReactTooltip from 'react-tooltip'
//import {Router, browserHistory, Route, IndexRoute} from 'react-router'
//import {syncHistoryWithStore} from 'react-router-redux'
//import createBrowserHistory from 'history/createBrowserHistory'
import PropTypes from 'prop-types';
import ExternalLayout, {NotFoundLayout} from 'components/ExternalLayout'
import RadLayerManager from 'components/RadRouter/RadLayerManager'

import {Switch} from 'react-router'

import {
    BrowserRouter,
    Route,
} from 'react-router-dom'
import {testRoutes} from 'components/TestRouter'
import RadRouter from 'components/RadRouter/RadRouter'


// class TestLayout extends React.Component {
//
//     componentWillUnmount() {
//         console.log('LAYOUT DIDUNMOUNT ');
//     }
//
//     componentDidMount() {
//         console.log('layout didmount');
//     }
//
//     render() {
//         return (<div style={{backgroundColor: '#c6ecc4'}}>T1 {new Date().toString()}{this.props.children}</div>);
//     }
//
// }
//
// class TestLayout2 extends React.Component {
//
//     componentWillUnmount() {
//         console.log('DIDUNMOUNT 2');
//     }
//
//     componentDidMount() {
//         console.log('didmount 2');
//     }
//
//     render() {
//         return (<div style={{backgroundColor: '#d0d0ea'}}>T2 {new Date().toString()}{this.props.children}</div>);
//     }
//
// }
//
// class TestComponent extends React.Component {
//
//     componentWillUnmount() {
//         console.log('COMPONENT DIDUNMOUNT');
//     }
//
//     componentDidMount() {
//         console.log('component didmount');
//     }
//
//     render() {
//         return (<h2>{new Date().toString()}t1 test {this.props.index}</h2>);
//     }
//
// }
//
// class TestComponent2 extends React.Component {
//
//     componentWillUnmount() {
//         console.log('COMPONENT DIDUNMOUNT t2');
//     }
//
//     componentDidMount() {
//         console.log('component didmount t2');
//     }
//
//     render() {
//         return (<h2>{new Date().toString()}t2 test {this.props.index}</h2>);
//     }
//
// }
//
// const routesTest = [{
//     path: '/t1',
//     component: TestComponent,
//     exact: true,
//     layout: TestLayout,
//     routeId: 111
// },
//     {
//         path: '/t2',
//         component: TestComponent2,
//         exact: true,
//         layout: TestLayout2,
//         routeId: 222
//     }];
//
//
// class HelloWorldComponent extends React.Component {
//
//     layers = []
//
//     constructor(props, context) {
//         super(props, context);
//
//         this.state = {
//             layers: [1]
//         };
//
//         this.popLayer = ::this.popLayer;
//     };
//
//     addLayer() {
//         this.setState({
//             layers: [...this.state.layers, 1]
//         })
//     }
//
//     popLayer() {
//         this.setState({
//             layers: [...this.state.layers, 1]
//         })
//         this.layers.pop();
//         this.layers.pop();
//     }
//
//     render() {
//
//         this.layers.forEach(s => s.needUpdate = false);
//         const path = this.layers.length % 2 == 0 ? '/t1' : '/t2';
//         //console.log('location', path);
//         this.layers.push({
//             index: 'layer_route_' + this.layers.length,
//             needUpdate: true,
//             path: path,
//             location: {pathname: path}
//         });
//         console.log('test');
//         return (
//             <div className="poss">
//                 <button className="button second" onClick={::this.addLayer}>Render</button>
//                 <button className="button second" onClick={::this.popLayer}>Pop</button>
//                 <h1>Hello {this.props.name}</h1>
//                 <div className="poss">
//                     {this.layers.map((item) => {
//                         return (<RadLayerManager key={item.index}
//                                                  routes={routesTest}
//                                                  layerId={item.index}
//                                                  location={item.location}
//                                                  needUpdate={item.needUpdate}
//                                                  onCloseLayer={this.popLayer}></RadLayerManager>)
//                     })}
//                 </div>
//             </div>
//         );
//     }
// }

export default class RootContainer extends React.Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
        routes: PropTypes.array.isRequired
    };

    render() {
        //const history = syncHistoryWithStore(browserHistory, this.props.store);

        return (
            <Provider store={this.props.store}>
                <div className="poss">
                    <BrowserRouter basename='/'>
                        <RadRouter routes={testRoutes} notFound={NotFoundLayout}/>
                        {/*<div className="flfl"></div>*/}
                        {/*<div>*/}
                        {/*<Switch>*/}
                        {/*<Route exact path="/" component={InternalLayout}/>*/}
                        {/*<Route path="/modal" component={ModalSwitch}/>*/}
                        {/*<LayoutRoute layout={InternalLayout} path="/route-test" component={TestLayout}/>*/}
                        {/*<LayerRoute layout={LayerLayout} path="/route-test2" component={TransactionsContainer2}/>*/}
                        {/*<Route path="*" component={NotFoundLayout}/>*/}
                        {/*</Switch>*/}
                        {/*</div>*/}
                        {/*<HelloWorldComponent/>*/}
                    </BrowserRouter>
                    {/*<Router history={history} routes={this.props.routes}/>*/}
                    {/*<Router history={history} >*/}
                    {/*<Route path='/' component={InternalLayout} onEnter={(a,b,cb)=>{}}> </Route>*/}
                    {/*</Router>*/}
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
