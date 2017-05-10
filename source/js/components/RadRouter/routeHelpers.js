//import {LayoutRoute} from 'components/RadRouter/LayoutRoute'
import pathToRegexp from 'path-to-regexp'
import React from 'react'
import {Route} from 'react-router-dom'
import LayoutRoute from './customRoutes/LayoutRoute'

const isLayerPage = (routes, location) => {
	return routes.some(s => {
		const re = pathToRegexp(s.path, []);
		return re.exec(location.pathname) != null;
	});
}

const getRandomKey = () => {
	return Math.floor(Math.random() * (999999999 - 100000000)) + 100000000;
};

const generateRouteComponent = ({routeId, props}) => {
	const key = `page_route_` + routeId;
	if (!routeId)
		throw 'RouteId must be set';

	if (props.path) {
		const {layout, ...routeProps}=props;

		let rootRoute = Route;
		// if(props.private)
		// 	rootRoute=
		if (layout) {
			rootRoute = LayoutRoute;
			return generateRouteCustom(key, {...routeProps, layout}, rootRoute);
		}
		else {
			return generateRouteDefault(key, routeProps);
		}
	}
	else if (props.render) {
		return props.render({key});
	}
};

const generateRouteDefault = (key, props) => {
	return (<Route {...props} key={key}/>);
};

const generateRouteCustom = (key, props, CustomRoute) => {
	return (<CustomRoute {...props} key={key}/>)
};

const transformRoutes = (routes, defaultLayout, defaultLayerLayout) => {
	return routes.reduce((r, rule) => {
		if (rule.isLayer) {
			const layout = rule.layout === undefined ? defaultLayerLayout : rule.layout;
			r.layerRoutes = [...r.layerRoutes,
				{
					routeId: `${rule.name}_${getRandomKey()}`,
					layout,
					...rule
				}
			];
		} else {
			const layout = rule.layout === undefined ? defaultLayout : rule.layout;
			r.pageRoutes = [...r.pageRoutes,
				{
					routeId: `${rule.name}_${getRandomKey()}`,
					layout,
					...rule
				}
			];
		}

		return r;
	}, {pageRoutes: [], layerRoutes: []});
};


export {isLayerPage, generateRouteComponent, getRandomKey, transformRoutes}