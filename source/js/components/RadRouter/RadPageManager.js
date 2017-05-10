import React from 'react'
import {Switch} from 'react-router-dom'
import PropTypes from 'prop-types';
import {isLayerPage, generateRouteComponent} from './routeHelpers'

class RadPageManager extends React.Component {

	pageLocation = this.props.location;
	static propTypes = {
		routes: PropTypes.shape({
			pageRoutes: PropTypes.array.isRequired,
			layerRoutes: PropTypes.array.isRequired,
		}),
		notFound: PropTypes.func,
		location: PropTypes.object.isRequired
	};

	shouldComponentUpdate(nextProps, nextState) {
		const {location, routes}=nextProps;
		return !isLayerPage(routes.layerRoutes, location);
	}

	render() {
		const {location, routes, notFound:NotFound}=this.props;

		const isLayer = isLayerPage(routes.layerRoutes, location);

		let pageLocation;
		if (isLayer) {
			if (this.pageLocation.pathname == location.pathname) {
				pageLocation = {pathname: '/'};
			} else {
				pageLocation = this.pageLocation;
			}
		} else {
			this.pageLocation = pageLocation = location;
		}

		return (<Switch location={pageLocation}>
			{routes.pageRoutes.map(route =>
				generateRouteComponent({props: route, routeId: route.routeId}))}
			{NotFound && <NotFound/>}
		</Switch>);
	}
}

export default RadPageManager;