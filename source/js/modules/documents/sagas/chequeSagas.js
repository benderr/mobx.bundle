import {call, put, select, take, fork, takeEvery} from 'redux-saga/effects'

import * as enums from '../enums/chequeActions'
import * as chequeActions from '../actions/chequeActions'


function* getChequeSaga() {
	try {

	} catch (error) {

	}
}


export default function*() {
	yield [
		takeEvery(enums.GET_CHEQUE.REQUEST, getChequeSaga)
	]
}