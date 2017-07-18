import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router'
import toJS from 'components/HOC/toJs'
import * as orderSelectors from '../selectors/orderSelectors'
import * as actions from '../actions/orderActionTypes'
import DefaultLayerLayout from 'components/DefaultLayerLayout'
import OrderForm from '../components/order/OrderForm'


@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@toJS
class OrderAddContainer extends DefaultLayerLayout {

	handleSave(props) {
		this.props.createOrder({order: props.toJS()});
	}

	componentWillReceiveProps(props) {
		props.saved && this.closeLayer();
	}

	handleRemoveProduct(id) {
		this.props.removeProduct({id});
	}

	handleAddProduct(product) {
		this.props.addProduct({product})
	}

	render() {
		const {saving, products, productOptions} = this.props;

		return (
			<article className="page" {...this.layerOptions}>
				<div className="page_header">
					{this.getCloseButton()}
					{this.getToggleButton()}
					<h1>Создание заказа</h1>
				</div>

				<div class="page_content  with_bottom_panel">
					<OrderForm class="poss"
							   productOptions={productOptions}
							   onAddProduct={::this.handleAddProduct}
							   onRemoveProduct={::this.handleRemoveProduct}
							   onSave={::this.handleSave}
							   onCancel={::this.closeLayer}/>

					<OrderProductTable canEdit={true}
									   onRemove={::this.handleRemoveProduct}
									   products={products}/>
				</div>

				<div className="page_bottom_panel">
					<Button type="submit" className="button small wide" loading={saving}>Сохранить</Button>
					<a className="button small wide clean" onClick={::this.closeLayer}>Отмена</a>
				</div>
			</article>
		);
	}

}


function mapStateToProps(state, props) {
	const {id, point, action:urlAction}=props.match.params;

	return {saving, saved, products, productOptions};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			removeProduct: actions.removeProduct,
			addProduct: actions.addProduct,
			createOrder: actions.createOrder.request
		}, dispatch)
	};
}


export default OrderAddContainer;