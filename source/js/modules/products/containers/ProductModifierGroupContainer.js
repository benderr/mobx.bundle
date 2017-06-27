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
import {change, formValueSelector} from 'redux-form/immutable';
import {ConfirmPopupService} from 'common/uiElements';

const VIEW_MODE = {NEW: 'new', COPY: 'copy'};
const REQUIRED = {ON: 'on', OFF: 'off'}; //костыль, т.к. <input radio /> т.к. он не понимает bool
@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@toJS
class ProductModifierGroupContainer extends DefaultLayerLayout {

	constructor(props) {
		super(props);
		this.groupForm = modifierGroupForm(this.props.formKey);
		this.state = {viewMode: VIEW_MODE.NEW};
	}

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
			required: formProps.get('requiredField') == REQUIRED.ON,
			modifiers: formProps.get('modifiers')
		};
		saveGroup({inventCode, group: editGroup});
		this.closeLayer();
	}

	onCancel() {
		this.closeLayer();
	}

	handleRemoveGroup() {
		this.removePopup.open().then(() => {
			const {removeGroup, group, inventCode}=this.props;
			removeGroup({inventCode, groupId: group.id});
			this.closeLayer();
		});
	}

	handleSelectGroup(group) {
		const {changeField, formKey, searchGroupsState:{groups}}=this.props;
		if (group == null) {
			groups.length <= 1 && this.handleSearchGroups('');
			changeField(formKey, 'modifiers', []);
		}
		else {
			changeField(formKey, 'name', group.name);
			changeField(formKey, 'modifiers', group.modifiers);
		}
	}

	handleChangeViewMode(mode) {
		this.setState({viewMode: mode});
		this.handleSearchGroups('');
	}

	handleSearchGroups(val) {
		const query = val || '';
		if (query.length == 0 || query.length >= 2) {
			this.props.searchGroups({formKey: this.props.formKey, query});
		}
	}

	render() {
		const {group, isRequiredGroup, searchGroupsState, modifiers}=this.props;

		console.log('ProductModifierGroupContainer', searchGroupsState.groups);

		const ModifierGroupForm = this.groupForm;
		const {viewMode}=this.state || {};
		const title = group ? 'Редактирование группы' : 'Добавление группы';
		const initialState = group ? {
				...group,
				requiredField: group.required ? REQUIRED.ON : REQUIRED.OFF
			} : {requiredField: REQUIRED.ON};
		return (
			<article className="page page__add_mod_group" {...this.layerOptions}>
				<div className="page_header">
					{this.getCloseButton()}
					{this.getToggleButton()}
					<h1>{title}</h1>
				</div>
				<ModifierGroupForm initialValues={initialState}
								   onSave={::this.onSaveGroup}
								   onRemove={::this.handleRemoveGroup}
								   onCancel={::this.onCancel}
								   onSearchGroups={::this.handleSearchGroups}
								   onSelectGroup={::this.handleSelectGroup}
								   onChangeViewMode={::this.handleChangeViewMode}

								   isRequiredGroup={isRequiredGroup}
								   searchGroup={searchGroupsState}
								   modifiers={modifiers}
								   viewMode={viewMode}
								   group={group}
				/>
				<ConfirmPopupService
					ref={p => this.removePopup = p}
					okName="Подтвердить"
					cancelName="Отмена"
					title="Удаление группы"/>
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

	const formKey = 'modifier_group_' + inventCode;
	const searchGroupsState = productSelectors.getSearchGroups(formKey)(state);
	const isRequiredGroup = hasProduct ? formValueSelector(formKey)(state, 'requiredField') == REQUIRED.ON : false;
	const modifiers = hasProduct ? formValueSelector(formKey)(state, 'modifiers') : [];

	return {
		hasProduct, history, inventCode,
		group, isRequiredGroup, searchGroupsState,
		formKey, modifiers
	};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			saveGroup: productActions.saveModifierGroup,
			removeGroup: productActions.removeModifierGroup,
			searchGroups: productActions.searchGroups.request,
			changeField: change
		}, dispatch)
	}
}