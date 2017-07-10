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
import {ConfirmPopupService} from 'common/uiElements'


@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@retailPointHOC
@toJS
class DiscountEditContainer extends DefaultLayerLayout {

	componentWillMount() {
		const {isLoading, loadDetailDiscount, code} = this.props;
		if (isLoading) {
			loadDetailDiscount(code);
		}
	}

	componentWillUpdate() {
		const {formState} = this.props;
		if (formState.success)
			this.closeLayer();
	}

	componentWillUnmount() {
		const {isNew, formState, closeLayer} = this.props;
		closeLayer(isNew, formState);
	}

	onSubmitForm(props) {
		const {isNew, createDiscount, updateDiscount} = this.props;
		props = props.toJS();
		if (isNew)
			createDiscount(props);
		else
			updateDiscount(props);
	}

	onCloseForm() {
		this.closeLayer();
	}

	onDeleteForm() {
		const {deleteDiscount, formState} = this.props;
		this.deletePopup.open()
			.then(() => {
				deleteDiscount(formState.code);
			});
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
				<ConfirmPopupService ref={p => this.deletePopup = p}
									 title='Удалить скидку'
									 text='Скидка будет удалена из списков скидок всех точек'
									 okName="Подтвердить"
									 cancelName="Отмена"/>
			</article>
		);
	}
}

function mapStateToProps(state, ownProps) {
	const {action, code} = ownProps.match.params;
	const editState = selectors.getEditState(state).toJS();
	let isLoading = false;

	const isNew = !(action === 'edit' && code);
	if (!isNew && !editState.listItem[code]) {
		editState.listItem[code] = editState.newItem;
		isLoading = true;
	}
	const formState = (!isNew && editState.listItem[code]) ? editState.listItem[code] : editState.newItem;

	return {isNew, isLoading, action, code, editState, formState};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			createDiscount: actions.createDiscount.request,
			updateDiscount: actions.updateDiscount.request,
			deleteDiscount: actions.deleteDiscount.request,
			loadDetailDiscount: actions.loadDetailDiscount.request,
			closeLayer: actions.closeLayer
		}, dispatch)
	};
}


export default DiscountEditContainer;