import React from 'react'
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toJS from 'components/HOC/toJs';
import retailPointHOC from 'components/HOC/retailPointRequiredHOC';
import TitlePanel from '../components/TitlePanel'
import ReportForm from '../components/ReportFormComponent'
import {getCurrentRetailPointId} from 'modules/retailPoints/selectors/retailPointSelectors'
import moment from 'moment'

import {getSection} from 'modules/account/selectors/accountSelectors'
import * as selectors from '../selectors/reportSelectors'
import * as actions from '../actions/reportActions'


@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@retailPointHOC
@toJS
class ReportsContainer extends React.Component {

	onSubmitForm(props) {
		const {reportState, token} = this.props;

		if (!reportState.isFromEmail) {	// скачать отчет
			const t = getCurrentRetailPointId;
			console.log('t', t);


			// const beginDate = moment(props.get('beginDate'), "DD.MM.YYYY").format();
			// const endDate = moment(props.get('endDate'), "DD.MM.YYYY").format();
            //
			// const [protocol, _, host] = window.location.href.split("/").slice(0, 3);
			// const downloadLink = document.createElement("a");
			// const values = atob(token).split(':');
			// const email = values[0];
			// const password = values[1];
            //
			// // GET /v1/retail-point/{retailPointId}/downloadSalesReport
			// downloadLink.href = `/api/v1/retail-point/${token}/downloadSalesReport?beginDate=${beginDate}&endDate=${endDate}`;
			// downloadLink.download = "report.xls";
            //
			// console.log(downloadLink);
            //
			// document.body.appendChild(downloadLink);
			// downloadLink.click();
			// document.body.removeChild(downloadLink);

		} else {						// отправить на EMail

		}


		const {salesReportAction} = this.props;
		salesReportAction({
			beginDate: props.get('beginDate'),
			endDate: props.get('endDate'),
			fromEmail: props.get('fromEmail') || ''
		});
	}

	onCheckForEMail() {
		const {onCheckForEMail, reportState} = this.props;
		onCheckForEMail(!reportState.isFromEmail);
	}

	render() {
		const {reportState} = this.props;

		return (
			<div>
				<TitlePanel/>
				<ReportForm reportState={reportState}
							onCheckForEMail={::this.onCheckForEMail}
							onSubmitForm={::this.onSubmitForm} />
			</div>
		);
	}

}

function mapStateToProps(state, ownProps) {
	const reportState = selectors.getReport(state);
	const token = getSection(state).get('token');

	return {reportState, token};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			salesReportAction: actions.salesReport.request,
			onCheckForEMail: actions.onCheckForEMail
		}, dispatch)
	};
}


export default ReportsContainer;