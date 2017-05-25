import React from 'react'
import PropTypes from 'prop-types';
import DefaultLayerLayout from 'components/DefaultLayerLayout'
import productCard from '../components/ProductCard/ProductCard';
import * as productActions from '../actions/productActions'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'
import {getProductView} from '../selectors/productsSelectors'
import {LoaderBlock} from 'common/uiElements/uiComponents'
import toJS from 'components/HOC/toJs'

const First = (Com) => {
	return props => {
		console.log('First');
		return (<Com {...props}/>)
	}
}

const Second = (Com) => {

	return class Test extends React.Component {
		render() {
			console.log('Second');
			return (<Com {...this.props}/>)
		}
	}
}

@First
@Second
@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@toJS
class EditProductContainer extends DefaultLayerLayout {

	constructor(props) {
		super(props);
		this.productCard = productCard(this.props.inventCode);
	}

	componentWillUnmount() {
		const {inventCode, destroyDetails}=this.props;
	}

	componentDidMount() {
		super.componentDidMount();
		const {point, inventCode, catalog, getDetails}=this.props;
		getDetails({inventCode, point, catalog});
	}

	onSaveProduct(productProps) {
		const {productView:{product}} = this.props;
		let editProduct = Object.assign({}, product);
		editProduct.name = productProps.get('name');
		editProduct.barcode = productProps.get('barcode');
		editProduct.price = productProps.get('price');
		editProduct.minPrice = productProps.get('minPrice');
		editProduct.measure = productProps.get('measure');
		editProduct.alcoholType = productProps.get('alcoholType');
		editProduct.vatTag = productProps.get('vatTag');
		editProduct.requiredModifiers = product.modifiers;
		this.props.savingProduct({point: this.props.point, product: editProduct});
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

		return (
			<article className="page">
				<div className="page_header">
					{this.getCloseButton()}
					{this.getToogleButton()}
					<h1>Редактирование товара</h1>
				</div>
				{product &&
				<ProductCard onSave={::this.onSaveProduct}
							 onCancel={::this.closeLayer}
							 onAddGroup={::this.onAddGroup}
							 onAddModifier={::this.onAddModifier}
							 onOpenGroup={::this.onOpenGroup}
							 onOpenModifier={::this.onOpenModifier}
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
	console.log('mapStateToProps');
	const {inventCode, point, catalog}=ownProps.match.params;
	const productView = getProductView(inventCode)(state);
	return {inventCode, point, catalog, productView, history: ownProps.history};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			getDetails: productActions.getProductDetails.request,
			destroyDetails: productActions.destroyProductDetails,
			savingProduct: productActions.saveProductDetails.request
		}, dispatch)
	}
}