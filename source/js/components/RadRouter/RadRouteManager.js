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

	set currentPage(currentPage) {
		this.setState({currentPage, needUpdate: true});
	}

	get currentPage() {
		return this.state.currentPage;
	}

	set layers(layers) {
		this.setState({layers, needUpdate: true});
	}

	get layers() {
		return this.state.layers.map(s => s);
	}

	isCurrentLocation(location) {
		return this.currentPage.pathname == location.pathname;
	}

	createLayer(location) {
		return {
			location,
			layerId: 'layer_' + routeHelpers.getRandomKey()
		};
	}

	getLayerByLocation(location) {
		return this.layers.filter(s => s.location.pathname == location.pathname)[0];
	}

	getLastLayer() {
		return this.layers.length > 0 ? this.layers[0] : null;
	}

	resolveLocation(location) {
		logger.log('RadRouteManager componentWillReceiveProps');
		const self = this;
		this.setState({needUpdate: false});

		const routes = this.props.routes;
		let layers = this.layers;
		const isLayer = routeHelpers.isLayerPage(routes.layerRoutes, location);


		if (isLayer) {
			if (this.isCurrentLocation(location)) {
				//если слой это первая загружаемая страница, то устанавливаем задний фон дефолтную страницу
				this.currentPage = {pathname: '/'};
				//logger.log('RadRouteManager setCurrentPage base');
			}

			if (this.layers.length >= this.props.layersLimit) {
				layers.splice(0, 1, this.createLayer(location));
				this.layers = layers;
				//logger.log('RadRouteManager setLayers = replace');
			} else {
				const locationLayer = this.getLayerByLocation(location);
				if (locationLayer) { //слой с таким урл уже есть в массиве
					const lastLayer = this.getLastLayer();
					if (lastLayer != locationLayer) {
						layers = layers.filter(s => s != locationLayer);
						layers.unshift(this.createLayer(location));
						//logger.log('RadRouteManager setLayers = refresh');
						this.layers = layers;

					} else {
						locationLayer.location = location;
						this.layers = layers;
					}
				}
				else {
					layers.unshift(this.createLayer(location));
					//logger.log('RadRouteManager setLayers = new');
					this.layers = layers;
				}
			}
		} else {
			this.layers.forEach(layer => self.hideLayer(layer.layerId));
			setTimeout(() => self.layers = [], 500);
			this.currentPage = location;
		}
	}

	destroyLayer({layerId}) {
		if (!this.layers.some(s => s.layerId == layerId))
			return;

		const layers = this.layers.filter(s => s.layerId != layerId);
		this.layers = layers;

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

	componentWillUnmount() {
		logger.log('RadRouteManager componentWillUnmount');
	}

	shouldComponentUpdate(props, state) {
		return state.needUpdate;
	}

	componentWillMount() {
		this.resolveLocation(this.props.location);
	}

	componentWillReceiveProps({location}) {
		this.resolveLocation(location);
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