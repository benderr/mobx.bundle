//import RadLayerManager from 'components/RadRouter/RadLayerManager'
//import {Switch} from 'react-router'
//import {Router, browserHistory, Route, IndexRoute} from 'react-router'
//import {syncHistoryWithStore} from 'react-router-redux'
//import createBrowserHistory from 'history/createBrowserHistory'
// import {
// 	BrowserRouter,
// 	Route,
// } from 'react-router-dom'
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

/*<HelloWorldComponent/>*/
