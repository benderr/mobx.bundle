import PropTypes from 'prop-types'
import React from 'react'
import CheckBox from '../FilterCheckBox'
import {DOCUMENT_TYPE, DOCUMENT_STATUS, getDocStatusName} from '../../enums'

const DocumentsFilter = ({
	docType,
	selectedState,
	dateFrom,
	dateTo,
	onChangeStatus,
	onChangeDocType,
	onChangeDateFrom,
	onChangeDateTo
}) => {

	const states = selectedState || [];

	return (<div>
		<div class="side_filter mt0">
			<div class="side_filter_name">Тип документа</div>
			<ul>

				<CheckBox checked={docType == DOCUMENT_TYPE.SALE}
						  onChange={event => onChangeDocType(event, DOCUMENT_TYPE.SALE)}
						  id="checkboxSale"
						  label="Продажа"/>

				<CheckBox checked={docType == DOCUMENT_TYPE.RETURN}
						  onChange={event => onChangeDocType(event, DOCUMENT_TYPE.RETURN)}
						  id="checkboxReturn"
						  label="Возврат"/>
			</ul>
		</div>
		<div class="side_filter">
			<div class="side_filter_name">Статус</div>
			<ul>

				{Object.keys(DOCUMENT_STATUS).map(key => {
					return (<CheckBox key={key}
									  checked={states.indexOf(key) >= 0}
									  onChange={event => {
										  onChangeStatus(event, key);
									  }}
									  id={'key_' + key}
									  label={getDocStatusName(key)}/>);
				})}


				{/*<CheckBox checked={docType == DOCUMENT_TYPE.RETURN}*/}
				{/*onChange={event => onChangeDocType(event, DOCUMENT_TYPE.RETURN)}*/}
				{/*id="checkboxReturn"*/}
				{/*label="Возврат"/>*/}
			</ul>
		</div>
	</div>)
};

DocumentsFilter.propTypes = {
	docType: PropTypes.string,
	selectedState: PropTypes.array,
	dateFrom: PropTypes.string,
	dateTo: PropTypes.string,
	onChangeStatus: PropTypes.func.isRequired,
	onChangeDocType: PropTypes.func.isRequired,
	onChangeDateFrom: PropTypes.func.isRequired,
	onChangeDateTo: PropTypes.func.isRequired
};


export default DocumentsFilter;