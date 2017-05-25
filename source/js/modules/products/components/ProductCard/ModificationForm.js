import React from 'react';
import PropTypes from 'prop-types';

class ModificationForm extends React.Component {
	render() {
		const {className}=this.props;
		return (
			<div className={className || ''}>
				<a class="icon-plus  add_modificators_group">Добавить группу</a>
				<div class="modificators_group">
					<div class="modificators_group_title">
						Новая добавленная группа (только обязательные, выбран с галкой базовый)
					</div>
					<div class="wrapper_modificator">
						<div class="modificator">Халапенью</div>
						<div class="modificator  selected">Ананас</div>
						<div class="modificator">Соус имбирный Соус имбирный Соус имбирный Соус имбирный</div>
						<div class="modificator">Соус брусничный Соус брусничный Соус брусничный</div>
						<div class="modificator">Соус брусничный Соус брусничный</div>
						<div class="modificator  add_new_modificator">+</div>
					</div>
				</div>

				<div class="modificators_group">
					<div class="modificators_group_title">
						Опциональные модификаторы <br />
						(нельзя редактировать имя и тут ничего не выбрано)
					</div>
					<div class="wrapper_modificator">
						<div class="modificator">Халапенью</div>
						<div class="modificator  selected">Ананас</div>
						<div class="modificator">Соус имбирный Соус имбирный Соус имбирный Соус имбирный</div>
						<div class="modificator">Соус брусничный Соус брусничный Соус брусничный</div>
						<div class="modificator">Соус брусничный Соус брусничный</div>
						<div class="modificator  add_new_modificator">+</div>
					</div>
				</div>
			</div>);
	}
}

ModificationForm.propTypes = {
	className: PropTypes.string
};

export default ModificationForm;