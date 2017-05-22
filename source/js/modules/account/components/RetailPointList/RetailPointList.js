import React from 'react';
import PropTypes from 'prop-types';
const {arrayOf, string, func} = PropTypes;
import RetailPointShape from './RetailPointShape';
import {connect} from 'react-redux';
import {getRetailPointList, getCurrentRetailPointId} from '../../selectors/retailPointSelectors'
import RetailPointListItem from './RetailPointListItem'
import {bindActionCreators} from 'redux';
import * as retailPointActions from '../../actions/retailPointActions';

const toJS = (obj, def = null) => {
	return obj ? obj.toJS() : def
}

const mapActions = dispatch => ({
	onSelectPoint: bindActionCreators(retailPointActions.setRetailPoint, dispatch)
});

const mapState = state => ({
	points: getRetailPointList(state),
	selectedPointId: getCurrentRetailPointId(state),
});

@connect(mapState, mapActions)
class RetailPointList extends React.Component {
	static propTypes = {
		points: arrayOf(RetailPointShape),
		selectedPointId: string
	};

	render() {
		const points = toJS(this.props.points, []);
		return (
			<div class='widget_block'>
				{/*{this.props.selectedPointId}*/}
				<div class='table  table_products'>
					<div class='table_head'>
						<div class='product_id'>Название</div>
						<div class='product_name'>Адрес</div>
						<div class='product_price'>Активный</div>
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
