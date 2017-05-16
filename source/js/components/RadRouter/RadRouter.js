import React from 'react'
import {Route} from 'react-router-dom'
import PropTypes from 'prop-types';
import RadRouteManager from './RadRouteManager'
import * as routeHelpers from './routeHelpers'

class RadRouter extends React.Component {
	static propTypes = {
		routes: PropTypes.array.isRequired,
		notFound: PropTypes.func,
		defaultLayout: PropTypes.func,
		defaultLayerLayout: PropTypes.func
	};

	constructor(props, context) {
		super(props, context);
		this.allRoutes = routeHelpers.transformRoutes(props.routes, props.defaultLayout, props.defaultLayerLayout);
	}

	render() {
		const {notFound} = this.props;
		return (
			<Route render={props => <RadRouteManager routes={this.allRoutes} {...props} notFound={notFound}/>}/>
		);
	}
}

export default RadRouter
