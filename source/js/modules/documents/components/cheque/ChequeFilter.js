import React from 'react';
import {Drop} from 'common/uiElements';
import DatePiker from 'react-datepicker'


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
									<li onClick={() => this.onClickPeriod('30_DAYS')}><a>Последние 30 дней</a></li>
									<li><a>Текущая неделя</a></li>
									<li><a>Текущий месяц</a></li>
									<li><a>Текущий квартал</a></li>
									<li><a>Весь год</a></li>
								</ul>
								<div className="drop-date-choose">
									<div className="filter_date_value">
										<DatePiker className="datetimepicker filter_date_input small date_from" />
										<DatePiker className="datetimepicker filter_date_input small date_to" />
										<button className="button small" onClick={() => this.onClickPeriod('RAND_PERIOD')}>Ок</button>
									</div>
								</div>
							</div>
						</div>
					</Drop>
				</div>

				<div className="side_filter">
					<div className="side_filter_name">Тип документа</div>
					<ul>
						<li>
							<input type="checkbox" name="type_SALE" id="t1" className="input_check"/>
							<label htmlFor="t1" className="label_check">
								<i className="icon"/>
								<span>Продажа</span>
							</label>
						</li>
						<li>
							<input type="checkbox" name="type_RETURN" id="t2" className="input_check"/>
							<label htmlFor="t2" className="label_check">
								<i className="icon"/>
								<span>Возврат</span>
							</label>
						</li>
					</ul>
				</div>

				<div className="side_filter">
					<a>Очистить</a>
				</div>
			</div>
		)
	}

}


export default ChequeFilter;