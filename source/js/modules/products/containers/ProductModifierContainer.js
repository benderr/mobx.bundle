import React from 'react';
import PropTypes from 'prop-types';
import DefaultLayerLayout from 'components/DefaultLayerLayout';
import * as productActions from '../actions/productActions';
import {bindActionCreators} from 'redux';
import * as productSelectors from '../selectors/productsSelectors';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import modifierForm from '../components/ProductCard/ModifierForm';
import toJS from 'components/HOC/toJs';
import {change, getFormValues} from 'redux-form/immutable';

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@toJS
class ProductModifierContainer extends DefaultLayerLayout {

	constructor(props) {
		super(props);
		this.formKey = getFormKey(this.props.inventCode, this.props.groupId, this.props.modifier ? this.props.modifier.id : null);
		this.modifierForm = modifierForm(this.formKey);
	}

	componentDidMount() {
		super.componentDidMount();
		const {hasProduct, setDefaultSearchProduct, modifier}=this.props;
		if (!hasProduct)
			this.onCancel();

		if (modifier) {
			const formKey = getSearchFormKey(this.formKey);
			setDefaultSearchProduct({
				formKey,
				defaultsProduct: [{
					name: modifier.name,
					inventCode: modifier.barcode,
					price: modifier.price
				}]
			});
		} else {
			this.onSearchProducts('');
		}
	}

	onSelectProduct(product) {
		if (product == null) {
			const {products}=this.props.searchProductsView;
			if (products.length <= 1)
				this.onSearchProducts('');
		}
		else {
			this.props.changeField(this.formKey, 'name', product.name);
			this.props.changeField(this.formKey, 'price', product.price);
		}
	}

	onSearchProducts(val) {
		const searchText = val || '';
		if (searchText.length == 0 || searchText.length >= 2) {
			const formKey = getSearchFormKey(this.formKey);
			this.props.searchProducts({formKey, searchText});
		}
	}

	onIncreaseQty() {
		const {formData, changeField} = this.props;
		if (formData) {
			const qty = formData.qty ? ++formData.qty : 1;
			changeField(this.formKey, 'qty', qty);
		}
	}

	onDecreaseQty() {
		const {formData, changeField} = this.props;
		if (formData) {
			const qty = formData.qty > 1 ? --formData.qty : 1;
			changeField(this.formKey, 'qty', qty);
		}
	}

	onSave(formProps) {
		const {save, modifier, groupId, inventCode}=this.props;

		const editModifier = {
			id: modifier ? modifier.id : null,
			name: formProps.get('name'),
			barcode: formProps.get('barcode'),
			qty: formProps.get('qty'),
			price: formProps.get('price'),
			base: formProps.get('selected'), //todo выпилить
			selected: formProps.get('selected')
		};
		save({inventCode, modifier: editModifier, groupId});
		this.closeLayer();
	}

	onCancel() {
		this.closeLayer();
	}

	onRemove() {
		const {remove, groupId, modifier, inventCode}=this.props;
		remove({inventCode, groupId, modifierId: modifier.id});
		this.closeLayer();
	}

	render() {
		const {modifier, searchProductsView}=this.props;

		if (modifier)
			modifier.product = {inventCode: modifier.barcode};

		const ModifierForm = this.modifierForm;
		const title = modifier ? 'Редактирование модификатора' : 'Добавление модификатора';
		const isLoadingProducts = searchProductsView.loading;

		return (
			<article className="page">
				<div className="page_header">
					{this.getCloseButton()}
					{this.getToogleButton()}
					<h1>{title}</h1>
				</div>
				<ModifierForm initialValues={modifier}
							  modifier={modifier}
							  onSave={::this.onSave}
							  onRemove={::this.onRemove}
							  onCancel={::this.onCancel}
							  onSearchProducts={::this.onSearchProducts}
							  onSelectProduct={::this.onSelectProduct}
							  productList={searchProductsView.products || []}
							  isLoadingProducts={isLoadingProducts}
							  onIncreaseQty={::this.onIncreaseQty}
							  onDecreaseQty={::this.onDecreaseQty}
				/>
			</article>
		);
	}
}

ProductModifierContainer.propTypes = {
	groupId: PropTypes.string,
	//modifier: PropTypes.object, //todo shape
	hasProduct: PropTypes.bool,
	inventCode: PropTypes.string,
	history: PropTypes.object
};

export default ProductModifierContainer;

function mapStateToProps(state, ownProps) {
	const {location}=ownProps;
	const {inventCode, groupId, modifierId} = location.state || {};

	//modifier data
	const productView = productSelectors.getProductView(inventCode)(state);
	const hasProduct = !!productView && !!groupId;
	let modifier = null;

	if (groupId && productView && modifierId) {
		modifier = productSelectors.getProductModifier(state, inventCode, groupId, modifierId);
	}

	//form
	const formKey = getFormKey(inventCode, groupId, modifierId);
	const formData = getFormValues(formKey)(state);

	//search productData
	const searchFormKey = getSearchFormKey(formKey);
	let searchProductsView = productSelectors.getSearchProducts(searchFormKey)(state);
	return {hasProduct, inventCode, groupId, modifier, searchProductsView, formData};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			save: productActions.saveModifier,
			remove: productActions.removeModifier,
			searchProducts: productActions.searchProducts.request,
			setDefaultSearchProduct: productActions.setDefaultSearchProduct,
			changeField: change
		}, dispatch)
	}
}

function getFormKey(inventCode, groupId, modifierId = null) {
	return `modifierForm_${inventCode}_${groupId}_${modifierId}`;
}

function getSearchFormKey(formKey) {
	return `search_field_${formKey}`;
}