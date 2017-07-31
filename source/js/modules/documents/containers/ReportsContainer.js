import React from 'react'
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toJS from 'components/HOC/toJs';
import retailPointHOC from 'components/HOC/retailPointRequiredHOC';
import TitlePanel from '../components/TitlePanel'
import ReportForm from '../components/ReportFormComponent'

import * as selectors from '../selectors/reportSelectors'
import * as actions from '../actions/reportActions'


@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@retailPointHOC
@toJS
class ReportsContainer extends React.Component {

	onSubmitForm(props) {
		const {salesReportAction} = this.props;

		console.log(props.toJS());

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
	return {reportState};
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