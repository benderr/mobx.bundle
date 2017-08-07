import {call, put, takeEvery, select, throttle} from 'redux-saga/effects'
import {getCurrentRetailPointId} from 'modules/retailPoints/selectors/retailPointSelectors'
import {notify} from 'common/uiElements/Notify'

import * as actEnums from '../actions/discountActions'
import {getListPropsState} from '../selectors/discountSelectors'
import * as dataContext from '../dataProvider/discountDataContext'


function* getListDiscountSaga({isFirst = false, step = false}) {
	try {
		const token = yield select(getCurrentRetailPointId);
		const propState = yield select(getListPropsState);

		const response = yield call(dataContext.getListDiscount, {
			token,
			sortField: propState.sortField,
			sortDirection: propState.sortDirection,
			count: propState.countStep,
			q: propState.q ? `name=="*${propState.q}*"` : '',
			pos: step ? propState.pos + propState.countStep : 0
		});
		yield put(actEnums.getListDiscount.success({
			list: response.data,
			pos: response.pos,
			total_count: response.total_count,
			noItems: isFirst ? !(response.data.length) : propState.noItems
		}))
	} catch (error) {
		notify.error('При загрузке скидок произошла ошибка');
		yield put(actEnums.getListDiscount.failure(error));
	}
}

function* editDiscountSaga({code, ...discount}) {
	try {
		const token = yield select(getCurrentRetailPointId);

		yield call(dataContext.editDiscount, {
			token,
			code,
			isNew: code === 'newItem',
			name: discount.name,
			password: discount.password,
			locked: discount.locked,
			roles: discount.roles
		});
		yield put(actEnums.getListDiscount.request({isFirst: true}));
		yield put(actEnums.editDiscount.success({code}));

		notify.success('Скидка успешно сохранена');
	} catch (error) {
		notify.error('При сохранении скидки произошла ошибка');
		yield put(actEnums.editDiscount.failure(code));
	}
}

function* deleteDiscountSaga({code}) {
	try {
		const token = yield select(getCurrentRetailPointId);

		yield call(dataContext.deleteDiscount, {
			token,
			code
		});
		yield put(actEnums.getListDiscount.request({isFirst: true}));
		yield put(actEnums.editDiscount.success({code}));

		notify.info('Скидка успешно удалена');
	} catch (error) {
		notify.error('При удалении скидки произошла ошибка');
		yield put(actEnums.editDiscount.failure(code));
	}
}

function* getByCodeDiscountSaga({code}) {
	try {
		const token = yield select(getCurrentRetailPointId);

		const {data} = yield call(dataContext.getListDiscount, {
			token,
			q: `code=="${code}"`
		});

		if (data.length && data[0]) {
			yield put(actEnums.openDiscount(data[0]))
		} else throw new Error();
	} catch (error) {
		notify.error('При загрузке скидки произошла ошибка');
	}
}


export default function* () {
	yield [
		throttle(300, actEnums.GET_LIST.REQUEST, getListDiscountSaga),
		takeEvery(actEnums.EDIT_DISCOUNT.REQUEST, editDiscountSaga),
		takeEvery(actEnums.DELETE_DISCOUNT, deleteDiscountSaga),
		takeEvery(actEnums.LOAD_DETAIL, getByCodeDiscountSaga)
	]
}