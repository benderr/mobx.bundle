import React from 'react'
import PropTypes from 'prop-types';
import DefaultLayerLayout from 'components/DefaultLayerLayout'
import productCard from '../components/ProductCard/ProductCard';
import * as productActions from '../actions/productActions'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'
import {getProductView} from '../selectors/productsSelectors'
import {LoaderBlock} from 'common/uiElements'
import toJS from 'components/HOC/toJs'

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@toJS
class EditProductContainer extends DefaultLayerLayout {

	constructor(props) {
		super(props);
		this.productCard = productCard(this.props.inventCode);
	}

	componentDidMount() {
		super.componentDidMount();
		const {point, inventCode, catalog, getDetails, setNewProduct, urlAction, productView}=this.props;
		if (urlAction == 'view')
			getDetails({inventCode, point, catalog});
		if (urlAction == 'add' && productView == null)
			setNewProduct({catalog, inventCode});
	}

	onSaveProduct(productProps) {
		const {productView:{product}, savingProduct} = this.props;
		let editProduct = Object.assign({}, product);
		editProduct.name = productProps.get('name');
		editProduct.barcode = productProps.get('barcode');
		editProduct.price = productProps.get('price');
		editProduct.minPrice = productProps.get('minPrice');
		editProduct.measure = productProps.get('measure');
		editProduct.alcoholType = productProps.get('alcoholType');
		editProduct.vatTag = productProps.get('vatTag');
		editProduct.requiredModifiers = product.modifiers;
		savingProduct({point: this.props.point, product: editProduct});
		this.closeLayer(); //todo закрыть после успеха
	}

	onRemoveProduct() { //todo сделать удаление
		const {productView:{product}, savingProduct} = this.props;
		this.closeLayer(); //todo закрыть после успеха
	}

	onAddGroup() {
		const {inventCode, history}=this.props;
		history.push('/product/group', {inventCode});
	}

	onOpenGroup(id) {
		const {inventCode, history}=this.props;
		history.push('/product/group', {inventCode, groupId: id});
	}

	onAddModifier({groupId}) {
		const {inventCode, history}=this.props;
		history.push('/product/modifier', {inventCode, groupId});
	}

	onOpenModifier({modifierId, groupId}) {
		const {inventCode, history}=this.props;
		history.push('/product/modifier', {inventCode, modifierId, groupId});
	}

	render() {

		const {productView} = this.props;
		const {loading, error, saving, product}= productView || {loading: true};
		const ProductCard = this.productCard;
		const title = product && !product.isNew ? 'Редактирование товара' : 'Добавление товара';
		return (
			<article className="page" {...this.layerOptions}>
				<div className="page_header">
					{this.getCloseButton()}
					{this.getToggleButton()}
					<h1>{!loading && title}</h1>
				</div>
				{product &&
				<ProductCard onSave={::this.onSaveProduct}
							 onCancel={::this.closeLayer}
							 onAddGroup={::this.onAddGroup}
							 onAddModifier={::this.onAddModifier}
							 onOpenGroup={::this.onOpenGroup}
							 onOpenModifier={::this.onOpenModifier}
							 onRemove={::this.onRemoveProduct}
							 saving={saving}
							 product={product}
							 initialValues={product}
				/>}
				<LoaderBlock loading={loading}/>
				{!product && !loading && <span>Продукт не найден</span>}
			</article>
		);
	}
}

EditProductContainer.propTypes = {
	inventCode: PropTypes.string,
	point: PropTypes.string,
	catalog: PropTypes.string,
	productView: PropTypes.object,
};

export default EditProductContainer;

function mapStateToProps(state, ownProps) {
	const {inventCode, point, catalog, action:urlAction}=ownProps.match.params;
	const productView = getProductView(inventCode)(state);
	console.log('mapStateToProps', productView);
	return {inventCode, point, catalog, productView, urlAction, history: ownProps.history};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			getDetails: productActions.getProductDetails.request,
			destroyDetails: productActions.destroyProductDetails,
			savingProduct: productActions.saveProductDetails.request,
			setNewProduct: productActions.setNewProduct,
			//removeProduct: productActions.removeProduct.request
		}, dispatch)
	}
}