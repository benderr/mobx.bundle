import React from 'react';
import {Field, reduxForm} from 'redux-form/immutable';
import InputRender from 'common/formElements/InputRender'
import {isEmpty} from 'common/validators/validators'
import PropTypes from 'prop-types';
import {PrimaryButton} from 'common/uiElements/uiComponents'
import modifierShape from './modifierShape';

const isRequired = (text) => (val) => isEmpty(val) ? text : undefined;

class ModifierForm extends React.Component {

	render() {
		const {handleSubmit, onSave, onCancel, onRemove} = this.props;
		const submit = (props) => onSave(props);

		return (

			<form onSubmit={handleSubmit(submit)} style={{position: 'static'}}>
				<div class="page_content with_bottom_panel  content_padding">

					<div class="form_group form_horizontal">
						<div class="property_label col w100px">Товар</div>
						<div class="property_value col nine">
							<div class="jsRadSelect2  w100" data-placeholder="Селект"  name="adfasd" id="adsf">
								<option class="jsRadSelect2Options" value="1">Бананы</option>
								<option class="jsRadSelect2Options" value="2">Яблоки</option>
								<option class="jsRadSelect2Options" value="3">Груши</option>
								<option class="jsRadSelect2Options" value="4">Виноград</option>
								<option class="jsRadSelect2Options" value="5">АпельсиныАпельсины</option>
								<option class="jsRadSelect2Options" value="6">Маракуйя Маракуйя Маракуйя Маракуйя </option>
							</div>
						</div>
					</div>

					<div class="form_group form_horizontal">
						<div class="property_label col w100px">Название</div>
						<div class="property_value col nine">
							<Field name="name" type="text"
								   class="w100" sometype="test"
								   component={InputRender}
								   validate={[isRequired('Укажите наименование')]}/>
						</div>
					</div>

					<div class="form_group form_horizontal">
						<div class="property_label col w100px">Кол-во</div>
						<div class="property_value col nine">
							<div class="counter_wrapper">
								<a class="count_ctrl">&minus;</a>
								<input type="text" placeholder="0" value="1" />
									<a class="count_ctrl">+</a>
							</div>
						</div>
					</div>

					<div class="form_group form_horizontal">
						<div class="property_label col w100px">Цена</div>
						<div class="property_value col add_modificators_price">
							<input type="text" placeholder="0" />
						</div>
						<div class="property_label  col  one"><span class="cur rur"><span>р.</span></span></div>
					</div>

					<div class="form_group form_horizontal">
						<div class="property_value col nine">
							<input type="checkbox" name="c5" id="33" />
								<label for="33" class="label_check  switcher  m_top_15"><i class="icon"></i><span class="m_left_45">Выбран по умолчанию</span></label>
						</div>
					</div>

				</div>
				<div class="page_bottom_panel">
					<PrimaryButton type="submit">Сохранить</PrimaryButton>
					<a class="button middle wide clean" onClick={onCancel}>Отмена</a>
					<a class="button middle wide clean" onClick={onRemove}>Удалить</a>
				</div>
			</form>
		)
	}
}

ModifierForm.propTypes = {
	onSave: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired,
	initialValues: PropTypes.instanceOf(modifierShape),
	onCancel: PropTypes.func.isRequired,
};

export default (productCode, groupId) => reduxForm({
	form: `modifierForm_${productCode}_${groupId}`
})(ModifierForm);

