import React from 'react'
import RetailPointShape from './RetailPointShape';
import {string, func} from 'prop-types';

const RetailPointListItem = ({point, selectedPointId, onSelectPoint}) => {
	return (<div class='table_row  row_link  row_link'>
		<div class='product_id'>{point.name}</div>
		<div class='product_name'>{point.address} {point.settings.aboutModulPosUrl}</div>
		<div class='product_price'>
			<button disabled={selectedPointId == point.id} className="xsmall second button" onClick={()=>onSelectPoint(point.id)}>Выбрать</button>
		</div>
	</div>);
};

RetailPointListItem.propTypes = {
	point: RetailPointShape.isRequired,
	selectedPointId: string,
	onSelectPoint: func.isRequired
};

export default RetailPointListItem;