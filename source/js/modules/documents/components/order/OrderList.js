import React from 'react'
import PropTypes from 'prop-types'
import OrderShape from './OrderShape'
import {DateFormat, AmountFormat, InfinateScroll} from 'common/uiElements'

class OrderList extends React.Component {

	render() {
		const {loading, orders, onLoadNext, onOpenOrder}=this.props;
		const notFound = !loading && orders.length == 0 ?
			(<div class="searching_results">
				<div class="light_block">По запросу ничего не найдено</div>
			</div>) : null;

		const orderRows = orders.map(order => (
			<div key={order.id} class="table_row  row_link" onClick={() => onOpenOrder(order.id)}>
				<div class="doc_date"><DateFormat value={order.beginDateTime} format="dd.mm.yyyy HH:MM"/></div>
				<div class="doc_number">Документ №{order.docNum}</div>
				<div class="doc_amount"><AmountFormat value={order.actualSum}/></div>
				<div class="doc_cashier">{order.cashier || 'Н/Д'}</div>
				<div class="doc_comment">{order.description}</div>
			</div>));

		return (<div class="widget_block">
			<div class="table  table_docs">
				<div class="table_head">
					<div class="doc_date">Дата создания</div>
					<div class="doc_number">Номер документа</div>
					<div class="doc_amount">Сумма</div>
					<div class="doc_cashier">Кассир</div>
					<div class="doc_comment">Комментарий</div>
				</div>
				<div class="table_row  row_link_search">
					<input type="search" class="small  w100" placeholder="Кассир, номер документа или сумма"/>
				</div>
				{orderRows}
				{notFound}
				<InfinateScroll loadNext={onLoadNext} totalCount={orders.length} listLength={50} loading={loading}/>
			</div>
		</div>)
	}
}

OrderList.propTypes = {
	orders: PropTypes.arrayOf(OrderShape).isRequired,
	loading: PropTypes.bool.isRequired,
	onLoadNext: PropTypes.func.isRequired,
	onOpenOrder: PropTypes.func.isRequired
};

export default OrderList;