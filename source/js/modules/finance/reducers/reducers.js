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
		},
		{
			id: "2",
			name: "ЗАО Сода",
			amount: 480000,
			paymentPurpose: "Доход от продажи акций Microsoft",
			status: "Оплачен"
		},
		{
			id: "3",
			name: "ООО Роснефть",
			amount: 78000,
			paymentPurpose: "Доход от продажи акций Башнефти",
			status: "Оплачен"
		}])
});


export const actionHandlers = {
	[enums.TRANSACTIONS.ADD_TRANSACTION]: (state, action) => {
		let list = state.get('transactionsList');
		return state.set('transactionsList', list.push(action.payload.arr[0]));
	},
	[enums.TRANSACTIONS.UPDATE_LIST]: (state) => {

	}
};
export default (createReducer) => createReducer(initialState, actionHandlers);
