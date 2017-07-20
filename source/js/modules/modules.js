import * as AccountModule1 from './account/accountModule'
import * as TestSelector1 from './testSelectors'
import * as Contragents1 from './contragents/contragentsModule'
import * as ProductsModule1 from './products/productsModule'
import * as RetailPointsModule1 from './retailPoints/retailsPointModule'
import * as CashboxModule1 from './cashbox'
import * as DiscountModule1 from './discount/discountModule';

export const AccountModule = AccountModule1;
export const TestSelector = TestSelector1;
export const Contragents = Contragents1;
export const ProductsModule = ProductsModule1;
export const RetailPointsModule = RetailPointsModule1;
export const CashboxModule = CashboxModule1;
export const DiscountModule = DiscountModule1;

export default [TestSelector, AccountModule, ProductsModule, RetailPointsModule, Contragents, DiscountModule,CashboxModule ];