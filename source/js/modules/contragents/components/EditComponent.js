import React from 'react';
import {FieldArray} from 'redux-form';
import {reduxForm} from 'common/formElements';
import {PrimaryButton} from 'common/uiElements';
import {InputField, SwitchField} from 'common/formElements/fields';
import * as options from '../enums/contragentOptions';


const RolesContrages = (props) => {
	let i = 0;
	let listRoles = [];

	for(let k in options.roles) {
		let checked = props.roles.indexOf(k) > -1;

		console.log(k, props.roles);

		listRoles.push(
			<div className="f_left" key={k}>
				<input type="checkbox"
							name={`role[${k}]`}
							checked={checked}
					   		onChange={() => props.onChecked(k)}
							id={k}/>
				<label htmlFor={k} className="label_check">
					<i className="icon"/>
					<span>{options.roles[k].label}</span>
				</label>
			</div>
		);
		if (!(++i % 3)) listRoles.push(<div className="clear" key={'delimiter' + i} />);
	}

	return <div className="contragent_role_select">{listRoles}<div className="clear" /></div>
};

class EditComponent extends React.Component {
	render() {
		const {
			handleSubmit,
			isNew, contragentData,
			onCheckedRoles, onSaveSubmit, onCancelSubmit, onDeleteSubmit
		} = this.props;

		console.log('contragentData', contragentData);

		return (
			<form className="poss" onSubmit={handleSubmit(onSaveSubmit)}>
				<div className="page_content page_content__contragents with_bottom_panel content_padding">

					<div className="contragent_role_select">
						<FieldArray name="roles" component={role =>
							<div>
								<input type="checkbox" name={role} placeholder="First Name" />
							</div>
						} />
					</div>


					{/*<RolesContrages code={contragentData.code}
									roles={contragentData.roles}
									onChecked={(roleCode) => onCheckedRoles(isNew, roleCode, contragentData)} />*/}

					<div className="form_group form_horizontal">
						<div className="property_label col three">Наименование</div>
						<div className="property_value col nine">
							<InputField name="name" type="text" className="w100"
										required="Укажите наименование" />
						</div>
					</div>
					<div className="form_group form_horizontal">
						<div className="property_label col three">Пароль</div>
						<div className="property_value col property_value__w234">
							<InputField name="password" type="text" className="w100" />
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
						<a className="button middle wide clean" onClick={onCancelSubmit}>Отмена</a>
						{!isNew && <a className="button middle wide clean mr44 f_right" onClick={onDeleteSubmit}>Удалить</a>}
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