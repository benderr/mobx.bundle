import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux';
import toJs from 'components/HOC/toJs'
import {getRetailPointList, getCurrentRetailPointId} from '../selectors/retailPointSelectors'
import RetailPointList from '../components/RetailPointList/RetailPointList';
import * as retailPointActions from '../actions/retailPointActions';


const mapActions = dispatch => ({
	onSelectPoint: bindActionCreators(retailPointActions.setRetailPoint, dispatch)
});

const mapState = state => ({
	points: getRetailPointList(state),
	selectedPointId: getCurrentRetailPointId(state),
});

@connect(mapState, mapActions)
@toJs
class RetailPointsContainer extends React.Component {
	render() {
		const { points, selectedPointId, onSelectPoint} = this.props;
		return ( points && points.length > 0 ? <div>
			<div class="title_panel">
				<h1>Точки продаж</h1>
				<div class="title_actions">
					<Link class="button small icon-plus" to="/retail-points/add">Добавить точку</Link>
				</div>
			</div>
			<RetailPointList points={points} selectedPointId={selectedPointId} onSelectPoint={onSelectPoint}/>
		</div> : <div class="pos_0">
			<div class="pos_0_inner">
				<i class="icon-pos"></i>
				<p style={{fontSize: '18px'}}>У вас еще нет торговых точек</p>
				<p style={{fontSize: '14px'}}>Для добавления товаров необходима добавить точку продаж</p>
				<Link class="button small icon-plus mt28" to="/retail-points/add">Добавить точку продаж</Link>
			</div>
		</div>);
	}
}

export default  RetailPointsContainer