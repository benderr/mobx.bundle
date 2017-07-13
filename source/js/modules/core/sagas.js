import {call, put, take, fork, takeEvery, cancel, cancelled, select} from 'redux-saga/effects'
import {getCurrentLocation} from './selectors'
import {LOCATION_CHANGE, POINT_READY} from './actionEnums'
import logger from 'infrastructure/utils/logger'

export function* subscribeToUrl(url, initFunction) {
	let task;
	yield take(POINT_READY);
	const location = yield  select(getCurrentLocation);
	const isCurrentLocation = yield call(inLocation, location.toJS());
	if (isCurrentLocation)
		task = yield fork(initFunction);

	while (true) {
		logger.log('Listen url');
		const {payload}=yield take(LOCATION_CHANGE);
		if (payload) {
			const isCurrent = yield call(inLocation, payload.location);
			if (isCurrent) {
				if (task) yield cancel(task);
				task = yield fork(initFunction);
			} else {
				if (task) yield cancel(task);
			}
		}
	}

	function inLocation(location) {
		logger.log('Check location', location);
		const path = location ? location.pathname || '' : '';
		return path.indexOf(url) >= 0;
	}
}