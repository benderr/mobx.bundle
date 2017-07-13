import React from 'react'
import PropTypes from 'prop-types'
import * as hotKeyHelper from '../../helpers/hotKeyHelper'
import KeyShape from '../KeyShape';
import HotKeyProduct from './HotKeyProduct'
import HotKeyCategory from './HotKeyCategory'
import HotKeyBackFromCategory from './HotKeyBackFromCategory'
import {HOT_KEY_TYPE} from '../../enums/enums';

const HotKeyWrapper = ({model, selected, onSelectProduct, onOpenCategory, onBackFromCategory}) => {
	const isSelected = selected && selected.id == model.id;
	if (isSelected) {
		Object.keys(model).forEach(k => {
			if (selected.hasOwnProperty(k))
				model[k] = selected[k];
		});
	}
	const cordClass = hotKeyHelper.generateWrapperClass(model.row, model.col, model.width, model.height);
	const className = [cordClass, isSelected ? 'selected' : ''].join(' ');

	if (model.type === HOT_KEY_TYPE.PRODUCT) {
		return (<HotKeyProduct model={model}
							   onSelectProduct={onSelectProduct}
							   className={className}/>)
	}
	else if (model.type === HOT_KEY_TYPE.CATEGORY) {
		return (<HotKeyCategory model={model}
								onSelectProduct={onSelectProduct}
								onOpenCategory={onOpenCategory}
								className={className}/>)
	}
	else if (model.type === HOT_KEY_TYPE.BACK) {
		return (<HotKeyBackFromCategory className={className}
										onBackFromCategory={onBackFromCategory}/>)
	}

	return null;
};

HotKeyWrapper.propTypes = {
	model: KeyShape.isRequired,
	selected: KeyShape,
	onSelectProduct: PropTypes.func.isRequired,
	onOpenCategory: PropTypes.func.isRequired,
	onBackFromCategory: PropTypes.func.isRequired,
};

export default HotKeyWrapper;

