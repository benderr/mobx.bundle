/**
 * Created by RobertSabiryanov on 16.05.17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {getCurrentRetailPointId} from 'modules/retailPoints/selectors/retailPointSelectors'

export default (Component) => {
	class RetailPointRequiredHOC extends React.Component {
		render() {
			const {selectedPoint} = this.props;
			if (!selectedPoint)
				return (<div className='loading_block' style={{minHeight:'100%'}}></div>);
			else
				return (<Component {...this.props}/>)
		}
	}
	function mapStateToProps(state, ownProps) {
		return {
			selectedPoint: getCurrentRetailPointId(state)
		}
	}

	return connect(mapStateToProps)(RetailPointRequiredHOC);
}