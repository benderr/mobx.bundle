import React from 'react'
import PropTypes from 'prop-types'
import {SortLink} from 'common/uiElements'


const MoneyTableHead = ({onHeadSortClick, sortField, sortDirection}) => {
	return (
		<div className="table_head">
			<SortLink sortField={sortField}
					  orderBy={sortDirection}
					  onClick={onHeadSortClick}
					  field="beginDateTime"
					  className="doc_date">Дата создания</SortLink>
			<SortLink sortField={sortField}
					  orderBy={sortDirection}
					  onClick={onHeadSortClick}
					  field="docType"
					  className="doc_type">Тип документа</SortLink>
			<div className="doc_smena_number">Номер смены</div>
			<SortLink sortField={sortField}
					  orderBy={sortDirection}
					  onClick={onHeadSortClick}
					  field="docNum"
					  className="doc_number">Номер документа</SortLink>
			<SortLink sortField={sortField}
					  orderBy={sortDirection}
					  onClick={onHeadSortClick}
					  field="actualSum"
					  className="doc_amount">Сумма</SortLink>
			<SortLink sortField={sortField}
					  orderBy={sortDirection}
					  onClick={onHeadSortClick}
					  field="cashier.name"
					  className="doc_cashier">Кассир</SortLink>
			<SortLink sortField={sortField}
					  orderBy={sortDirection}
					  onClick={onHeadSortClick}
					  field="customer.name"
					  className="doc_contragent">Контрагент</SortLink>
		</div>
	)
};

MoneyTableHead.propTypes = {
	onHeadSortClick: PropTypes.func.isRequired,
	sortField: PropTypes.string.isRequired,
	sortDirection: PropTypes.string.isRequired
};


export default MoneyTableHead;