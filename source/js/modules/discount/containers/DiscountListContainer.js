import React from 'react';

class DiscountListContainer extends React.Component {

	onAddLayer() {
		console.log('onAddLayer');
	}

	render() {
		const noItems = false;

		return (
			<div className="h100per">
				<div className="title_panel">
					<h1>Скидки</h1>
					{!noItems &&
					<div className="title_actions">
						<button className="button small icon-plus" onClick={() => this.onAddLayer()}>Добавить скидку
						</button>
					</div>}
				</div>

				{!noItems &&
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
				</div>}

				{noItems &&
				<div className="center_xy page_center_info page_center_info__discount0">
					<i className="icon icon_discount"/>
					<div className="title">Скидки не созданы</div>
					<p>Скидки можно применять ко всему чеку на кассе</p>
					<div className="form_buttons row">
						<button className="button small icon-plus" onClick={() => this.onAddLayer()}>Добавить скидку
						</button>
					</div>
				</div>}
			</div>
		);
	}
}

export default DiscountListContainer;