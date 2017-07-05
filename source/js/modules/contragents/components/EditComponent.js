import React from 'react';
import {FieldArray, Field} from 'redux-form/immutable';
import {reduxForm} from 'common/formElements';
import {PrimaryButton} from 'common/uiElements';
import {InputField, SwitchField} from 'common/formElements/fields';


class EditComponent extends React.Component {
	componentWillUpdate() {
		console.log('componentWillUpdate');
	}

	render() {
		const {
			handleSubmit, isNew, contragentData,
			onChangeRoles, onSaveSubmit, onCancelSubmit, onDeleteSubmit
		} = this.props;

		console.log('Form State');

		return (
			<form className="poss" onSubmit={handleSubmit((props) => onSaveSubmit(props, contragentData.code))}>
				<div className="page_content page_content__contragents with_bottom_panel content_padding">

					<FieldArray name="roles" component={ ({fields}) =>
						<div className="contragent_role_select">
							{fields.map((role, indexRole) =>
								<span key={indexRole}>
									<Field name={`${role}.selected`}
										   onChange={() => onChangeRoles(contragentData.code, fields.get(indexRole).get('name'))}
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
							<InputField name="name" type="text" className="w100"
										required="Укажите наименование"/>
						</div>
					</div>
					<div className="form_group form_horizontal">
						<div className="property_label col three">Пароль</div>
						<div className="property_value col property_value__w234">
							<InputField name="password" type="text" className="w100"/>
						</div>
					</div>

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
						<PrimaryButton type="submit" loading={false}>Сохранить</PrimaryButton>
						<button className="button middle wide clean" onClick={onCancelSubmit}>Отмена</button>
						{!isNew && <button className="button middle wide clean mr44 f_right"
										   onClick={onDeleteSubmit}>Удалить</button>}
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