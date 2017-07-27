import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import toJS from 'components/HOC/toJs'
import * as orderSelectors from '../selectors/orderSelectors'
import * as actions from '../actions/orderActions'
import DefaultLayerLayout from 'components/DefaultLayerLayout'
import OrderProductForm from '../components/order/OrderProductForm'
import OrderDetailForm from '../components/order/OrderDetailForm'
import OrderProductTable from '../components/order/OrderProductTable'
import {submit, reset} from 'redux-form/immutable'
import {Button, notify} from 'common/uiElements'
import {getDefault} from '../dataProvider/inventPositionFactory'

@connect(mapStateToProps, mapDispatchToProps)
@toJS
class OrderAddContainer extends DefaultLayerLayout {

	constructor(props) {
		super(props);
		this.state = {productFormState: getDefault()}
	}

	componentDidMount() {
		super.componentDidMount();
		const {resetForm, searchProducts, resetOrder}=this.props;
		resetForm('orderForm');
		resetForm('orderProductForm');
		resetOrder();
		searchProducts({query: ''});
	}

	componentWillReceiveProps(props) {
		if (props.saved) {
			this.props.resetOrder();
			this.closeLayer();
		}
	}

	handleRemoveProduct(id) {
		this.props.removeProduct({id});
	}

	handleAddProduct(product) {
		this.props.addProduct({product: product.toJS()});
	}

	handleCreateOrder(props) {
		const {products, dispatch, createOrder}=this.props;
		createOrder({order: props.toJS(), products});
	}

	handleOrderFormSubmit() {
		this.props.submitForm('orderForm');
	}

	render() {
		const {saving, products, productSearchState, totalSum} = this.props;

		return (
			<article className="page page__kassa_w900" {...this.layerOptions}>
				<div className="page_header">
					{this.getCloseButton()}
					{this.getToggleButton()}
					<h1>Создание заказа</h1>
				</div>

				<div class="page_content  with_bottom_panel">
					<OrderDetailForm onSave={::this.handleCreateOrder}
									 onSubmit={::this.handleCreateOrder}/>
					<OrderProductForm className="light_block"
									  productSearchState={productSearchState}
									  initialValues={this.state.productFormState}
									  onSave={::this.handleAddProduct}/>
					<OrderProductTable canEdit={true}
									   totalSum={totalSum}
									   onRemove={::this.handleRemoveProduct}
									   products={products}/>
				</div>

				<div className="page_bottom_panel">
					<Button onClick={::this.handleOrderFormSubmit}
							className="button small wide"
							loading={saving}>Сохранить</Button>
					<a className="button small wide clean"
					   onClick={::this.closeLayer}>Отмена</a>
				</div>
			</article>
		);
	}

}


function mapStateToProps(state, props) {
	const {saving, saved} = orderSelectors.getFormFlags(state);
	const products = orderSelectors.getFormProducts(state);
	const productSearchState = orderSelectors.getFormSearchProducts(state);
	const totalSum = orderSelectors.getFormTotalSum(state);

	return {saving, saved, products, totalSum, productSearchState};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			removeProduct: actions.removeProduct,
			resetForm: reset,
			submitForm: submit,
			addProduct: actions.addProduct,
			createOrder: actions.createOrder.request,
			searchProducts: actions.searchProducts.request,
			resetOrder: actions.resetOrder,
			dispatch
		}, dispatch)
	};
}


export default OrderAddContainer;