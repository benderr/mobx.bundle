import React from 'react'
import {Switch} from 'react-router-dom'
import * as routeHelpers from './routeHelpers'
import PropTypes from 'prop-types';

class RadLayerManager extends React.Component {
	static propTypes = {
		routes: PropTypes.array.isRequired,
		layerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		location: PropTypes.object.isRequired,
		onCloseLayer: PropTypes.func.isRequired
	};

	shouldComponentUpdate(nextProps, nextState) {
		const {needUpdate}=nextProps;
		return needUpdate;
	}

	render() {
		const {location, layerId, routes, onCloseLayer}=this.props;
		const key = `layer_switch_` + layerId;
		return (
			<Switch key={key} location={location}>{
				routes.map(route => routeHelpers.generateRouteComponent({
						props: {...route, layerId, onCloseLayer},
						routeId: route.routeId
					})
				)}</Switch>);
	}
}

export default RadLayerManager;