import React from 'react';
import {Fields, reduxForm} from 'common/formElements'
import {isRequired} from 'common/validators'
import PropTypes from 'prop-types';
import {PrimaryButton} from 'common/uiElements'
import groupShape from './groupShape';

class ModifierGroupForm extends React.Component {

	render() {
		const {handleSubmit, onSave, onCancel, onRemove, group} = this.props;
		const submit = (props) => onSave(props);

		return (

			<form onSubmit={handleSubmit(submit)} style={{position: 'static'}}>
				<div class="page_content with_bottom_panel  content_padding">
					<div class="form_group form_horizontal">
						<div class="property_label col w100px">Название</div>
						<div class="property_value col nine">
							<Fields.InputField name="name"
											   class="w100"
											   required="Укажите наименование"/>
						</div>
					</div>
				</div>
				<div class="page_bottom_panel">
					<PrimaryButton type="submit">Сохранить</PrimaryButton>
					<a class="button middle wide clean" onClick={onCancel}>Отмена</a>
					{group && <a class="button middle wide clean" onClick={onRemove}>Удалить</a>}
				</div>
			</form>
		)
	}
}

ModifierGroupForm.propTypes = {
	onSave: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired,
	group: PropTypes.instanceOf(groupShape),
	onCancel: PropTypes.func.isRequired,
};

export default (productCode) => reduxForm({
	form: 'modifierGroupForm' + productCode
})(ModifierGroupForm);

