import React from 'react';
import ProductForm from '../components/EditProductForm/ProductForm';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'
import * as productActions from '../actions/productActions'
import {bindActionCreators} from 'redux';

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
class EditProductContainer extends React.Component {
	onSaveProduct() {

	}

	render() {
		const product = {};
		return (<div>
			<ProductForm onSave={::this.onSaveProduct} product={product}/>
		</div>);
	}
}

export default EditProductContainer;

function mapStateToProps(state, ownProps) {
	console.log(ownProps.location);
	return {}
}

function mapDispatchToProps(dispatch) {
	return {
		//login: bindActionCreators(login.request, dispatch)
	}
}