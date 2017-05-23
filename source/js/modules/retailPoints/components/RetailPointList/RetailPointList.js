import React from 'react';
import PropTypes from 'prop-types';
const {arrayOf, string, func} = PropTypes;
import RetailPointShape from './RetailPointShape';
import {connect} from 'react-redux';
import {getRetailPointList, getCurrentRetailPointId} from '../../selectors/retailPointSelectors'
import RetailPointListItem from './RetailPointListItem'
import {bindActionCreators} from 'redux';
import * as retailPointActions from '../../actions/retailPointActions';
import toJs from 'components/HOC/toJs'

const mapActions = dispatch => ({
	onSelectPoint: bindActionCreators(retailPointActions.setRetailPoint, dispatch)
});

const mapState = state => ({
	points: getRetailPointList(state),
	selectedPointId: getCurrentRetailPointId(state),
});

@connect(mapState, mapActions)
@toJs
class RetailPointList extends React.Component {
	static propTypes = {
		points: arrayOf(RetailPointShape),
		selectedPointId: string
	};

	render() {
		const points = this.props.points || [];
		return (

			<div class='widget_block'>
				{/*{this.props.selectedPointId}*/}
				<div class='table  table_pos'>
					<div class='table_head'>
						<div class='pos_name'>Название</div>
						<div class='pos_address'>Адрес</div>
						<div class="pos_amount">Сумма продаж</div>
						<div class="pos_action">Действия</div>
					</div>
					{points.map(point => (
						<RetailPointListItem key={'listitem_' + point.id}
											 point={point}
											 selectedPointId={this.props.selectedPointId}
											 onSelectPoint={::this.props.onSelectPoint}
						/>))}
				</div>
			</div>
		);
	}
}

export default RetailPointList;
