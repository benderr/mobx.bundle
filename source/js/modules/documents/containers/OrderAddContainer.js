import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toJS from 'components/HOC/toJs';
import * as orderSelectors from '../selectors/orderSelectors'
import * as actions from '../actions/orderActionTypes'
import DefaultLayerLayout from 'components/DefaultLayerLayout'
import {withRouter} from 'react-router'

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@toJS
class OrderAddContainer extends DefaultLayerLayout {

	render() {
		const {loading, id} = this.props;

		const title = 'Title';
		return (
			<article className="page" {...this.layerOptions}>
				<div className="page_header">
					{this.getCloseButton()}
					{this.getToggleButton()}
					<h1>{!loading && title}</h1>
				</div>
				<div>
					{id}
				</div>
			</article>
		);
	}

}


function mapStateToProps(state, props) {
	const {id, point, action:urlAction}=props.match.params;
	return {id};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({}, dispatch)
	};
}


export default OrderAddContainer;