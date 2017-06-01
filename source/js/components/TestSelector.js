import React from 'react';
import {Select} from 'common/uiElements';
import {AmountField} from 'common/formElements/fields';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form/immutable';
import {change, getFormValues} from 'redux-form/immutable';
import {isRequired} from 'common/validators'
import modifierForm from 'modules/products/components/ProductCard/ModifierForm'
import {withRouter} from 'react-router';

const testForm = ({handleSubmit}) => {
	return (<form onSubmit={handleSubmit(() => {
	})}>
		<AmountField name="price" type="text"
					 validate={[isRequired('Укажите цену')]}/>
	</form>)
};

const TestForm = reduxForm({form: 'testForm'})(testForm);

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

	onRemove() {

	}

	logChange(val) {
		debugger
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
					<TestForm initialValues={{price:111.22}}/>
					{amount}
				</div>
			</div>
		);
	}
}


function mapStateProps(state) {
	const formData = getFormValues('testForm')(state);
	return {formData};
}

export default TestSelector

