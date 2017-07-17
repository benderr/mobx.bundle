/**
 * Created by RobertSabiryanov on 13.07.17.
 */

import {call, put, takeLatest, takeEvery, select} from 'redux-saga/effects';
import * as actions from 'modules/products/enums/actions';
import {saveProductDetailsProcess} from 'modules/products/sagas/productDetailsSaga';
import * as dataContext from 'modules/products/dataProvider/productDataContext';
import * as productActions from 'modules/products/actions/productActions';
import {notify} from 'common/uiElements/Notify/actions';

//jest.mock('common/uiElements/Notify/actions');

describe('productDetailsSaga',()=>{
	test('saveProductDetailsProcess product isNew',()=>{
		let product={
			isNew: true
		};
		let point = {};
		const generator = saveProductDetailsProcess({product, point});
		let next = generator.next();
		expect(next.value).toEqual(call(dataContext.addProduct, point, product));
		let updatedProduct={};
		next = generator.next(updatedProduct);
		expect(next.value).toEqual(put(productActions.saveProductDetails.success({product: updatedProduct})));
		next = generator.next();
		//expect(next.value).toEqual(put(notify.success('Данные успешно сохранены')));
		next = generator.next(updatedProduct);
		expect(next.value).toEqual(put(productActions.addProductToList({product: updatedProduct})));

	})

	//https://github.com/jfairbank/redux-saga-test-plan/
});