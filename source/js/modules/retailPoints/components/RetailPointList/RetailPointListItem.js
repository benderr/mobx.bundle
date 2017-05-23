import React from 'react'
import RetailPointShape from './RetailPointShape';
import {string, func} from 'prop-types';

const RetailPointListItem = ({point, selectedPointId, onSelectPoint}) => {
	return (<div class='table_row  row_link'>
		<div class='pos_name'>{point.name}</div>
		<div class='pos_address'>{point.address} {point.settings.aboutModulPosUrl}</div>
		<div class='pos_amount'>103 549.00 р. </div>
		<div class='pos_action'>
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