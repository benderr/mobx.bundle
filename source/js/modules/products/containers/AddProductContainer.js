import React from 'react'
import PropTypes from 'prop-types';
import DefaultLayerLayout from 'components/DefaultLayerLayout'
import ProductForm from '../components/EditProductForm/ProductForm';
import * as productActions from '../actions/productActions'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'
import {getProduct} from '../selectors/productsSelectors'

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
class AddProductContainer extends DefaultLayerLayout {
	onSaveProduct() {

	}

	render() {

		const {product}=this.props;
		const productModel = product ? product.toJS() : null;
		return (
			<article className="page">
				<div className="page_header">
					{this.getCloseButton()}
					{this.getToogleButton()}
					<h1>Добавление товара</h1>
				</div>
				{productModel &&
				<ProductForm onSave={::this.onSaveProduct} initialValues={productModel} onCancel={::this.closeLayer}/>}
				{!productModel && <span>Продукт не найден</span>}
			</article>
		);
	}
}

AddProductContainer.propTypes = {
	product: PropTypes.object
};

export default AddProductContainer;

function mapStateToProps(state, ownProps) {
	const {id}=ownProps.match.params;
	const product = getProduct(id)(state); //todo переделать на запуск саги с получением продукта
	return {
		product: product
	}
}

function mapDispatchToProps(dispatch) {
	return {
		//login: bindActionCreators(login.request, dispatch)
	}
}