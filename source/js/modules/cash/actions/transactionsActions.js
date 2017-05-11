import enums from '../enums/enums'

var transactionsActions = {
	getTransactionsByThunk: ()=> {
		return {
			type: enums.TRANSACTIONS.GET_TRANSACTION_BY_THUNK
		};
	},
	getTransactionsBySaga: ()=> {
		return {
			type: enums.TRANSACTIONS.GET_TRANSACTION_BY_SAGA
		};
	},
	updateTransactionsList: (data)=>{
		return {
			type: enums.TRANSACTIONS.UPDATE_TRANSACTIONS_LIST,
			payload: {
				transactionsList: data
			}
		};
	},
	repeatTransaction: (id)=>{
		return {
			type: enums.TRANSACTIONS.REPEAT,
			id: id
		};
	}
};

export default transactionsActions;