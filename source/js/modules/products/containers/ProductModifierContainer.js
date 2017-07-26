import React from 'react';
import DefaultLayerLayout from 'components/DefaultLayerLayout'
import * as productActions from '../actions/productActions'
import * as modifierActions from '../actions/modifierActions'
import {bindActionCreators} from 'redux'
import * as productSelectors from '../selectors/productsSelectors'
import * as modifierSelectors from '../selectors/modifierSelectors'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import modifierForm from '../components/ProductCard/ModifierForm'
import toJS from 'components/HOC/toJs'
import {getFormValues} from 'redux-form/immutable'
import {ConfirmPopupService} from 'common/uiElements'
import {notify} from 'common/uiElements/Notify'
import {uuid} from 'infrastructure/utils/uuidGenerator'

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@toJS
class ProductModifierContainer extends DefaultLayerLayout {

	constructor(props) {
		super(props);
		this.formKey = getFormKey(this.props.groupCode, this.props.modifierCode);
		this.modifierForm = modifierForm(this.formKey);
	}

	componentDidMount() {
		super.componentDidMount();
		const {setDefaultSearchProduct, modifier}=this.props;

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

	onSearchProducts(val) {
		const searchText = val || '';
		if (searchText.length == 0 || searchText.length >= 2) {
			const formKey = getSearchFormKey(this.formKey);
			this.props.searchProducts({formKey, query: searchText});
		}
	}

	onSave(formProps) {
		const {saveModifier, groupCode, modifier, updateGroup, point}=this.props;
		const editModifier = {
			code: modifier ? modifier.code : uuid(),
			name: formProps.get('name'),
			goodsName: formProps.get('goodsName'),
			barcode: formProps.get('barcode'),
			qty: formProps.get('qty'),
			price: formProps.get('price'),
			selected: formProps.get('selected')
		};
		saveModifier({modifier: editModifier, groupCode});
		updateGroup({
			groupCode, point, meta: {
				success: modifier ? 'Модификатор обновлен' : 'Модификатор добавлен',
				error: modifier ? 'Не удалось обновить модификатор' : 'Не удалось добавить модификатор',
			}
		});
	}

	onCancel() {
		this.closeLayer();
	}

	onRemove() {
		this.removePopup.open().then(() => {
			const {removeModifier, updateGroup, groupCode, modifier, point}=this.props;
			if (modifier) {
				removeModifier({groupCode, modifierCode: modifier.code});
				updateGroup({groupCode, point});
			}
		});
	}

	render() {
		const {modifier, searchProductsView}=this.props;
		const initialValues = modifier || {qty: 1, isNew: true};
		const ModifierForm = this.modifierForm;
		const title = modifier ? 'Редактирование модификатора' : 'Добавление модификатора';

		return (
			<article className="page" {...this.layerOptions}>
				<div className="page_header">
					{this.getCloseButton()}
					{this.getToggleButton()}
					<h1>{title}</h1>
				</div>
				<ModifierForm initialValues={initialValues}
							  onSave={::this.onSave}
							  onRemove={::this.onRemove}
							  onCancel={::this.onCancel}
							  onSearchProducts={::this.onSearchProducts}
							  searchProductsView={searchProductsView}/>
				<ConfirmPopupService
					ref={p => this.removePopup = p}
					okName="Подтвердить"
					cancelName="Отмена"
					title="Удаление модификатора"/>
			</article>
		);
	}
}

export default ProductModifierContainer;

function mapStateToProps(state, ownProps) {
	const {location}=ownProps;
	const {groupCode, modifierCode, point} = location.state || {};

	const modifier = modifierCode ? modifierSelectors.getModifierByCode(groupCode, modifierCode)(state) : null;

	const formKey = getFormKey(groupCode, modifierCode);
	//const formData = getFormValues(formKey)(state);

	//search productData
	const searchFormKey = getSearchFormKey(formKey);
	let searchProductsView = productSelectors.getSearchProducts(searchFormKey)(state);
	return {groupCode, modifier, point, modifierCode, searchProductsView};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			saveModifier: modifierActions.saveModifier,
			removeModifier: modifierActions.removeModifier,
			updateGroup: modifierActions.updateGroup,
			searchProducts: productActions.searchProducts.request,
			setDefaultSearchProduct: productActions.setDefaultSearchProduct,
		}, dispatch),
		dispatch
	}
}

function getFormKey(groupId, modifierId = null) {
	return `modifierForm_${groupId}_${modifierId}`;
}

function getSearchFormKey(formKey) {
	return `search_field_${formKey}`;
}