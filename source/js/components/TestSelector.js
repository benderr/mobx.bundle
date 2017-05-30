import React from 'react';
import {Select} from 'common/uiElements'
import modifierForm from 'modules/products/components/ProductCard/ModifierForm'

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

		let modifier = null;
		const ModifierForm = this.modifierForm;

		return (
			<div style={{minHeight: '500px'}}>
				<Select name="form-field-name"
						placeholder=""
						searchable={true}
						value={this.state.selected}
						onChange={::this.logChange} options={options}/>

				<div className="poss" style={{maxWidth: '400px'}}>

				</div>
			</div>
		);
	}
}

export default TestSelector

