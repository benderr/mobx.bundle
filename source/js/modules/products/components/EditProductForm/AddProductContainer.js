import React from 'react'
import PropTypes from 'prop-types';
import DefaultLayerLayout from 'components/DefaultLayerLayout'
import ProductForm from './ProductForm';
import * as productActions from '../../actions/productActions'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'
import {getProductsList} from '../../selectors/productsSelectors'

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
class AddProductContainer extends DefaultLayerLayout {
	onSaveProduct() {

	}

	render() {

		const {product}=this.props;
		console.log(product)
		return (
			<article className="page">
				<div className="page_header">
					{this.getCloseButton()}
					{this.getToogleButton()}
					<h1>Добавление товара</h1>
				</div>
				{product && <ProductForm onSave={::this.onSaveProduct} initialValues={product} onCancel={::this.closeLayer}/>}
				{!product && <span>Продукт не найден</span>}
			</article>
		);
	}
}

AddProductContainer.propTypes = {
	product: PropTypes.object.isRequired
};

export default AddProductContainer;

function mapStateToProps(state, ownProps) {
	const {id, point}=ownProps.match.params;
	const productList = getProductsList(state); //переделать на запуск саги с получением продукта
	return {
		product: productList.filter(s => s.inventCode == id)[0]
	}
}

function mapDispatchToProps(dispatch) {
	return {
		//login: bindActionCreators(login.request, dispatch)
	}
}