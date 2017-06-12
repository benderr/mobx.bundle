import React from 'react';
import PropTypes from 'prop-types';
import {isRequired} from 'common/validators'
import {InputField, AmountField, SelectField} from 'common/formElements/fields'

const measureOptions = [
	{label: 'Штука', value: 'pcs'},
	{label: 'Килограмм', value: 'kg'},
	{label: 'Литр', value: 'ltr'}];

const alcoholOptions = [
	{label: 'Обычный', value: 'NO_ALCOHOL'},
	{label: 'Слабоалкогольный', value: 'LIGHT_ALCOHOL'},
	{label: 'Алкоголь', value: 'ALCOHOL'}];

const vatTagOptions = [
	{value: 0, label: 'по умолчанию (из настроек)'},
	{value: 1104, label: 'НДС 0%'},
	{value: 1103, label: 'НДС 10%'},
	{value: 1102, label: 'НДС 18%'},
	{value: 1105, label: 'НДС не облагается'},
	{value: 1107, label: 'НДС с рассч. ставкой 10%'},
	{value: 1106, label: 'НДС с рассч. ставкой 18%'}
];

class ProductTab extends React.Component {
	render() {
		const {className}=this.props;

		return (
			<div className={className}>

				<div class="form_group form_horizontal">
					<div class="property_label col three three">Наименование *</div>
					<div class="property_value col six">
						<InputField name="name"
									class="w100"
									validate={[isRequired('Укажите наименование')]}/>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">Код *</div>
					<div class="property_value col six">
						<InputField name="inventCode"
									class="w100"
									validate={[isRequired('Укажите код')]}/>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">Штрих-код *</div>
					<div class="property_value col six">
						<InputField name="barcode"
									class="w100"
									validate={[isRequired('Укажите штрих-код')]}/>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">Цена *</div>
					<div class="property_value col six">
						<AmountField name="price"
									 class="w100"
									 validate={[isRequired('Укажите цену')]}/>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">Мин. цена</div>
					<div class="property_value col six">
						<AmountField name="minPrice"
									 class="w100"
									 validate={[isRequired('Укажите мин. цену')]}/>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">Ед. изм.</div>
					<div class="property_value col six">
						<SelectField class="w100"
									 name="measure"
									 clearable={false}
									 options={measureOptions}
						/>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">Тип</div>
					<div class="property_value col six">
						<SelectField class="w100"
									 name="alcoholType"
									 clearable={false}
									 options={alcoholOptions}
						/>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">НДС</div>
					<div class="property_value col six">
						<SelectField class="w100"
									 name="vatTag"
									 clearable={false}
									 options={vatTagOptions}
						/>
					</div>
				</div>
			</div >
		);
	}
}

export default ProductTab;