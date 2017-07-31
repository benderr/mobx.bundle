import {Map, fromJS} from 'immutable'
import * as enums from '../actions/reportActions'


export const initialState = Map({

	beginDate: {},
	endDate: {},
	fromEmail: '',

	isFromEmail: false
});
export const actionHandlers = {
	[enums.SALES_REPORT.REQUEST]: (state, props) => {
		console.log(enums.SALES_REPORT.REQUEST, props);
		
		return state.merge({
			beginDate: props.beginDate,
			endDate: props.endDate,
			fromEmail: props.fromEmail
		});
	},

	[enums.CHECK_EMAIL]: (state, {val}) => {
		return state.updateIn(['isFromEmail'], v => val);
	}
};


export default (createReducer) => createReducer(initialState, actionHandlers);