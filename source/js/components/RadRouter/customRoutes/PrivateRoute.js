import React from 'react'
import {Redirect} from 'react-router-dom'
//import {LoaderPanel} from 'common/uiElements'

export default (RouteComponent) => {

	class PrivateRoute extends React.Component {
		render() {
			const {authData, ...props}=this.props;

			// if (authData != null)
			// 	return (<RouteComponent {...props}/>);
			// else {
			// 	setTimeout(() => window.location.href = '/signin', 500);
			// 	return (<LoaderPanel loading={true}/>)
			// }

			return (<RouteComponent {...props}/>);
		}
	}

	return PrivateRoute;
};
