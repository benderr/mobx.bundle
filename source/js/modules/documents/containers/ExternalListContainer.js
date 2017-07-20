import React from 'react'
import TitlePanel from '../components/TitlePanel'
import TitleActions from '../components/TitleActions'
import ListFilter from '../components/ListFilter'
import NoOrders from '../components/order/NoOrders'
import OrderList from '../components/order/OrderList'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toJS from 'components/HOC/toJs';
import * as orderSelectors from '../selectors/orderSelectors'
import * as actions from '../actions/orderActionTypes'
import {push} from 'connected-react-router'
import retailPointRequiredHOC from 'components/HOC/retailPointRequiredHOC'

@retailPointRequiredHOC
@connect(mapStateToProps, mapDispatchToProps)
@toJS
class ExternalListContainer extends React.Component {

	handleOpenFilter() {
		this.filter.open();
	}

	handleAddOrder() {
		this.props.push('/documents/external/add');
	}

	handleOpenOrder(id) {
		const {push, selectedPoint} = this.props;
		push(`/documents/external/view/${selectedPoint}/${id}`);
	}

	handleLoadNext() {

	}

	render() {
		const {noItems, orders, loading} = this.props;

		return (
			<div className="h100per">
				<TitlePanel>
					<TitleActions onShowFilter={::this.handleOpenFilter}>
						<a class="button  small  icon-plus" onClick={::this.handleAddOrder}>Добавить заказ</a>
					</TitleActions>
				</TitlePanel>

				<ListFilter ref={filter => this.filter = filter}>
					<div class="side_filter">
						<div class="side_filter_name">Тип документа</div>
						<ul>
							<li>
								<input type="checkbox" name="tfilter" id="ff11" class="input_check"/>
								<label for="ff11" class="label_check"><i
									class="icon"></i><span>Продажа</span></label>
							</li>
						</ul>
					</div>
				</ListFilter>

				{noItems && <NoOrders onAddOrder={::this.handleAddOrder}/>}
				{!noItems && <OrderList orders={orders}
										loading={loading}
										onOpenOrder={::this.handleOpenOrder}
										onLoadNext={::this.handleLoadNext}/>}

			</div>
		);
	}

}


function mapStateToProps(state) {
	return {
		orders: orderSelectors.getOrders(state),
		loading: orderSelectors.getLoader(state),
		noItems: orderSelectors.getNoItems(state)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			loadMore: actions.getOrders.request,
			push: push
		}, dispatch)
	};
}


export default ExternalListContainer;