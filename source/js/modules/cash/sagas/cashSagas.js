import {call, put, take, fork, takeEvery} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import dataContext from './../bl/cashDataContext.js'
import enums from './../enums/enums.js'

function* getTransactions(action) {
	try {
		const data = yield call(dataContext.getTransactionsList, {/*какие нибудь параметры*/});
		yield put({
			type: enums.TRANSACTIONS.UPDATE_TRANSACTIONS_LIST,
			payload: {
				transactionsList: data
			}
		});
	} catch (e) {
		console.log("get Transaction Error");
	}
}

function* repeatTransaction(action) {
	try {
		//Запуск лоадера
		yield put({type: enums.TRANSACTIONS.SHOW_LOADER_ON_CURRENT, id: action.id})
		yield delay(2000);
		yield put({type: "asd"})

	} catch (e) {

	}
}

function* watchTransactionRequest() {
	yield takeEvery(enums.TRANSACTIONS.GET_TRANSACTION_BY_SAGA, getTransactions);
}

export function* watchRepeatTransaction() {
	yield takeEvery(enums.TRANSACTIONS.REPEAT, repeatTransaction)
}

export default function*() {
	yield [
		fork(watchTransactionRequest),
		fork(watchRepeatTransaction)
	]
}