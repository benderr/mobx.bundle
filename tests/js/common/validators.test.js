import * as valid from 'common/validators'


describe('commonValidators', () => {

	test('validEmail', () => {
		expect(valid.validEmail('zaqwsxcderfvbgtyhn@mjuik.asd')).toBe(true);
		expect(valid.validEmail('яфйцычсвукам@mjuik.asd')).toBe(false);
		expect(valid.validEmail('asdasdsa@sdasd.as')).toBe(true);
		expect(valid.validEmail('asdasdsa@@sdasd.as')).toBe(false);
		expect(valid.validEmail('asdasdsa@sdasd')).toBe(false);
		expect(valid.validEmail('as#$dasdsa@sdasd')).toBe(false);
	});

	test('onlyCyr', () => {
		expect(valid.onlyCyr('вфыврфыловпОЛРОЛПНАПОЛ')).toBe(true);
		expect(valid.onlyCyr('вфыврфыловпОЛРОЛПНАПОЛjsdkjashd')).toBe(false);
		expect(valid.onlyCyr('йцуйцу"3123.:;.фывфыв')).toBe(false);
	});

	test('firstSymbolCyr', () => {
		expect(valid.firstSymbolCyr('Фвфывфыв')).toBe(true);
		expect(valid.firstSymbolCyr('wвфыЫВ')).toBe(false);
		expect(valid.firstSymbolCyr('qцуйцу"3123.:;.фывфыв')).toBe(false);
	});

	test('validPassword', () => {
		expect(valid.validPassword('Qq111111')).toBe(true);
		expect(valid.validPassword('ZAQWSvfetgbnhyujmUIK<>LOP:"{}|!@#$%^&*()_+')).toBe(true);
		expect(valid.validPassword('ЯФЙЦЫЧСВУКАМЕПИНРТГОЬШЛБЩДЮЗЖ<>LOP:"{}|!@#$%^&*()_+')).toBe(false);
		expect(valid.validPassword('ыфывфывфы123123ФЫВФЫsdfsdf')).toBe(false);
		expect(valid.validPassword('ЯФЙЦЫЧСВУКАМЕПИНРТГОЬШЛБЩДЮЗЖ')).toBe(false);
	});

	test('validPasswordLength', () => {
		expect(valid.validPasswordLength('asdasdasdasdasd')).toBe(true);
		expect(valid.validPasswordLength('Qq123456')).toBe(true);
		expect(valid.validPasswordLength('qweqwe')).toBe(false);
		expect(valid.validPasswordLength('qwe1232')).toBe(false);
		expect(valid.validPasswordLength('Qa@#123')).toBe(false);
	});

	test('isEmpty', () => {
		expect(valid.isEmpty('')).toBe(true);
		expect(valid.isEmpty(null)).toBe(true);
		expect(valid.isEmpty(undefined)).toBe(true);
		expect(valid.isEmpty({})).toBe(false);
		expect(valid.isEmpty([])).toBe(false);
		expect(valid.isEmpty('Qa@#123')).toBe(false);
	});

	test('isRequired', () => {
		expect(valid.isRequired('123')('')).toBe('123');
		expect(valid.isRequired('123')(null)).toBe('123');
		expect(valid.isRequired('123')(false)).toBe(undefined);
	});

});