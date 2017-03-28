import {Map} from 'immutable';
import enums from '../enums/enums'

export const initialState = Map({
	transactionList: Map({
		listHome: Map({
			list: [
				{
					id: 1,
					name: 'Test',
					date: new Date(),
					amount: 12,
					status: 'Incompleted',
					completed: false
				},
				{
					id: 2,
					name: 'Test 2',
					date: new Date(),
					amount: 100,
					status: 'Completed',
					completed: true
				}],
			filter: 'SHOW_ALL'
		}),
		listSecond: Map({
			list: [
				{
					id: 1,
					name: 'Test 3',
					date: new Date(),
					amount: 12,
					status: 'Incompleted',
					completed: false
				},
				{
					id: 2,
					name: 'Test 4',
					date: new Date(),
					amount: 100,
					status: 'Completed',
					completed: true
				}],
			filter: 'SHOW_ALL'
		})
	})
});

export const actionHandlers = {
	[enums.TRANSACTIONS.GET_LIST]: (state) => {
		return state;
	},
	[enums.TRANSACTIONS.SET_FILTER]: (state, action) => {
		return state.setIn(['transactionList', action.listId, 'filter'], action.filterState);
	},
	[enums.TRANSACTIONS.SET_COMPLETED]: (state, action) => {
		return state.setIn(['transactionList', action.payload.listId, 'test'], new Date().getTime());
	}
};

