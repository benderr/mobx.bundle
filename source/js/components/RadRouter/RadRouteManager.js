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
		history: PropTypes.object.isRequired,
		layersLimit: PropTypes.number
	};

	static defaultProps = {
		layersLimit: 5
	};

	constructor(props) {
		super(props);
		this.state = {
			layers: [],
			currentPage: props.location
		};
	}

	getLayers() {
		return this.state.layers;
	}

	setLayers(layers) {
		this.setState({layers, needUpdate: true});
	}

	setCurrentPage(currentPage) {
		this.setState({currentPage, needUpdate: true});
	}

	createLayer(location) {
		return {
			location,
			layerId: 'layer_' + routeHelpers.getRandomKey(),
			needUpdate: true
		};
	}

	destroyLayer({layerId}) {
		let layers = this.getLayers();
		if (!layers.some(s => s.layerId == layerId))
			return;

		layers = layers.filter(s => s.layerId != layerId);

		this.setLayers(layers);

		//если слоев не осталось, то не нужно переходить назад
		if (layers.length != 0) {
			this.props.history.replace(layers[0].location);
		}
		else {
			let loc = {...this.state.currentPage};
			loc.state = {returnToPage: true};
			this.props.history.replace(loc);
		}
	}

	hideLayer(layerId) {
		const el = $(`[data-layer=${layerId}]`);
		if (el) {
			el.removeClass('open');
			el.addClass('hide');
		}
	}

	componentDidMount() {
		const self = this;
		$(window).keyup(function (e) {
			if (e.keyCode == 27) {
				const lastLayer = self.getLastLayer();
				lastLayer && self.hideLayer(lastLayer.layerId);
				setTimeout(() => self.destroyLayer({layerId: lastLayer.layerId}), 400);
			}
		})
	}

	getLastLayer() {
		const layers = this.getLayers();
		return layers.length > 0 ? layers[0] : null;
	}

	isCurrentPage(location) {
		return this.state.currentPage.pathname == location.pathname;
	}

	componentWillUnmount() {
		logger.log('RadRouteManager componentWillUnmount');
	}

	shouldComponentUpdate(props, state) {
		return state.needUpdate;
	}

	componentWillMount() {
		this.processPage({location: this.props.location, routes: this.props.routes});
	}

	componentWillReceiveProps({location, routes}) {
		this.processPage({location, routes});
	}

	processPage({location, routes}) {
		logger.log('RadRouteManager componentWillReceiveProps');
		const self = this;
		this.setState({needUpdate: false});

		const isLayer = routeHelpers.isLayerPage(routes.layerRoutes, location);

		let layers = this.getLayers();

		if (isLayer) {
			if (this.isCurrentPage(location)) {
				//если слой это первая загружаемая страница, то устанавливаем задний фон дефолтную страницу
				this.setCurrentPage({pathname: '/'});
				logger.log('RadRouteManager setCurrentPage base');
			}

			if (layers.length >= this.props.layersLimit) {
				layers.splice(0, 1, this.createLayer(location));
				this.setLayers(layers);
				logger.log('RadRouteManager setLayers = replace');
			} else {
				const locationLayer = layers.filter(s => s.location.pathname == location.pathname)[0];
				if (locationLayer) {
					const lastLayer = this.getLastLayer();
					if (lastLayer != locationLayer) {
						layers = layers.filter(s => s != locationLayer);
						layers.unshift(this.createLayer(location));
						logger.log('RadRouteManager setLayers = refresh');
						this.setLayers(layers);
					} else {
						locationLayer.location = location;
						this.setLayers(layers);
					}
				}
				else {
					layers.unshift(this.createLayer(location));
					logger.log('RadRouteManager setLayers = new');
					this.setLayers(layers);
				}
			}
		} else {

			layers.forEach(layer => self.hideLayer(layer.layerId));
			setTimeout(() => self.setLayers([]), 500);
			this.setCurrentPage(location)
		}
	}

	render() {
		const {location, notFound, routes}=this.props;
		const {currentPage, layers} =this.state;
		logger.log('RadRouteManager render');
		return (
			<div className="poss">
				<RadPageManager
					pageLocation={currentPage}
					location={location}
					routes={routes}
					notFound={notFound}/>

				{layers.map(layer => (
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