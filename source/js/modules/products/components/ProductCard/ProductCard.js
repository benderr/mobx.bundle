import React from 'react';
import {reduxForm} from 'common/formElements';
import PropTypes from 'prop-types';
import {PrimaryButton} from 'common/uiElements';
import ModifiersTab from './ModifiersTab';
import ProductTab from './ProductTab';
import {ConfirmPopupService} from 'common/uiElements';

class ProductCard extends React.Component {

	handleRemove() {
		this.removePopup.open()
			.then(() => this.props.onRemove());
	}

	render() {
		const {handleSubmit, onChangeTab, onSave, saving, product, error, onCancel, removing, activeTab} = this.props;
		const submit = (props) => {
			onSave(props);
		};

		const isActiveInfo = activeTab == 'info';
		const isEdit = product && !product.isNew;
		const formClasses = ['poss', removing ? 'loading_block' : ''].join(' ');
		const tabInfoClasses = ['tab', isActiveInfo ? 'tab__active' : ''].join(' ');
		const tabModClasses = ['tab', !isActiveInfo ? 'tab__active' : ''].join(' ');
		return (
			<form onSubmit={handleSubmit(submit)} className={formClasses}>
				<div class="page_content with_bottom_panel  content_padding">

					<div class="tabs_flat">
						<a onClick={() => onChangeTab('info')} className={tabInfoClasses}>Информация</a>
						<a onClick={() => onChangeTab('mod')} className={tabModClasses}>Модификаторы</a>
					</div>
					<ProductTab className={!isActiveInfo ? 'hidden' : ''}/>
					<ModifiersTab
						modifiers={product.modifiers}
						onAddGroup={this.props.onAddGroup}
						onOpenGroup={this.props.onOpenGroup}
						onAddModifier={this.props.onAddModifier}
						onOpenModifier={this.props.onOpenModifier}
						onRemoveModifier={this.props.onRemoveModifier}
						onToggleModifier={this.props.onToggleModifier}
						className={isActiveInfo ? 'hidden' : ''}/>
				</div>
				<div class="page_bottom_panel">
					<PrimaryButton type="submit" loading={saving}>Сохранить</PrimaryButton>
					<a class="button middle wide clean" onClick={onCancel}>Отмена</a>
					{isEdit &&
					<a class="button middle wide clean mr44 f_right" onClick={::this.handleRemove}>Удалить</a>}
				</div>
				<ConfirmPopupService
					ref={p => this.removePopup = p}
					okName="Подтвердить"
					cancelName="Отмена"
					title="Удаление товара"/>
			</form>
		)
	}
}

ProductCard.propTypes = {
	onSave: PropTypes.func.isRequired,
	initialValues: PropTypes.object.isRequired, //todo shape
	product: PropTypes.object.isRequired,
	onCancel: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired,
	saving: PropTypes.bool,
	removing: PropTypes.bool,
	error: PropTypes.object,
	onAddGroup: PropTypes.func.isRequired,
	onOpenGroup: PropTypes.func.isRequired,
	onAddModifier: PropTypes.func.isRequired,
	onOpenModifier: PropTypes.func.isRequired,
	onToggleModifier: PropTypes.func.isRequired,
	onRemoveModifier: PropTypes.func.isRequired,
	onChangeTab: PropTypes.func.isRequired,
	activeTab: PropTypes.oneOf(['info', 'mod'])
};

export default (formKey) => reduxForm({form: formKey})(ProductCard);

