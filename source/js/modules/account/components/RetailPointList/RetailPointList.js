import React from 'react';
import PropTypes from 'prop-types';
const {arrayOf} = PropTypes;
import RetailPointShape from './RetailPointShape';
import {connect} from 'react-redux';
import {getRetailPointList} from '../../selectors/retailPointSelectors'
import RetailPointListItem from './RetailPointListItem'

@connect(getRetailPointList)
class RetailPointList extends React.Component {
	static propTypes = {
		points: arrayOf(RetailPointShape)
	};

	render() {
		return (
			<div class='widget_block'>
				<div class='table  table_products'>
					<div class='table_head'>
						<div class='product_id'>Название</div>
						<div class='product_name'>Адрес</div>
						<div class='product_price'>Сумма продаж</div>
					</div>
					{this.props.points.map(point => (
						<RetailPointListItem key={'listitem_' + point.id} point={point}/>))}
				</div>
			</div>
		);
	}
}

export default RetailPointList;
