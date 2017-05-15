import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';

export default (RouteComponent) => {

	@connect(mapStateToProps)
	class PrivateRoute extends React.Component {
		render() {
			const {authData, ...props}=this.props;

			if (authData != null)
				return (<RouteComponent {...props}/>);
			else
				return (<Redirect to={{
					pathname: '/signin',
					state: {from: props.location}
				}}/>);
		}
	}

	return PrivateRoute;
};

function mapStateToProps(state) {
	return {
		authData: state.auth.get('authData')
	}
}