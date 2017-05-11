import {Map, List} from 'immutable';
import enums from '../enums/enums'

export const initialState = Map({
	transactionsList: List([
		{
			id: "1",
			name: "ООО Башнефть",
			amount: 450000,
			paymentPurpose: "Доход от продажи акций Роснефти",
			status: "Оплачен"
		}]
	)
});


export const actionHandlers = {
	[enums.TRANSACTIONS.UPDATE_TRANSACTIONS_LIST]: (state, action) => {
		return state.set('transactionsList', action.payload.transactionsList);
	},
	[enums.TRANSACTIONS.SHOW_LOADER_ON_CURRENT]: (state, action) => {
		return state.transactionsList.set('loader', true);
	}
};
export default (createReducer) => createReducer(initialState, actionHandlers);
