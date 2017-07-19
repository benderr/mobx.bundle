import React from 'react'
import PropTypes from 'prop-types';
import DefaultLayerLayout from 'components/DefaultLayerLayout'
import createProductCard from '../components/ProductCard/ProductCard';
import * as productActions from '../actions/productActions'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'
import {getProductView} from 'modules/products/selectors/productsSelectors'
import {LoaderBlock} from 'common/uiElements'
import toJS from 'components/HOC/toJs'
import {ConfirmPopupService} from 'common/uiElements';
import {notify} from 'common/uiElements/Notify';

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@toJS
class EditProductContainer extends DefaultLayerLayout {

	constructor(props) {
		super(props);
		this.productCard = createProductCard('productCard_' + this.props.inventCode);
		this.state = {activeTab: 'info'};
	}

	componentWillReceiveProps(props) {
		const {productView}=props;
		if (productView && (productView.saved || productView.removed))
			this.closeLayer();
	}

	componentDidMount() {
		super.componentDidMount();
		const {point, inventCode, getDetails, setNewProduct, urlAction, productView}=this.props;
		if (urlAction == 'view')
			getDetails({inventCode, point});
		if (urlAction == 'add' && productView == null)
			setNewProduct({inventCode});
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
	}

	onRemoveProduct() {
		const {inventCode, point, removeProduct, dispatch} = this.props;
		removeProduct({point, inventCode});
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

	onRemoveModifier({modifierId, groupId}) {
		const {inventCode, dispatch}=this.props;
		this.removePopup.open()
			.then(() => {
				this.props.removeModifier({inventCode, groupId, modifierId});
				dispatch(notify.success('Модификатор удален'));
			});
	}

	onToggleModifier({modifierId, groupId}) {
		const {inventCode}=this.props;
		this.props.toggleModifier({inventCode, groupId, modifierId});
	}

	handleSubmitFail() {
		const {activeTab}=this.state;
		if (activeTab != 'info')
			this.handleChangeTab('info');
	}

	handleChangeTab(tab) {
		this.setState({activeTab: tab});
	}

	render() {

		const {productView} = this.props;
		const {loading, error, saving, removing, product}= productView || {loading: true};
		const ProductCard = this.productCard;
		const {activeTab}=this.state;
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
							 onRemoveModifier={::this.onRemoveModifier}
							 onToggleModifier={::this.onToggleModifier}
							 onRemove={::this.onRemoveProduct}
							 saving={saving}
							 product={product}
							 removing={removing}
							 error={error}
							 initialValues={product}
							 onChangeTab={::this.handleChangeTab}
							 onSubmitFail={::this.handleSubmitFail}
							 activeTab={activeTab}
				/>}

				<ConfirmPopupService
					ref={p => this.removePopup = p}
					okName="Подтвердить"
					cancelName="Отмена"
					title="Удаление модификатора"/>

				<LoaderBlock loading={loading}/>
				{!product && !loading && <span>Продукт не найден</span>}
			</article>
		);
	}
}

EditProductContainer.propTypes = {
	inventCode: PropTypes.string,
	point: PropTypes.string,
	productView: PropTypes.object,
};

export default EditProductContainer;

function mapStateToProps(state, ownProps) {
	const {inventCode, point, action:urlAction}=ownProps.match.params;
	const productView = getProductView(inventCode)(state);
	return {inventCode, point, productView, urlAction, history: ownProps.history};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			getDetails: productActions.getProductDetails.request,
			savingProduct: productActions.saveProductDetails.request,
			setNewProduct: productActions.setNewProduct,
			removeProduct: productActions.removeProduct.request,
			removeModifier: productActions.removeModifier,
			toggleModifier: productActions.toggleModifier
		}, dispatch),
		dispatch
	}
}