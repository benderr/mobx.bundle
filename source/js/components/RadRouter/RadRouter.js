import React from 'react'
import {Route} from 'react-router-dom'
import PropTypes from 'prop-types';
import RadRouteManager from './RadRouteManager'

class RadRouter extends React.Component {
	static propTypes = {
		routes: PropTypes.object.isRequired,
		notFound: PropTypes.func
	};



	render() {
		const {routes, notFound} = this.props;
		return (
			<Route render={props => <RadRouteManager routes={routes} {...props} notFound={notFound}/>}/>
		);
	}
}

export default RadRouter
