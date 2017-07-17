import React from 'react'
import DefaultLayerLayout from 'components/DefaultLayerLayout'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import toJS from 'components/HOC/toJs'
import retailPointHOC from 'components/HOC/retailPointRequiredHOC'
import {bindActionCreators} from 'redux'
import {formValueSelector} from 'redux-form/immutable'

import createEditComponent from '../components/ContragentEditComponent'
import * as selectors from '../selectors/contragentSelectors'
import {ROLES} from '../enums/options'

const getFormName = code => `editContragent_${code}`;


@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@retailPointHOC
@toJS
class ContragentEditContainer extends DefaultLayerLayout {
	constructor(props) {
		super(props);
		this.EditComponent = createEditComponent(getFormName(props.code))
	}

	render() {
		const {isNew, contragent, showPassword} = this.props;
		const title = isNew ? 'Создание контрагента' : 'Редактирование контрагента';

		const EditComponent = this.EditComponent;

		return(
			<article className="page" {...this.layerOptions}>
				<div className="page_header">
					{this.getCloseButton()}
					{this.getToggleButton()}
					<h1>{title}</h1>
				</div>

				<EditComponent contragent={contragent}
							   showPassword={showPassword} />
			</article>
		);
	}
}

function mapStateToProps(state, ownProps) {
	let {action, code} = ownProps.match.params;			// параметры URL
	const editState = selectors.getEditSection(state);	// state для всех форм
	const isNew = !(action === 'edit' && code);			// добавить/редактировать

	code = '12312';

	const formSelector = formValueSelector(getFormName(code));
	const roles = formSelector(state, 'roles');

	// const showPassword = roles.some(role => role.get('selected') && ROLES[role.get('name')].password);
	const contragent = editState.getIn([code]);

	console.log('roles', roles);

	return {action, code, isNew, contragent, showPassword: true};




	// const formSelector = formValueSelector(getFormName(code));
	// const roles = formSelector(state, 'roles');
    //
	// if (!isNew) {
    //
	// }
    //
	// const showPassword = true;
    //
	// const contragent = editState.getIn([code]);
	// // const showPassword = roles.some(role => role.get('selected') && ROLES[role.get('name')].password);

	// console.log('editState', editState);
	// console.log('roles', roles);
	// console.log('contragent', contragent);

	// return {action, code, isNew, contragent, showPassword}


	// // const editState = selectors.getEditState(state);
	// const {action} = ownProps.match.params;
	// let code = ownProps.match.params.code;
    //
	// const isNew = !(action === 'edit' && code);
    //
	// // const code = '123123123213';
    //
	// return {action, code};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
		}, dispatch)
	};
}


export default ContragentEditContainer;