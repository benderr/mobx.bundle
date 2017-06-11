import {Map, fromJS} from 'immutable';
import * as actions from '../enums/actions';

export const initialState = Map({
	loading: false,
	regError: null,
	regData: null
});

export const actionHandlers = {

	[actions.REGISTER.REQUEST]: (state) => {
		return state.merge({
			loading: true,
			regError: null,
			regData: null
		});
	},

	[actions.REGISTER.SUCCESS]: (state, action) => {
		return state.merge({
			loading: false,
			regError: null,
			regData: true
		});
	},

	[actions.REGISTER.FAILURE]: (state, action) => {
		return state.merge({
			loading: false,
			regError: fromJS(action.error),
			regData: false
		});
	}
};

export default (createReducer) => createReducer(initialState, actionHandlers);
