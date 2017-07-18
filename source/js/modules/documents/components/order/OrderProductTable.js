import React from 'react'
import PropTypes from 'prop-types'
import {getLabelByValue, VAT_TAG_OPTIONS, MEASURE_OPTIONS} from 'modules/core/productEnums'
import {AmountFormat} from 'common/uiElements'
import ProductShape from './ProductShape'

const OrderProductTable = ({products, canEdit, onRemove}) => {

	const rows = products.map(row => {
		const measureLabel = getLabelByValue(VAT_TAG_OPTIONS, row.measure);
		const vatTagLabel = getLabelByValue(MEASURE_OPTIONS, row.vatTag);
		return (<div class="table_row  row_link">
			<div class="doc_name">{row.name}</div>
			<div class="doc_comment">{row.description}</div>
			<div class="doc_price"><AmountFormat value={row.price}/></div>
			<div class="doc_сount">{row.quantity}{measureLabel}</div>
			<div class="doc_amount"><AmountFormat value={row.baseSum}/></div>
			<div class="doc_nds">{vatTagLabel}%</div>
			{canEdit && <a class="doc_delete_icon  icon-trash-bin" onClick={onRemove}></a>}
		</div>)
	});

	return (<div class="table  table_docs  table_docs__orders_add">
		<div class="table_head">
			<div class="doc_name">Наименование</div>
			<div class="doc_comment">Комментарий</div>
			<div class="doc_price">Цена</div>
			<div class="doc_сount">Кол-во</div>
			<div class="doc_amount">Сумма</div>
			<div class="doc_nds">НДС</div>
			{canEdit && <div class="doc_delete_icon"></div>}
		</div>
		{rows}
		<div class="table_row  table_row__total">
			<div class="doc_name"></div>
			<div class="doc_comment"></div>
			<div class="doc_price"></div>
			<div class="doc_сount">Сумма:</div>
			<div class="doc_amount">2000.00 р.</div>
			<div class="doc_nds"></div>
		</div>
	</div>)
};

OrderProductTable.propTypes = {
	canEdit: PropTypes.bool,
	products: PropTypes.arrayOf(ProductShape).isRequired,
	onRemove: PropTypes.func
};

export default OrderProductTable;
