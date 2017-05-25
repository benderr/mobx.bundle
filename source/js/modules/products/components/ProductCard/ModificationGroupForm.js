import React from 'react';
import {Field, reduxForm} from 'redux-form/immutable';
import InputRender from 'common/formElements/InputRender'
import {isEmpty} from 'common/validators/validators'
import PropTypes from 'prop-types';
import {PrimaryButton} from 'common/uiElements/uiComponents'
import groupShape from './groupShape';

const isRequired = (text) => (val) => isEmpty(val) ? text : undefined;

class ModificationGroupForm extends React.Component {

	render() {
		const {handleSubmit, onSave, onCancel, onRemove} = this.props;
		const submit = (props) => onSave(props);

		return (

			<form onSubmit={handleSubmit(submit)} style={{position: 'static'}}>
				<div class="page_content with_bottom_panel  content_padding">
					<div class="form_group form_horizontal">
						<div class="property_label col w100px">Название</div>
						<div class="property_value col nine">
							<Field name="name" type="text"
								   class="w100"
								   component={InputRender}
								   validate={[isRequired('Укажите наименование')]}/>
						</div>
					</div>
				</div>
				<div class="page_bottom_panel">
					<PrimaryButton type="submit" >Сохранить</PrimaryButton>
					<a class="button middle wide clean" onClick={onCancel}>Отмена</a>
					<a class="button middle wide clean" onClick={onRemove}>Удалить</a>
				</div>
			</form>
		)
	}
}

ModificationGroupForm.propTypes = {
	onSave: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired,
	initialValues: PropTypes.instanceOf(groupShape),
	onCancel: PropTypes.func.isRequired,
};

export default (productCode) => reduxForm({
	form: 'modificationGroupForm_' + productCode
})(ModificationGroupForm);

