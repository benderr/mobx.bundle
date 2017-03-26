import { createReducer } from 'redux-immutablejs'

export default function getReducers(modules) {
	return modules
		.filter((m) => isFunc(m.getReducers))
		.reduce((reducers, module) => {
			let r = module.getReducers(createReducer);
			return {...reducers, ...r}
		}, {});
}

function isFunc(f) {
	return typeof f === 'function';
}

function defaultHandler(state, action) {
	return state;
}

function _createReducer(initialState, actionHandlers) {
	return function reducer(state = initialState, action) {
		const handler = actionHandlers[action.type] || actionHandlers['default'] || defaultHandler;
		return handler(state, action);
	}
}

