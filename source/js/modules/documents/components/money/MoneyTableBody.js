import React from 'react'
import PropTypes from 'prop-types'
import {DateFormat, AmountFormat} from 'common/uiElements'
import {DOC_TYPES, NOT_VALUE} from "../../enums/optionsDocument"


const MoneyTableBody = ({list}) => {
	console.log(list);

	return (
		<div>
			{list.map(Item =>
				<div className="table_row" key={`row_${Item.id}`}>
					<div className="doc_date">
						<DateFormat value={Item.dateCreated}/>
					</div>
					<div className="doc_type">
						{Item.type ? DOC_TYPES[Item.type] || NOT_VALUE : Item.type}
					</div>
					<div className="doc_smena_number">
						{Item.shiftDoc && toString(Item.shiftDoc.shiftNum) ? `Смена №${Item.shiftDoc.shiftNum}` : NOT_VALUE}
					</div>
					<div className="doc_number">
						Документ №{Item.docNum}
					</div>
					<div className="doc_amount">
						<AmountFormat value={Item.sum}/>
					</div>
					<div className="doc_cashier">
						{Item.cashier ? Item.cashier.name : NOT_VALUE}
					</div>
					<div className="doc_cashier">
						{Item.customer ? Item.customer.name : NOT_VALUE}
					</div>
				</div>
			)}
		</div>
	)
};

MoneyTableBody.propTypes = {
	list: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.any.isRequired,
		beginDateTime: PropTypes.instanceOf(Date),
		docType: PropTypes.any,
		docNum: PropTypes.any,
		actualSum: PropTypes.any,
		cashier: PropTypes.any,
		customer: PropTypes.any
	})).isRequired
};


export default MoneyTableBody;