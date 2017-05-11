var financeMapper = {
	transactions: {
		toClient: (transactions)=>{
			return [{
				id: 1,
				name: "ООО Ромашка",
				amount: 1455,
				currency: "RUR"
			}];
		}
	}
};

export default financeMapper;