import React from 'react';
import {DatePickerRange} from 'common/uiElements';

import {Drop} from 'common/uiElements';
// import DatePickerRender from "common/uiElements/DatePickerRender";
// import ListFilter from '../ListFilter'

class ChequeFilter extends React.Component {
	isClosable() {
		return !(this.drop && this.drop.isOpen());
	}

	onClickPeriod(type) {
		console.log('type', type);
	}

	isClosable(){
		return !(this.drop && this.drop.isOpen());
	}

	render() {
		const {ignoreCloseSelect = '', dateFrom = new Date(), dateTo = new Date(),
			onChangeDate = (a) => console.log(a)
		} = this.props;

		return (
			<div>
				<div className="side_filter mt0">
					<div className="side_filter_name">Тип документа</div>
					<DatePickerRange ignoreDropCloseAttr={ignoreCloseSelect}
									 dateFrom={dateFrom}
									 dateTo={dateTo}
									 onChange={onChangeDate}
									 setDropInstance={drop => this.drop = drop}/>

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