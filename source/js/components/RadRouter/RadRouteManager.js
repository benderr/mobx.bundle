import React from 'react'
import PropTypes from 'prop-types';
import * as routeHelpers from './routeHelpers'
import RadPageManager from './RadPageManager'
import RadLayerManager from './RadLayerManager'

class RadRouteManager extends React.Component {
	static propTypes = {
		routes: PropTypes.object.isRequired,
		notFound: PropTypes.func,
		location: PropTypes.object.isRequired
	};
	layers = [];

	destroyLayer({layerId}) {
		this.layers = this.layers.filter(s => s.layerId != layerId);
		this.props.history.goBack();
	}

	render() {
		const {location, notFound, routes}=this.props;

		const isLayer = routeHelpers.isLayerPage(routes.layerRoutes, location);

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
				if (!this.layers.some(s => s.location.pathname == location.pathname))
					this.layers.unshift(createLayer());
			}
		} else {
			this.layers = [];
		}

		return (
			<div className="poss">
				<RadPageManager
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