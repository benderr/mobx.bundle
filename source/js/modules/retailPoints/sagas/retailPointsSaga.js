import {call, put, select, fork, take, takeEvery, all} from 'redux-saga/effects'
import {push} from 'connected-react-router';
import {uuid} from 'infrastructure/utils/uuidGenerator'
import * as retailPointSelectors from '../selectors/retailPointSelectors'
import * as dataContext  from '../dataProvider/retialPointsDataContext'
import {
	addRetailPoint,
	getRetailPoints,
	setRetailPoint,
	getRetailPoint,
	editRetailPoint,
	deleteRetailPoint
} from '../actions/retailPointActions'
import localStorage from 'core/storage/localStorage'
const currencyRetailPointKey = 'currencyRetailPointKey';
import * as actions from '../enums/actions'
import productSources from '../enums/productSourcesEnum'
import * as coreActions from 'modules/core/actions'
import {isServerError} from 'infrastructure/helpers/errorHelper'
/**
 * Получение и установка торговых точек
 */
export function* runRetailPoints() {
	yield fork(fetchRetailPoints);
	yield take(actions.GET_RETAIL_POINTS.SUCCESS);
	yield call(setSelectedPoint);
	yield put(coreActions.pointReady());
}

/**
 * Установка выбранной ТТ
 */
function* setSelectedPoint() {
	const selectedPoint = yield select(retailPointSelectors.getCurrentRetailPointId);
	const points = yield select(retailPointSelectors.getRetailPointList);

	if (!selectedPoint || !points.some(s => s.get('id') == selectedPoint)) {
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

function* selectNewPoint({id}) {
	const points = yield select(retailPointSelectors.getRetailPointList);
	const point = points.find(s => s.get('id') == id);
	if (point) {
		localStorage.setItem(currencyRetailPointKey, id);
	} else {
		localStorage.setItem(currencyRetailPointKey, null);
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
		const newPoint = yield call(dataContext.addRetailPoint, point);
		yield put(addRetailPoint.success(newPoint));

		const points = yield select(retailPointSelectors.getRetailPointList);
		if (!points || points.size == 0)
			runRetailPoints();
		if (points.size == 1) {
			yield put(setRetailPoint(point.id))
		}
	}
	catch (error) {
		yield put(addRetailPoint.failure(error));
	}

}

function* editRetailPointProcess(payload) {
	try {
		let point = payload.point;
		const newPoint = yield call(dataContext.editRetailPoint, point);
		yield put(editRetailPoint.success(newPoint));
	}
	catch (error) {
		yield put(editRetailPoint.failure(error));
	}

}


function* getRetailPointProcess(id) {
	try {
		const point = yield call(dataContext.getRetailPoint, id);
		yield put(getRetailPoint.success(point));
	}
	catch (error) {
		yield put(getRetailPoint.failure(error));
		if (!isServerError(error))
			throw error;
	}
}

function* setEmptyRetailPointProcess({id, isFirstPoint}) {
	const retailPoint = {
		id: id,
		name: null,
		address: null,
		phone: null,
		inn: null,
		kpp: null,
		mock: {
			enabled: false,
		},
		isFirstPoint: isFirstPoint,
		productsSource: productSources.BLANK,
		isNew: true
	};
	yield put(getRetailPoint.success(retailPoint));
}

function* createRetailPointProcess() {
	const id = uuid();
	yield put(push({pathname: `/retail-points/add/${id}`}));
}

function* deleteRetailPointProcess({id}) {
	try {
		const res = yield call(dataContext.deleteRetailPoint, {id});

		const selectedPoint = yield select(retailPointSelectors.getCurrentRetailPointId);
		const points = yield select(retailPointSelectors.getRetailPointList);

		//переключаем
		if (selectedPoint == id) {
			const otherPoint = points.filter(s => s.get('id') != id).first();
			if (otherPoint) {
				yield put(setRetailPoint(otherPoint.get('id')))
			} else {
				yield put(setRetailPoint(null))
			}
		}

		yield put(deleteRetailPoint.success(res));

	}
	catch (error) {
		yield put(deleteRetailPoint.failure(error));
	}

}

export default function*() {
	yield all([
		//takeEvery(retailPointsActions.GET_RETAIL_POINTS.REQUEST, runRetailPoints)
		takeEvery(actions.ADD_RETAIL_POINT.REQUEST, addRetailPointProcess),
		takeEvery(actions.GET_RETAIL_POINT.REQUEST, getRetailPointProcess),
		takeEvery(actions.SET_EMPTY_RETAIL_POINT_IN_LAYER, setEmptyRetailPointProcess),
		takeEvery(actions.CREATE_RETAIL_POINT, createRetailPointProcess),
		takeEvery(actions.EDIT_RETAIL_POINT.REQUEST, editRetailPointProcess),
		takeEvery(actions.DELETE_RETAIL_POINT.REQUEST, deleteRetailPointProcess),
		takeEvery(actions.SET_RETAIL_POINT, selectNewPoint),
	])
}