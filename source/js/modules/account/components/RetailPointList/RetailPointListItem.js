import React from 'react'
import RetailPointShape from './RetailPointShape';

const RetailPointListItem = ({point}) => {
	console.log(point)
	return (<div class='table_row  row_link  row_link'>
		<div class='product_id'>{point.name}</div>
		<div class='product_name'>{point.address} {point.settings.aboutModulPosUrl}</div>
		<div class='product_price'>{'Test'}</div>
	</div>);
};

RetailPointListItem.propTypes = {
	point: RetailPointShape.isRequired
}

export default RetailPointListItem;