import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import toJS from 'components/HOC/toJs'
import * as orderSelectors from '../selectors/orderSelectors'
import * as actions from '../actions/orderActions'
import DefaultLayerLayout from 'components/DefaultLayerLayout'
import {withRouter} from 'react-router'
import {LoaderBlock, DateFormat} from 'common/uiElements'
import OrderProductTable from '../components/order/OrderProductTable'

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@toJS
class OrderViewContainer extends DefaultLayerLayout {

	componentDidMount() {
		super.componentDidMount();
		const {point, id, getOrder}=this.props;
		getOrder({point, id});
	}

	render() {
		const {loading, error, order} = this.props;

		return (
			<article className="page page__kassa_w900" {...this.layerOptions}>
				<div className="page_header">
					{this.getCloseButton()}
					{this.getToggleButton()}
					{order &&
					<h1>№{order.docNum} от <DateFormat value={order.beginDateTime} format="dd.mm.yyyy HH:MM:ss"/></h1>}
				</div>
				< div className='page_content  with_bottom_panel'>
					{order &&
					<OrderProductTable canEdit={false}
									   totalSum={order.actualSum}
									   products={order.inventPositions}/>
					}
					{error && <div className="info info_error">{error}</div>}
					<LoaderBlock loading={loading}/>
				</div>
			</article>
		);
	}
}

function mapStateToProps(state, props) {
	const {id, point}=props.match.params;
	const orderView = orderSelectors.getSection(state).getIn(['orderViews', id]);
	return {
		order: orderView ? orderView.get('order') : null,
		loading: orderView ? orderView.get('loading') : false,
		error: orderView ? orderView.get('error') : null,
		id, point
	};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			getOrder: actions.getOrderDetails.request
		}, dispatch)
	};
}


export default OrderViewContainer;