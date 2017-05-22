import * as AccountModule1 from './account/accountModule'
import * as TestSelector1 from './testSelectors/index'
import * as CashModule1 from './cash/index'
import * as ProductsModule1 from './products/productsModule'

export const AccountModule = AccountModule1;
export const TestSelector = TestSelector1;
export const CashModule = CashModule1;
export const ProductsModule = ProductsModule1;


export default [TestSelector, AccountModule, ProductsModule];