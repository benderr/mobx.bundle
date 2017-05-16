/**
 * Created by RobertSabiryanov on 16.05.17.
 */
import React from 'react';
import {connect} from 'react-redux';

export default (Component) => {
	class RetailPointHOC extends React.Component {
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
			//retailPoints: state.retailPointsData.get('retailPoints'),
			selectedPoint: state.retailPointsData.get('selectedPoint')
		}
	}

	return connect(mapStateToProps)(RetailPointHOC);
}