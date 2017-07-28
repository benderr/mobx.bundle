import PropTypes from 'prop-types'
import react from 'react'
import CheckBox from '../FilterCheckBox'
import {DOCUMENT_TYPE} from '../../enums'

const DocumentsFilter = ({
	docType,
	selectedState,
	dateFrom,
	dateTo,
	onChangeStatus,
	onChangeDocType,
	onChangeDateRange
}) => {


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
	</div>)
};

DocumentsFilter.propTypes = {
	docType: PropTypes.string,
	selectedState: PropTypes.array,
	dateFrom: PropTypes.string,
	dateTo: PropTypes.string,
	onChangeStatus: PropTypes.func.isRequired,
	onChangeDocType: PropTypes.func.isRequired,
	onChangeDateRange: PropTypes.func.isRequired,
};


export default DocumentsFilter;