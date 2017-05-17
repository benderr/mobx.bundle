import PropTypes from 'prop-types';
import React from 'react'

export default (RouteComponent) => {
	class LayoutRoute extends React.Component {
		static propTypes = {
			component: PropTypes.func.isRequired,
			layout: PropTypes.func.isRequired
		};

		render() {
			const {component:Component, layout:Layout, ...props}=this.props;
			return (<RouteComponent  { ...props }
									 render={(routeProps) =>
										 <Layout {...routeProps} {...props}><Component/></Layout>}/>);
		}
	}

	return LayoutRoute;
}

