import React from 'react';
import {Field, reduxForm} from 'redux-form';
import InputRender from 'common/formElements/InputRender'
import {isEmpty} from 'common/validators/validators'
import PropTypes from 'prop-types';

const isRequired = (text) => (val) => isEmpty(val) ? text : undefined;

const validate = values => {
	//const errors = {};
	return null;
};

const ProductForm = props => {
	const {handleSubmit, loading, onSave, initialValues:product, errors, onCancel} = props;
	const submit = ({email, password}) => {
		//dispatch(login.request(email, password, backPath));
		onSave();
	};

	return (
		<span>
		<div class="page_content  with_bottom_panel  content_padding">

				<ul class="tabs_light">
					<li class="active">Информация</li>
					<li>Модификаторы</li>
				</ul>

				<div class="form_group form_horizontal">
					<div class="property_label col three three">Наименование *</div>
					<div class="property_value col six">
						<Field name="name" type="text"
							   class="w100"
							   component={InputRender}
							   validate={[isRequired('Укажите наименование')]}/>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">Код *</div>
					<div class="property_value col six">
						<Field name="inventCode" type="text"
							   class="w100"
							   component={InputRender}
							   validate={[isRequired('Укажите код')]}/>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">Штрих-код *</div>
					<div class="property_value col six">
						<Field name="barcode" type="text"
							   class="w100"
							   component={InputRender}
							   validate={[isRequired('Укажите штрих-код')]}/>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">Цена *</div>
					<div class="property_value col six">
						<Field name="price" type="text"
							   class="w100"
							   component={InputRender}
							   validate={[isRequired('Укажите цену')]}/>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">Мин. цена</div>
					<div class="property_value col six">
						<Field name="minPrice" type="text"
							   class="w100"
							   component={InputRender}
							   validate={[isRequired('Укажите мин. цену')]}/>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">Ед. изм.</div>
					<div class="property_value col six">
						<Field class="w100 ms-choice" name="measure" component="select">
            <option value="pcs">Штука</option>
            <option value="kg">Килограмм</option>
            <option value="ltr">Литр</option>
          </Field>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">Тип</div>
					<div class="property_value col six">
						<Field class="w100 ms-choice" name="alcoholType" component="select">
            <option value="NO_ALCOHOL">Обычный</option>
            <option value="LIGHT_ALCOHOL">Слабоалкогольный</option>
            <option value="ALCOHOL">Алкоголь</option>
          </Field>
					</div>
				</div>

			<div class="form_group form_horizontal">
					<div class="property_label col three">НДС</div>
					<div class="property_value col six">
						<Field class="w100 ms-choice" name="vatTag" component="select">
							<option value="0">по умолчанию (из настроек)</option>
							<option value="1104">НДС 0%</option>
							<option value="1103">НДС 10%</option>
							<option value="1102">НДС 18%</option>
							<option value="1105">НДС не облагается</option>
							<option value="1107">НДС с рассч. ставкой 10%</option>
							<option value="1106">НДС с рассч. ставкой 18%</option>
					  </Field>
					</div>
				</div>
		</div>
			<div class="page_bottom_panel">
			<a class="button middle wide">Сохранить</a>
			<a class="button middle wide clean" onClick={onCancel}>Отмена</a>
			</div>
		</span>
	)
};

ProductForm.propTypes = {
	loading: PropTypes.bool.isRequired,
	onSave: PropTypes.func.isRequired,
	initialValues: PropTypes.object.isRequired,
	onCancel: PropTypes.func.isRequired
};

export default  reduxForm({
	form: 'productForm',// имя формы в state (state.form.auth)
	validate
	//asyncValidate
})(ProductForm);

