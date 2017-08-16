import React from 'react'
import PropTypes from 'prop-types'
import {reduxForm} from 'common/formElements'
import {InputField, NumberField, Field, SelectField} from 'common/formElements/fields'
import {ColorPickerRender, NumberCounterRender} from 'common/formElements'
import enhanceWithClickOutside from 'react-click-outside'
import {HOT_KEY_TYPE, COLORS} from '../enums/enums'
import {focus, change, formValues} from 'redux-form/immutable'
import {isEmpty} from 'common/validators';
import GridValidator from  '../helpers/GridValidator';
import {ConfirmPopupService} from 'common/uiElements';

const colorSet = Object.keys(COLORS).map(key => COLORS[key]);

class HotKeyEditor extends React.Component {

	constructor(props) {
		super(props);
		const {gridSize}= props;
		this.validator = new GridValidator(gridSize.width, gridSize.height);
	}

	componentDidMount() {
		const {dispatch}= this.props;
		dispatch(focus(this.form, 'name'));
	}

	componentWillReceiveProps(props) {
		const {onSearchProducts, onSearchCategory, searchProduct, searchCategory, model}=props;
		if (model.type === HOT_KEY_TYPE.CATEGORY) {
			const list = searchCategory.categories || null;
			const loading = searchCategory.loading || false;
			if (model.groupcode) {
				if (!list.some(s => s.code == model.groupcode))
					onSearchCategory(model.name);
			} else {
				if (list == null && !loading)
					onSearchCategory('');
			}
		}
		else if (model.type === HOT_KEY_TYPE.PRODUCT) {
			const list2 = searchProduct.products || null;
			const loading = searchProduct.loading || false;
			if (model.barcode) {
				if (!list2.some(s => s.barcode == model.barcode))
					onSearchProducts(model.barcode);
			} else {
				if (list2 == null && !loading)
					onSearchProducts('');
			}
		}
	}

	handleClickOutside() {
		if (this.removePopup && this.removePopup.isOpen())
			return;
		this.props.onCancel && this.props.onCancel();
	}

	handleChangeViewMode(e) {
		const viewMode = e.target.value;
		const {change, onSearchCategory, onSearchProducts, searchProduct, searchCategory}=this.props;
		const noItems = list => !(list && list.length > 0);

		change('type', viewMode);
		if (viewMode === HOT_KEY_TYPE.PRODUCT && noItems(searchProduct.products))
			onSearchProducts('');
		if (viewMode === HOT_KEY_TYPE.CATEGORY && noItems(searchCategory.categories))
			onSearchCategory('');
	}

	handleSelectProduct(product) {
		product && this.props.change('name', product.name);
	}

	handleSelectCategory(category) {
		this.props.change('name', category.name);
	}

	handleRemove() {
		this.removePopup.open()
			.then(() => this.props.onRemove(this.props.model.id));
	}

