import enums from '../enums/enums'

// Test action

export function getList() {
	return {
		type: enums.TRANSACTIONS.GET_LIST,
	};
}

export function setFilter(listId, filterState) {
	return {
		type: enums.TRANSACTIONS.SET_FILTER,
		listId,
		filterState
	};
}