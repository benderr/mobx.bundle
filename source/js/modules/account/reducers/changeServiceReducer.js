import {Map, fromJS} from 'immutable';
import * as actions from '../enums/actions';

export const initialState = Map({
	loading: false,
	error: null,
	success: null,
	actionFrom: false,
	stateIntegration: false,
	loginVal: '',
	passwordVal: ''
});

export const actionHandlers = {



};

export default (createReducer) => createReducer(initialState, actionHandlers);
