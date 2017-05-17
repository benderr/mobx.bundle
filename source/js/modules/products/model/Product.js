/**
 * Created by RobertSabiryanov on 16.05.17.
 */
import Immutable from 'immutable';

const ProductRecord = Immutable.Record({
	inventCode: null,
	name: null,
	price: null
});

class Product extends ProductRecord {
	getCode() {
		return this.get('inventCode');
	}

	getName() {
		return this.get('name');
	}

	getPrice(){
		return this.get('price');
	}
}

export default Product;