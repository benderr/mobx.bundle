import React from 'react'
import PropTypes from 'prop-types';
import DefaultLayerLayout from 'components/DefaultLayerLayout'
import ProductForm from '../components/ProductCard/ProductCard';
import * as productActions from '../actions/productActions'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'
import {getProductView} from '../selectors/productsSelectors'
import {LoaderBlock} from 'common/uiElements/uiComponents'

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
class EditProductContainer extends DefaultLayerLayout {

	componentDidMount() {
		super.componentDidMount();
		const {point, code:inventCode, catalog, getDetails}=this.props;
		getDetails({inventCode, point, catalog});
	}

	onSaveProduct(productProps) {
		//const {name, inventCode, barcode, price, minPrice, measure, alcoholType, vatTag}=productProps;
		let {product} = this.getProductView();
		//const editProduct = Object.assign(product, );
		let editProduct = Object.assign({}, product);
		editProduct.name = productProps.get('name');
		this.props.savingProduct({point: this.props.point, product: editProduct});
	}

	getProductView() {
		const {productView}=this.props;
		return productView ? productView.toJS() : {};
	}

	render() {

		const {product, loading, error, saving} = this.getProductView();

		return (
			<article className="page">
				<div className="page_header">
					{this.getCloseButton()}
					{this.getToogleButton()}
					<h1>Редактирование товара</h1>
				</div>
				{product &&
				<ProductForm onSave={::this.onSaveProduct} saving={saving} initialValues={product}
							 onCancel={::this.closeLayer}/>}
				<LoaderBlock loading={loading}/>
				{!product && !loading && <span>Продукт не найден</span>}
			</article>
		);
	}
}

EditProductContainer.propTypes = {
	code: PropTypes.string,
	point: PropTypes.string,
	catalog: PropTypes.string,
	productView: PropTypes.object
};

export default EditProductContainer;

function mapStateToProps(state, ownProps) {
	const {code, point, catalog}=ownProps.match.params;
	const productView = getProductView(code)(state);
	return {code, point, catalog, productView};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			getDetails: productActions.getProductDetails.request,
			savingProduct: productActions.saveProductDetails.request
		}, dispatch)
	}
}