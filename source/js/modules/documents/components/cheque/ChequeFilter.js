import React from 'react';
import {Drop} from 'common/uiElements';
import DatePickerRender from "common/uiElements/DatePickerRender";
import ListFilter from '../ListFilter'

class ChequeFilter extends React.Component {

	onClickPeriod(type) {
		console.log('type', type);
	}

	isClosable(){
		return !(this.drop && this.drop.isOpen());
	}

	render() {
		return (
			<div>
				<div className="side_filter mt0">
					<div className="side_filter_name">Период</div>

					<Drop position="bottom right" setInstance={drop=>this.drop=drop}>
						<a className="drop-target icon-date button light small">с 12 апреля по 12 мая</a>
						<div className="drop-content" data-ignore="no-close-date-selector">
							<div className="drop-content-inner dashboard-period-choose">
								<ul className="drop-menu">
									<li><a onClick={::this.onClickPeriod('30_DAYS')}>Последние 30 дней</a></li>
									<li><a onClick={::this.onClickPeriod('THIS_WEEK')}>Текущая неделя</a></li>
									<li><a onClick={::this.onClickPeriod('30_DAYS')}>Текущий месяц</a></li>
									<li><a onClick={::this.onClickPeriod('30_DAYS')}>Текущий квартал</a></li>
									<li><a onClick={::this.onClickPeriod('30_DAYS')}>Весь год</a></li>
								</ul>
								<div className="drop-date-choose">
									<div className="filter_date_value">
										<input type="text" name="" id=""
											   className="datetimepicker filter_date_input small date_from"/>
										<input type="text" name="" id=""
											   className="datetimepicker filter_date_input small date_to"/>
										<button className="button small">Ок</button>
									</div>
								</div>
							</div>
						</div>
					</Drop>

					{/*<DatePickerRender/>*/}
				</div>

				<div className="side_filter">
					<div className="side_filter_name">Тип документа</div>

					<ul>
						<li>
							<input type="checkbox" name="tfilter" id="ff11" className="input_check"/>
							<label htmlFor="ff11" className="label_check">
								<i className="icon"/>
								<span>Продажа</span>
							</label>
						</li>
						<li>
							<input type="checkbox" name="tfilter" id="ff11" className="input_check"/>
							<label htmlFor="ff11" className="label_check">
								<i className="icon"/>
								<span>Продажа</span>
							</label>
						</li>
					</ul>
				</div>
			</div>
		)
	}

}


export default ChequeFilter;