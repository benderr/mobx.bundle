import React from 'react';

class DiscountListComponent extends React.Component {
	render () {
		return (
			<div className="widget_block">
				<div className="table table_discount">
					<div className="table_head">
						<div className="discount_id">Код</div>
						<div className="discount_name">Название</div>
						<div className="discount_size">Размер, %</div>
						<div className="discount_status">Активна</div>
					</div>
					<div className="table_row  row_link">
						<div className="discount_id">2839113354</div>
						<div className="discount_name">Скидка постоянного клиента</div>
						<div className="discount_size">5</div>
						<div className="discount_status">
							<input type="checkbox" name="c1" id="55"/>
							<label htmlFor="55" className="label_check switcher">
								<i className="icon"/>
							</label>
						</div>
					</div>
					<div className="table_row  row_link">
						<div className="discount_id">1139110344</div>
						<div className="discount_name">Скидка выходного дня</div>
						<div className="discount_size">3</div>
						<div className="discount_status">
							<input type="checkbox" name="c1" id="ysdg8qsd7qd"/>
							<label htmlFor="ysdg8qsd7qd" className="label_check switcher">
								<i className="icon"/>
							</label>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default DiscountListComponent;