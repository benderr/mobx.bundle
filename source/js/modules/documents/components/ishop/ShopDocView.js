import React from 'react'
import PropTypes from 'prop-types'
import DocumentDetailsShape from './DocumentDetailsShape'
import DocPositionTable from './DocPositionTable'
import {DOCUMENT_STATUS} from '../../enums'

class ShopDocView extends React.Component {

	renderFailed() {
		const {document, onResend}=this.props;
		return (<div>
			<div class="info_error">Сообщение ФН об ошибке: {document.error}
			</div>
			<button class="button  small  icon-reload  mb28" onClick={onResend}>Провести повторно</button>
		</div>)
	}

	renderInfo() {
		const {document}=this.props;
		const fiscalInfo = document.fiscalInfo;
		if (!fiscalInfo)
			return null;
		return (<div class="light_block  f_small">
			<div class="form_group_list  fw_m">Фискальные данные</div>
			<div class="form_group_list">
				<div class="property_label col  w30">Номер фискального документа:</div>
				<div class="property_value col  w30">{fiscalInfo.fnDocNumber}</div>
			</div>
			<div class="form_group_list">
				<div class="property_label col  w30">Признак фискального документа:</div>
				<div class="property_value col  w30">{fiscalInfo.fnDocMark}</div>
			</div>
			<div class="form_group_list">
				<div class="property_label col  w30">Фискальный накопитель:</div>
				<div class="property_value col  w30">{fiscalInfo.fnNumber}</div>
			</div>
			<div class="form_group_list">
				<div class="property_label col  w30">Номер ККТ:</div>
				<div class="property_value col  w30">{fiscalInfo.kktNumber}</div>
			</div>
		</div>);
	}

	render() {
		const {document}=this.props;

		return (<div>
			{document.status === DOCUMENT_STATUS.PRINTED && document.fiscalInfo && this.renderInfo()}

			{document.status === DOCUMENT_STATUS.FAILED && this.renderFailed()}

			<DocPositionTable canEdit={false}
							  totalSum={document.docSum}
							  positions={document.positions}/>
		</div>)
	}
}

ShopDocView.propTypes = {
	document: DocumentDetailsShape.isRequired,
	onResend: PropTypes.func.isRequired
};

export default ShopDocView;