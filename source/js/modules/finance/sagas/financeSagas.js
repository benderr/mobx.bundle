import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import dataContext from './../bl/financeDataContext.js'
import enums from './../enums/enums.js'

// worker Saga: будет запускаться на экшены типа `USER_FETCH_REQUESTED`
function* getTransactions(action) {
	console.log("SAGA!");
	try {
		const data = yield call(dataContext.getTransactionsList, {/*какие нибудь параметры*/});
		yield put({type: enums.TRANSACTIONS.UPDATE_TRANSACTIONS_LIST,
			payload: {
				transactionsList: data
			}
		});
	} catch (e) {
		//yield put({type: "USER_FETCH_FAILED", message: e.message});
	}
}

function* mySaga() {
	yield takeEvery(enums.TRANSACTIONS.GET_TRANSACTION_BY_SAGA, getTransactions);
}

export {mySaga};