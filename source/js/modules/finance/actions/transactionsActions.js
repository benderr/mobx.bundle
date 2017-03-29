import enums from '../enums/enums'

var transactionsActions = {
	updateTransactionsList: ()=> {
		return {
			type: enums.TRANSACTIONS.UPDATE_TRANSACTIONS_LIST
		};
	}
};

export default transactionsActions;