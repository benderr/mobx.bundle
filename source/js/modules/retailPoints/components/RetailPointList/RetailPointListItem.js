import React from 'react'
import RetailPointShape from '../RetailPointShape';
import {string, func} from 'prop-types';

const RetailPointListItem = ({point, selectedPointId, onSelectPoint, onItemClick}) => {
	return (<div class='table_row  row_link' >
		<div class='pos_name'  onClick={() => onItemClick(point.id)}>{point.name}</div>
		<div class='pos_address' onClick={() => onItemClick(point.id)}>{point.address}</div>
		<div class='pos_amount' onClick={() => onItemClick(point.id)}>Н/Д</div>
		<div class='pos_action'>
			<input type="checkbox" name={point.id} id={point.id} checked={selectedPointId == point.id}
				   onChange={() => onSelectPoint(point.id)}/>
			<label for={point.id} class="label_check switcher small"><i class="icon"></i><span>Текущая</span></label>
		</div>
	</div>);
};

RetailPointListItem.propTypes = {
	point: RetailPointShape.isRequired,
	selectedPointId: string,
	onSelectPoint: func.isRequired,
	onItemClick: func
};

export default RetailPointListItem;