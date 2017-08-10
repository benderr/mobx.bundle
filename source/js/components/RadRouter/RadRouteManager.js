import React from 'react'
import PropTypes from 'prop-types';
import * as routeHelpers from './routeHelpers';
import RadPageManager from './RadPageManager';
import RadLayerManager from './RadLayerManager';
import logger from 'infrastructure/utils/logger'

class RadRouteManager extends React.Component {
	static propTypes = {
		routes: PropTypes.object.isRequired,
		notFound: PropTypes.func,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	};
	layers = [];
	pageLocation = this.props.location;

	destroyLayer({layerId}) {
		if (!this.layers.some(s => s.layerId == layerId))
			return;
		this.layers = this.layers.filter(s => s.layerId != layerId);
		//если слоев не осталось, то не нужно переходить назад
		if (this.layers.length != 0) {
			this.props.history.goBack();
		}
		else {
			//this.props.history.goBack();
			let loc = {...this.pageLocation};
			loc.state = {returnToPage: true};
			this.props.history.replace(loc);
		}

	}

	getExistLayer(location) {
		return this.layers.filter(s => s.location.pathname == location.pathname)[0]
	}

	componentWillUnmount() {
		logger.log('RadRouteManager componentWillUnmount');
	}

	render() {
		const {location, notFound, routes}=this.props;

		const isLayer = routeHelpers.isLayerPage(routes.layerRoutes, location);

		let currentPageLocation;

		if (isLayer) {
			if (this.pageLocation.pathname == location.pathname) {
				this.pageLocation = currentPageLocation = {pathname: '/'};
			} else {
				currentPageLocation = this.pageLocation;
			}
		} else {
			this.pageLocation = currentPageLocation = location;
		}


		if (isLayer) {

			this.layers.forEach(s => {
				s.needUpdate = false;
			});

			function createLayer() {
				return {
					location,
					layerId: 'layer_' + routeHelpers.getRandomKey(),
					needUpdate: true
				};
			}

			if (this.layers.length >= 5) {
				this.layers.splice(0, 1, createLayer());
			} else {
				const locationLayer = this.getExistLayer(location);
				if (!locationLayer) {
					this.layers.unshift(createLayer());
				}
				else {
					if (!routeHelpers.equalLocations(locationLayer.location, location)) {
						locationLayer.location = location;
						locationLayer.needUpdate = true;
					}
				}
			}
		} else {
			this.layers = [];
		}

		return (
			<div className="poss">
				<RadPageManager
					pageLocation={currentPageLocation}
					location={location}
					routes={routes}
					notFound={notFound}/>

				{this.layers.map((layer) => (
					<RadLayerManager key={layer.layerId}
									 {...layer}
									 routes={routes.layerRoutes}
									 onCloseLayer={::this.destroyLayer}/>

				))}
			</div>
		);
	}
}

export default RadRouteManager;