import React from 'react'


class ReportsContainer extends React.Component {

	render() {
		return (
			<div>

				<div className="widget_block  report_request_form">
					<div>Выполнить отчет о продажах за период</div>
					<div className="date_selection">c
						<input type="text" className="datetimepicker date_from"/>
						по
						<input type="text" className="datetimepicker date_to"/>
					</div>
					<div className="form_buttons">
						<button className="button  middle">Скачать</button>
						<button className="button  middle">Отправить на почту</button>
					</div>

				</div>

			</div>
		);
	}

}

export default ReportsContainer;