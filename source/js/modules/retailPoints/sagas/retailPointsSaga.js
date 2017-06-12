import {call, put, select, fork, take, takeEvery} from 'redux-saga/effects'
import {uuid} from 'infrastructure/utils/uuidGenerator'
import * as retailPointSelectors from '../selectors/retailPointSelectors'
import * as dataContext  from '../dataProvider/retialPointsDataContext'
import {addRetailPoint, getRetailPoints, setRetailPoint, getRetailPoint} from '../actions/retailPointActions'
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
		if (points.size > 0) {
			let pointId = localStorage.getItem(currencyRetailPointKey);
			//сначала смотрим тот который localStorage
			if (pointId && points.some(s => s.get('id') == pointId)) {
				yield put(setRetailPoint(pointId))
			}
			else {
				yield put(setRetailPoint(points.get(0).get('id')))
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
		yield put(getRetailPoints.success(data));

	} catch (error) {
		yield put(getRetailPoints.failure(error));
	}
}

function* addRetailPointProcess(payload) {
	try {
		let point = payload.point;
		point.id = uuid();
		const newPoint = yield call(dataContext.addRetailPoint, point);
		yield put(addRetailPoint.success(newPoint));
	}
	catch (error) {
		yield put(addRetailPoint.failure(error));
	}

}

function* getRetailPointProcess(id) {
	try{
		const point = yield call(dataContext.getRetailPoint, id);
		yield put(getRetailPoint.success(point));
	}
	catch (error){
		yield put(getRetailPoint.failure(error));
	}
}

export default function*() {
	yield [
		//takeEvery(retailPointsActions.GET_RETAIL_POINTS.REQUEST, runRetailPoints)
		takeEvery(actions.ADD_RETAIL_POINT.REQUEST, addRetailPointProcess),
		takeEvery(actions.GET_RETAIL_POINT.REQUEST, getRetailPointProcess)
	]
}