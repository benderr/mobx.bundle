import React from 'react'
import DefaultLayerLayout from 'components/DefaultLayerLayout'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import toJS from 'components/HOC/toJs'
import retailPointHOC from 'components/HOC/retailPointRequiredHOC'
import {bindActionCreators} from 'redux'

import DiscountEditComponent from '../components/DiscountEditComponent'


@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@retailPointHOC
@toJS
class DiscountEditContainer extends DefaultLayerLayout {

	onSubmitForm(props) {
		console.log('onSubmitForm', props);
	}

	render() {
		const isNew = true;
		const title = isNew ? 'Создание скидки' : 'Редактирование скидки';

		return (
			<article className="page" {...this.layerOptions}>
				<div className="page_header">
					{this.getCloseButton()}
					{this.getToggleButton()}
					<h1>{title}</h1>
				</div>

				<DiscountEditComponent onSubmitForm={::this.onSubmitForm} />

			</article>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({}, dispatch)
	};
}


export default DiscountEditContainer;