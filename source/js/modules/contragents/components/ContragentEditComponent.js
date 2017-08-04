import React from 'react'
import PropTypes from 'prop-types'
import {reduxForm} from 'common/formElements'
import {FieldArray, Field} from 'redux-form/immutable'
import {InputField, SwitchField} from 'common/formElements/fields'
import {PrimaryButton} from 'common/uiElements'
import {initialize} from 'redux-form/immutable'

import {ROLES, ROLES_CODE} from '../enums/options'


class ContragentEditComponent extends React.Component {
	componentDidMount() {
		const {contragent, dispatch, form} = this.props;
		const formState = {...contragent};

		formState.roles = ROLES_CODE.map(k => ({
			name: k,
			selected: !(formState.roles.indexOf(k) < 0),
			label: ROLES[k].label
		}));

		dispatch(initialize(form, formState, false));
	}

	render() {
		const {
			handleSubmit, isNew,
			contragent, showPassword,
			onSubmitForm, onCloseForm, onDeleteContragent
		} = this.props;

		return (
			<form className="poss" onSubmit={handleSubmit(onSubmitForm)}>
				<div className="page_content page_content__contragents with_bottom_panel content_padding">
					<FieldArray name="roles" component={({fields}) =>
						<div className="contragent_role_select">
							{fields.map((role, indexRole) =>
								<span key={indexRole}>

									<Field name={`${role}.selected`}
										   type="checkbox"
										   component="input"
										   id={`roleId_${indexRole}`}/>

									<label htmlFor={`roleId_${indexRole}`} className="label_check">
										<i className="icon"/>
										<span>{fields.get(indexRole).get('label')}</span>
									</label>
								</span>
							)}
						</div>
					}/>

					<div className="form_group form_horizontal">
						<div className="property_label col three">Наименование</div>
						<div className="property_value col nine">
							<InputField name="name" className="w100"
										required="Укажите наименование"/>
						</div>
					</div>
					{showPassword &&
					<div className="form_group form_horizontal">
						<div className="property_label col three">Пароль</div>
						<div className="property_value col property_value__w234">
							<InputField name="password" className="w100"/>
						</div>
					</div>}
					<div className="form_group form_horizontal">
						<div className="property_label col three">Статус</div>
						<div className="property_value col property_value__w234">
							<SwitchField name="locked" switchItems={[
								{id: 'tab1', label: 'Активный', value: 'off'},
								{id: 'tab2', label: 'Неактивный', value: 'on'}
							]}/>
						</div>
					</div>
				</div>

				<div className="page_bottom_panel">
					<PrimaryButton type="submit" loading={contragent.loading}>Сохранить</PrimaryButton>
					<a className="button middle wide clean" onClick={onCloseForm}>Отмена</a>
					{!isNew &&
					<a className="button middle wide clean mr44 f_right" onClick={onDeleteContragent}>Удалить</a>}
				</div>
			</form>
		)
	}
}

ContragentEditComponent.propTypes = {
	contragent: PropTypes.object,
	showPassword: PropTypes.bool
};

export default formName => reduxForm({
	form: formName
})(ContragentEditComponent);