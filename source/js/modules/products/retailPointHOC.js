/**
 * Created by RobertSabiryanov on 16.05.17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getRetailPoints} from '../account/actions/accountActions';

export default (Component) => {
	class RetailPointHOC extends React.Component {

		componentDidMount() {
			const {getRetailPoints} = this.props;
			getRetailPoints();
		}

		render() {
			let className = 'poss';
			if (!this.props.retailPoint) {
				className += ' loading_block';
			}

			return (
				<div className={className}>
					{this.props.retailPoint && <Component {...this.props}/>}
				</div>
			);
		}
	}
	function mapStateToProps(state, ownProps) {
		return {
			retailPoint: state.account.get('retailPoint'),
			error: state.products.get('error'),
			data: state.products.get('data')
		}
	}

	function mapDispatchToProps(dispatch) {
		return {
			getRetailPoints: bindActionCreators(getRetailPoints.request, dispatch)
		}
	}

	return connect(mapStateToProps, mapDispatchToProps)(RetailPointHOC);
}