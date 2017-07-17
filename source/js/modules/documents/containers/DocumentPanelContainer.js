import React from 'react'
import {Route} from 'react-router'
import {Link} from 'react-router-dom'


const SiteMenuLink = ({label, to, exact}) => (
	<Route path={to} exact={exact} children={({match}) => (
		<Link className={'tab ' + (match ? 'tab__active' : '')} to={to}>{label}</Link>
	)}/>
);

class DocumentPanelContainer extends React.Component {

	render() {
		return (
			<div className="title_panel">
				<div className="title_actions">
					<a className="button small light icon-filter show_filter_panel  right20">Фильтры</a>
					<a className="button white icon-filter show_filter_panel float  right20">
						<span className="filter_count" />
					</a>
				</div>

				<div className="tabs_flat  tabs_flat__h1">
					<SiteMenuLink to="/documents/cheque" label="Чеки"/>
					<SiteMenuLink to="/documents/money" label="Денежные средства"/>
					<SiteMenuLink to="/documents/external" label="Заказы"/>
					<SiteMenuLink to="/documents/ishop" label="Интернет-магазин"/>
					<SiteMenuLink to="/documents/reports" label="Отчеты"/>
				</div>
			</div>
		);
	}

}

export default DocumentPanelContainer;