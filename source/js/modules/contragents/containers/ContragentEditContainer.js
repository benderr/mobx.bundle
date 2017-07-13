import React from 'react'
import DefaultLayerLayout from 'components/DefaultLayerLayout'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import toJS from 'components/HOC/toJs'
import retailPointHOC from 'components/HOC/retailPointRequiredHOC'
import {bindActionCreators} from 'redux'

import createEditComponent from '../components/ContragentEditComponent'
import * as selectors from '../selectors/contragentSelectors'
import {roles as ROLES, rolesCode as ROLES_CODE} from '../enums/options'
import * as actions from '../actions/contragentActions'
import {formValueSelector} from 'redux-form/immutable'

const getFormName = code => 'editContragent_' + code;


@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@retailPointHOC
@toJS
class ContragentEditContainer extends DefaultLayerLayout {

	constructor(props) {
		super(props);
		this.EditComponent = createEditComponent(getFormName(props.code))
	}

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
		const {isNew, contragent, showPassword} = this.props;
		const title = isNew ? 'Создание контрагента' : 'Редактирование контрагента';

		const EditComponent = this.EditComponent;
		console.log('>> formState', contragent);

		return (
			<article className="page" {...this.layerOptions}>
				<div className="page_header">
					{this.getCloseButton()}
					{this.getToggleButton()}
					<h1>{title}</h1>
				</div>

				{contragent && <EditComponent contragent={contragent}
											  showPassword={showPassword}
											  onChangeRoles={::this.onChangeRole}
											  onSubmit={::this.onSubmitForm}
											  onDelete={::this.onDeleteForm}
											  onClose={::this.onCloseForm}/>}
			</article>
		);
	}
}


function mapStateToProps(state, ownProps) {
	const editState = selectors.getEditState(state);
	const {action, code} = ownProps.match.params;
	const isNew = !(action === 'edit' && code);
	const formSelector = formValueSelector(getFormName(code));

	const roles = formSelector(state, 'roles');
	const showPassword = roles.some(role => role.get('selected') && ROLES[role.get('name')].password);


	const contragent = editState.getIn(['listItem', code]);
	// нормализация для ReduxForm.FieldArray
	// if (formState)
	// 	formState.roleList = ROLES_CODE.map(k => ({
	// 		name: k,
	// 		selected: !(formState.roles.indexOf(k) < 0),
	// 		label: ROLES[k].label
	// 	}));

	return {isNew, action, code, contragent, showPassword};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			changeRole: actions.changeRole
		}, dispatch)
	};
}


export default ContragentEditContainer