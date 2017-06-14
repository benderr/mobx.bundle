import React from 'react';
import {Select} from 'common/uiElements';
import {AmountField, InputField, PhoneField, NumberField, SelectField} from 'common/formElements/fields';
import {reduxForm} from 'common/formElements'
import {connect} from 'react-redux';
import {Field, focus, change, getFormValues} from 'redux-form/immutable';
import {isRequired} from 'common/validators'
import modifierForm from 'modules/products/components/ProductCard/ModifierForm'
import {withRouter} from 'react-router';
import {ConfirmPopupService} from 'common/uiElements';

const testForm = ({handleSubmit}) => {
	return (<form onSubmit={handleSubmit(() => {
	})}>

		<InputField name="name" validate={[isRequired('Тест')]}/>
		<PhoneField name="phone" validate={[isRequired('Тест')]}/>
		<AmountField name="price" type="text"
					 validate={[isRequired('Укажите цену')]}/>
		<NumberField name="number" validate={[isRequired('Тест')]}/>
		<SelectField name="select" options={[{label: '1', value: '1'}, {label: '2', value: '2'}]}
					 validate={[isRequired('Укажите')]}
		/>

		<button type="submit" className="button middle wide">отправить</button>
	</form>)
};

const onSubmitFail = formName => (errors, dispatch) => {
	if (errors) {
		const firstField = Object.keys(errors)[0];
		firstField && dispatch(focus(formName, firstField));
		// setTimeout(() => {
		// 	document.querySelector(`[name=${firstField}]`).focus();
		// }, 0);

	}
};

function getParent() {
	return document.querySelector('#root');
}


const TestForm = reduxForm({
	form: 'testForm',
	onSubmitFail: onSubmitFail('testForm')
})(testForm);

@withRouter
@connect(mapStateProps)
class TestSelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {selected: ""};
		this.modifierForm = modifierForm(1, 2);
	}

	onSave(formProps) {

	}

	onCancel() {

	}

	onRemove(elem) {
		this.removePopup.open({title: 'Удалить элемент ' + elem.id})
			.then(() => {
				console.log('removing element ', elem);
			})
			.catch(({close}) => {
				if (close)
					console.log('closing for element ', elem);
				else
					console.log('canceling for element ', elem);
			});
	};

	logChange(val) {
		//console.log("Selected: ", val);
		this.setState({selected: val ? val.value : null})
	}

	render() {
		var options = [
			{value: 'one', label: 'One'},
			{value: 'two', label: 'Two'}
		];

		//let modifier = null;
		//const ModifierForm = this.modifierForm;
		const amount = this.props.formData ? this.props.formData.get('price') : 'null';

		return (
			<div style={{minHeight: '500px'}}>
				<Select name="form-field-name"
						placeholder=""
						searchable={true}
						value={this.state.selected}
						onChange={::this.logChange} options={options}/>

				<br/>


				<div className="poss" style={{maxWidth: '400px'}}>
					<TestForm />
				</div>

				<br/>

				<button className="button" onClick={() => this.onRemove({id: 1})}>Удалить что-то 1</button>
				<button className="button" onClick={() => this.onRemove({id: 2})}>Удалить что-то 2</button>

				<ConfirmPopupService
					ref={p => this.removePopup = p}
					okName="Подтвердить"
					cancelName="Отмена"
					title="Удаление тестовое"
					text="Вы действительно хотите что-то удалить?"/>
			</div>
		);
	}
}


function mapStateProps(state) {
	const formData = getFormValues('testForm')(state);
	return {formData};
}

export default TestSelector

