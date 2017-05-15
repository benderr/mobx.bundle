import * as accountSelectors from '../selectors/accountSelectors'
import {call, put, select} from 'redux-saga/effects'
import * as dataContext  from '../dataProvider/accountDataContext'
import {getRetailPoints, setRetailPoint} from '../actions/retailPointActions'

/**
 * Получение и установка торговых точек
 */
export function* setRetailPoints() {
	const retailPointsData = yield select(accountSelectors.getRetailPointsData);
	if (retailPointsData.get('selectedPoint') == null) {
		try {
			yield put(getRetailPoints.request());
			const data = yield call(dataContext.getRetailPoints);
			console.log(data);
			yield put(getRetailPoints.success(data));
			if (data.length > 0)
				yield put(setRetailPoint(data[0]))

		} catch (error) {
			yield put(getRetailPoints.failure(error));
		}
	}
}