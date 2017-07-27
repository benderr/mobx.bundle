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


	componentWillUnmount() {
		//console.log('RadLayerManager Unmount');
	}

	shouldComponentUpdate(nextProps, nextState) {
		const {needUpdate}=nextProps;
		return needUpdate;
	}

	componentDidMount() {
		const {layerId, routes, onCloseLayer}=this.props;
		const pages = routes.map(route => routeHelpers.generateRouteComponent({
			props: {...route, layerId, onCloseLayer},
			routeId: route.routeId
		}));
		this.setState({pages});
	}

	render() {
		const {location, layerId}=this.props;
		const key = `layer_switch_` + layerId;
		const {pages = []}=this.state || {};
		return (<Switch key={key} location={location}>{pages}</Switch>);
	}
}

export default RadLayerManager;