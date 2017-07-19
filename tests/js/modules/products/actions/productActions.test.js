/**
 * Created by RobertSabiryanov on 12.07.17.
 */
import * as productActions from 'modules/products/actions/productActions';
import * as actions from 'modules/products/enums/actions'
//import productActionsMock from '../../../../../source/js/modules/products/actions/__mocks__/productActions'

jest.mock('modules/products/actions/productActions');

describe('productActions',()=>{
	test('saveModifier', () => {
		//Arrange
		let object = {inventCode:1,groupId: 2,modifier: 3};

		//Act
		let action =productActions.saveModifier(object);

		//Assert
		expect(action.type).toBe(actions.SAVE_MODIFIER);
		// expect(action.inventCode).toBe(1);
		// expect(action.groupId).toBe(2);
		// expect(action.modifier).toBe(3);
	});
});