import {Map} from 'immutable';
import enums from '../enums/enums'

export const initialState = Map({
	counter: 0,
	asyncLoading: false,
	asyncError: null,
	asyncData: null,
});


export const actionHandlers = {
	[enums.ACTIONS.TEST_ACTION]: (state) => {

		const counter = state.get('counter') + 1;

		return state.merge({
			counter,
		});
	},

	// Async action
	[enums.ACTIONS.TEST_ASYNC_ACTION_START]: (state) => {
		return state.merge({
			asyncLoading: true,
			asyncError: null,
		});
	},
	[enums.ACTIONS.TEST_ASYNC_ACTION_ERROR]: (state, action) => {
		return state.merge({
			asyncLoading: false,
			asyncError: action.data,
		});
	},
	[enums.ACTIONS.TEST_ASYNC_ACTION_SUCCESS]: (state, action) => {
		return state.merge({
			asyncLoading: false,
			asyncData: action.data,
		});
	},
};

export default (createReducer) => createReducer(initialState, actionHandlers);
