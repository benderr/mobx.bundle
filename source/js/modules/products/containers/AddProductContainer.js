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

		const {productMap}=this.props;
		const product = productMap.toJS();
		return (
			<article className="page">
				<div className="page_header">
					{this.getCloseButton()}
					{this.getToogleButton()}
					<h1>Добавление товара</h1>
				</div>
				{product && <ProductForm onSave={::this.onSaveProduct} initialValues={product}/>}
				{!product && <span>Продукт не найден</span>}
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
	const product = getProduct(state)(id); //todo переделать на запуск саги с получением продукта
	return {
		product: product
	}
}

function mapDispatchToProps(dispatch) {
	return {
		//login: bindActionCreators(login.request, dispatch)
	}
}