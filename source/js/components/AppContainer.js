import React from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'

import NotFoundLayout from 'components/NotFoundLayout'
import InternalLayout from 'components/InternalLayout'
import DefaultLayerLayout from 'components/DefaultLayerLayout'
import RadRouter from 'components/RadRouter/RadRouter';
import {NotifyService} from 'common/uiElements/Notify/immutable';
import {getAppReady} from 'modules/account/selectors/accountSelectors'

@withRouter
@connect((state) => ({
	appReady: getAppReady(state)
}))
class AppContainer extends React.Component {
	static propTypes = {
		appReady: PropTypes.bool.isRequired,
		routes: PropTypes.array.isRequired
	};

	componentDidMount() {
		$('#root').removeClass('loading_block');
	}

	render() {
		let className = 'poss';
		if (!this.props.appReady) {
			className += ' loading_block';
		}

		return (
			<div className={className}>
				{this.props.appReady &&
				<RadRouter defaultLayerLayout={DefaultLayerLayout} defaultLayout={InternalLayout}
						   routes={this.props.routes} notFound={NotFoundLayout}/>}
				<NotifyService />
			</div>
		);
	}
}

export default AppContainer;