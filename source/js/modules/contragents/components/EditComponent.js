import React from 'react';
import {reduxForm} from 'common/formElements';
import {FieldArray, Field} from 'redux-form/immutable';
import {InputField, SwitchField} from 'common/formElements/fields';
import {PrimaryButton} from 'common/uiElements';


class EditComponent extends React.Component {
	render() {
		const {
			handleSubmit,
			onChangeRoles, onSubmit, onDelete, onClose,
			isNew, formState
		} = this.props;

		return (
			<form className="poss" onSubmit={handleSubmit((props) => onSubmit(props, formState.code))}>
				<div className="page_content page_content__contragents with_bottom_panel content_padding">

					<FieldArray name="roles"
								validate={(r) => onChangeRoles(r, formState.code)}
								component={ ({fields}) =>
						<div className="contragent_role_select">
							{fields.map((role, indexRole) =>
								<span key={indexRole}>
									<Field name={`${role}.selected`}
										   id={`roleId_${indexRole}`}
										   component="input" type="checkbox"/>
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
					{formState.isPassword &&
					<div className="form_group form_horizontal">
						<div className="property_label col three">Пароль</div>
						<div className="property_value col property_value__w234">
							<InputField name="password" className="w100" />
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
					<div className="page_bottom_panel">
						<PrimaryButton type="submit" loading={formState.loading}>Сохранить</PrimaryButton>
						<button className="button middle wide clean" onClick={onClose}>Отмена</button>
						{!isNew && <button className="button middle wide clean mr44 f_right"
										   onClick={onDelete}>Удалить</button>}
					</div>
				</div>
			</form>
		);
	}
}

EditComponent = reduxForm({
	form: 'editComponent'
})(EditComponent);

export default EditComponent;