import api from '../bl/api';
import enums from '../enums/enums'

// Test action

export function testAction() {
	return {
		type: enums.ACTIONS.TEST_ACTION,
	};
}

export function testSetter() {
	return {
		type: enums.ACTIONS.TEST_ACTION2,
	};
}

// Async action example

function testAsyncStart() {
	return {
		type: enums.ACTIONS.TEST_ASYNC_ACTION_START,
	};
}

function testAsyncSuccess(data) {
	return {
		type: enums.ACTIONS.TEST_ASYNC_ACTION_SUCCESS,
		data,
	};
}

function testAsyncError(error) {
	return {
		type: enums.ACTIONS.TEST_ASYNC_ACTION_ERROR,
		error,
	};
}

export function testAsync() {
	return function (dispatch) {
		dispatch(testAsyncStart());

		api.testAsync()
			.then(data => dispatch(testAsyncSuccess(data)))
			.catch(error => dispatch(testAsyncError(error)));
	};
}

// Update
