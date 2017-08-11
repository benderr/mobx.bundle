import React from 'react';
import {arrayOf, string, func} from 'prop-types';
import RetailPointShape from '../RetailPointShape';

import RetailPointListItem from './RetailPointListItem'

class RetailPointList extends React.Component {
	static propTypes = {
		points: arrayOf(RetailPointShape),
		selectedPointId: string,
		onSelectPoint: func,
		onItemClick: func
	};

	render() {
		const {points = [], selectedPointId, onSelectPoint, onItemClick} = this.props;
		return (
			<div class='widget_block'>
				<div class='table  table_pos'>
					<div class='table_head'>
						<div class='pos_name'>Название</div>
						<div class='pos_address'>Адрес</div>
						<div class="pos_amount">Сумма продаж</div>
						<div class="pos_action">Действия</div>
					</div>
					{points.map(point => (
						<RetailPointListItem key={'listitem_' + point.id}
											 point={point}
											 selectedPointId={selectedPointId}
											 onSelectPoint={onSelectPoint}
											 onItemClick={onItemClick}
						/>))}
				</div>
			</div>
		);
	}
}

export default RetailPointList;
