import * as retailPointSelectors from '../selectors/retailPointSelectors'
import {call, put, select, fork, take} from 'redux-saga/effects'
import * as dataContext  from '../dataProvider/accountDataContext'
import {getRetailPoints, setRetailPoint} from '../actions/retailPointActions'
import localStorage from 'core/storage/localStorage'
const currencyRetailPointKey = 'currencyRetailPointKey';
import * as actions from '../enums/actions'

/**
 * Получение и установка торговых точек
 */
export function* runRetailPoints() {
	yield fork(fetchRetailPoints);
	yield take(actions.GET_RETAIL_POINTS.SUCCESS);
	yield call(setSelectedPoint);
}

/**
 * Установка выбранной ТТ
 */
function* setSelectedPoint() {
	const selectedPoint = yield select(retailPointSelectors.getCurrentRetailPointId);

	if (!selectedPoint) {
		const points = yield select(retailPointSelectors.getRetailPointList);
		if (points.length) {
			let pointId = localStorage.getItem(currencyRetailPointKey);
			//сначала смотрим тот который localStorage
			if (pointId && points.some(s => s.id == pointId)) {
				yield put(setRetailPoint(pointId))
			}
			else {
				yield put(setRetailPoint(points[0].id))
			}
		}
	}
}

/**
 * Получение списка ТТ
 */
function* fetchRetailPoints() {
	try {
		yield put(getRetailPoints.request());
		const data = yield call(dataContext.getRetailPoints);
		console.log(data);
		yield put(getRetailPoints.success(data));

	} catch (error) {
		yield put(getRetailPoints.failure(error));
	}
}