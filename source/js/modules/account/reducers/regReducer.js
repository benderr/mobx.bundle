import {Map, fromJS} from 'immutable';
// import {LOGIN, LOGOUT, CHECKING_ACCESS_STOP, CHECKING_ACCESS_START} from '../enums/actions';

export const initialState = Map({
	loading: false,
	regError: null,
	regData: null
});

export const actionHandlers = {

	// [LOGIN.REQUEST]: (state) => {
	// 	return state.merge({
	// 		loading: true,
	// 		authError: null,
	// 		authData: null
	// 	});
	// },
    //
	// [LOGIN.SUCCESS]: (state, action) => {
	// 	return state.merge({
	// 		loading: false,
	// 		authError: null,
	// 		authData: fromJS(action.response)
	// 	});
	// },
    //
	// [LOGIN.FAILURE]: (state, action) => {
	// 	return state.merge({
	// 		loading: false,
	// 		authError: fromJS(action.error),
	// 		authData: null
	// 	});
	// }
};

export default (createReducer) => createReducer(initialState, actionHandlers);
