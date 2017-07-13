import React from 'react'
import PropTypes from 'prop-types'
import * as hotKeyHelper from '../../helpers/hotKeyHelper'
import KeyShape from '../KeyShape'
import {HOT_KEY_TYPE} from '../../enums/enums'
import HotKeyProduct from './HotKeyProduct'
import HotKeyCategory from './HotKeyCategory'

const HotKeyEmptyBlock = ({cords, selected, onSelectEmptyKey}) => {
	const isSelected = selected && !selected.id && selected.row == cords.row && selected.col == cords.col;
	const cordClass = isSelected ? hotKeyHelper.generateWrapperClass(selected.row, selected.col, selected.width, selected.height)
		: hotKeyHelper.generateWrapperClass(cords.row, cords.col);
	const className = [cordClass, isSelected ? 'selected' : ''].join(' ');
	if (isSelected && selected.type === HOT_KEY_TYPE.PRODUCT) {
		return (<HotKeyProduct model={selected}
							   onSelectProduct={(event, id) => onSelectEmptyKey(event, cords)}
							   className={className}/>)
	}
	else if (isSelected && selected.type === HOT_KEY_TYPE.CATEGORY) {
		return (<HotKeyCategory model={selected}
								onSelectProduct={(event, id) => onSelectEmptyKey(event, cords)}
								onOpenCategory={_ => false}
								className={className}/>)
	} else {
		return (<div className={className}>
			<div className="cell"
				 onClick={event => onSelectEmptyKey(event, cords)}>
			</div>
		</div>);
	}
};

HotKeyEmptyBlock.propTypes = {
	cords: PropTypes.shape({
		row: PropTypes.number.isRequired,
		col: PropTypes.number.isRequired
	}).isRequired,
	onSelectEmptyKey: PropTypes.func.isRequired,
	selected: PropTypes.shape({
		name: PropTypes.string,
		row: PropTypes.number.isRequired,
		col: PropTypes.number.isRequired,
		width: PropTypes.number,
		height: PropTypes.number,
		color: PropTypes.string
	})
};

export default HotKeyEmptyBlock;

