import React from 'react';
import {Field, reduxForm} from 'redux-form/immutable';
import InputRender from 'common/formElements/InputRender';
import SelectRender from 'common/formElements/SelectRender';
import {isEmpty} from 'common/validators/validators'
import PropTypes from 'prop-types';
import {PrimaryButton, LabelSwitcher} from 'common/uiElements';
import {AmountField, NumberField} from 'common/formElements/fields'
import modifierShape from './modifierShape';

const isRequired = (text) => (val) => isEmpty(val) ? text : undefined;

class ModifierForm extends React.Component {

	render() {
		const {
			handleSubmit, onSave, onCancel, onRemove, modifier,
			productList, isLoadingProducts, onSearchProducts, onSelectProduct,
			onIncreaseQty, onDecreaseQty
		} = this.props;

		return (

			<form onSubmit={handleSubmit(onSave)} style={{position: 'static'}}>
				<div class="page_content with_bottom_panel  content_padding">

					<div class="form_group form_horizontal">
						<div class="property_label col w100px">Товар</div>
						<div class="property_value col nine">
							<Field name="barcode" className="w100"
								   component={SelectRender}
								   select={{
									   searchable: true,
									   isLoading: isLoadingProducts,
									   onInputChange: onSearchProducts,
									   onChange: onSelectProduct,
									   valueKey: "inventCode",
									   labelKey: "name",
									   options: productList
								   }}
								   validate={[isRequired('Выберите товар')]}
							/>
						</div>
					</div>

					<div class="form_group form_horizontal">
						<div class="property_label col w100px">Название</div>
						<div class="property_value col nine">
							<Field name="name" type="text"
								   class="w100"
								   component={InputRender}
								   validate={[isRequired('Укажите наименование')]}/>
						</div>
					</div>

					<div class="form_group form_horizontal">
						<div class="property_label col w100px">Кол-во</div>
						<div class="property_value col nine">
							<div class="counter_wrapper">
								<a class="count_ctrl" onClick={onDecreaseQty}>&minus;</a>
								<NumberField name="qty" type="text"
											 validate={[isRequired('Укажите количество')]}/>
								<a class="count_ctrl" onClick={onIncreaseQty}>+</a>
							</div>
						</div>
					</div>

					<div class="form_group form_horizontal">
						<div class="property_label col w100px">Цена</div>
						<div class="property_value col add_modificators_price">
							<AmountField name="price" type="text"
										 validate={[isRequired('Укажите цену')]}/>
						</div>
						<div class="property_label  col  one"><span class="cur rur"><span>р.</span></span></div>
					</div>

					<div class="form_group form_horizontal">
						<div class="property_value col nine">
							<Field id="modifierSelectedField" name="selected" type="checkbox" component="input"/>
							<LabelSwitcher label="Выбран по умолчанию" forElement="modifierSelectedField"/>
						</div>
					</div>

				</div>
				<div class="page_bottom_panel">
					<PrimaryButton type="submit">Сохранить</PrimaryButton>
					<a class="button middle wide clean" onClick={onCancel}>Отмена</a>
					{modifier && <a class="button middle wide clean f_right" onClick={onRemove}>Удалить</a>}
				</div>
			</form>
		)
	}
}

ModifierForm.propTypes = {
	onSave: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	modifier: modifierShape,
	productList: PropTypes.array.isRequired,
	isLoadingProducts: PropTypes.bool.isRequired,
	onSearchProducts: PropTypes.func.isRequired,
	onSelectProduct: PropTypes.func.isRequired,
	onIncreaseQty: PropTypes.func.isRequired,
	onDecreaseQty: PropTypes.func.isRequired
};

export default (key) => reduxForm({form: key})(ModifierForm);

