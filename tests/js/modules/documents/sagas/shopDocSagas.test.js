import {getListMoneySaga, getValidQueryParams} from 'modules/documents/sagas/moneySagas'

// npm run test tests/js/modules/documents
describe('moneySaga', () => {
	test('getValidQueryParams {dateFrom, dateTo, docType, q}', () => {

		const dF = new Date();
		dF.setFullYear(1989);
		dF.setDate(1);
		dF.setMonth(10);

		const dT = new Date();
		dT.setFullYear(2017);
		dT.setDate(29);
		dT.setMonth(7);

		let valueTest;

		valueTest = getValidQueryParams({
			dateFrom: dF,
			dateTo: dT,
			docType: 'CASH_OUT',
			q: 'magic'
		}).next().value;
		expect(valueTest).toEqual(`docNum==magic;dateCreated=ge="1989-11-01T00:00:00Z";dateCreated=le="2017-08-29T23:59:59Z";type=="CASH_OUT"`);

		valueTest = getValidQueryParams({
			dateFrom: dF,
			dateTo: dT
		}).next().value;
		expect(valueTest).toEqual(`dateCreated=ge="1989-11-01T00:00:00Z";dateCreated=le="2017-08-29T23:59:59Z"`);

		valueTest = getValidQueryParams({
			dateFrom: dF
		}).next().value;
		expect(valueTest).toEqual(`dateCreated=ge="1989-11-01T00:00:00Z"`);

		valueTest = getValidQueryParams({
			dateTo: dT
		}).next().value;
		expect(valueTest).toEqual(`dateCreated=le="2017-08-29T23:59:59Z"`);

	});
});