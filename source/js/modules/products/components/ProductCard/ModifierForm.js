import React from 'react';
import {Field} from 'redux-form/immutable';
import {reduxForm} from 'common/formElements';
import PropTypes from 'prop-types';
import {PrimaryButton} from 'common/uiElements';
import {AmountField, NumberField, SelectField, InputField} from 'common/formElements/fields'
import modifierShape from './modifierShape';

class ModifierForm extends React.Component {

	render() {
		const {
			handleSubmit, onSave, onCancel, modifier,
			productList, isLoadingProducts, onSearchProducts, onSelectProduct,
			onIncreaseQty, onDecreaseQty, onRemove
		} = this.props;

		return (

			<form onSubmit={handleSubmit(onSave)} style={{position: 'static'}}>
				<div class="page_content with_bottom_panel  content_padding">

					<div class="form_group form_horizontal">
						<div class="property_label col w100px">Товар</div>
						<div class="property_value col nine">

							<SelectField name="barcode" className="w100"
										 searchable={true}
										 isLoading={isLoadingProducts}
										 onInputChange={onSearchProducts}
										 onChange={onSelectProduct}
										 valueKey="inventCode"
										 labelKey="name"
										 options={productList}
										 required="Выберите товар"
							/>
						</div>
					</div>

					<div class="form_group form_horizontal">
						<div class="property_label col w100px">Название</div>
						<div class="property_value col nine">
							<InputField name="name"
										class="w100"
										required="Укажите наименование"/>
						</div>
					</div>

					<div class="form_group form_horizontal">
						<div class="property_label col w100px">Кол-во</div>
						<div class="property_value col nine">
							<div class="counter">
								<a class="count_ctrl" onClick={onDecreaseQty}>&minus;</a>
								<NumberField name="qty" type="text"
											 required="Укажите количество"/>
								<a class="count_ctrl" onClick={onIncreaseQty}>+</a>
							</div>
						</div>
					</div>

					<div class="form_group form_horizontal">
						<div class="property_label col w100px">Цена</div>
						<div class="property_value col add_modificators_price">
							<AmountField name="price"
										 required="Укажите цену"/>
						</div>
						<div class="property_label  col  one"><span class="cur rur"><span>р.</span></span></div>
					</div>

					<div class="form_group form_horizontal">
						<div class="property_value col nine">
							<Field id="modifierSelectedField" name="selected" type="checkbox" component="input"/>
							<label for="modifierSelectedField" className="label_check switcher m_top_15">
								<i className="icon"></i>
								<span className="m_left_45">Выбран по умолчанию</span>
							</label>
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

