import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {push} from 'connected-react-router'
import {bindActionCreators} from 'redux';
import toJs from 'components/HOC/toJs'
import {getRetailPointList, getCurrentRetailPointId} from '../selectors/retailPointSelectors'
import RetailPointList from '../components/RetailPointList/RetailPointList';
import * as retailPointActions from '../actions/retailPointActions';


const mapActions = dispatch => ({
	onSelectPoint: bindActionCreators(retailPointActions.setRetailPoint, dispatch),
	push: bindActionCreators(push, dispatch),
	createRetailPoint: bindActionCreators(retailPointActions.createRetailPoint, dispatch),
});

const mapState = state => ({
	points: getRetailPointList(state),
	selectedPointId: getCurrentRetailPointId(state),

});

@connect(mapState, mapActions)
@toJs
class RetailPointsContainer extends React.Component {

	openPoint(id) {
		const {push} = this.props;
		push({pathname: `/retail-points/edit/${id}`});
	}

	render() {
		const {points, selectedPointId, onSelectPoint, createRetailPoint} = this.props;
		if (points && points.length > 0) {
			return (<div>
				<div class="title_panel">
					<h1>Точки продаж</h1>
					<div class="title_actions">
						<button class="button small icon-plus" onClick={createRetailPoint}>Добавить точку</button>
					</div>
				</div>
				<RetailPointList points={points} selectedPointId={selectedPointId} onSelectPoint={onSelectPoint}
								 onItemClick={::this.openPoint}/>
			</div>);
		} else {
			return (<div class="pos_0">
				<div class="pos_0_inner">
					<i class="icon-pos"></i>
					<p style={{fontSize: '18px'}}>У вас еще нет торговых точек</p>
					<p style={{fontSize: '14px'}}>Для добавления товаров необходима добавить точку продаж</p>
					<button class="button small icon-plus mt28" onClick={createRetailPoint}>Добавить точку продаж
					</button>
				</div>
			</div>);
		}
	}
}

export default  RetailPointsContainer