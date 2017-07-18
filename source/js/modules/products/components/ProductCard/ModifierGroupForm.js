import React from 'react';
import {reduxForm} from 'common/formElements';
import {InputField, SwitchField, SelectField} from 'common/formElements/fields'
import PropTypes from 'prop-types';
import {PrimaryButton} from 'common/uiElements'

const VIEW_MODE = {
	NEW: 'new',
	COPY: 'copy'
};

class ModifierGroupForm extends React.Component {

	handleChangeViewMode(e) {
		this.props.onChangeViewMode(e.target.value);
	}

	render() {
		const {
			handleSubmit, onSave, onCancel, onRemove, onSearchGroups, onSelectGroup,
			group, isRequiredGroup, searchGroup, modifiers = [], viewMode
		} = this.props;

		return (
			<form onSubmit={handleSubmit(onSave)} className="poss">
				<div class="page_content with_bottom_panel  content_padding">
					{!group && <div class="form_group  mb40">
						<input type="radio" onChange={::this.handleChangeViewMode}
							   id="viewModeNew"
							   name="viewMode"
							   checked={viewMode === VIEW_MODE.NEW}
							   value={VIEW_MODE.NEW}/>
						<label for="viewModeNew" class="label_check"><i
							class="icon"></i><span>Новая группа</span></label>

						<input type="radio" onChange={::this.handleChangeViewMode}
							   id="viewModeCopy"
							   checked={viewMode === VIEW_MODE.COPY}
							   value={VIEW_MODE.COPY}/>
						<label for="viewModeCopy" class="label_check  ml32"><i
							class="icon"></i><span>Скопировать существующую</span></label>
					</div>}

					<div class="form_group  form_horizontal  mb32">
						<div class="property_label col">Название</div>
						<div class="property_value col">
							<InputField name="name"
										required="Укажите наименование"/>
						</div>
					</div>

					{viewMode === VIEW_MODE.NEW && <div class="form_group  form_horizontal">
						<div class="property_label col">Тип группы</div>
						<div class="property_value col  w55">
							<SwitchField name="requiredField" switchItems={[
								{id: 'groupTypeRequired', label: 'Обязательный', value: "on"},
								{id: 'groupTypeNonRequired', label: 'Не обязательный', value: "off"}
							]}/>

							{isRequiredGroup &&
							<div class="info_text  icon-info">Данная группа используется в том случае, когда необходимо
								дать возможность выбрать только один модификатор из всех внутри этой группы.
								<div class="info_text_sample  mt12">
									<em>Пример:</em><br />
									<strong>Группа для выбора способа доставки</strong>
								</div>
							</div>}
							{!isRequiredGroup &&
							<div class="info_text  icon-info">Данная группа используется, когда необходимо выбрать от
								одного до нескольких модификаторов внутри этой группы.
								<div class="info_text_sample  mt12">
									<em>Пример:</em><br />
									<strong>Группа для выбора соусов</strong>
								</div>
							</div>}
						</div>
					</div>}

					{viewMode === VIEW_MODE.COPY && <div class="form_group  form_horizontal  mb32">
						<div class="property_label col">Группа</div>
						<div class="property_value col">
							<SelectField name="group" className="w100 mb20"
										 searchable={true}
										 isLoading={searchGroup.loading}
										 onInputChange={onSearchGroups}
										 onChange={onSelectGroup}
										 valueKey="code"
										 labelKey="name"
										 options={searchGroup.groups}
										 required="Выберите группу"/>

							<div class="modificators_group">
								<div class="modificators_wrapper">
									{modifiers.map((s, i) =>
										(<div className={s.selected ? 'selected' : ''} key={i}>
											{s.name}
										</div>))}
								</div>
							</div>
						</div>
					</div>
					}


				</div>
				<div class="page_bottom_panel">
					<PrimaryButton type="submit">Сохранить</PrimaryButton>
					<a class="button middle wide clean" onClick={onCancel}>Отмена</a>
					{group && <a class="button middle wide clean mr44 f_right" onClick={onRemove}>Удалить</a>}
				</div>
			</form>
		)
	}
}

ModifierGroupForm.propTypes = {
	onSave: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired,
	group: PropTypes.shape({
		name: PropTypes.string.isRequired,
		required: PropTypes.bool.isRequired
	}),
	onCancel: PropTypes.func.isRequired,
	isRequiredGroup: PropTypes.bool.isRequired,
	onSearchGroups: PropTypes.func.isRequired,
	onSelectGroup: PropTypes.func.isRequired,
	onChangeViewMode: PropTypes.func.isRequired,
	searchGroup: PropTypes.shape({
		loading: PropTypes.bool.isRequired,
		groups: PropTypes.array.isRequired
	}),
	modifiers: PropTypes.array,
	viewMode: PropTypes.oneOf(['new', 'copy'])
};

export default formKey => reduxForm({
	form: formKey
})(ModifierGroupForm);