	render() {
		const {
			handleSubmit, position, model, searchProduct, searchCategory,
			onCancel, onSave, onSearchProducts, onSearchCategory, onChangePosition,
		}=this.props;

		const heightValid = () => height => {
			if (isEmpty(height))
				return undefined;
			return !this.validator.validHeight({row: model.row, height}) ? 'Не корректная высота' : undefined;
		};

		const widthValid = () => width => {
			if (isEmpty(width))
				return undefined;
			return !this.validator.validWidth({col: model.col, width}) ? 'Не корректная ширина' : undefined;
		};

		const rowValid = () => row => {
			if (isEmpty(row))
				return undefined;
			return !this.validator.validRow({row, height: model.height}) ? 'Не корректная строка' : undefined;
		};

		const colValid = () => col => {
			if (isEmpty(col))
				return undefined;
			return !this.validator.validCol({col, width: model.width}) ? 'Не корректная столбец' : undefined;
		};

		return (
			<form onSubmit={handleSubmit(onSave)}>
				<div class="gk_cell_properties_popup"
					 style={{left: `${position.left}%`}}>
					<div class="form_group  mb24">
						<input type="radio" onChange={::this.handleChangeViewMode}
							   id="viewModeProduct"
							   name="type"
							   checked={model.type === HOT_KEY_TYPE.PRODUCT}
							   value={HOT_KEY_TYPE.PRODUCT}/>
						<label for="viewModeProduct" class="label_check  mr24"><i
							class="icon"></i><span>Товар</span></label>

						<input type="radio" onChange={::this.handleChangeViewMode}
							   id="viewModeCategory"
							   name="type"
							   checked={model.type === HOT_KEY_TYPE.CATEGORY}
							   value={HOT_KEY_TYPE.CATEGORY}/>
						<label for="viewModeCategory" class="label_check"><i
							class="icon"></i><span>Категория</span></label>
					</div>

					{model.type === HOT_KEY_TYPE.PRODUCT && <div class="form_group">
						<div class="input_group_title  w100">
							<div class="input_title">Выберите товар</div>
							<SelectField searchable={true}
										 class="w100"
										 name="barcode"
										 required="Укажите товар"
										 isLoading={searchProduct.loading}
										 onInputChange={onSearchProducts}
										 onChange={::this.handleSelectProduct}
										 valueKey="barcode"
										 labelKey="name"
										 options={searchProduct.products}
							/>
						</div>
					</div>}

					{model.type === HOT_KEY_TYPE.CATEGORY && <div class="form_group">
						<div class="input_group_title  w100">
							<div class="input_title">Выберите категорию</div>
							<SelectField searchable={true}
										 class="w100"
										 name="groupcode"
										 required="Укажите категорию"
										 isLoading={searchCategory.loading}
										 onInputChange={onSearchCategory}
										 onChange={::this.handleSelectCategory}
										 valueKey="code"
										 labelKey="name"
										 options={searchCategory.categories}
							/>
						</div>
					</div>
					}

					<div class="form_group">
						<div class="input_group_title  w100">
							<div class="input_title">Введите название</div>
							<InputField name="name" class="w100" required="Укажите название"/>
						</div>
					</div>

					<div class="form_group">
						<div class="input_group_title  w100">
							<div class="input_title">Цвет</div>
							<Field name="color" colors={colorSet} className="color_select"
								   component={ColorPickerRender}/>
						</div>
					</div>


					<div class="form_group" onMouseLeave={onChangePosition}>
						<div class="cell_size  input_group_title  col  half">
							<div class="input_title">Размер</div>

							<div class="cell_props">
								<div class="label">Ширина</div>
								<NumberField name="width"
											 maxValue={this.validator.maxWidth(model)}
											 minValue={1}
											 readonly="readonly"
											 validate={[widthValid()]}
											 component={NumberCounterRender}/>
							</div>

							<div class="cell_props">
								<div class="label">Высота</div>
								<NumberField name="height"
											 maxValue={this.validator.maxHeight(model)}
											 minValue={1}
											 validate={[heightValid()]}
											 component={NumberCounterRender}/>
							</div>
						</div>

						<div class="cell_position  input_group_title  col  half">
							<div class="input_title  ml8">Положение</div>

							<div class="cell_props">
								<div class="label">Строка</div>
								<NumberField name="row"
											 component={NumberCounterRender}
											 validate={[rowValid()]}
											 maxValue={this.validator.maxRow(model)}
											 minValue={0}/>
							</div>

							<div class="cell_props">
								<div class="label">Столбец</div>
								<NumberField name="col"
											 component={NumberCounterRender}
											 validate={[colValid()]}
											 maxValue={this.validator.maxCol(model)}
											 minValue={0}/>
							</div>
						</div>
					</div>

					<div class="form_buttons  mt12">
						<button class="button  small">Сохранить</button>
						<button class="button  small  clean" type="button" onClick={onCancel}>Отмена</button>
						{model && model.id &&
						<button class="button  small  clean f_right" type="button" onClick={::this.handleRemove}>
							Удалить</button>}
					</div>


					<ConfirmPopupService
						ref={p => this.removePopup = p}
						okName="Подтвердить"
						cancelName="Отмена"
						title="Удаление горячей клавиши"/>
				</div>
			</form>)
	}
}


HotKeyEditor.propTypes = {
	onSave: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired,
	onSearchCategory: PropTypes.func.isRequired,
	onSearchProducts: PropTypes.func.isRequired,
	onChangePosition: PropTypes.func.isRequired,
	searchProduct: PropTypes.shape({
		loading: PropTypes.bool,
		products: PropTypes.array
	}),

	searchCategory: PropTypes.shape({
		loading: PropTypes.bool,
		categories: PropTypes.array,
		error: PropTypes.any
	}),
	model: PropTypes.object.isRequired,
	position: PropTypes.shape({
		left: PropTypes.number.isRequired,
		bottom: PropTypes.number
	}),
	gridSize: PropTypes.shape({
		height: PropTypes.number.isRequired,
		width: PropTypes.number.isRequired
	})
};

export default reduxForm({form: 'hotKeyEditor'})(enhanceWithClickOutside(HotKeyEditor));


