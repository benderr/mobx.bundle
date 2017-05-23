/**
 * Created by RobertSabiryanov on 16.05.17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {getCurrentRetailPointId} from 'modules/account/selectors/retailPointSelectors'

export default (Component) => {
	class RetailPointRequiredHOC extends React.Component {
		render() {
			const {selectedPoint} = this.props;
			let className = 'poss';
			if (!selectedPoint) {
				className += ' loading_block';
			}

			return (
				<div className={className}>
					{selectedPoint && <Component {...this.props}/>}
				</div>
			);
		}
	}
	function mapStateToProps(state, ownProps) {
		return {
			selectedPoint: getCurrentRetailPointId(state)
		}
	}

	return connect(mapStateToProps)(RetailPointRequiredHOC);
}