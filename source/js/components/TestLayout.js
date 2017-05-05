import React from 'react'
import {Switch, Route, NavLink} from 'react-router-dom'
import {LayoutRoute} from './RadRouter/customRoutes/LayoutRoute'
import LayerLayout from './LayerLayout'
import TransactionsContainer, {TransactionsContainer2} from 'modules/testSelectors/containers/TransactionsContainer'

class TestLayout extends React.Component {

	previousLocation = this.props.location

	// componentWillUpdate(nextProps) {
	// 	const {location} = this.props
	// 	// set previousLocation if props.location is not modal
	// 	if (
	// 		nextProps.history.action !== 'POP' &&
	// 		(!location.state || !location.state.modal)
	// 	) {
	// 		this.previousLocation = this.props.location
	// 	}
	// }

	render() {
		const {location} = this.props
		// const isModal = !!(
		// 	location.state &&
		// 	location.state.modal &&
		// 	this.previousLocation !== location // not initial render
		// )
		console.log(location);
		let isLayer = false;

		if (location.state && location.state.layer) {
			isLayer = true;
		} else {
			this.previousLocation = location;
		}
		return (
			<div>
				{JSON.stringify(location)}
				<br/>
				<NavLink to={{
					pathname: '/route-test/1',
					search: '?sort=name',
					state: {layer: true}
				}} activeStyle={{
					fontWeight: 'bold',
					color: 'red'
				}}>Route1</NavLink>
				<br/>
				<NavLink to="/route-test/2" activeStyle={{
					fontWeight: 'bold',
					color: 'red'
				}}>Route2</NavLink>
				<br/>
				<NavLink to="/route-test/3" activeStyle={{
					fontWeight: 'bold',
					color: 'red'
				}}>Route3</NavLink>
				<br/>
				<NavLink to={{
					pathname: '/route-test/4',
					search: '?sort=name',
					state: {layer: true}
				}} activeStyle={{
					fontWeight: 'bold',
					color: 'red'
				}}>Route4</NavLink>
				{/*<Switch location={isModal ? this.previousLocation : location}>*/}
				{/*Test {1 == 1 ? <TestList component={TestText}></TestList> : null}*/}
				{/*location={{"pathname": "/route-test/2", "search": "", "hash": ""}}*/}
				<Switch location={isLayer ? this.previousLocation : location}>
					<Route exact path='/route-test/2'
						   render={() => (<TransactionsContainer mustRender={!isLayer}></TransactionsContainer>)}/>
					<Route exact path='/route-test/3' component={TransactionsContainer2}/>
					{/*<Route path='/modal/gallery' component={Gallery}/>*/}
					{/*<Route path='/modal/img/:id' component={ImageView}/>*/}
				</Switch>
				{isLayer &&
				<Switch location={location}>
					<LayoutRoute exact layout={LayerLayout} path='/route-test/1'
								 component={TestText}/>
					<LayoutRoute exact layout={LayerLayout} path='/route-test/4'
								 component={TestText}/>
				</Switch>

				}
				{/*{isModal ? <Route path='/modal/img/:id' component={Modal}/> : null}*/}
			</div>
		)
	}
}
const TestText = (props) => {
	return (
		<div>Test 1</div>
	);
}

const TestText2 = (props) => {
	return (
		<div>Test 2</div>
	);
}

const TestList = (props) => {
	const {component:Component}=props;
	return (
		<div>Hello world<Component></Component></div>
	);
}

export {TestLayout}