import React from 'react'
import DefaultLayerLayout from 'components/DefaultLayerLayout'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import toJS from 'components/HOC/toJs'
import {bindActionCreators} from 'redux'


@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@toJS
class ChequeFilterContainer extends DefaultLayerLayout {
	render() {

		console.log('ChequeFilterContainer.render');

		return (
			<article className="page" {...this.layerOptions}>
				<div className="filter_panel right0">

					<div className="side_filter  mt0">
						<div className="side_filter_name">Период</div>
						<a className="drop-target icon-date button light small">с 12 апреля по 12 мая</a>
						<div className="drop-content">
							<div className="drop-content-inner dashboard-period-choose">
								<ul className="drop-menu">
									<li><a>Последние 30 дней</a></li>
									<li><a>Текущая неделя</a></li>
									<li><a>Текущий месяц</a></li>
									<li><a>Текущий квартал</a></li>
									<li><a>Весь год</a></li>
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
						</ul>
					</div>
				</div>
			</article>
		)
	}
}

function mapStateToProps(state, ownProps) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({

		}, dispatch)
	};
}


export default ChequeFilterContainer;