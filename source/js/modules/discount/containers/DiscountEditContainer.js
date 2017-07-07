import React from 'react'
import DefaultLayerLayout from 'components/DefaultLayerLayout'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import toJS from 'components/HOC/toJs'
import retailPointHOC from 'components/HOC/retailPointRequiredHOC'
import {bindActionCreators} from 'redux'

import * as selectors from '../selectors/discountSelectors'
import * as actions from '../actions/discountActions'
import DiscountEditComponent from '../components/DiscountEditComponent'


@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@retailPointHOC
@toJS
class DiscountEditContainer extends DefaultLayerLayout {

	componentWillUpdate() {
		const {formState} = this.props;
		if (formState.success)
			this.closeLayer();
	}

	componentWillUnmount() {
		const {isNew, formState, closeLayer} = this.props;
		closeLayer(isNew, formState);
	}

	onSubmitForm(isNew, props) {
		const {createDiscount, updateDiscount} = this.props;
		if (isNew)
			createDiscount(props);
		else
			updateDiscount(props);
	}

	onCloseForm() {
		this.closeLayer();
	}

	onDeleteForm() {
		console.log('onDeleteForm');

		const {deleteDiscount, formState} = this.props;
		deleteDiscount(formState.code);
	}

	render() {
		const {isNew, formState} = this.props;
		const title = isNew ? 'Создание скидки' : 'Редактирование скидки';

		return (
			<article className="page" {...this.layerOptions}>
				<div className="page_header">
					{this.getCloseButton()}
					{this.getToggleButton()}
					<h1>{title}</h1>
				</div>
				<DiscountEditComponent formState={formState}
									   isNew={isNew}
									   initialValues={formState}
									   onDeleteForm={::this.onDeleteForm}
									   onCloseForm={::this.onCloseForm}
									   onSubmitForm={::this.onSubmitForm}/>
			</article>
		);
	}
}

function mapStateToProps(state, ownProps) {
	const {action, code} = ownProps.match.params;
	const editState = selectors.getEditState(state).toJS();

	const isNew = !(action === 'edit' && code);
	if (!isNew && !editState.listItem[code]) {
		console.log('Загрузить элемент по коду', code);
	}
	const formState = (!isNew && editState.listItem[code]) ? editState.listItem[code] : editState.newItem;

	// console.log('editState', editState);
	// console.log('formState', formState);

	return {isNew, action, code, editState, formState};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			createDiscount: actions.createDiscount.request,
			updateDiscount: actions.updateDiscount.request,
			deleteDiscount: actions.deleteDiscount.request,
			closeLayer: actions.closeLayer
		}, dispatch)
	};
}


export default DiscountEditContainer;