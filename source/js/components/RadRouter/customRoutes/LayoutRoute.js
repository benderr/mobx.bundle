import PropTypes from 'prop-types';
import React from 'react'
import {Route} from 'react-router-dom'

const LayoutRoute = ({component:Component, layout:Layout, ...props}) => {
	return (
		<Route  { ...props } render={(routeProps) => <Layout {...routeProps} {...props}><Component/></Layout>}/>
	);
};

LayoutRoute.propTypes = {
	component: PropTypes.func.isRequired,
	layout: PropTypes.func.isRequired
};

export default LayoutRoute;