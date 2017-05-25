import React from 'react';
import {Field, reduxForm} from 'redux-form/immutable';
import InputRender from 'common/formElements/InputRender'
import {isEmpty} from 'common/validators/validators'
import PropTypes from 'prop-types';
import {PrimaryButton} from 'common/uiElements/uiComponents'
import ModificationForm from './ModificationForm'
import ProductForm from './ProductForm'

const isRequired = (text) => (val) => isEmpty(val) ? text : undefined;

const validate = values => {
	//const errors = {};
	return null;
};

class ProductCard extends React.Component {

	constructor(props) {
		super(props);
		this.state = {activeTab: 'info'};
	}

	changeTab(tab) {
		return () => this.setState({activeTab: tab});
	}

	render() {
		const {handleSubmit, onSave, saving, initialValues:product, error, onCancel} = this.props;
		const submit = (props) => {
			onSave(props);
		};

		const isActiveInfo = this.state.activeTab == 'info';

		return (
			<form onSubmit={handleSubmit(submit)} style={{position: 'static'}}>
				<div class="page_content with_bottom_panel  content_padding">

					<ul class="tabs_light">
						<li onClick={::this.changeTab('info')} className={isActiveInfo ? 'active' : ''}>Информация</li>
						<li onClick={::this.changeTab('mod')} className={!isActiveInfo ? 'active' : ''}>Модификаторы
						</li>
					</ul>
					<ProductForm className={!isActiveInfo ? 'hidden' : ''}/>
					<ModificationForm className={isActiveInfo ? 'hidden' : ''}/>
				</div>
				<div class="page_bottom_panel">
					<PrimaryButton type="submit" loading={saving}>Сохранить</PrimaryButton>
					<a class="button middle wide clean" onClick={onCancel}>Отмена</a>
				</div>
			</form>
		)
	}
}

ProductCard.propTypes = {
	onSave: PropTypes.func.isRequired,
	initialValues: PropTypes.object.isRequired,
	onCancel: PropTypes.func.isRequired,
	saving: PropTypes.bool
};

export default  reduxForm({
	form: 'productForm',// имя формы в state (state.form.auth)
	validate
	//asyncValidate
})(ProductCard);

