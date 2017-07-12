import React from 'react'
import DefaultLayerLayout from 'components/DefaultLayerLayout'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import toJS from 'components/HOC/toJs'
import retailPointHOC from 'components/HOC/retailPointRequiredHOC'
import {bindActionCreators} from 'redux'

import EditComponent from '../components/ContragentEditComponent'
import * as selectors from '../selectors/contragentSelectors'
import * as options from '../enums/options'
import * as actions from '../actions/contragentActions'


@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@retailPointHOC
@toJS
class ContragentEditContainer extends DefaultLayerLayout {

	onSubmitForm(p) {
		let props = p.toJS();
		console.log('onSubmitForm', props);
	}

	onDeleteForm() {
		console.log('onDeleteForm', props);
	}

	onCloseForm() {
		this.closeLayer();
	}

	onChangeRole(propRole) {
		const {changeRole, code} = this.props;
		let roles = propRole
			.toJS()
			.reduce((prev, val) => val.selected ? [...prev, val.name] : prev, []);

		changeRole(roles, code);
	}

	render() {
		const {isNew, code, editState} = this.props;
		const title = isNew ? 'Создание контрагента' : 'Редактирование контрагента';
		const formState = (!isNew && editState.listItem[code]) ? editState.listItem[code] : editState.newItem;

		// нормализация для ReduxForm.FieldArray
		formState.roles = options.rolesCode.map(k => ({
			name: k,
			selected: !(formState.roles.indexOf(k) < 0),
			label: options.roles[k].label
		}));

		console.log('>> formState', formState);

		return (
			<article className="page" {...this.layerOptions}>
				<div className="page_header">
					{this.getCloseButton()}
					{this.getToggleButton()}
					<h1>{title}</h1>
				</div>

				<EditComponent formState={formState}
							   initialValues={formState}

							   onChangeRoles={::this.onChangeRole}
							   onSubmit={::this.onSubmitForm}
							   onDelete={::this.onDeleteForm}
							   onClose={::this.onCloseForm} />
			</article>
		);
	}
}

function mapStateToProps(state, ownProps) {
	const editState = selectors.getEditState(state);
	const {action, code} = ownProps.match.params;
	const isNew = !(action === 'edit' && code);



	return {isNew, action, code, editState};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			changeRole: actions.changeRole
		}, dispatch)
	};
}


export default ContragentEditContainer