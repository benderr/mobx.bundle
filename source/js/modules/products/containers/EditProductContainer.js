import React from 'react';
import ProductForm from '../components/EditProductForm/ProductForm';
import {connect} from 'react-redux';
import * as productActions from '../actions/productActions'
import {bindActionCreators} from 'redux';


class EditProductContainer extends React.Component {
	render() {
		return (<div>
			<ProductForm />
		</div>);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProductContainer);

function mapStateToProps(state, ownProps) {
	return {
	}
}

function mapDispatchToProps(dispatch) {
	return {
		//login: bindActionCreators(login.request, dispatch)
	}
}