import React from 'react'
import {DatePickerRange} from 'common/uiElements'
import CheckBox from '../FilterCheckBox'
import {DOCUMENT_TYPE, DOCUMENT_STATUS, getDocTypeName} from '../../enums'


class ChequeFilter extends React.Component {
	isClosable() {
		return !(this.drop && this.drop.isOpen());
	}

	render() {
		const {
			ignoreCloseSelect,
			dateFrom, dateTo, docType,
			onChangeDate, onChangeDocType
		} = this.props;

		return (
			<div>
				<div className="side_filter mt0">
					<div className="side_filter_name">Период</div>
					<DatePickerRange ignoreDropCloseAttr={ignoreCloseSelect}
									 dateFrom={dateFrom}
									 dateTo={dateTo}
									 onChange={onChangeDate}
									 setDropInstance={drop => this.drop = drop}/>
				</div>

				<div className="side_filter">
					<div className="side_filter_name">Тип документа</div>
					<ul>
						<CheckBox checked={docType.indexOf(DOCUMENT_TYPE.SALE) >= 0}
								  onChange={event => onChangeDocType(event, DOCUMENT_TYPE.SALE)}
								  id={`id_${DOCUMENT_TYPE.SALE}`}
								  label={getDocTypeName(DOCUMENT_TYPE.SALE)}/>
						<CheckBox checked={docType.indexOf(DOCUMENT_TYPE.RETURN) >= 0}
								  onChange={event => onChangeDocType(event, DOCUMENT_TYPE.RETURN)}
								  id={`id_${DOCUMENT_TYPE.RETURN}`}
								  label={getDocTypeName(DOCUMENT_TYPE.RETURN)}/>
					</ul>
				</div>
			</div>
		)
	}
}


export default ChequeFilter;