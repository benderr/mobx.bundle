import {createSelector} from 'reselect'

const getVisibilityFilter = (state, props) => {
	return state.transactions.getIn(['transactionList', props.listId, 'filter']);
}

const getTransactions = (state, props) =>
	state.transactions.getIn(['transactionList', props.listId, 'list'])

export const getVisibleTransactions = createSelector(
	[getVisibilityFilter, getTransactions],
	(visibilityFilter, transactions) => {
		switch (visibilityFilter) {
			case 'SHOW_COMPLETED':
				return transactions.filter(todo => todo.completed);
			case 'SHOW_ACTIVE':
				return transactions.filter(todo => !todo.completed);
			case 'SHOW_ALL':
			default:
				return transactions
		}
	}
)