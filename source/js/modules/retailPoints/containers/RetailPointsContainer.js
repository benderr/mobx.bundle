import React from 'react';
import {connect} from 'react-redux';
import {push} from 'connected-react-router'
import {bindActionCreators} from 'redux';
import toJs from 'components/HOC/toJs'
import {LoaderPanel} from 'common/uiElements'
import {getRetailPointList, getCurrentRetailPointId, getRetailPointListLoading} from '../selectors/retailPointSelectors'
import RetailPointList from '../components/RetailPointList/RetailPointList';
import * as retailPointActions from '../actions/retailPointActions';
import retailPointHOC from 'components/HOC/retailPointRequiredHOC';

const mapActions = dispatch => ({
	onSelectPoint: bindActionCreators(retailPointActions.setRetailPoint, dispatch),
	push: bindActionCreators(push, dispatch),
	createRetailPoint: bindActionCreators(retailPointActions.createRetailPoint, dispatch),
	getRetailPoints: bindActionCreators(retailPointActions.getRetailPoints.request)
});

const mapState = state => ({
	points: getRetailPointList(state),
	selectedPointId: getCurrentRetailPointId(state),
	loading: getRetailPointListLoading(state)
});

@connect(mapState, mapActions)
@toJs
@retailPointHOC
class RetailPointsContainer extends React.Component {

	openPoint(id) {
		const {push} = this.props;
		push({pathname: `/retail-points/edit/${id}`});
	}

	render() {
		const {points, selectedPointId, onSelectPoint, createRetailPoint, loading} = this.props;
		return (<div>
			<div class="title_panel">
				<h1>Точки продаж</h1>
				<div class="title_actions">
					<button class="button small icon-plus" onClick={createRetailPoint}>Добавить точку</button>
				</div>
			</div>
			<LoaderPanel className='' loading={loading}>
				<RetailPointList points={points}
								 selectedPointId={selectedPointId}
								 onSelectPoint={onSelectPoint}
								 onItemClick={::this.openPoint}/>
			</LoaderPanel>
		</div>);
	}
}

export default  RetailPointsContainer