import financeMapper from "./financeMapper.js";

var dataContext = {

	getTransactionsList: ()=>{
		return $.ajax({
			method: "GET",
			url: "/api/transactions",
			dataType: "json"
		})
			.then((result)=>{
				return financeMapper.transactions.toClient(result);
			});
	}

};

export default dataContext;