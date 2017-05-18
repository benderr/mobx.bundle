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
	const {handleSubmit, loading, onSave, product, errors} = props;
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
						<input type="text" class="w100"/>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">Код *</div>
					<div class="property_value col six">
						<input type="text" class="w100"/>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">Штрих-код *</div>
					<div class="property_value col six">
						<input type="text" class="w100"/>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">Цена *</div>
					<div class="property_value col six">
						<input type="text" class="w100"/>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">Мин. цена</div>
					<div class="property_value col six">
						<input type="text" class="w100"/>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">Ед. изм.</div>
					<div class="property_value col six">
						<input type="text" class="w100"/>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">Тип</div>
					<div class="property_value col six">
						<input type="text" class="w100"/>
					</div>
				</div>
		</div>
			<div class="page_bottom_panel">
			<a class="button middle wide">Сохранить</a>
			<a class="button middle wide clean">Отмена</a>
			</div>
		</span>
	)
};

ProductForm.propTypes = {
	loading: PropTypes.bool.isRequired,
	onSave: PropTypes.func.isRequired,
	product: PropTypes.object.isRequired
};

export default  reduxForm({
	form: 'productForm',// имя формы в state (state.form.auth)
	validate,
	//asyncValidate
})(ProductForm);

