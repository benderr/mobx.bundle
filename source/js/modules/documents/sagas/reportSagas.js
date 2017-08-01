import {call, put, select, takeEvery} from 'redux-saga/effects'
import {getCurrentRetailPointId} from 'modules/retailPoints/selectors/retailPointSelectors'
import moment from 'moment'

import * as dataContext from '../dataProvider/dataContext'
import * as enums from '../actions/reportActions'


function* salesReportSaga({beginDate, endDate, fromEmail}) {
	try {
		beginDate = moment(beginDate, "DD.MM.YYYY").format('YYYY-MM-DD');
		endDate = moment(endDate, "DD.MM.YYYY").format('YYYY-MM-DD');

		const token = yield select(getCurrentRetailPointId);

		const downloadLink = document.createElement("a");
		downloadLink.href = `/api/v1/retail-point/${token}/downloadSalesReport?beginDate=${beginDate}&endDate=${endDate}`;
		//downloadLink.download = "report.xls";
		downloadLink.target = "_blank";
		document.body.appendChild(downloadLink);
		downloadLink.click();
		// document.body.removeChild(downloadLink);

		console.log(downloadLink);

		const data = yield call(dataContext.getDownloadSalesReport, token, beginDate, endDate);
		console.log('result saga', data);
	} catch (error) {
		console.log(error);
	}
}

export default function* () {
	yield [
		takeEvery(enums.SALES_REPORT.REQUEST, salesReportSaga)
	]
}