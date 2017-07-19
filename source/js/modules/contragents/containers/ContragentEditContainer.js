import React from 'react'
import DefaultLayerLayout from 'components/DefaultLayerLayout'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import toJS from 'components/HOC/toJs'
import retailPointHOC from 'components/HOC/retailPointRequiredHOC'
import {bindActionCreators} from 'redux'
import {formValueSelector} from 'redux-form/immutable'

import createEditComponent from '../components/ContragentEditComponent'
import * as actions from '../actions/contragentActions'
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

	componentDidUpdate() {
		const {isNew, code, contragent} = this.props;

		if (contragent.success) {
			this.onCloseForm();
		}
	}

	onSubmitForm(props) {
		const {
			createContragent,
			isNew, code
		} = this.props;

		const propsForm = {
			name: props.get('name'),
			password: props.get('password'),
			locked: props.get('locked'),
			roles: props.get('roles').toJS().reduce((prev, val) => val.selected ? [...prev, val.name] : prev, [])
		};

		if (isNew) {
			createContragent(propsForm);
		} else {
			console.log('update contragent');
		}

		console.log('onSubmitForm', propsForm);
		console.log('> props', {isNew, code});
	}

	onDeleteContragent() {
		const {isNew, code} = this.props;

		console.log('onDeleteContragent');
		console.log('> props', {isNew, code});
	}

	onCloseForm() {
		this.closeLayer();
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
							   showPassword={showPassword}
							   onSubmitForm={::this.onSubmitForm}
							   onCloseForm={::this.onCloseForm}
							   onDeleteContragent={::this.onDeleteContragent} />
			</article>
		);
	}
}

function mapStateToProps(state, ownProps) {
	let {action, code} = ownProps.match.params;			// параметры URL
	const editState = selectors.getEditSection(state);	// state для всех форм
	const isNew = !(action === 'edit' && code);			// добавить/редактировать

	let showPassword = false;

	code = isNew ? 'newItem' : code;

	const roles = formValueSelector(getFormName(code))(state, 'roles');
	if (roles) {
		showPassword = roles.some(role => role.get('selected') && ROLES[role.get('name')].password);
	}

	const contragent = editState.getIn([code]);

	return {action, code, isNew, contragent, showPassword};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			createContragent: actions.createContragent.request
		}, dispatch)
	};
}


export default ContragentEditContainer;