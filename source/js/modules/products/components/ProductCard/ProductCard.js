import React from 'react';
import {reduxForm} from 'common/formElements';
import PropTypes from 'prop-types';
import {PrimaryButton} from 'common/uiElements';
import ModifiersTab from './ModifiersTab';
import ProductTab from './ProductTab';
import {ConfirmPopupService} from 'common/uiElements';

class ProductCard extends React.Component {

	constructor(props) {
		super(props);
		this.state = {activeTab: 'info'};
	}

	changeTab(tab) {
		return () => this.setState({activeTab: tab});
	}

	handleRemove() {
		this.removePopup.open()
			.then(() => this.props.onRemove());
	}

	render() {
		const {handleSubmit, onSave, saving, product, error, onCancel, onRemove} = this.props;
		const submit = (props) => {
			onSave(props);
		};

		const isActiveInfo = this.state.activeTab == 'info';
		const isEdit = product && !product.isNew;

		return (
			<form onSubmit={handleSubmit(submit)} className="poss">
				<div class="page_content with_bottom_panel  content_padding">

					<ul class="tabs_light">
						<li onClick={::this.changeTab('info')} className={isActiveInfo ? 'active' : ''}>Информация</li>
						<li onClick={::this.changeTab('mod')} className={!isActiveInfo ? 'active' : ''}>Модификаторы
						</li>
					</ul>
					<ProductTab className={!isActiveInfo ? 'hidden' : ''}/>
					<ModifiersTab
						modifiers={product.modifiers}
						onAddGroup={this.props.onAddGroup}
						onOpenGroup={this.props.onOpenGroup}
						onAddModifier={this.props.onAddModifier}
						onOpenModifier={this.props.onOpenModifier}
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
	onAddGroup: PropTypes.func.isRequired,
	onOpenGroup: PropTypes.func.isRequired,
	onAddModifier: PropTypes.func.isRequired,
	onOpenModifier: PropTypes.func.isRequired
};

export default (code) => reduxForm({
	form: 'productCard_' + code
})(ProductCard);

