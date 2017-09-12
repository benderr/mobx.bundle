import React from 'react'
import PropTypes from 'prop-types';
import {withRouter} from 'react-router'

import NotFoundLayout from 'components/NotFoundLayout'
import InternalLayout from 'components/InternalLayout'
import DefaultLayerLayout from 'components/DefaultLayerLayout'
import RadRouter from 'components/RadRouter/RadRouter';
import {NotifyService} from 'common/uiElements/Notify';
import {LoaderPanel} from 'common/uiElements'
import logger from 'infrastructure/utils/logger'

@withRouter
class AppContainer extends React.Component {
	static propTypes = {
		routes: PropTypes.array.isRequired
	};

	componentWillUnmount() {
		logger.log('AppContainer componentWillUnmount');
	}

	render() {
		const {routes}=this.props;

		return (
			<div>
				<RadRouter defaultLayerLayout={DefaultLayerLayout}
						   defaultLayout={InternalLayout}
						   routes={routes}
						   notFound={NotFoundLayout}/>}
				<NotifyService />
			</div>
		);
	}
}

export default AppContainer;