import React from 'react'
import PropTypes from 'prop-types'
import KeyShape from '../KeyShape';

const HotKeyCategory = ({className, model, onSelectProduct, onOpenCategory}) => {
	return (
		<div className={className}>
			<div className="cell  category"
				 style={{backgroundColor: model.color}}
				 onClick={event => onSelectProduct(event, model.id)}>
				{model.name}
				<a className="category_open"
				   onClick={e => onOpenCategory(e, {categoryId: model.groupcode, tabCode: model.tabCode})}>открыть</a>
			</div>
		</div>
	);
};

HotKeyCategory.propTypes = {
	model: KeyShape.isRequired,
	onSelectProduct: PropTypes.func.isRequired,
	onOpenCategory: PropTypes.func.isRequired,
	className: PropTypes.string.isRequired
};

export default HotKeyCategory;

