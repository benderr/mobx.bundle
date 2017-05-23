import React from 'react';
import RetailPointList from '../components/RetailPointList/RetailPointList';
import { Link } from 'react-router-dom'

class RetailPointsContainer extends React.Component {
	render() {
		return (<div>
			<div class="title_panel">
				<h1>Точки продаж</h1>
				<div class="title_actions">
					<Link class="button small icon-plus" to="/retail-points/add">Добавить точку</Link>
				</div>
			</div>
			<RetailPointList />
		</div>);
	}
}

export default  RetailPointsContainer