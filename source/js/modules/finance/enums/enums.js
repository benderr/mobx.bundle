const basePath = '/';

export default {
	TRANSACTIONS: {
		GET_TRANSACTION_BY_SAGA: 'TRANSACTIONS.GET_TRANSACTION_BY_SAGA', //Получить список через Saga
		GET_TRANSACTION_BY_THUNK: 'TRANSACTIONS.GET_TRANSACTION_BY_THUNK', //Получить список через Thunk
		UPDATE_TRANSACTIONS_LIST: 'TRANSACTIONS.UPDATE_TRANSACTIONS_LIST', //Обновить список транзакций
		REPEAT: 'TRANSACTIONS.REPEAT' //Повтор транзакции
	}
};

export const ROUTES = {
	FINANCE: `${ basePath }finance`,
	HOME: basePath
};