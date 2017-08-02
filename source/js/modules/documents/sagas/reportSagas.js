import {call, put, select, takeEvery} from 'redux-saga/effects'
import {getPointId} from 'modules/core/selectors'
import * as actions from '../actions/reportActions'
import * as dataContext from '../dataProvider/dataContext'
import * as enums from '../actions/reportActions'
import dateHelper from 'common/helpers/dateHelper'
import {notify} from 'common/uiElements'
import {reset} from 'redux-form/immutable'

function* salesReportSaga({beginDate, endDate, email}) {
	try {
		const point = yield select(getPointId);
		const beginDateStr = dateHelper.dateFormat(beginDate, "serverDateTime");
		const endDateStr = dateHelper.dateFormat(dateHelper.setEndDate(endDate), 'serverDateTime');
		const data = yield call(dataContext.salesReport, point, beginDateStr, endDateStr, email);
		yield put(actions.salesReport.success(data));
		yield put(notify.success('Отчет отправлен по адресу ' + email));
		yield put(actions.resetForm());
		yield put(reset('report_form'));
	} catch (error) {
		yield put(notify.error('Не удалось отправить отчет', 'Ошибка'));
		yield put(actions.salesReport.failure({error: error && error.data ? error.data : error}));
	}
}

export default function*() {
	yield [
		takeEvery(enums.SALES_REPORT.REQUEST, salesReportSaga)
	]
}