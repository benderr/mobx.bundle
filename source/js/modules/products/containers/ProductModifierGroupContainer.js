import React from 'react'
import PropTypes from 'prop-types';
import DefaultLayerLayout from 'components/DefaultLayerLayout'
import * as productActions from '../actions/productActions'
import {bindActionCreators} from 'redux';
import * as productSelectors from '../selectors/productsSelectors'
import {connect} from 'react-redux';
import {withRouter} from 'react-router'
import modifierGroupForm from '../components/ProductCard/ModifierGroupForm'
import toJS from 'components/HOC/toJs'

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@toJS
class ProductModifierGroupContainer extends DefaultLayerLayout {

	componentDidMount() {
		super.componentDidMount();
		const {hasProduct}=this.props;
		if (!hasProduct)
			this.onCancel();
	}

	onSaveGroup(formProps) {
		const {saveGroup, group, inventCode}=this.props;

		const editGroup = {
			id: group ? group.id : null,
			name: formProps.get('name'),
			required: formProps.get('required')
		};
		saveGroup({inventCode, group: editGroup});
		this.closeLayer();
	}

	onCancel() {
		this.closeLayer();
	}

	onRemoveGroup() {
		const {removeGroup, group, inventCode}=this.props;
		removeGroup({inventCode, groupId: group.id});
		this.closeLayer();
	}

	render() {
		const {inventCode, group}=this.props;
		const ModifierGroupForm = modifierGroupForm(inventCode);
		const title = group ? 'Редактирование группы' : 'Добавление группы';
		return (
			<article className="page">
				<div className="page_header">
					{this.getCloseButton()}
					{this.getToggleButton()}
					<h1>{title}</h1>
				</div>
				<ModifierGroupForm initialValues={group}
									   onSave={::this.onSaveGroup}
									   onRemove={::this.onRemoveGroup}
									   onCancel={::this.onCancel}
				/>
			</article>
		);
	}
}

ProductModifierGroupContainer.propTypes = {
	group: PropTypes.object,
	hasProduct: PropTypes.bool,
	inventCode: PropTypes.string,
	history: PropTypes.object
};

export default ProductModifierGroupContainer;

function mapStateToProps(state, ownProps) {
	const {location, history}=ownProps;
	const {inventCode, groupId} = location.state || {};

	const hasProduct = !!inventCode;
	let group = null;

	if (groupId) {
		group = productSelectors.getProductGroup(state, inventCode, groupId);
	}
	return {hasProduct, history, inventCode, group};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			saveGroup: productActions.saveModifierGroup,
			removeGroup: productActions.removeModifierGroup
		}, dispatch)
	}
}