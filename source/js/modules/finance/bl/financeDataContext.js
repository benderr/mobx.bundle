import financeMapper from "./financeMapper.js";
import q from 'q';

var dataContext = {

	getTransactionsListByThunk: ()=> {
		var deferr = q.defer();

		setTimeout(()=>{
			deferr.resolve([
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
				}]);
		}, 700);

		return deferr.promise;
	}

};

export default dataContext;