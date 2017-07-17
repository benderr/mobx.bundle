/**
 * Created by RobertSabiryanov on 14.07.17.
 */

import * as dataContext from 'modules/products/dataProvider/productDataContext';

jest.mock('infrastructure/api/api', () => {

	let getMock = jest.fn().mockImplementation(() => {
		return new Promise((resolve, reject) => {
			resolve({data: {data: []}});
		})
	});
	return {
		v1: () => {
			return {
				retailpoint: () => {
					return {
						catalog: () => {
							return {
								inventory: () => {
									return {
										get: getMock
									}
								}
							}
						}
					}
				}
			}
		}
	}
});

describe('productDataContext tests', () => {
	test('getProducts with filter', () => {
		const api = require('infrastructure/api/api');
		let mockFunc = api.v1().retailpoint().catalog().inventory().get;

		let retailPointId = 1;
		let start = 0;
		let count = 50;
		let filter = 'name';
		return dataContext.getProducts(retailPointId, start, count, filter).then((actualResult) => {
			expect(actualResult).toBeTruthy();
			expect(mockFunc).toBeCalled();
			expect(mockFunc).toBeCalledWith({start:start, count:count, q:':quickSearch="name"'});
		})
	})
});