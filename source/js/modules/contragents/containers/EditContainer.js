import React from 'react'
import DefaultLayerLayout from 'components/DefaultLayerLayout'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import toJS from 'components/HOC/toJs'
import retailPointHOC from 'components/HOC/retailPointRequiredHOC';
import {bindActionCreators} from 'redux'

import * as selectors from '../selectors/contragentSelectors'
import * as options from '../enums/contragentOptions'
import * as actions from '../actions/editActions'
import EditComponent from '../components/EditComponent'


@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@retailPointHOC
@toJS
class EditContainer extends DefaultLayerLayout {

	onChangeRoles(propRole, code) {
		const {checkRoles} = this.props;
		let roles = propRole.toJS();
		roles = roles.reduce((prev, val) => val.selected ? [...prev, val.name] : prev, []);

		checkRoles(roles, (code === 'new' || !code ? false : code));
	}

	onSubmitForm(props, code) {
		const {createContragent, updateContragent} = this.props;

		let data = props.toJS();
		data.roles = data.roles.reduce((prev, val) => val.selected ? [...prev, val.name] : prev, []);

		if (code === 'new')
			createContragent(data);
		else
			updateContragent(data, code);
	}

	onDeleteContragent(code) {
		console.log('onDeleteContragent', code);
	}

	onCloseFrom() {
		console.log('onCloseFrom', code);
	}

	render() {
		const {isNew, code, editState} = this.props;
		const title = isNew ? 'Добавление контрагента' : 'Редактирование контрагента';
		const formState = isNew ? editState.newItem : editState.viewItems[code];

		// нормализация для ReduxForm.FieldArray
		formState.roles = options.rolesCode.map(k => ({
			name: k,
			selected: !(formState.roles.indexOf(k) < 0),
			label: options.roles[k].label
		}));

		return (
			<article className="page" {...this.layerOptions}>
				<div className="page_header">
					{this.getCloseButton()}
					{this.getToggleButton()}
					<h1>{title}</h1>
				</div>

				<EditComponent isNew={isNew}
							   onChangeRoles={::this.onChangeRoles}
							   onSubmit={::this.onSubmitForm}
							   onDelete={::this.onDeleteContragent}
							   onClose={::this.onCloseFrom}
							   formState={formState}
							   initialValues={formState}/>
			</article>
		);
	}
}

function mapStateToProps(state, ownProps) {
	const editState = selectors.getEditSection(state);
	const {action, code} = ownProps.match.params;
	const isNew = !(action === 'edit' && code);

	return {
		isNew,
		code,
		editState
	};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			checkRoles: actions.changeRole,
			createContragent: actions.createContragent.request,
			updateContragent: actions.updateContragent.request
		}, dispatch)
	};
}


export default EditContainer;