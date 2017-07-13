import React from 'react'
import PropTypes from 'prop-types'
import KeyShape from '../KeyShape';

const HotKeyProduct = ({model, onSelectProduct, className}) => {
	return (
		<div className={className}>
			<div className="cell"
				 style={{backgroundColor: model.color}}
				 onClick={(event) => onSelectProduct(event, model.id)}>
				{model.name}
			</div>
		</div>
	);
};

HotKeyProduct.propTypes = {
	model: KeyShape.isRequired,
	onSelectProduct: PropTypes.func.isRequired,
	className: PropTypes.string.isRequired
};

export default HotKeyProduct;

