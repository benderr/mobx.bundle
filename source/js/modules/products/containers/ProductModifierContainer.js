import React from 'react'
import PropTypes from 'prop-types';
import DefaultLayerLayout from 'components/DefaultLayerLayout'
import * as productActions from '../actions/productActions'
import {bindActionCreators} from 'redux';
import * as productSelectors from '../selectors/productsSelectors'
import {connect} from 'react-redux';
import {withRouter} from 'react-router'
import modifierForm from '../components/ProductCard/ModifierForm'
import toJS from 'components/HOC/toJs'

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@toJS
class ProductModifierContainer extends DefaultLayerLayout {

	constructor(props) {
		super(props);
		this.modifierForm = modifierForm(this.props.inventCode, this.props.groupId);
	}

	componentDidMount() {
		super.componentDidMount();
		const {hasProduct}=this.props;
		if (!hasProduct)
			this.onCancel();
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
		const {modifier}=this.props;
		const ModifierForm = this.modifierForm;
		const title = modifier ? 'Редактирование модификатора' : 'Добавление модификатора';
		return (
			<article className="page">
				<div className="page_header">
					{this.getCloseButton()}
					{this.getToogleButton()}
					<h1>{title}</h1>
				</div>
				<ModifierForm initialValues={modifier}
							  onSave={::this.onSave}
							  onRemove={::this.onRemove}
							  onCancel={::this.onCancel}
				/>
			</article>
		);
	}
}

ProductModifierContainer.propTypes = {
	groupId: PropTypes.string,
	modifier: PropTypes.object, //todo shape
	hasProduct: PropTypes.bool,
	inventCode: PropTypes.string,
	history: PropTypes.object
};

export default ProductModifierContainer;

function mapStateToProps(state, ownProps) {
	const {location, history}=ownProps;
	const {inventCode, groupId, modifierId} = location.state || {};

	const productView = productSelectors.getProductView(inventCode)(state);
	const hasProduct = !!productView && !!groupId;
	let modifier = null;

	if (groupId && productView && modifierId) {
		modifier = productSelectors.getProductModifier(state, inventCode, groupId, modifierId);
	}
	return {hasProduct, history, inventCode, groupId, modifier};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			save: productActions.saveModifier,
			remove: productActions.removeModifier
		}, dispatch)
	}
}