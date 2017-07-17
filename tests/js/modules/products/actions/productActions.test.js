/**
 * Created by RobertSabiryanov on 12.07.17.
 */
import * as productActions from 'modules/products/actions/productActions';
import * as actions from 'modules/products/enums/actions'

describe('productActions',()=>{
	test('saveModifier', () => {
		let action =productActions.saveModifier({inventCode:1,groupId: 2,modifier: 3});
		expect(action.type).toBe(actions.SAVE_MODIFIER);
		expect(action.inventCode).toBe(1);
		expect(action.groupId).toBe(2);
		expect(action.modifier).toBe(3);
	});
});