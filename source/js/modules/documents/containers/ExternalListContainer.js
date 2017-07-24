import React from 'react'
import TitlePanel from '../components/TitlePanel'
import TitleActions from '../components/TitleActions'
import NoOrders from '../components/order/NoOrders'
import OrderList from '../components/order/OrderList'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toJS from 'components/HOC/toJs';
import * as orderSelectors from '../selectors/orderSelectors'
import * as actions from '../actions/orderActions'
import {push} from 'connected-react-router'
import retailPointRequiredHOC from 'components/HOC/retailPointRequiredHOC'

@retailPointRequiredHOC
@connect(mapStateToProps, mapDispatchToProps)
@toJS
class ExternalListContainer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {pageSize: 15};
	}

	setFilter(filter) {
		this.props.setOrdersFilter({filter});
	}

	componentDidMount() {
		this.setFilter({
			restart: true,
			filter: '',
			count: this.state.pageSize,
			sortField: 'beginDateTime',
			sortDirection: 'desc'
		});
		this.props.getOrders();
	}

	handleLoadMore() {
		this.props.getOrders();
	}

	handleChangeFilter(event) {
		let value = event.target.value;
		if (value && value.length > 2) {
			this.setFilter({restart: true, filter: value});
			this.props.searchOrders();
		} else if (!value) {
			this.setFilter({restart: true, filter: value});
			this.props.searchOrders();
		}
	}

	handleSortList(sortField = 'beginDateTime', sortDirection = 'desc') {
		this.setFilter({sortField, sortDirection, restart: true});
		this.props.getOrders();
	}

	handleAddOrder() {
		this.props.push('/documents/external/add');
	}

	handleOpenOrder(id) {
		const {push, selectedPoint} = this.props;
		push(`/documents/external/view/${selectedPoint}/${id}`);
	}

	render() {
		const {noItems, orders, loading, totalCount} = this.props;

		return (
			<div className="h100per">
				<TitlePanel>
					<TitleActions showFilter={false}>
						<a class="button  small  icon-plus" onClick={::this.handleAddOrder}>Добавить заказ</a>
					</TitleActions>
				</TitlePanel>

				{noItems && <NoOrders onAddOrder={::this.handleAddOrder}/>}
				{!noItems && <OrderList orders={orders}
										loading={loading}
										totalCount={totalCount}
										onChangeFilter={::this.handleChangeFilter}
										onLoadNext={::this.handleLoadMore}
										onSort={::this.handleSortList}
										onOpenOrder={::this.handleOpenOrder}/>}

			</div>
		);
	}

}


function mapStateToProps(state) {
	return {
		orders: orderSelectors.getOrders(state),
		loading: orderSelectors.getLoader(state),
		noItems: orderSelectors.getNoItems(state),
		totalCount: orderSelectors.getOrdersTotalCount(state)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			setOrdersFilter: actions.setOrdersFilter,
			getOrders: actions.getOrders.request,
			searchOrders: actions.searchOrders,
			push: push
		}, dispatch)
	};
}


export default ExternalListContainer;