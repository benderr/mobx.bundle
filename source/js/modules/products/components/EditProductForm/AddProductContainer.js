import React from 'react'
import DefaultLayerLayout from 'components/DefaultLayerLayout'
import ProductForm from './ProductForm';
import {connect} from 'react-redux';
import * as productActions from '../../actions/productActions'
import {bindActionCreators} from 'redux';

class AddProductContainer extends DefaultLayerLayout {

	render() {
		return (
			<article className="page">
				<div className="page_header">
					{this.getCloseButton()}
					{this.getToogleButton()}
					<h1>Добавление товара</h1>
				</div>
				<ProductForm />
			</article>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProductContainer);

function mapStateToProps(state, ownProps) {
	return {
	}
}

function mapDispatchToProps(dispatch) {
	return {
		//login: bindActionCreators(login.request, dispatch)
	}
}