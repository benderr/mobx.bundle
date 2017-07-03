import React from 'react';
import ListComponent from '../components/ListComponent';


class ListContainer extends React.Component {
	componentWillMount() {
		console.log('>> componentWillMount');
	}

	onAddFormLayer() {
		console.log('> onAddFormLayer');
	}

	onDetailFormLayer() {
		console.log('> onDetailFormLayer');
	}

	onOpenFilterLayer() {
		console.log('> onOpenFilterLayer');
	}

	render() {
		const noItems = false;

		return (
			<div className="section_content full_width">
				<div className="title_panel">
					<h1>Контрагенты</h1>

					{!noItems &&
					<div className="title_actions">
						<button className="button small light icon-filter show_filter_panel" onClick={() => this.onOpenFilterLayer()}>Фильтр</button>
						<button className="button small icon-plus" onClick={() => this.onAddFormLayer()}>Добавить контрагента</button>
					</div>}

				</div>

				{!noItems && <ListComponent />}

				{noItems &&
				<div className="center_xy page_center_info page_center_info__contragents0">
					<div className="title">Контрагенты не заданы</div>
					<div className="form_buttons row">
						<button className="button small icon-plus" onClick={() => this.onAddFormLayer()}>Добавить контрагента</button>
					</div>
				</div>}

			</div>
		);
	}
}


export default ListContainer;